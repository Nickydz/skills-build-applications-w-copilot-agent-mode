const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

export function normalizeCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload.data)) return payload.data
  if (Array.isArray(payload.results)) return payload.results
  if (Array.isArray(payload.items)) return payload.items
  if (Array.isArray(payload.docs)) return payload.docs
  return []
}

export async function fetchCollection(resource, endpoint = `${API_BASE_URL}/${resource}/`) {
  const response = await fetch(endpoint)
  if (!response.ok) throw new Error(`Could not load ${resource}.`)
  return normalizeCollection(await response.json())
}
