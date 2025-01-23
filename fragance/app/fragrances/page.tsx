import { Suspense } from "react"
import FragranceList from "../components/FragranceList"

export default function Fragrances() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Fragrance Collection</h1>
      <Suspense fallback={<div>Loading fragrances...</div>}>
        <FragranceList />
      </Suspense>
    </div>
  )
}

