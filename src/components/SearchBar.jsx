import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')
  const [priceMin, setPriceMin] = useState('')
  const [priceMax, setPriceMax] = useState('')

  const submit = (e) => {
    e.preventDefault()
    onSearch({ q, price_min: priceMin || undefined, price_max: priceMax || undefined })
  }

  return (
    <form onSubmit={submit} className="max-w-6xl mx-auto px-4 -mt-6">
      <div className="bg-white shadow rounded-xl p-4 grid md:grid-cols-4 gap-3">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="City, neighborhood or address" className="border rounded px-3 py-2" />
        <input value={priceMin} onChange={(e) => setPriceMin(e.target.value)} placeholder="Min Price" className="border rounded px-3 py-2" />
        <input value={priceMax} onChange={(e) => setPriceMax(e.target.value)} placeholder="Max Price" className="border rounded px-3 py-2" />
        <button className="bg-indigo-600 text-white rounded px-4 py-2">Search</button>
      </div>
    </form>
  )
}
