"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./page.module.scss";

interface ImageEditorProps {
  contentKey: string;
  label: string;
  description: string;
  previewLabel: string;
  placeholderText: string;
}

function ImageEditor({ contentKey, label, description, previewLabel, placeholderText }: ImageEditorProps) {
  const [image, setImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const fetchImage = useCallback(async () => {
    try {
      const res = await fetch(`/api/content?key=${contentKey}`, { cache: "no-store" });
      const data = await res.json();
      if (data.value) {
        setImage(data.value);
      }
    } catch (err) {
      console.error(`Failed to fetch ${contentKey}:`, err);
    } finally {
      setLoading(false);
    }
  }, [contentKey]);

  useEffect(() => {
    fetchImage();
  }, [fetchImage]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error(t.adminContent.selectImageFile);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error(t.adminContent.imageUnder5MB);
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const imageData = preview || image;
    if (!imageData) {
      toast.error(t.adminContent.noImageSelected);
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: contentKey, value: imageData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      setImage(imageData);
      setPreview(null);
      toast.success(`${label} ${t.adminContent.saved}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.common.error);
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const res = await fetch(`/api/content/${contentKey}`, { method: "DELETE" });

      if (!res.ok && res.status !== 404) {
        const err = await res.json();
        throw new Error(err.error || "Failed to remove");
      }

      setImage(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success(`${label} ${t.adminContent.removed}`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : t.common.error);
    } finally {
      setRemoving(false);
    }
  };

  const handleCancelPreview = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const displayImage = preview || image;
  const inputId = `upload-${contentKey}`;

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2>{label}</h2>
        <p className={styles.sectionDesc}>{description}</p>
      </div>

      {loading ? (
        <div className={styles.loading}>{t.common.loading}</div>
      ) : (
        <div className={styles.heroEditor}>
          <div className={styles.previewArea}>
            {displayImage ? (
              <div className={styles.imagePreview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={displayImage} alt={`${label} preview`} />
                <div className={styles.previewOverlay}>
                  <span>{previewLabel}</span>
                </div>
              </div>
            ) : (
              <div className={styles.placeholder}>
                <span className={styles.placeholderIcon}>🖼️</span>
                <p>{t.adminContent.noImageSet}</p>
                <p className={styles.placeholderHint}>{placeholderText}</p>
              </div>
            )}
          </div>

          <div className={styles.controls}>
            <div className={styles.fileInput}>
              <label htmlFor={inputId} className={styles.fileLabel}>
                {displayImage ? t.adminContent.changeImage : t.adminContent.uploadImage}
              </label>
              <input
                ref={fileRef}
                id={inputId}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className={styles.hiddenInput}
              />
            </div>

            <div className={styles.actions}>
              {preview && (
                <>
                  <Button onClick={handleSave} loading={saving}>
                    {t.common.save}
                  </Button>
                  <Button variant="secondary" onClick={handleCancelPreview}>
                    {t.common.cancel}
                  </Button>
                </>
              )}
              {image && !preview && (
                <Button variant="danger" onClick={handleRemove} loading={removing}>
                  {t.adminContent.removeImage}
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default function AdminContentPage() {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.adminContent.title}</h1>

      <ImageEditor
        contentKey="hero_image"
        label={t.adminContent.heroLabel}
        description={t.adminContent.heroDesc}
        previewLabel={t.adminContent.heroPreview}
        placeholderText={t.adminContent.heroPlaceholder}
      />

      <ImageEditor
        contentKey="bottom_hero_image"
        label={t.adminContent.bottomHeroLabel}
        description={t.adminContent.bottomHeroDesc}
        previewLabel={t.adminContent.bottomHeroPreview}
        placeholderText={t.adminContent.bottomHeroPlaceholder}
      />
    </div>
  );
}
