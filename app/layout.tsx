import "./globals.css";
import { Inter, Lexend_Deca, Outfit, Capriola } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "UniSol",
  description:
    "UniSmart is a comprehensive online platform offering a wide array of educational resources, including notes, exam papers, and project guidance, all available to users at no cost.",
};

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: "400",
});
const capriola = Capriola({
  subsets: ["latin"],
  variable: "--font-capriola",
  weight: "400",
});
const lexend_deca = Lexend_Deca({
  subsets: ["latin"],
  variable: "--font-lexend_deca",
  weight: "700",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#00000b" />
        <link rel="apple-touch-icon" href="/icon-192-maskable.png" />
        <meta name="apple-mobile-web-app-status-bar" content="#00000b" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2495784574263932"
        ></script>
      </head>
      <body
        className={`
        ${outfit.variable} 
        ${inter.className} 
        ${lexend_deca.variable}
        ${capriola.variable}
        `}
      >
        {children}
      </body>
    </html>
  );
}
