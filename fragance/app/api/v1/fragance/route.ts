import { NextResponse } from "next/server"
import type { Fragrance } from "../../../types/fragrance"

const fragrances: Fragrance[] = []

export async function GET() {
  return NextResponse.json(fragrances)
}

export async function POST(request: Request) {
  const fragrance: Fragrance = await request.json()
  fragrances.push(fragrance)
  return new NextResponse(null, { status: 201 })
}

