"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import type { Fragrance } from "../types/fragrance"
import { updateFragrance } from "../actions/fragranceActions"

export default function EditFragranceForm({ fragrance, onCancel }: { fragrance: Fragrance; onCancel: () => void }) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    ...fragrance,
    notes: {
      top: fragrance.notes.top.join(", "),
      middle: fragrance.notes.middle.join(", "),
      base: fragrance.notes.base.join(", "),
    },
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    if (name.startsWith("notes.")) {
      const notesKey = name.split(".")[1] as "top" | "middle" | "base"
      setFormData((prev) => ({
        ...prev,
        notes: {
          ...prev.notes,
          [notesKey]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const updatedFragrance = {
      ...formData,
      release_year: Number.parseInt(formData.release_year.toString()),
      notes: {
        top: formData.notes.top.split(",").map((note) => note.trim()),
        middle: formData.notes.middle.split(",").map((note) => note.trim()),
        base: formData.notes.base.split(",").map((note) => note.trim()),
      },
    }
    await updateFragrance(fragrance.name, updatedFragrance)
    onCancel()
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Edit Fragrance</h3>
      <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
      <Input name="brand" value={formData.brand} onChange={handleChange} placeholder="Brand" />
      <Input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
      <Input name="gender" value={formData.gender} onChange={handleChange} placeholder="Gender" />
      <Input
        name="release_year"
        value={formData.release_year}
        onChange={handleChange}
        placeholder="Release Year"
        type="number"
      />
      <div>
        <label>
          <input
            type="checkbox"
            name="owned"
            checked={formData.owned}
            onChange={(e) => setFormData((prev) => ({ ...prev, owned: e.target.checked }))}
          />{" "}
          Owned
        </label>
      </div>
      <Textarea
        name="notes.top"
        value={formData.notes.top}
        onChange={handleChange}
        placeholder="Top Notes (comma-separated)"
      />
      <Textarea
        name="notes.middle"
        value={formData.notes.middle}
        onChange={handleChange}
        placeholder="Middle Notes (comma-separated)"
      />
      <Textarea
        name="notes.base"
        value={formData.notes.base}
        onChange={handleChange}
        placeholder="Base Notes (comma-separated)"
      />
      <div className="space-x-2">
        <Button type="submit">Update Fragrance</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

