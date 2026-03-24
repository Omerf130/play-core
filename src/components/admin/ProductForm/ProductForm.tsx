"use client";

import { useState, useRef } from "react";
import { Button, Input } from "@/components/ui";
import { PRODUCT_CATEGORIES } from "@/types";
import type { IProduct, ProductCategory } from "@/types";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./ProductForm.module.scss";

interface ProductFormProps {
  product?: IProduct;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({
  product,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price?.toString() || "");
  const [category, setCategory] = useState<ProductCategory>(
    product?.category || "keyboards"
  );
  const [image, setImage] = useState(product?.image || "");
  const [imagePreview, setImagePreview] = useState(product?.image || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError(t.productForm.imageTooLarge);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      setImage(base64);
      setImagePreview(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim() || !price) {
      setError(t.productForm.fillRequired);
      return;
    }

    const priceNum = parseFloat(price);
    if (isNaN(priceNum) || priceNum < 0) {
      setError(t.productForm.invalidPrice);
      return;
    }

    setLoading(true);

    try {
      const url = product
        ? `/api/products/${product._id}`
        : "/api/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          description: description.trim(),
          price: priceNum,
          category,
          image,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || t.productForm.failedToSave);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : t.productForm.somethingWrong);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <div className={styles.error}>{error}</div>}

      <Input
        label={t.productForm.productName}
        placeholder={t.productForm.productNamePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <div className={styles.field}>
        <label className={styles.label}>{t.productForm.description}</label>
        <textarea
          className={styles.textarea}
          placeholder={t.productForm.descriptionPlaceholder}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          required
        />
      </div>

      <div className={styles.row}>
        <Input
          label={t.productForm.price}
          type="number"
          placeholder={t.productForm.pricePlaceholder}
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />

        <div className={styles.field}>
          <label className={styles.label}>{t.productForm.category}</label>
          <select
            className={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value as ProductCategory)}
          >
            {PRODUCT_CATEGORIES.map(({ value }) => (
              <option key={value} value={value}>
                {t.common.categories[value] || value}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>{t.productForm.image}</label>
        <div className={styles.imageUpload}>
          {imagePreview && (
            <div className={styles.preview}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imagePreview} alt="Preview" />
              <button
                type="button"
                className={styles.removeImg}
                onClick={() => {
                  setImage("");
                  setImagePreview("");
                  if (fileRef.current) fileRef.current.value = "";
                }}
              >
                ✕
              </button>
            </div>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
          />
          <p className={styles.hint}>{t.productForm.imageHint}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t.common.cancel}
        </Button>
        <Button type="submit" loading={loading}>
          {product ? t.productForm.updateProduct : t.productForm.createProduct}
        </Button>
      </div>
    </form>
  );
}
