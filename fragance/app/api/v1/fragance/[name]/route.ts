import { NextResponse } from "next/server"
import type { Fragrance } from "../../../../types/fragrance"

const fragrances: Fragrance[] = []

export async function GET(request: Request, { params }: { params: { name: string } }) {
  const fragrance = fragrances.find((f) => f.name === params.name)
  if (fragrance) {
    return NextResponse.json(fragrance)
  } else {
    return new NextResponse(null, { status: 404 })
  }
}

export async function PUT(request: Request, { params }: { params: { name: string } }) {
  const updatedFragrance: Fragrance = await request.json()
  const index = fragrances.findIndex((f) => f.name === params.name)
  if (index !== -1) {
    fragrances[index] = updatedFragrance
    return new NextResponse(null, { status: 204 })
  } else {
    return new NextResponse(null, { status: 404 })
  }
}

export async function DELETE(request: Request, { params }: { params: { name: string } }) {
  const index = fragrances.findIndex((f) => f.name === params.name)
  if (index !== -1) {
    fragrances.splice(index, 1)
    return new NextResponse(null, { status: 204 })
  } else {
    return new NextResponse(null, { status: 404 })
  }
}

