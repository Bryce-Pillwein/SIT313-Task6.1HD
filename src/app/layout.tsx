// Root Layout tsx

import type { Metadata } from "next";
import { Inter, DM_Serif_Display, Nunito_Sans } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";

const inter = Inter({ subsets: ["latin"] });
const dm_serif_display = DM_Serif_Display({ weight: ['400'], subsets: ["latin"], variable: '--font-display' });
const nunito = Nunito_Sans({ subsets: ["latin"], variable: '--font-nunito' });

export const metadata: Metadata = {
  title: "Dev@Deakin",
  description: "Developers @ Deakin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${dm_serif_display.variable} ${nunito.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
