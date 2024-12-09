import "./globals.css";
import { Metadata } from "next";
import Navbar from "./components/navbar";
import { TicketsProvider } from "./context/TicketsContext";
import { UserProvider } from "./context/UserContext";
import Script from "next/script";
import LogoutButton from "./components/LogoutButton";

export const metadata: Metadata = {
  title: "KAT",
  description: "Kutaisi Airport bus ticket app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <Script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        />
        <Script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        />
      </head>
      <body className="min-h-screen h-full w-full flex-col justify-start bg-gray-100 text-gray-900">
        <UserProvider>
          <TicketsProvider>
            <div className="w-full bg-gray-100">
              <header className="flex justify-between pt-10 pb-2 px-8 bg-blue-500">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Kutaisi_International_Airport_logo.svg/640px-Kutaisi_International_Airport_logo.svg.png"
                  alt="logo"
                  className="h-20 pb-6"
                />
                <Navbar />
                <LogoutButton />
              </header>
            </div>
            <main className="flex-col w-full h-full">{children}</main>
          </TicketsProvider>
        </UserProvider>
      </body>
    </html>
  );
}
