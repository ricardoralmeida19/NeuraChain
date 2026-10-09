import type { Metadata } from "next";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/500.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow-semi-condensed/500.css";
import "@fontsource/barlow-semi-condensed/600.css";
import "@fontsource/barlow-semi-condensed/700.css";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://neurachainsolutions.com"),
  title: "NeuraChain Solutions | Operations consulting for small manufacturers",
  description:
    "Sourcing, LEAN, value engineering and smart factory work for California manufacturers with 10 to 500 employees. Led by a former Tesla supply chain manager. Oakland, CA.",
  openGraph: {
    title: "NeuraChain Solutions",
    description:
      "Lower costs and steadier output on the factory floor you already have. Book a free assessment.",
    url: "https://neurachainsolutions.com",
    siteName: "NeuraChain Solutions",
    type: "website",
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
      </body>
    </html>
  );
}
