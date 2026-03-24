"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./ProductCard.module.scss";
import { IProduct } from "@/types";
import { useCart } from "@/store/cart";
import { useTranslation } from "@/contexts/LanguageContext";
import toast from "react-hot-toast";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCart((s) => s.addItem);
  const { t } = useTranslation();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(t.productDetail.addedToCart(product.name));
  };

  const categoryLabel = t.common.categories[product.category] || product.category;

  return (
    <Link href={`/products/${product._id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>
            <span>&#127918;</span>
          </div>
        )}
        <span className={styles.category}>{categoryLabel}</span>
      </div>

      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.bottom}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button className={styles.addBtn} onClick={handleAddToCart}>
            {t.productDetail.addToCart}
          </button>
        </div>
      </div>
    </Link>
  );
}
