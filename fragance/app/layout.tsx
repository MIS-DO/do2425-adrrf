import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { AppSidebar } from "./components/AppSidebar"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Fragrance Manager",
  description: "Manage your fragrance collection",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <main className="p-4">{children}</main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  )
}

