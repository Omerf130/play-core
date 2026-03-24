import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";
import styles from "./layout.module.scss";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminLayout}>
      <AdminSidebar />
      <main className={styles.main}>{children}</main>
    </div>
  );
}
