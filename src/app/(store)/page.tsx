import Link from "next/link";
import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import SiteContent from "@/models/SiteContent";
import ProductGrid from "@/components/store/ProductGrid/ProductGrid";
import { IProduct } from "@/types";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
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

async function getBottomHeroImage(): Promise<string | null> {
  await dbConnect();
  const content = await SiteContent.findOne({ key: "bottom_hero_image" }).lean();
  return content?.value ?? null;
}

export default async function Home() {
  const [featured, heroImage, bottomHeroImage, locale] = await Promise.all([
    getFeaturedProducts(),
    getHeroImage(),
    getBottomHeroImage(),
    getLocaleFromCookies(),
  ]);

  const t = getTranslations(locale);
  const dir = locale === "he" ? "rtl" : "ltr";

  return (
    <>
      <section
        className={`${styles.hero} ${heroImage ? styles.heroWithBg : ""}`}
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        {heroImage && <div className={styles.heroOverlay} />}
        <div className={styles.heroContent}>
          <span className={styles.badge}>{t.home.heroBadge}</span>
          <h1 className={styles.title}>
            {t.home.heroTitle1}
            <br />
            <span className={styles.accent}>{t.home.heroTitle2}</span>
          </h1>
          <p className={styles.subtitle}>
            {t.home.heroSubtitle}
          </p>
          <div className={styles.actions}>
            <Link href="/products" className={styles.primaryBtn}>
              {t.home.shopNow}
            </Link>
            <Link href="/products?category=keyboards" className={styles.secondaryBtn}>
              {t.home.browseKeyboards}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.featured}>
        <div className={styles.sectionHeader}>
          <h2>{t.home.featuredProducts}</h2>
          <Link href="/products" className={styles.viewAll}>
            {t.home.viewAll} {dir === "rtl" ? "\u2190" : "\u2192"}
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className={styles.perks}>
        <h2 className={styles.perksTitle}>{t.home.whyShopWithUs}</h2>
        <div className={styles.perksGrid}>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>
            </div>
            <h3>{t.home.freeShipping}</h3>
            <p>{t.home.freeShippingDesc}</p>
          </div>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
            </div>
            <h3>{t.home.easyReturns}</h3>
            <p>{t.home.easyReturnsDesc}</p>
          </div>
          <div className={styles.perkCard}>
            <div className={styles.perkIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3>{t.home.support247}</h3>
            <p>{t.home.support247Desc}</p>
          </div>
        </div>
        <div className={styles.perksAction}>
          <Link href="/faq" className={styles.faqLink}>
            {t.home.viewAllFAQs}
          </Link>
        </div>
      </section>

      {bottomHeroImage && (
        <section
          className={styles.bottomHero}
          style={{ backgroundImage: `url(${bottomHeroImage})` }}
        >
          <div className={styles.bottomHeroOverlay} />
          <div className={styles.bottomHeroContent}>
            <h2 className={styles.bottomHeroTitle}>{t.home.bottomHeroTitle}</h2>
            <p className={styles.bottomHeroSubtitle}>
              {t.home.bottomHeroSubtitle}
            </p>
            <Link href="/contact" className={styles.contactBtn}>
              {t.home.bottomHeroBtn}
            </Link>
          </div>
        </section>
      )}
    </>
  );
}
