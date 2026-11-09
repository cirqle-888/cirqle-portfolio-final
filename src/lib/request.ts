/** Bound every public content request, including response-body parsing. */
export async function fetchJson<T>(url: string, init: RequestInit = {}, timeout = 12000): Promise<{ response: Response; data: T }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...init, signal: controller.signal });
    const data = response.ok ? await response.json() as T : undefined as T;
    return { response, data };
  } finally { clearTimeout(timer); }
}
