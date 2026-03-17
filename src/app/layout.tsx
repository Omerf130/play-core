import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.scss";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1a1a2e",
              color: "#e8e8f0",
              border: "1px solid #2a2a3e",
              borderRadius: "10px",
            },
            success: {
              iconTheme: {
                primary: "#00f0ff",
                secondary: "#0a0a0f",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
