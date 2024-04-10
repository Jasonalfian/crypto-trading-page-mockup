import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Trade Mockup",
  description: "A mockup trading page using binance api",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <body className={inter.className}>{children}</body>
          </ThemeProvider>
        </AppRouterCacheProvider>
    </html>
  );
}
