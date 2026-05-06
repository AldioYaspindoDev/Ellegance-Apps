import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { BucketProvider } from "./context/bucketContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Ellegance - Premium Footwear",
  description: "Experience unparalleled comfort and style.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <Script
          src="https://app.sandbox.midtrans.com/snap/snap.js"
          data-client-key="Mid-client-yEXmEdX_nE2j_cFU"
          strategy="beforeInteractive"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <BucketProvider>
          {children}
        </BucketProvider>
      </body>
    </html>
  );
}

