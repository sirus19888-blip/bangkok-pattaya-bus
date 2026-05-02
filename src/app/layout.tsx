import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bangkok Pattaya Bus Guide",
  description:
    "Mobile bus schedules, station tips, and travel guidance between Bangkok and Pattaya.",
  applicationName: "Bangkok Pattaya Bus Guide",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "BP Bus Guide",
    statusBarStyle: "default",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
