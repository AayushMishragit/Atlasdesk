const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public code?: string,
  ) {
    super(message);
  }
}

export const organizationStorage = {
  orgId: () =>
    typeof window === "undefined" ? null : localStorage.getItem("orgId"),
  setOrgId: (id: string) => localStorage.setItem("orgId", id),
  clear: () => localStorage.removeItem("orgId"),
};

export async function api<T = any>(
  path: string,
  opts: { method?: string; body?: unknown } = {},
): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    method: opts.method ?? "GET",
    headers: { "Content-Type": "application/json" },
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  if (res.status === 204) return undefined as T;

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new ApiError(
      res.status,
      data.error?.message ?? "Request failed",
      data.error?.code,
    );
  }
  return data as T;
}

// every user needs one org to work in; pick the first or create a default
export async function ensureOrg() {
  const orgs = await api<{ id: string; name: string }[]>("/organizations");
  const org =
    orgs[0] ??
    (await api("/organizations", {
      method: "POST",
      body: { name: "My Workspace" },
    }));
  organizationStorage.setOrgId(org.id);
  return org;
}
