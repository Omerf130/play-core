"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "@/components/ui";
import { useTranslation } from "@/contexts/LanguageContext";
import styles from "./page.module.scss";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error(t.contact.fillAllFields);
      return;
    }

    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    toast.success(t.contact.messageSent);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>{t.contact.title}</h1>
        <p>{t.contact.subtitle}</p>
      </div>

      <div className={styles.grid}>
        <form className={styles.card} onSubmit={handleSubmit}>
          <h2>{t.contact.sendMessage}</h2>
          <div className={styles.fields}>
            <Input
              label={t.contact.name}
              placeholder={t.contact.namePlaceholder}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label={t.contact.email}
              type="email"
              placeholder={t.contact.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className={styles.textareaWrap}>
              <label htmlFor="message" className={styles.label}>
                {t.contact.message}
              </label>
              <textarea
                id="message"
                className={styles.textarea}
                placeholder={t.contact.messagePlaceholder}
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" loading={sending} fullWidth>
            {t.contact.sendBtn}
          </Button>
        </form>

        <div className={styles.info}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3>{t.contact.emailTitle}</h3>
            <p>support@playcore.gg</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <h3>{t.contact.phoneTitle}</h3>
            <p>+1 (555) 123-4567</p>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <h3>{t.contact.hoursTitle}</h3>
            <p>{t.contact.hours1}</p>
            <p>{t.contact.hours2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
