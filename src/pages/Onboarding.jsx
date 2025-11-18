import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { api } from '../lib/api'

export default function Onboarding() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [role, setRole] = useState('tenant')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [bio, setBio] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const check = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        navigate('/')
      }
    }
    check()
  }, [navigate])

  const saveProfile = async () => {
    try {
      setSaving(true)
      setError('')
      const { data: { session } } = await supabase.auth.getSession()
      const user = session.user
      // Update metadata (role) in Supabase
      await supabase.auth.updateUser({ data: { role } })
      // Sync to backend
      await api.post('/auth/sync', {
        supabase_user_id: user.id,
        email: user.email,
        name: name || user.email.split('@')[0],
        role,
        phone,
        bio,
        avatar_url: user.user_metadata?.avatar_url || null,
      })
      navigate('/')
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold">Welcome! Let’s set up your account</h1>
        <p className="text-gray-600 mt-2">Choose your role and complete a few details to personalize your experience.</p>

        <div className="mt-8 bg-white border rounded-xl p-6 space-y-6">
          <div>
            <h2 className="font-semibold mb-2">Your role</h2>
            <div className="flex gap-3">
              <button onClick={() => setRole('tenant')} className={`px-4 py-2 rounded border ${role==='tenant' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Tenant</button>
              <button onClick={() => setRole('landlord')} className={`px-4 py-2 rounded border ${role==='landlord' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-700'}`}>Landlord</button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="e.g., Alex Kim" />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input value={phone} onChange={(e)=>setPhone(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="Optional" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Short bio</label>
              <input value={bio} onChange={(e)=>setBio(e.target.value)} className="mt-1 w-full border rounded px-3 py-2" placeholder="Optional" />
            </div>
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex justify-end">
            <button onClick={saveProfile} disabled={saving} className="px-5 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Finish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
