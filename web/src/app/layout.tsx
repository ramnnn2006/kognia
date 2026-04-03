import type { Metadata } from "next";
import { Inter, Newsreader, Manrope } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({ 
  subsets: ["latin"], 
  style: ["normal", "italic"],
  weight: ["200", "400", "800"],
  variable: "--font-newsreader" 
});

const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["200", "400", "800"],
  variable: "--font-manrope" 
});

export const metadata: Metadata = {
  title: "Cognia — Welfare Intelligence",
  description: "Institutional Behavioral Heatmap & Student Mental Health Infrastructure",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${newsreader.variable} ${manrope.variable} font-body bg-background text-on-surface antialiased bg-background`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
