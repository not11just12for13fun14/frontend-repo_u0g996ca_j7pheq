export default function Hero({ onFindNearMe }) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
            Find a room nearby, fast.
          </h1>
          <p className="mt-4 text-gray-600">
            Designed for short-notice rentals. Landlords get rooms filled. Tenants move in quickly.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={onFindNearMe} className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700">
              Find Near Me
            </button>
            <a href="#create" className="px-4 py-2 rounded border border-gray-300 text-gray-700 hover:bg-gray-50">
              List a Room
            </a>
          </div>
        </div>
        <div className="bg-indigo-50 rounded-2xl p-6">
          <div className="grid grid-cols-3 gap-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="aspect-video rounded-lg bg-white shadow-sm border"></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
