export async function apiRequest(endpoint, body = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  const json = await response.json()

  if (!response.ok) {
    throw json
  }

  return json
}
