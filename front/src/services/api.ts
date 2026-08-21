export interface Eleve {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

export type CreateEleveDTO = Omit<Eleve, 'id'>;

const API_BASE = 'https://express-first-endpoint.onrender.com';

const TOKEN_KEY = 'admin_token';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Erreur ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function loginAdmin(nom: string, mot_de_passe: string): Promise<{ admin: { id: number; nom: string; prenom: string; email: string }; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nom, mot_de_passe }),
  });
  return handleResponse(res);
}

export async function getEleves(): Promise<Eleve[]> {
  const res = await fetch(`${API_BASE}/eleves`, {
    headers: authHeaders(),
  });
  return handleResponse<Eleve[]>(res);
}

export async function getEleveById(id: number): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves/${id}`, {
    headers: authHeaders(),
  });
  return handleResponse<Eleve>(res);
}

export async function createEleve(data: CreateEleveDTO): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<Eleve>(res);
}

export async function updateEleve(id: number, data: CreateEleveDTO): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(data),
  });
  return handleResponse<Eleve>(res);
}

export async function deleteEleve(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/eleves/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse<void>(res);
}
