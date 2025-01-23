export interface Fragrance {
  name: string
  brand: string
  type: string
  notes: {
    top: string[]
    middle: string[]
    base: string[]
  }
  gender: string
  release_year: number
  owned: boolean
}

