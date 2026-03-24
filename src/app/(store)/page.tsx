import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import SiteContent from "@/models/SiteContent";
import ProductGrid from "@/components/store/ProductGrid/ProductGrid";
import { IProduct } from "@/types";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

async function getFeaturedProducts(): Promise<IProduct[]> {
  await dbConnect();
  let products = await Product.find({ isPromoted: true })
    .sort({ createdAt: -1 })
    .lean();

  if (products.length === 0) {
    products = await Product.find().sort({ createdAt: -1 }).lean();
  }

  return JSON.parse(JSON.stringify(products));
}

async function getHeroImage(): Promise<string | null> {
  await dbConnect();
  const content = await SiteContent.findOne({ key: "hero_image" }).lean();
  return content?.value ?? null;
}

export default async function Home() {
  const [featured, heroImage] = await Promise.all([
    getFeaturedProducts(),
    getHeroImage(),
  ]);

  return (
    <>
      <section
        className={`${styles.hero} ${heroImage ? styles.heroWithBg : ""}`}
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        {heroImage && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <span className={styles.badge}>New Arrivals</span>
          <h1 className={styles.title}>
            Level Up Your
            <br />
            <span className={styles.accent}>Gaming Setup</span>
          </h1>
          <p className={styles.subtitle}>
            Premium keyboards, mice, headsets and controllers built for
            competitive players who demand the best.
          </p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.primaryBtn}>
              Shop Now
            </Link>
            <Link href="/products?category=keyboards" className={styles.secondaryBtn}>
              Browse Keyboards
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>Featured Products</h2>
          <Link href="/products" className={styles.viewAll}>
            View All &rarr;
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </>
  );
}
