import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductGrid from "@/components/store/ProductGrid/ProductGrid";
import ProductFilters from "@/components/store/ProductFilters/ProductFilters";
import type { IProduct, ProductCategory } from "@/types";
import styles from "./page.module.scss";

interface ProductsPageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

async function getProducts(
  category?: string,
  search?: string
): Promise<IProduct[]> {
  await dbConnect();

  const filter: Record<string, unknown> = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean();
  return JSON.parse(JSON.stringify(products));
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const search = params.search;
  const products = await getProducts(category, search);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>
          {category
            ? category.charAt(0).toUpperCase() + category.slice(1)
            : "All Products"}
        </h1>
        <p className={styles.count}>
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ProductFilters
        activeCategory={(category as ProductCategory) || undefined}
        searchQuery={search || ""}
      />

      <ProductGrid products={products} />
    </div>
  );
}
