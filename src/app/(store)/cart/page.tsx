"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import CartItem from "@/components/store/CartItem/CartItem";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./page.module.scss";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t, dir } = useTranslation();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>&#128722;</span>
        <h1>{t.cart.emptyTitle}</h1>
        <p>{t.cart.emptySubtitle}</p>
        <Link href="/products" className={styles.shopLink}>
          {t.cart.browseProducts}
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t.cart.title}</h1>
        <button className={styles.clearBtn} onClick={clearCart}>
          {t.cart.clearCart}
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>{t.cart.orderSummary}</h2>
          <div className={styles.summaryRows}>
            <div className={styles.row}>
              <span>{t.cart.items} ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>{t.cart.shipping}</span>
              <span className={styles.free}>{t.cart.free}</span>
            </div>
          </div>
          <div className={styles.total}>
            <span>{t.cart.total}</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <Link href="/checkout" className={styles.checkoutBtn}>
            {t.cart.proceedToCheckout}
          </Link>
          <Link href="/products" className={styles.continueShopping}>
            {dir === "rtl" ? "" : "\u2190 "}{t.cart.continueShopping}{dir === "rtl" ? " \u2192" : ""}
          </Link>
        </aside>
      </div>
    </div>
  );
}
