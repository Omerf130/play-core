"use client";

import ProductCard from "@/components/store/ProductCard/ProductCard";
import type { IProduct } from "@/types";
import styles from "./ProductGrid.module.scss";

interface ProductGridProps {
  products: IProduct[];
}

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className={styles.empty}>
        <span className={styles.emptyIcon}>&#128270;</span>
        <p>No products found</p>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
