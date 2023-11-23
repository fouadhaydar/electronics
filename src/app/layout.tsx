import type { Metadata } from "next";
import Nav from "@/components/navBar/Nav";
import "../globals.css";
import Footer from "@/components/footer/Footer";
import RootProvider from "@/redux/Provider";
import Main from "./Main";

export const metadata: Metadata = {
  title: "Electronics",
  description: "Discover our new product each day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>
          <RootProvider>
            {children}
            <Main />
          </RootProvider>
        </main>
        <Footer />
      </body>
    </html>
  );
}
