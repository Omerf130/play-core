"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { PRODUCT_CATEGORIES, ProductCategory } from "@/types";
import styles from "./ProductFilters.module.scss";

interface ProductFiltersProps {
  activeCategory?: ProductCategory;
  searchQuery: string;
}

export default function ProductFilters({
  activeCategory,
  searchQuery,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchQuery);

  const updateFilters = useCallback(
    (category?: string, query?: string) => {
      const params = new URLSearchParams(searchParams.toString());

      if (category) {
        params.set("category", category);
      } else {
        params.delete("category");
      }

      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }

      router.push(`/products?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters(activeCategory, search);
  };

  const handleCategoryClick = (category?: ProductCategory) => {
    updateFilters(category, search || undefined);
  };

  return (
    <div className={styles.filters}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <button type="submit" className={styles.searchBtn}>
          Search
        </button>
      </form>

      <div className={styles.categories}>
        <button
          className={`${styles.categoryBtn} ${!activeCategory ? styles.active : ""}`}
          onClick={() => handleCategoryClick(undefined)}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map(({ value, label }) => (
          <button
            key={value}
            className={`${styles.categoryBtn} ${activeCategory === value ? styles.active : ""}`}
            onClick={() => handleCategoryClick(value)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
