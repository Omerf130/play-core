"use client";

import Link from "next/link";
import { useCart } from "@/store/cart";
import CartItem from "@/components/store/CartItem/CartItem";
import styles from "./page.module.scss";

export default function CartPage() {
  const { items, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>&#128722;</span>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven&apos;t added any items yet.</p>
        <Link href="/products" className={styles.shopLink}>
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Shopping Cart</h1>
        <button className={styles.clearBtn} onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className={styles.layout}>
        <div className={styles.items}>
          {items.map((item) => (
            <CartItem key={item.product._id} item={item} />
          ))}
        </div>

        <aside className={styles.summary}>
          <h2>Order Summary</h2>
          <div className={styles.summaryRows}>
            <div className={styles.row}>
              <span>Items ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>${totalPrice().toFixed(2)}</span>
            </div>
            <div className={styles.row}>
              <span>Shipping</span>
              <span className={styles.free}>Free</span>
            </div>
          </div>
          <div className={styles.total}>
            <span>Total</span>
            <span>${totalPrice().toFixed(2)}</span>
          </div>
          <Link href="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <Link href="/products" className={styles.continueShopping}>
            &larr; Continue Shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
