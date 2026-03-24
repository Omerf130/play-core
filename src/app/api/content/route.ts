import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import SiteContent from "@/models/SiteContent";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const key = new URL(request.url).searchParams.get("key");

    if (!key) {
      const allContent = await SiteContent.find().lean();
      return NextResponse.json(allContent);
    }

    const content = await SiteContent.findOne({ key }).lean();

    if (!content) {
      return NextResponse.json({ key, value: null });
    }

    return NextResponse.json(content);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    await dbConnect();

    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: key, value" },
        { status: 400 }
      );
    }

    const content = await SiteContent.findOneAndUpdate(
      { key },
      { $set: { value } },
      { new: true, upsert: true, runValidators: true }
    ).lean();

    return NextResponse.json(content);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
