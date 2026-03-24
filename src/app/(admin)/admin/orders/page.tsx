"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import type { IOrder } from "@/types";
import styles from "./page.module.scss";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const { t } = useTranslation();

  const fetchOrders = useCallback(async () => {
    try {
      const res = await fetch("/api/orders");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const totalItems = (order: IOrder) =>
    order.products.reduce((s, p) => s + p.quantity, 0);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t.adminOrders.title}</h1>
        <span className={styles.count}>
          {t.adminOrders.orderCount(orders.length)}
        </span>
      </div>

      {loading ? (
        <div className={styles.loading}>{t.adminOrders.loadingOrders}</div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}>{t.adminOrders.noOrdersYet}</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.adminOrders.orderIdCol}</th>
                <th>{t.adminOrders.customerCol}</th>
                <th>{t.adminOrders.emailCol}</th>
                <th>{t.adminOrders.itemsCol}</th>
                <th>{t.adminOrders.totalCol}</th>
                <th>{t.adminOrders.statusCol}</th>
                <th>{t.adminOrders.dateCol}</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className={styles.clickable}
                  onClick={() => setSelectedOrder(order)}
                >
                  <td className={styles.mono}>{order._id.slice(-8)}</td>
                  <td>{order.customerName}</td>
                  <td className={styles.email}>{order.customerEmail}</td>
                  <td>{totalItems(order)}</td>
                  <td className={styles.priceCell}>
                    ${order.totalPrice.toFixed(2)}
                  </td>
                  <td>
                    <span
                      className={`${styles.statusBadge} ${
                        styles[order.paymentStatus]
                      }`}
                    >
                      {order.paymentStatus}
                    </span>
                  </td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={!!selectedOrder}
        onClose={() => setSelectedOrder(null)}
        title={`${t.adminOrders.orderPrefix}${selectedOrder?._id.slice(-8) || ""}`}
      >
        {selectedOrder && (
          <div className={styles.orderDetail}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t.adminOrders.customerLabel}</span>
              <span>{selectedOrder.customerName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t.adminOrders.emailLabel}</span>
              <span>{selectedOrder.customerEmail}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t.adminOrders.statusLabel}</span>
              <span
                className={`${styles.statusBadge} ${
                  styles[selectedOrder.paymentStatus]
                }`}
              >
                {selectedOrder.paymentStatus}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>{t.adminOrders.dateLabel}</span>
              <span>
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </span>
            </div>
            {selectedOrder.paypalOrderId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>{t.adminOrders.paypalIdLabel}</span>
                <span className={styles.mono}>
                  {selectedOrder.paypalOrderId}
                </span>
              </div>
            )}

            <div className={styles.itemsSection}>
              <h4>{t.adminOrders.itemsLabel}</h4>
              <div className={styles.itemsList}>
                {selectedOrder.products.map((item, i) => (
                  <div key={i} className={styles.orderItem}>
                    <div className={styles.itemInfo}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemQty}>x{item.quantity}</span>
                    </div>
                    <span className={styles.itemPrice}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className={styles.orderTotal}>
                <span>{t.cart.total}</span>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
