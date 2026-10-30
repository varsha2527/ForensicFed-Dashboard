
const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL ?? ""
).replace(/\/+$/, "");

export const isApiConfigured = API_BASE_URL.length > 0;

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!isApiConfigured) {
    throw new ApiError(
      "Backend URL is not configured. Demo mode is still active."
    );
  }

  const path = endpoint.startsWith("/")
    ? endpoint
    : `/${endpoint}`;

  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        Accept: "application/json",
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });
  } catch {
    throw new ApiError(
      "Cannot connect to the backend. Check that the server is running."
    );
  }

  if (!response.ok) {
    throw new ApiError(
      `Backend request failed (${response.status}).`,
      response.status
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}
