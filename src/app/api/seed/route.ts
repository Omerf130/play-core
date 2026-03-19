import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";

const products = [
  // Keyboards (4)
  {
    name: "Phantom Strike RGB Keyboard",
    description:
      "Full-size mechanical keyboard with hot-swappable Cherry MX switches, per-key RGB backlighting, aircraft-grade aluminum frame, and USB-C passthrough.",
    price: 159.99,
    category: "keyboards",
    image: "/pics/keyboard1.jpg",
  },
  {
    name: "NeonBlade 65% Compact",
    description:
      "Ultra-compact 65% layout with Gateron Pro switches, PBT double-shot keycaps, wireless Bluetooth 5.1, and 4000mAh rechargeable battery.",
    price: 129.99,
    category: "keyboards",
    image: "/pics/keyboard2.jpg",
  },
  {
    name: "CyberWave TKL Mechanical",
    description:
      "Tenkeyless gaming keyboard with optical linear switches, 8000Hz polling rate, magnetic wrist rest, and customizable OLED display.",
    price: 189.99,
    category: "keyboards",
    image: "/pics/keyboard3.jpg",
  },
  {
    name: "Volt Surge Pro Keyboard",
    description:
      "Low-profile mechanical keyboard with Kailh Choc v2 switches, N-key rollover, dedicated macro keys, and detachable braided cable.",
    price: 109.99,
    category: "keyboards",
    image: "/pics/keyboard4.jpg",
  },

  // Mice (8)
  {
    name: "HyperGlide X1 Wireless Mouse",
    description:
      "Ultra-lightweight 58g wireless mouse with 26K DPI optical sensor, 70-hour battery life, PTFE skates, and ambidextrous design.",
    price: 79.99,
    category: "mice",
    image: "/pics/mouse1.jpg",
  },
  {
    name: "Venom Strike Ergonomic Mouse",
    description:
      "Ergonomic right-hand mouse with thumb rest, 8 programmable buttons, adjustable weight system, and braided paracord cable.",
    price: 69.99,
    category: "mice",
    image: "/pics/mouse2.jpg",
  },
  {
    name: "Eclipse Pro Gaming Mouse",
    description:
      "Symmetrical esports mouse with 3395 sensor, 1000Hz wireless, onboard memory for 5 profiles, and grip tape included.",
    price: 59.99,
    category: "mice",
    image: "/pics/mouse3.jpg",
  },
  {
    name: "TitanClaw Heavy Duty Mouse",
    description:
      "Premium MMO gaming mouse with 12-button side grid, adjustable 16K DPI sensor, ceramic feet, and on-the-fly sensitivity toggle.",
    price: 89.99,
    category: "mice",
    image: "/pics/mouse4.jpg",
  },
  {
    name: "ArcLight Mini Travel Mouse",
    description:
      "Compact travel gaming mouse with tri-mode connectivity (2.4G, BT, USB-C), glass-safe sensor, and magnetic charging dock.",
    price: 49.99,
    category: "mice",
    image: "/pics/mouse5.jpg",
  },
  {
    name: "ShadowPulse FPS Mouse",
    description:
      "FPS-focused mouse with 3950 sensor, 8000Hz polling rate, 49g superlight design, and textured honeycomb shell.",
    price: 99.99,
    category: "mice",
    image: "/pics/mouse6.jpg",
  },
  {
    name: "ZeroG Carbon Fiber Mouse",
    description:
      "Carbon fiber reinforced shell at just 42g, Pixart 3399 sensor, optical micro-switches rated for 100M clicks, and RGB underglow.",
    price: 119.99,
    category: "mice",
    image: "/pics/mouse7.jpg",
  },
  {
    name: "DriftKing Wireless Mouse",
    description:
      "Dual-mode wireless mouse with hall-effect scroll wheel, adjustable LOD, soft-touch coating, and 100-hour battery life.",
    price: 74.99,
    category: "mice",
    image: "/pics/mouse8.jpg",
  },

  // Headphones (5)
  {
    name: "SonicBoom 7.1 Surround Headset",
    description:
      "Premium closed-back gaming headset with virtual 7.1 surround, 50mm graphene drivers, noise-canceling boom mic, and memory foam pads.",
    price: 129.99,
    category: "headsets",
    image: "/pics/headphone1.jpg",
  },
  {
    name: "AuraWave Wireless Headset",
    description:
      "Low-latency 2.4GHz wireless headset with Bluetooth dual-mode, 40-hour battery, retractable mic, and RGB earcup accents.",
    price: 149.99,
    category: "headsets",
    image: "/pics/headphone2.jpg",
  },
  {
    name: "ThunderCore Bass Headset",
    description:
      "Bass-enhanced gaming headset with custom EQ via app, rotating earcups, braided cable with inline controls, and Hi-Res Audio certified.",
    price: 89.99,
    category: "headsets",
    image: "/pics/headphone3.jpg",
  },
  {
    name: "NovaSphere Open-Back Headset",
    description:
      "Audiophile-grade open-back headset with planar magnetic drivers, velour ear pads, detachable cable, and studio-quality soundstage.",
    price: 199.99,
    category: "headsets",
    image: "/pics/headphone4.jpg",
  },
  {
    name: "StealthMic Pro Headset",
    description:
      "Lightweight on-ear headset with ANC, flip-to-mute mic, multi-platform compatibility, and foldable design for portability.",
    price: 109.99,
    category: "headsets",
    image: "/pics/headphone5.jpg",
  },

  // Computers (3)
  {
    name: "Apex Predator RTX Gaming PC",
    description:
      "High-end gaming desktop with RTX 4080, Intel i9-14900K, 64GB DDR5, 2TB NVMe SSD, liquid cooling, and tempered glass case with RGB.",
    price: 2999.99,
    category: "computers",
    image: "/pics/computer1.jpg",
  },
  {
    name: "Nebula Pro Streaming Rig",
    description:
      "Content creator PC with RTX 4070 Ti, AMD Ryzen 9 7950X, 32GB DDR5, dual 1TB NVMe, and whisper-quiet Noctua cooling system.",
    price: 2299.99,
    category: "computers",
    image: "/pics/computer2.jpg",
  },
  {
    name: "Vortex Compact Gaming Desktop",
    description:
      "Mini-ITX gaming powerhouse with RTX 4060 Ti, Intel i7-14700K, 32GB DDR5, 1TB NVMe, and custom SFF chassis under 12 liters.",
    price: 1599.99,
    category: "computers",
    image: "/pics/computer3.jpg",
  },

  // Chairs (1)
  {
    name: "Titan Forge Ergonomic Gaming Chair",
    description:
      "Premium ergonomic gaming chair with 4D adjustable armrests, lumbar support system, breathable mesh back, 165° recline, and magnetic headrest pillow.",
    price: 449.99,
    category: "chairs",
    image: "/pics/chair1.jpg",
  },
];

export async function POST() {
  try {
    await dbConnect();

    await Product.deleteMany({});
    const created = await Product.insertMany(products);

    return NextResponse.json({
      status: "ok",
      message: `Seeded ${created.length} products`,
      count: created.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
