"use server"

import type { Fragrance } from "../types/fragrance"

const API_URL = process.env.API_URL || "http://localhost:8080/api/v1/fragance"

export async function getFragrances(): Promise<Fragrance[]> {
  const res = await fetch(API_URL, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch fragrances")
  }
  return res.json()
}

export async function getFragrance(name: string): Promise<Fragrance> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, { cache: "no-store" })
  if (!res.ok) {
    throw new Error("Failed to fetch fragrance")
  }
  return res.json()
}

export async function addFragrance(fragrance: Fragrance): Promise<void> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fragrance),
  })
  if (!res.ok) {
    throw new Error("Failed to add fragrance")
  }
}

export async function updateFragrance(name: string, fragrance: Fragrance): Promise<void> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(fragrance),
  })
  if (!res.ok) {
    throw new Error("Failed to update fragrance")
  }
}

export async function deleteFragrance(name: string): Promise<void> {
  const res = await fetch(`${API_URL}/${encodeURIComponent(name)}`, {
    method: "DELETE",
  })
  if (!res.ok) {
    throw new Error("Failed to delete fragrance")
  }
}
