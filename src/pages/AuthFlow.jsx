import { useState } from 'react'
import Auth from '../components/Auth'
import Onboarding from '../components/Onboarding'
import Dashboard from '../components/Dashboard'

export default function AuthFlow() {
  const [userDoc, setUserDoc] = useState(null)
  const [step, setStep] = useState('auth') // auth -> onboard -> done

  const handleAuthed = (doc) => {
    setUserDoc(doc)
    // If user has a role and name, consider them onboarded, else go to onboarding
    if (doc?.name && doc?.role) setStep('done')
    else setStep('onboard')
  }

  const handleOnboarded = (doc) => {
    setUserDoc(doc)
    setStep('done')
  }

  return (
    <div>
      {step === 'auth' && <Auth onAuthed={handleAuthed} />}
      {step === 'onboard' && <Onboarding user={userDoc} onDone={handleOnboarded} />}
      {step === 'done' && <Dashboard profile={userDoc} />}
    </div>
  )
}
