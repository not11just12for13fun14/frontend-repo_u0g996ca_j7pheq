import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function AuthButtons() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('tenant')
  const [mode, setMode] = useState('signin')
  const [message, setMessage] = useState('')

  const signIn = async () => {
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setMessage(error.message)
  }

  const signUp = async () => {
    setMessage('')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { role },
      },
    })
    if (error) setMessage(error.message)
    else setMessage('Check your email to confirm your account!')
  }

  const signOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex items-center gap-3">
      <div className="hidden md:flex items-center gap-2">
        <select value={role} onChange={(e) => setRole(e.target.value)} className="border rounded px-2 py-1 text-sm">
          <option value="tenant">Tenant</option>
          <option value="landlord">Landlord</option>
        </select>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border rounded px-2 py-1 text-sm" />
        <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border rounded px-2 py-1 text-sm" />
        <button onClick={mode === 'signin' ? signIn : signUp} className="px-3 py-1 bg-indigo-600 text-white rounded text-sm">
          {mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>
        <button onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')} className="px-3 py-1 border rounded text-sm">
          {mode === 'signin' ? 'Create account' : 'Have an account? Sign in'}
        </button>
      </div>
      {message && <p className="text-xs text-red-600">{message}</p>}
      <button onClick={signOut} className="px-3 py-1 border rounded text-sm">Sign out</button>
    </div>
  )
}
