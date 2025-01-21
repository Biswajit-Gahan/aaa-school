import { Inter } from "next/font/google";
import "./global-styles/globals.css";
import StoreProvider from "@/client/store/store-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | AAA School",
    default: "AAA School"
  },
  description: "Online exam portal",
};

export default function RootLayout({ children }) {
  return (
      <StoreProvider>
        <html lang="en">
        <body className={`${inter.variable}`}>
        {children}
        </body>
        </html>
      </StoreProvider>
  );
}
