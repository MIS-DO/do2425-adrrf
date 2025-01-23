import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-6">Welcome to Fragrance Manager</h1>
      <p className="text-xl mb-8 text-center max-w-2xl">
        Manage your fragrance collection with ease. Add, edit, and explore your favorite scents all in one place.
      </p>
      <div className="space-x-4">
        <Button asChild>
          <Link href="/fragrances">View Fragrances</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/add-fragrance">Add New Fragrance</Link>
        </Button>
      </div>
    </div>
  )
}

