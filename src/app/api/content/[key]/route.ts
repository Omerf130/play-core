import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";

type RouteParams = { params: Promise<{ key: string }> };

export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    const { key } = await params;

    const content = await SiteContent.findOneAndDelete({ key }).lean();

    if (!content) {
      return NextResponse.json({ error: "Content not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Content deleted successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
