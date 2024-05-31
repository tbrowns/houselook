import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Find Your Dream Home | Real Estate Listings and Rentals",
  description:
    "Explore the best real estate listings, rentals, and properties for sale. Discover your next home with our comprehensive real estate app.",
  keywords:
    "real estate, property listings, homes for sale, apartments for rent, real estate app, buy a house, rental properties",
  author: "HouseLook",
  viewport: "width=device-width, initial-scale=1.0",
  charset: "UTF-8",
  robots: "index, follow",
  canonical: "https://www.houselook.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
