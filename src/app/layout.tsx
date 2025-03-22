import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/theme-provider";
import NextTopLoader from 'nextjs-toploader';
import {Toaster} from "@/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "DCC Programming Club",
    description: "Welcome to the official website of the DCC Programming Club. Explore events, resources, and achievements, and join a thriving community of programming enthusiasts.",
    applicationName: "DCC Programming Club",
    keywords: ["dhaka", "city", "college", "programming", "club", "dccpc"],
    authors: [
        {name: "DCC Programming Club", url: "https://www.facebook.com/dccProgrammingClub"},
        {name: "Monowar Hossain Khan", url: "https://linkedin.com/in/lzytourist"}
    ],
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode; }>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={`${inter.className} antialiased`}
        >
        <NextTopLoader showSpinner={false} color={'#14345D'}/>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
        >
            {children}
            <Toaster/>
        </ThemeProvider>
        </body>
        </html>
    );
}
