import dbConnect from "@/lib/mongodb";
import Product from "@/models/Product";
import Order from "@/models/Order";
import { getLocaleFromCookies, getTranslations } from "@/lib/i18n";
import styles from "./page.module.scss";

export const dynamic = "force-dynamic";

async function getStats() {
  await dbConnect();

  const [productCount, orderCount, revenueResult, recentOrders] =
    await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        { $match: { paymentStatus: "completed" } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
      Order.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

  const revenue = revenueResult[0]?.total || 0;

  return {
    productCount,
    orderCount,
    revenue,
    recentOrders: JSON.parse(JSON.stringify(recentOrders)),
  };
}

export default async function AdminDashboard() {
  const { productCount, orderCount, revenue, recentOrders } = await getStats();
  const locale = await getLocaleFromCookies();
  const t = getTranslations(locale);

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>{t.admin.dashboard}</h1>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{productCount}</span>
          <span className={styles.statLabel}>{t.admin.statProducts}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statValue}>{orderCount}</span>
          <span className={styles.statLabel}>{t.admin.statOrders}</span>
        </div>
        <div className={`${styles.statCard} ${styles.revenue}`}>
          <span className={styles.statValue}>${revenue.toFixed(2)}</span>
          <span className={styles.statLabel}>{t.admin.statRevenue}</span>
        </div>
      </div>

      <section className={styles.recentSection}>
        <h2>{t.admin.recentOrders}</h2>
        {recentOrders.length === 0 ? (
          <p className={styles.empty}>{t.admin.noOrdersYet}</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t.admin.orderIdCol}</th>
                  <th>{t.admin.customerCol}</th>
                  <th>{t.admin.itemsCol}</th>
                  <th>{t.admin.totalCol}</th>
                  <th>{t.admin.statusCol}</th>
                  <th>{t.admin.dateCol}</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(
                  (order: {
                    _id: string;
                    customerName: string;
                    products: { quantity: number }[];
                    totalPrice: number;
                    paymentStatus: string;
                    createdAt: string;
                  }) => (
                    <tr key={order._id}>
                      <td className={styles.mono}>
                        {order._id.slice(-8)}
                      </td>
                      <td>{order.customerName}</td>
                      <td>
                        {order.products.reduce(
                          (s: number, p: { quantity: number }) => s + p.quantity,
                          0
                        )}
                      </td>
                      <td>${order.totalPrice.toFixed(2)}</td>
                      <td>
                        <span
                          className={`${styles.statusBadge} ${
                            styles[order.paymentStatus]
                          }`}
                        >
                          {order.paymentStatus}
                        </span>
                      </td>
                      <td>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
