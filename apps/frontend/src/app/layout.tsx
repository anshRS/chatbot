import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/common/theme-provider";
import { ReduxProvider } from "@/redux/provider";

// const inter = Inter({ subsets: ["latin"] });

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
      {/* <body className={inter.className}>{children}</body> */}
      <body>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
