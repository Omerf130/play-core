"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.scss";

const FAQ_ITEMS = [
  {
    q: "How long does shipping take?",
    a: "Standard shipping takes 3-5 business days within the US. Expedited shipping (1-2 business days) is available at checkout. International orders typically arrive within 7-14 business days depending on the destination.",
  },
  {
    q: "Do you offer free shipping?",
    a: "Yes! We offer free standard shipping on all orders over $50. Orders under $50 have a flat rate shipping fee of $4.99.",
  },
  {
    q: "What is your return policy?",
    a: "We accept returns within 30 days of delivery. Items must be in their original packaging and unused condition. Simply contact our support team to initiate a return and we'll provide a prepaid shipping label.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. All transactions are securely processed and encrypted.",
  },
  {
    q: "Do your products come with a warranty?",
    a: "All products sold on PlayCore come with the manufacturer's warranty. Most gaming peripherals include a 1-2 year warranty. Check the product description for specific warranty details.",
  },
  {
    q: "Can I track my order?",
    a: "Absolutely! Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on the carrier's website.",
  },
  {
    q: "Do you ship internationally?",
    a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location. Any customs duties or import taxes are the responsibility of the buyer.",
  },
  {
    q: "How do I contact customer support?",
    a: "You can reach our support team via email at support@playcore.gg or by phone at +1 (555) 123-4567. Our team is available Monday-Friday 9AM-6PM EST and weekends 10AM-4PM EST.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Frequently Asked Questions</h1>
        <p>Find answers to common questions about orders, shipping, and more.</p>
      </div>

      <div className={styles.list}>
        {FAQ_ITEMS.map((item, i) => (
          <div
            key={i}
            className={`${styles.item} ${openIndex === i ? styles.itemOpen : ""}`}
          >
            <button className={styles.question} onClick={() => toggle(i)}>
              <span>{item.q}</span>
              <svg
                className={styles.chevron}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div className={styles.answer}>
              <p>{item.a}</p>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.cta}>
        <p>Still have questions?</p>
        <Link href="/contact" className={styles.ctaLink}>
          Contact Us &rarr;
        </Link>
      </div>
    </div>
  );
}
