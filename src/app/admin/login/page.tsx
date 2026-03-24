"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import styles from "./page.module.scss";

export default function AdminLoginPage() {
  const router = useRouter();
  const passwordRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    passwordRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Login failed");
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <div className={styles.header}>
          <span className={styles.logo}>PlayCore</span>
          <span className={styles.badge}>Admin</span>
        </div>
        <p className={styles.subtitle}>Enter your admin password to continue</p>

        <Input
          ref={passwordRef}
          type="password"
          label="Password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />

        <Button type="submit" fullWidth loading={loading} size="lg">
          Sign In
        </Button>
      </form>
    </div>
  );
}
