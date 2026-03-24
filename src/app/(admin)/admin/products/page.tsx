"use client";

import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";
import { Button, Modal } from "@/components/ui";
import ProductForm from "@/components/admin/ProductForm/ProductForm";
import { useTranslation } from "@/contexts/LanguageContext";
import type { IProduct } from "@/types";
import styles from "./page.module.scss";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const { t } = useTranslation();

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAdd = () => {
    setEditProduct(undefined);
    setShowForm(true);
  };

  const handleEdit = (product: IProduct) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditProduct(undefined);
    fetchProducts();
  };

  const handleTogglePromoted = async (product: IProduct) => {
    setTogglingId(product._id);
    try {
      const res = await fetch(`/api/products/${product._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPromoted: !product.isPromoted }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update");
      }
      await fetchProducts();
      toast.success(product.isPromoted ? t.adminProducts.removedFromFeatured : t.adminProducts.addedToFeatured);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.adminProducts.failedToToggle);
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      await fetch(`/api/products/${deleteTarget._id}`, { method: "DELETE" });
      setDeleteTarget(null);
      fetchProducts();
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t.adminProducts.title}</h1>
        <Button onClick={handleAdd}>{t.adminProducts.addProduct}</Button>
      </div>

      {loading ? (
        <div className={styles.loading}>{t.adminProducts.loadingProducts}</div>
      ) : products.length === 0 ? (
        <div className={styles.empty}>
          <p>{t.adminProducts.noProductsYet}</p>
          <Button onClick={handleAdd}>{t.adminProducts.createFirst}</Button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.adminProducts.imageCol}</th>
                <th>{t.adminProducts.nameCol}</th>
                <th>{t.adminProducts.categoryCol}</th>
                <th>{t.adminProducts.priceCol}</th>
                <th>{t.adminProducts.featuredCol}</th>
                <th>{t.adminProducts.actionsCol}</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <div className={styles.thumb}>
                      {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={product.image} alt={product.name} />
                      ) : (
                        <span className={styles.noImg}>📷</span>
                      )}
                    </div>
                  </td>
                  <td className={styles.nameCell}>{product.name}</td>
                  <td>
                    <span className={styles.categoryBadge}>
                      {t.common.categories[product.category] || product.category}
                    </span>
                  </td>
                  <td className={styles.priceCell}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td>
                    <button
                      className={`${styles.toggle} ${product.isPromoted ? styles.toggleOn : ""}`}
                      onClick={() => handleTogglePromoted(product)}
                      disabled={togglingId === product._id}
                      title={product.isPromoted ? t.adminProducts.removeFromFeatured : t.adminProducts.addToFeatured}
                    >
                      <span className={styles.toggleKnob} />
                    </button>
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        {t.common.edit}
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteTarget(product)}
                      >
                        {t.common.delete}
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={showForm}
        onClose={() => {
          setShowForm(false);
          setEditProduct(undefined);
        }}
        title={editProduct ? t.adminProducts.editProduct : t.adminProducts.addProductTitle}
      >
        <ProductForm
          product={editProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => {
            setShowForm(false);
            setEditProduct(undefined);
          }}
        />
      </Modal>

      <Modal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title={t.adminProducts.deleteProduct}
      >
        <div className={styles.deleteConfirm}>
          <p>
            {t.adminProducts.deleteConfirm}{" "}
            <strong>{deleteTarget?.name}</strong>?
          </p>
          <p className={styles.deleteWarn}>{t.adminProducts.deleteWarn}</p>
          <div className={styles.deleteActions}>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              {t.common.cancel}
            </Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>
              {t.common.delete}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
