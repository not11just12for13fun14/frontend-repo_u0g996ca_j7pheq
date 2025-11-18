const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

export const api = {
  baseUrl: BASE_URL,
  async get(path, params) {
    const url = new URL(`${BASE_URL}${path}`)
    if (params) Object.entries(params).forEach(([k, v]) => v !== undefined && url.searchParams.append(k, v))
    const res = await fetch(url.toString())
    if (!res.ok) throw new Error(`GET ${path} failed: ${res.status}`)
    return res.json()
  },
  async post(path, body) {
    const res = await fetch(`${BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(`POST ${path} failed: ${res.status}`)
    return res.json()
  },
}
