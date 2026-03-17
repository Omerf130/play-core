import Navbar from "@/components/store/Navbar/Navbar";
import Footer from "@/components/store/Footer/Footer";
import styles from "./layout.module.scss";

export default function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.storeLayout}>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}
