import type { Metadata, Viewport } from "next";
import { Satisfy, Fredoka, Gochi_Hand, Montserrat } from "next/font/google";
import "./globals.css";

const satisfy = Satisfy({
  variable: "--font-satisfy",
  subsets: ["latin"],
  weight: "400",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const gochi = Gochi_Hand({
  variable: "--font-gochi",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Aquele em que a Yasmin faz 20 anos",
  description: "Convite do aniversário de 20 anos da Yasmin — confirme sua presença!",
  openGraph: {
    title: "Aquele em que a Yasmin faz 20 anos",
    description: "Confirme sua presença!",
    images: ["/images/yasmin-chapeu.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#8c64a8",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${satisfy.variable} ${fredoka.variable} ${gochi.variable} ${montserrat.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
