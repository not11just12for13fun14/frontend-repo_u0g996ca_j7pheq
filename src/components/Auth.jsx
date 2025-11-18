import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { api } from '../lib/api'

export default function Auth({ onAuthed }) {
  const [session, setSession] = useState(null)
  const [role, setRole] = useState('tenant')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setSession(session)
      setLoading(false)
    }
    run()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  const signInWithEmail = async (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) alert(error.message)
  }

  const signUp = async (e) => {
    e.preventDefault()
    const name = e.target.name.value
    const email = e.target.email.value
    const password = e.target.password.value
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name, role } } })
    if (error) return alert(error.message)
    alert('Check your email to confirm your account!')
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  const syncProfile = async () => {
    if (!session) return
    const user = session.user
    const payload = {
      supabase_user_id: user.id,
      email: user.email,
      name: user.user_metadata?.name || user.email.split('@')[0],
      role: user.user_metadata?.role || role,
      avatar_url: user.user_metadata?.avatar_url || null,
      phone: user.user_metadata?.phone || null,
      bio: user.user_metadata?.bio || null,
    }
    try {
      const res = await api.post('/auth/sync', payload)
      onAuthed && onAuthed(res)
    } catch (e) {
      alert('Failed to sync profile: ' + e.message)
    }
  }

  if (loading) return null

  if (!session) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Create an account</h3>
          <form onSubmit={signUp} className="space-y-3">
            <input name="name" required placeholder="Full name" className="w-full border rounded px-3 py-2" />
            <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" />
            <input name="password" type="password" required placeholder="Password" className="w-full border rounded px-3 py-2" />
            <div className="flex items-center gap-3 text-sm">
              <label className="font-medium">Role:</label>
              <select value={role} onChange={(e)=>setRole(e.target.value)} className="border rounded px-2 py-1">
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
            </div>
            <button className="w-full bg-indigo-600 text-white rounded px-4 py-2">Sign up</button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-xl font-semibold mb-4">Sign in</h3>
          <form onSubmit={signInWithEmail} className="space-y-3">
            <input name="email" type="email" required placeholder="Email" className="w-full border rounded px-3 py-2" />
            <input name="password" type="password" required placeholder="Password" className="w-full border rounded px-3 py-2" />
            <button className="w-full bg-gray-900 text-white rounded px-4 py-2">Sign in</button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white p-6 rounded-xl shadow flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Signed in as</p>
          <p className="font-semibold">{session.user.email}</p>
        </div>
        <div className="flex gap-3">
          <button onClick={syncProfile} className="px-4 py-2 rounded bg-indigo-600 text-white">Continue</button>
          <button onClick={signOut} className="px-4 py-2 rounded border">Sign out</button>
        </div>
      </div>
    </div>
  )
}
