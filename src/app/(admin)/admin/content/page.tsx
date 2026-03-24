"use client";

import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui";
import styles from "./page.module.scss";

export default function AdminContentPage() {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [removing, setRemoving] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchHeroImage();
  }, []);

  const fetchHeroImage = async () => {
    try {
      const res = await fetch("/api/content?key=hero_image", { cache: "no-store" });
      const data = await res.json();
      if (data.value) {
        setHeroImage(data.value);
      }
    } catch (err) {
      console.error("Failed to fetch hero image:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    const imageData = preview || heroImage;
    if (!imageData) {
      toast.error("No image selected");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "hero_image", value: imageData }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save");
      }

      setHeroImage(imageData);
      setPreview(null);
      toast.success("Hero image saved");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to save hero image");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async () => {
    setRemoving(true);
    try {
      const res = await fetch("/api/content/hero_image", { method: "DELETE" });

      if (!res.ok && res.status !== 404) {
        const err = await res.json();
        throw new Error(err.error || "Failed to remove");
      }

      setHeroImage(null);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Hero image removed");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to remove hero image");
    } finally {
      setRemoving(false);
    }
  };

  const handleCancelPreview = () => {
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const displayImage = preview || heroImage;

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Content Management</h1>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Hero Image</h2>
          <p className={styles.sectionDesc}>
            This image appears as the background of the homepage hero section.
          </p>
        </div>

        {loading ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <div className={styles.heroEditor}>
            <div className={styles.previewArea}>
              {displayImage ? (
                <div className={styles.imagePreview}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={displayImage} alt="Hero preview" />
                  <div className={styles.previewOverlay}>
                    <span>Hero Background Preview</span>
                  </div>
                </div>
              ) : (
                <div className={styles.placeholder}>
                  <span className={styles.placeholderIcon}>🖼️</span>
                  <p>No hero image set</p>
                  <p className={styles.placeholderHint}>
                    Upload an image to use as the homepage hero background
                  </p>
                </div>
              )}
            </div>

            <div className={styles.controls}>
              <div className={styles.fileInput}>
                <label htmlFor="hero-upload" className={styles.fileLabel}>
                  {displayImage ? "Change Image" : "Upload Image"}
                </label>
                <input
                  ref={fileRef}
                  id="hero-upload"
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
                      Save
                    </Button>
                    <Button variant="secondary" onClick={handleCancelPreview}>
                      Cancel
                    </Button>
                  </>
                )}
                {heroImage && !preview && (
                  <Button variant="danger" onClick={handleRemove} loading={removing}>
                    Remove Image
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
