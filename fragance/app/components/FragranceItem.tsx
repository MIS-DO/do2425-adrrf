"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Fragrance } from "../types/fragrance"
import { Button } from "@/components/ui/button"
import { deleteFragrance } from "../actions/fragranceActions"
import EditFragranceForm from "./EditFragranceForm"

export default function FragranceItem({ fragrance }: { fragrance: Fragrance }) {
  const [isEditing, setIsEditing] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this fragrance?")) {
      await deleteFragrance(fragrance.name)
      router.refresh()
    }
  }

  return (
    <div className="border p-4 rounded-md">
      {isEditing ? (
        <EditFragranceForm fragrance={fragrance} onCancel={() => setIsEditing(false)} />
      ) : (
        <>
          <h3 className="text-xl font-semibold">{fragrance.name}</h3>
          <p>Brand: {fragrance.brand}</p>
          <p>Type: {fragrance.type}</p>
          <p>Gender: {fragrance.gender}</p>
          <p>Release Year: {fragrance.release_year}</p>
          <p>Owned: {fragrance.owned ? "Yes" : "No"}</p>
          <div className="mt-2">
            <h4 className="font-semibold">Notes:</h4>
            <p>Top: {fragrance.notes.top.join(", ")}</p>
            <p>Middle: {fragrance.notes.middle.join(", ")}</p>
            <p>Base: {fragrance.notes.base.join(", ")}</p>
          </div>
          <div className="mt-4 space-x-2">
            <Button onClick={() => setIsEditing(true)}>Edit</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

