export default function ListingCard({ item }) {
  return (
    <div className="rounded-xl border shadow-sm overflow-hidden bg-white">
      <div className="aspect-video bg-gray-100">
        {item.photos?.length ? (
          <img src={item.photos[0]} alt={item.title} className="w-full h-full object-cover" />
        ) : null}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          {item.available_now && (
            <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">Available now</span>
          )}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{item.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm text-gray-800">
            <span className="font-semibold">${item.price}</span> / {item.price_unit}
          </div>
          <button className="px-3 py-1.5 rounded bg-indigo-600 text-white text-sm">Request to Book</button>
        </div>
      </div>
    </div>
  )
}
