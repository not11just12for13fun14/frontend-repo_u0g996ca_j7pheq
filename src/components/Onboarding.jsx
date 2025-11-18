import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Onboarding({ user, onDone }) {
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'tenant',
    phone: user?.phone || '',
    bio: user?.bio || '',
  })
  const [saving, setSaving] = useState(false)

  const save = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await api.post('/users', profile)
      onDone && onDone(res)
    } catch (e) {
      alert('Failed to save: ' + e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Complete your profile</h2>
      <form onSubmit={save} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Full name</label>
          <input value={profile.name} onChange={(e)=>setProfile(p=>({...p, name:e.target.value}))} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input type="email" value={profile.email} onChange={(e)=>setProfile(p=>({...p, email:e.target.value}))} className="w-full border rounded px-3 py-2" required />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Role</label>
          <select value={profile.role} onChange={(e)=>setProfile(p=>({...p, role:e.target.value}))} className="border rounded px-3 py-2">
            <option value="tenant">Tenant</option>
            <option value="landlord">Landlord</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Phone</label>
            <input value={profile.phone} onChange={(e)=>setProfile(p=>({...p, phone:e.target.value}))} className="w-full border rounded px-3 py-2" />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Short bio</label>
            <input value={profile.bio} onChange={(e)=>setProfile(p=>({...p, bio:e.target.value}))} className="w-full border rounded px-3 py-2" />
          </div>
        </div>
        <div className="flex justify-end">
          <button disabled={saving} className="px-4 py-2 rounded bg-indigo-600 text-white disabled:opacity-60">
            {saving ? 'Saving...' : 'Save and continue'}
          </button>
        </div>
      </form>
    </div>
  )
}
