export async function request<TResponse = never>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> {
  return fetch(url, config)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }

      if (res.status === 204) {
        return {} as TResponse
      }

      return res.json()
    })
    .then((data) => data as TResponse)
}
