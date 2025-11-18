import { Link } from 'react-router-dom'
import AuthGate from './AuthGate'
import AuthButtons from './AuthButtons'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-white/70 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold text-indigo-600">Rent It</Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link to="/" className="text-gray-700 hover:text-indigo-600">Browse</Link>
          <Link to="/landlord" className="text-gray-700 hover:text-indigo-600">For Landlords</Link>
          <Link to="/tenant" className="text-gray-700 hover:text-indigo-600">For Tenants</Link>
          <Link to="/test" className="text-gray-700 hover:text-indigo-600">System Test</Link>
        </nav>
        <div className="ml-4">
          <AuthGate>
            {({ session, profile }) => (
              session ? (
                <div className="flex items-center gap-3 text-sm">
                  <span className="hidden md:inline text-gray-600">{profile?.name || session.user.email} · {profile?.role || session.user.user_metadata?.role}</span>
                  <AuthButtons />
                </div>
              ) : (
                <AuthButtons />
              )
            )}
          </AuthGate>
        </div>
      </div>
    </header>
  )
}
