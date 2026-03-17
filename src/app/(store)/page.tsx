import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductGrid from "@/components/store/ProductGrid/ProductGrid";
import { IProduct } from "@/types";
import styles from "./page.module.scss";

async function getFeaturedProducts(): Promise<IProduct[]> {
  await dbConnect();
  const products = await Product.find().sort({ createdAt: -1 }).limit(4).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function Home() {
  const featured = await getFeaturedProducts();

  return (
    <>
      <section className={styles.hero}>
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
