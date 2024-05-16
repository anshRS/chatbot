import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ReduxProvider } from "@/redux/provider";
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ 
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "ChatDroid | Craft Your Conversations",
  description: "Experience the future of chatbots with our Next.js 14 powered platform, featuring sleek shadcn styling, backed by Django and Langchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      {/* <body className={inter.className}> */}
      <body className={GeistSans.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToastContainer/>
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
