import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import styles from "./Footer.module.scss";

export default async function Footer() {
  const locale = await getLocaleFromCookies();
  const t = getTranslations(locale);

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>&#9889; PlayCore</span>
          <p className={styles.tagline}>
            {t.footer.tagline}
          </p>
        </div>

        <div className={styles.section}>
          <h4>{t.footer.shop}</h4>
          <a href="/products?category=keyboards">{t.common.categories.keyboards}</a>
          <a href="/products?category=mice">{t.common.categories.mice}</a>
          <a href="/products?category=headsets">{t.common.categories.headsets}</a>
          <a href="/products?category=controllers">{t.common.categories.controllers}</a>
          <a href="/products?category=accessories">{t.common.categories.accessories}</a>
        </div>

        <div className={styles.section}>
          <h4>{t.footer.support}</h4>
          <a href="/contact">{t.footer.contactUs}</a>
          <a href="/faq">{t.footer.faq}</a>
          <a href="/faq">{t.footer.shipping}</a>
          <a href="/faq">{t.footer.returns}</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} {t.footer.copyright}</p>
      </div>
    </footer>
  );
}
