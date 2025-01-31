import { ThemeProvider } from "@/components/contexts/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Geist_Mono, Inter, JetBrains_Mono } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const geist = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ui.sepavl.com",
  metadataBase: new URL("https://ui.sepavl.com"),
  description: "Multi-step form, shared form and components for react",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          `font-regular antialiased tracking-wide`,
          inter.variable,
          geist.variable,
          jetbrainsMono.variable
        )}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider delayDuration={0}>
            <Analytics />
            <main className='h-auto scroll-smooth'>
              {children}
              <div className='fixed bottom-0 left-0 z-50 flex items-center justify-center w-full h-0 font-medium leaving text-foreground bg-background' />
            </main>
          </TooltipProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
