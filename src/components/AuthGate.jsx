import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { api } from '../lib/api'

export default function AuthGate({ children }) {
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setSession(session)

      supabase.auth.onAuthStateChange(async (_event, newSession) => {
        setSession(newSession)
        if (newSession?.user) await syncProfile(newSession.user)
      })

      if (session?.user) await syncProfile(session.user)
      setLoading(false)
    }

    const syncProfile = async (user) => {
      try {
        const body = {
          supabase_user_id: user.id,
          email: user.email,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          role: user.user_metadata?.role || 'tenant',
          avatar_url: user.user_metadata?.avatar_url || null,
        }
        const res = await api.post('/auth/sync', body)
        setProfile(res)
      } catch (e) {
        console.error('Auth sync failed', e)
      }
    }

    init()
  }, [])

  if (loading) return <div className="p-6 text-gray-600">Loading...</div>
  return typeof children === 'function' ? children({ session, profile }) : children
}
