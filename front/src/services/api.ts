export interface Eleve {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

export interface CreateEleveDTO {
  nom: string;
  prenom: string;
  email: string;
  mot_de_passe: string;
}

const API_BASE = '';

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error || `Erreur ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export async function getEleves(): Promise<Eleve[]> {
  const res = await fetch(`${API_BASE}/eleves`);
  return handleResponse<Eleve[]>(res);
}

export async function getEleveById(id: number): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves/${id}`);
  return handleResponse<Eleve>(res);
}

export async function createEleve(data: CreateEleveDTO): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Eleve>(res);
}

export async function updateEleve(id: number, data: Partial<CreateEleveDTO>): Promise<Eleve> {
  const res = await fetch(`${API_BASE}/eleves/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse<Eleve>(res);
}

export async function deleteEleve(id: number): Promise<void> {
  const res = await fetch(`${API_BASE}/eleves/${id}`, {
    method: 'DELETE',
  });
  return handleResponse<void>(res);
}
