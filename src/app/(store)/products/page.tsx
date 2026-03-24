import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import ProductGrid from "@/components/store/ProductGrid/ProductGrid";
import ProductFilters from "@/components/store/ProductFilters/ProductFilters";
import type { IProduct, ProductCategory } from "@/types";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
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
  const locale = await getLocaleFromCookies();
  const t = getTranslations(locale);

  const categoryLabel = category
    ? (t.common.categories[category] || category.charAt(0).toUpperCase() + category.slice(1))
    : t.products.allProducts;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{categoryLabel}</h1>
        <p className={styles.count}>
          {t.products.productCount(products.length)}
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
