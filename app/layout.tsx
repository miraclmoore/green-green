import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenGreen - Profitability Partner for Growers",
  description: "Data-driven insights for small-scale growers to maximize profitability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}

