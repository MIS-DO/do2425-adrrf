import { NextRequest, NextResponse } from 'next/server'
import type { Fragrance } from "../../../../types/fragrance"

const fragrances: Fragrance[] = []

export async function GET(req: NextRequest) {
  const name = req.nextUrl.pathname.split('/').pop() || '';
  const fragrance = fragrances.find((f) => f.name === name)
  if (fragrance) {
    return NextResponse.json(fragrance)
  } else {
    return new NextResponse(null, { status: 404 })
  }
}

export async function PUT(req: NextRequest) {
  const name = req.nextUrl.pathname.split('/').pop() || '';
  const updatedFragrance: Fragrance = await req.json()
  const index = fragrances.findIndex((f) => f.name === name)
  if (index !== -1) {
    fragrances[index] = updatedFragrance
    return new NextResponse(null, { status: 204 })
  } else {
    return new NextResponse(null, { status: 404 })
  }
}

export async function DELETE(req: NextRequest) {
  const name = req.nextUrl.pathname.split('/').pop() || '';
  const index = fragrances.findIndex((f) => f.name === name)
  if (index !== -1) {
    fragrances.splice(index, 1)
    return new NextResponse(null, { status: 204 })
  } else {
    return new NextResponse(null, { status: 404 })
  }
}
