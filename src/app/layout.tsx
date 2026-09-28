import type { Metadata } from "next";
import { Caveat, Baloo_2 } from "next/font/google";
import "./globals.css";

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const baloo = Baloo_2({
  variable: "--font-title",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Yasmin faz 20 anos!",
  description: "Confirme sua presença na festa de 20 anos da Yasmin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${caveat.variable} ${baloo.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
