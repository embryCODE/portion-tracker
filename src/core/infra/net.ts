export async function request<TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      return res.json()
    })
    .then((data) => data as TResponse)
}
