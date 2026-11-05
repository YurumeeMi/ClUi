
const API_BASE_URL = (
  import.meta.env.VITE_API_URL ?? 'http://localhost:3000'
).replace(/\/$/, '')

type LoginResponse = {
  id: string
}

type RegisterResponse = {
  id: string
}

type MeResponse = {
  id: string
}

export type Organization = {
  id: string
  name: string
  role: string
}

export type Account = {
  id: string
  code: string
  name: string
  account_type: string
  is_active: boolean
}

type OrganizationResp = {
  organizations: Organization[]
}

type AccountsResp = {
  accounts: Account[]
}

async function request<T>(
  path: string,
  options: RequestInit = {},
): Promise<T> {
  const headers = new Headers(options.headers)

  if (options.body) {
    headers.set('Content-Type', 'application/json')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
    credentials: 'include',
  })

  if (!response.ok) {
    throw new Error(
      response.status === 401
        ? 'Invalid email or password.'
        : response.status === 403
          ? 'You do not have permission to perform this action.'
          : response.status === 404
            ? 'The requested resource was not found.'
            : response.status === 409
              ? 'An account with this email already exists.'
              : response.status === 400
                ? 'Please check the information you entered.'
                : `Request failed (${response.status}).`,
    )
  }

  if (response.status === 204) {
    return undefined as T
  }

  return response.json() as Promise<T>
}

export const api = {
  login(email: string, password: string) {
    return request<LoginResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  register(email: string, password: string) {
    return request<RegisterResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },

  me() {
    return request<MeResponse>('/auth/me')
  },

  logout() {
    return request<void>('/auth/logout', {
      method: 'POST',
    })
  },

  organizations() {
    return request<OrganizationResp>('/organizations')
  },

  accounts(organizationId: string) {
    return request<AccountsResp>(
      `/organizations/${organizationId}/accounts`,
    )
  },

  createAccount(
    organizationId: string,
    account: {
      code: string
      name: string
      account_type: string
    },
  ) {
    return request<{ id: string }>(
      `/organizations/${organizationId}/accounts`,
      {
        method: 'POST',
        body: JSON.stringify(account),
      },
    )
  },
}
