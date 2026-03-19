import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.scss";

const orbitron = Orbitron({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlayCore | Gaming Gear Store",
  description: "Premium gaming peripherals for competitive players",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${inter.variable}`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1a2e",
              color: "#e8e8f0",
              border: "1px solid rgba(0, 255, 255, 0.15)",
              borderRadius: "10px",
              boxShadow: "0 0 20px rgba(0, 255, 255, 0.08)",
            },
            success: {
              iconTheme: {
                primary: "#00ffff",
                secondary: "#0a0a0f",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
