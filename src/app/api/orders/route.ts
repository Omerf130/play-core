import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Order from "@/models/Order";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { products, totalPrice, customerName, customerEmail, paypalOrderId } = body;

    if (!products?.length || !totalPrice || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: "Missing required fields: products, totalPrice, customerName, customerEmail" },
        { status: 400 }
      );
    }

    const order = await Order.create({
      products,
      totalPrice,
      customerName,
      customerEmail,
      paymentStatus: paypalOrderId ? "completed" : "pending",
      paypalOrderId,
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET() {
  try {
    await dbConnect();

    const orders = await Order.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(orders);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
