import styles from "./page.module.scss";

export default function Home() {
  return (
    <div className={styles.hero}>
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
          <a href="/products" className={styles.primaryBtn}>
            Shop Now
          </a>
          <a href="/products?category=keyboards" className={styles.secondaryBtn}>
            Browse Keyboards
          </a>
        </div>
      </div>
    </div>
  );
}
