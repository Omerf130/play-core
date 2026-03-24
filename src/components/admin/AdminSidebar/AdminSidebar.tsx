"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./AdminSidebar.module.scss";

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, locale, setLocale } = useTranslation();

  const navLinks = [
    { href: "/admin", label: t.admin.dashboard, icon: "📊" },
    { href: "/admin/products", label: t.admin.products, icon: "📦" },
    { href: "/admin/orders", label: t.admin.orders, icon: "🧾" },
    { href: "/admin/content", label: t.admin.content, icon: "✏️" },
  ];

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      <button
        className={styles.mobileToggle}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        <span className={`${styles.bar} ${mobileOpen ? styles.barOpen : ""}`} />
      </button>

      <aside className={`${styles.sidebar} ${mobileOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.brand}>
          <Link href="/admin" className={styles.logo}>
            <span className={styles.logoText}>PlayCore</span>
            <span className={styles.badge}>{t.adminLogin.admin}</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          {navLinks.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className={`${styles.navLink} ${isActive(href) ? styles.active : ""}`}
              onClick={() => setMobileOpen(false)}
            >
              <span className={styles.icon}>{icon}</span>
              {label}
            </Link>
          ))}
        </nav>

        <div className={styles.bottom}>
          <button
            className={styles.langToggle}
            onClick={() => setLocale(locale === "he" ? "en" : "he")}
          >
            {locale === "he" ? "EN" : "HE"} — {locale === "he" ? "English" : "עברית"}
          </button>
          <Link href="/" className={styles.storeLink} onClick={() => setMobileOpen(false)}>
            {locale === "he" ? "→" : "←"} {t.admin.backToStore}
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            {t.admin.logout}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
