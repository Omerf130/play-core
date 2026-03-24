"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import type { ICartItem } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import toast from "react-hot-toast";
import styles from "./CartItem.module.scss";

interface CartItemProps {
  item: ICartItem;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product, quantity } = item;
  const { t } = useTranslation();

  const handleRemove = () => {
    removeItem(product._id);
    toast.success(t.cart.removedFromCart(product.name));
  };

  const categoryLabel = t.common.categories[product.category] || product.category;

  return (
    <div className={styles.item}>
      <Link href={`/products/${product._id}`} className={styles.imageLink}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="100px"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>&#127918;</span>
          </div>
        )}
      </Link>

      <div className={styles.details}>
        <Link href={`/products/${product._id}`} className={styles.name}>
          {product.name}
        </Link>
        <span className={styles.category}>{categoryLabel}</span>
        <span className={styles.unitPrice}>${product.price.toFixed(2)} {t.cart.each}</span>
      </div>

      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            className={styles.qtyBtn}
            onClick={() => updateQuantity(product._id, quantity - 1)}
            aria-label="Decrease quantity"
          >
            &minus;
          </button>
          <span className={styles.qtyValue}>{quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => updateQuantity(product._id, quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <span className={styles.lineTotal}>
          ${(product.price * quantity).toFixed(2)}
        </span>

        <button className={styles.removeBtn} onClick={handleRemove}>
          &#10005;
        </button>
      </div>
    </div>
  );
}
