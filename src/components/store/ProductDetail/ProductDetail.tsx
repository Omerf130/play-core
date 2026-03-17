"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/store/cart";
import type { IProduct } from "@/types";
import toast from "react-hot-toast";
import styles from "./ProductDetail.module.scss";

interface ProductDetailProps {
  product: IProduct;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const addItem = useCart((s) => s.addItem);

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className={styles.page}>
      <Link href="/products" className={styles.back}>
        &larr; Back to Products
      </Link>

      <div className={styles.layout}>
        <div className={styles.imageSection}>
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={styles.image}
              priority
            />
          ) : (
            <div className={styles.placeholder}>
              <span>&#127918;</span>
            </div>
          )}
        </div>

        <div className={styles.info}>
          <span className={styles.category}>{product.category}</span>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.price}>${product.price.toFixed(2)}</p>
          <p className={styles.description}>{product.description}</p>

          <button className={styles.addBtn} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
