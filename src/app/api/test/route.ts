import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";

export async function GET() {
  try {
    await dbConnect();

    const productCount = await Product.countDocuments();
    const orderCount = await Order.countDocuments();

    return NextResponse.json({
      status: "ok",
      message: "MongoDB connected successfully",
      counts: {
        products: productCount,
        orders: orderCount,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    await dbConnect();

    const sampleProducts = [
      {
        name: "Mechanical Gaming Keyboard",
        description: "RGB mechanical keyboard with Cherry MX switches, N-key rollover, and customizable backlighting.",
        price: 129.99,
        category: "keyboards",
        image: "",
      },
      {
        name: "Pro Gaming Mouse",
        description: "High-precision optical sensor with 16000 DPI, ergonomic design, and 6 programmable buttons.",
        price: 59.99,
        category: "mice",
        image: "",
      },
      {
        name: "7.1 Surround Sound Headset",
        description: "Premium gaming headset with virtual 7.1 surround sound, noise-canceling mic, and memory foam ear cups.",
        price: 89.99,
        category: "headsets",
        image: "",
      },
      {
        name: "Wireless Controller",
        description: "Bluetooth gaming controller with haptic feedback, low-latency connection, and 20-hour battery life.",
        price: 69.99,
        category: "controllers",
        image: "",
      },
      {
        name: "XL Gaming Mouse Pad",
        description: "Extended desk mat with micro-textured surface, anti-slip rubber base, and stitched edges.",
        price: 24.99,
        category: "accessories",
        image: "",
      },
    ];

    await Product.deleteMany({});
    const created = await Product.insertMany(sampleProducts);

    return NextResponse.json({
      status: "ok",
      message: `Seeded ${created.length} products`,
      products: created,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message },
      { status: 500 }
    );
  }
}
