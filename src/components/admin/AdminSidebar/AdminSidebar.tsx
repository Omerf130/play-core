"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./AdminSidebar.module.scss";

const navLinks = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/products", label: "Products", icon: "📦" },
  { href: "/admin/orders", label: "Orders", icon: "🧾" },
  { href: "/admin/content", label: "Content", icon: "✏️" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

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
            <span className={styles.badge}>Admin</span>
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
          <Link href="/" className={styles.storeLink} onClick={() => setMobileOpen(false)}>
            ← Back to Store
          </Link>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className={styles.overlay} onClick={() => setMobileOpen(false)} />
      )}
    </>
  );
}
