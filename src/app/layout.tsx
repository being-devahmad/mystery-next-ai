import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import AppBar from "@/app/appbar";
import Provider from "@/app/providers";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Mystery Message AI",
    description: "Mystery message AI integrated website created by NEXT JS",
};

export default function RootLayout({children,}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <Provider>
            <AppBar/>
            {children}
        </Provider>
        </body>
        </html>
    );
}
