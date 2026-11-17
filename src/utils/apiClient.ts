export async function apiFetch<T>(
  path: string,
  options: RequestInit & { token?: string | null } = {},
): Promise<T> {
  const { token, headers, ...rest } = options;
  const mergedHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(headers as Record<string, string> | undefined),
  };

  if (token) {
    mergedHeaders.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(path, {
    ...rest,
    headers: mergedHeaders,
  });

  if (!response.ok) {
    let message = `Request failed (${response.status})`;
    try {
      const payload = (await response.json()) as { error?: string };
      if (payload.error) message = payload.error;
    } catch {
      // Fallback to status message
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
}
