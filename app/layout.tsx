import "./globals.css";
import { Metadata } from "next";
import Navbar from "./components/navbar";
import { TicketsProvider } from "./context/TicketsContext";

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
    <html lang="en" className="h-full hydrated" suppressHydrationWarning >
      <head>
        <script
          type="module"
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js"
        ></script>
        <script
          noModule
          src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js"
        ></script>
      </head>
      <body className="min-h-screen h-full w-full flex-col justify-start bg-gray-100 text-gray-900">
        <TicketsProvider>
          <div className="w-full bg-gray-100">
            <header className="flex justify-between pt-10 pb-2 px-8 bg-blue-500">
              <h2 className="text-4xl font-serif text-white">KAT</h2>
              <Navbar />
              <button className="py-0 pl-10 flex">
                <ion-icon
                  // name="log-out-outline" 
                  className="text-white text-3xl"></ion-icon>
              </button>
            </header>
          </div>
          <main className="flex-col w-full h-full">
            {children}
          </main>
        </TicketsProvider>
      </body>
    </html>
  );
}
