import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Grids from './components/Grids'

function App() {
  const [coords, setCoords] = useState(null)

  const findNearMe = () => {
    if (!navigator.geolocation) return alert('Geolocation not supported')
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => alert('Could not get your location: ' + err.message),
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }

  const onSearch = (params) => {
    // For now we only pass through to listing grid which calls API
    // Advanced filters can be wired later
    console.log('Search params', params)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero onFindNearMe={findNearMe} />
      <SearchBar onSearch={onSearch} />
      <Grids coords={coords} />
      <footer className="border-t bg-white mt-16">
        <div className="max-w-6xl mx-auto px-4 py-8 text-sm text-gray-500 flex items-center justify-between">
          <p>© {new Date().getFullYear()} Rent It</p>
          <a href="/test" className="hover:text-gray-700">System status</a>
        </div>
      </footer>
    </div>
  )
}

export default App
