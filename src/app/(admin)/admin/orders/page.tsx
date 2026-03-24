"use client";

import { useState, useEffect, useCallback } from "react";
import { Modal } from "@/components/ui";
import type { IOrder } from "@/types";
import styles from "./page.module.scss";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

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
        <h1>Orders</h1>
        <span className={styles.count}>
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading orders...</div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}>No orders yet.</div>
      ) : (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Email</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
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
        title={`Order #${selectedOrder?._id.slice(-8) || ""}`}
      >
        {selectedOrder && (
          <div className={styles.orderDetail}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Customer</span>
              <span>{selectedOrder.customerName}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Email</span>
              <span>{selectedOrder.customerEmail}</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Status</span>
              <span
                className={`${styles.statusBadge} ${
                  styles[selectedOrder.paymentStatus]
                }`}
              >
                {selectedOrder.paymentStatus}
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Date</span>
              <span>
                {new Date(selectedOrder.createdAt).toLocaleString()}
              </span>
            </div>
            {selectedOrder.paypalOrderId && (
              <div className={styles.detailRow}>
                <span className={styles.detailLabel}>PayPal ID</span>
                <span className={styles.mono}>
                  {selectedOrder.paypalOrderId}
                </span>
              </div>
            )}

            <div className={styles.itemsSection}>
              <h4>Items</h4>
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
                <span>Total</span>
                <span>${selectedOrder.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
