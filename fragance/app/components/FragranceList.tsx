import { getFragrances } from "../actions/fragranceActions"
import FragranceItem from "./FragranceItem"

export default async function FragranceList() {
  const fragrances = await getFragrances()

  return (
    <div className="space-y-4">
      {fragrances.map((fragrance) => (
        <FragranceItem key={fragrance.name} fragrance={fragrance} />
      ))}
    </div>
  )
}

