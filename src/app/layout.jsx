import { Inter } from "next/font/google";
import "./global-styles/globals.css";
import UserContextProvider from "@/client/context/user-context";

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

        <UserContextProvider>
            <html lang="en">
            <body className={`${inter.variable}`}>
            {children}
            </body>
            </html>
        </UserContextProvider>

  );
}
