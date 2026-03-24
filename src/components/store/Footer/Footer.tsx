import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <span className={styles.logo}>&#9889; PlayCore</span>
          <p className={styles.tagline}>
            Premium gaming gear for competitive players.
          </p>
        </div>

        <div className={styles.section}>
          <h4>Shop</h4>
          <a href="/products?category=keyboards">Keyboards</a>
          <a href="/products?category=mice">Mice</a>
          <a href="/products?category=headsets">Headsets</a>
          <a href="/products?category=controllers">Controllers</a>
          <a href="/products?category=accessories">Accessories</a>
        </div>

        <div className={styles.section}>
          <h4>Support</h4>
          <a href="/contact">Contact Us</a>
          <a href="/faq">FAQ</a>
          <a href="/faq">Shipping</a>
          <a href="/faq">Returns</a>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} PlayCore. All rights reserved.</p>
      </div>
    </footer>
  );
}
