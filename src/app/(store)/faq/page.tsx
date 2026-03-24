"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./page.module.scss";

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t, dir } = useTranslation();

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t.faq.title}</h1>
        <p>{t.faq.subtitle}</p>
      </div>

      <div className={styles.list}>
        {t.faq.items.map((item, i) => (
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
        <p>{t.faq.stillHaveQuestions}</p>
        <Link href="/contact" className={styles.ctaLink}>
          {t.faq.contactUs} {dir === "rtl" ? "\u2190" : "\u2192"}
        </Link>
      </div>
    </div>
  );
}
