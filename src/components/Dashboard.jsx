import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Dashboard({ profile }) {
  const [greeting, setGreeting] = useState('')

  useEffect(() => {
    if (profile?.role === 'landlord') setGreeting('Manage your listings and booking requests')
    else setGreeting('Browse and manage your saved homes and requests')
  }, [profile])

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold">Welcome{profile?.name ? `, ${profile.name}` : ''}</h2>
        <p className="text-gray-600 mt-2">{greeting}</p>
      </div>
    </div>
  )
}
