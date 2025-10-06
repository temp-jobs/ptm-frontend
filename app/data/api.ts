export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE"
  body?: any
  token?: string
}

export async function apiRequest<T>(url: string, options: ApiOptions = {}): Promise<T> {
  const { method = "GET", body, token } = options

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  }

  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))
    throw new Error(errorData?.error || errorData?.message || "API request failed")
  }

  return res.json()
}
