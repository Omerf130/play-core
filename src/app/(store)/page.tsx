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

      <section className={styles.perks}>
        <h2 className={styles.perksTitle}>Why Shop With Us</h2>
        <div className={styles.perksGrid}>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3>Free Shipping</h3>
            <p>Enjoy free delivery on all orders over $50, straight to your door.</p>
          </div>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </div>
            <h3>Easy Returns</h3>
            <p>Not satisfied? Return eligible items within 30 days, hassle-free.</p>
          </div>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>24/7 Support</h3>
            <p>Our gaming experts are available around the clock to help you out.</p>
          </div>
        </div>
        <div className={styles.perksAction}>
          <Link href="/faq" className={styles.faqLink}>
            View All FAQs
          </Link>
        </div>
      </section>
    </>
  );
}
