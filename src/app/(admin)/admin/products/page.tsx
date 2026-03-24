"use client";

import { useState, useEffect, useCallback } from "react";
import { Button, Modal } from "@/components/ui";
import ProductForm from "@/components/admin/ProductForm/ProductForm";
import type { IProduct } from "@/types";
import styles from "./page.module.scss";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState<IProduct | undefined>();
  const [deleteTarget, setDeleteTarget] = useState<IProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
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
        <h1>Products</h1>
        <Button onClick={handleAdd}>+ Add Product</Button>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading products...</div>
      ) : products.length === 0 ? (
        <div className={styles.empty}>
          <p>No products yet.</p>
          <Button onClick={handleAdd}>Create your first product</Button>
        </div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
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
                      {product.category}
                    </span>
                  </td>
                  <td className={styles.priceCell}>
                    ${product.price.toFixed(2)}
                  </td>
                  <td>
                    <div className={styles.actions}>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(product)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => setDeleteTarget(product)}
                      >
                        Delete
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
        title={editProduct ? "Edit Product" : "Add Product"}
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
        title="Delete Product"
      >
        <div className={styles.deleteConfirm}>
          <p>
            Are you sure you want to delete{" "}
            <strong>{deleteTarget?.name}</strong>?
          </p>
          <p className={styles.deleteWarn}>This action cannot be undone.</p>
          <div className={styles.deleteActions}>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="danger" loading={deleting} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
