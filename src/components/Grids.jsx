import { useEffect, useState } from 'react'
import ListingCard from './ListingCard'
import { api } from '../lib/api'

export default function Grids({ coords }) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const data = await api.get('/listings', coords ? { lat: coords.lat, lng: coords.lng } : undefined)
        setItems(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [coords])

  if (loading) return <div className="max-w-6xl mx-auto px-4 py-12 text-gray-600">Loading nearby listings...</div>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
      {items.length ? items.map((it) => <ListingCard key={it.id} item={it} />) : (
        <p className="text-gray-600">No listings found. Try adjusting your filters.</p>
      )}
    </div>
  )
}
