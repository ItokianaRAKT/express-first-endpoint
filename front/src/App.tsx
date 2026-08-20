import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import { getEleves, createEleve, updateEleve, deleteEleve, type Eleve } from './services/api';

export default function App() {
  const [users, setUsers] = useState<Eleve[]>([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '', mot_de_passe: '' });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadEleves();
  }, []);

  async function loadEleves() {
    try {
      setLoading(true);
      const data = await getEleves();
      setUsers(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de chargement');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit() {
    try {
      if (editingId !== null) {
        await updateEleve(editingId, form);
      } else {
        await createEleve(form);
      }
      setForm({ nom: '', prenom: '', email: '', mot_de_passe: '' });
      setEditingId(null);
      await loadEleves();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  }

  async function handleDelete(id: number) {
    try {
      await deleteEleve(id);
      await loadEleves();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur');
    }
  }

  function handleEdit(eleve: Eleve) {
    setForm({ nom: eleve.nom, prenom: eleve.prenom, email: eleve.email, mot_de_passe: '' });
    setEditingId(eleve.id);
  }

  function handleCancel() {
    setForm({ nom: '', prenom: '', email: '', mot_de_passe: '' });
    setEditingId(null);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Gestion des Élèves</h2>

      {error && (
        <div style={{ padding: '10px', background: '#fee', color: '#c00', borderRadius: '4px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
          {editingId !== null ? 'Modifier un élève' : 'Ajouter un élève'}
        </h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '150px 1fr' }}>
          <input
            value={form.nom}
            onChange={(e) => setForm({ ...form, nom: e.target.value })}
            placeholder='Nom'
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            value={form.prenom}
            onChange={(e) => setForm({ ...form, prenom: e.target.value })}
            placeholder='Prénom'
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder='Email'
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <input
            type='password'
            value={form.mot_de_passe}
            onChange={(e) => setForm({ ...form, mot_de_passe: e.target.value })}
            placeholder='Mot de passe'
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
          />
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={handleSubmit}
              style={{
                padding: '8px 16px',
                background: editingId !== null ? '#f59e0b' : '#4f46e5',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {editingId !== null ? 'Modifier' : 'Ajouter'}
            </button>
            {editingId !== null && (
              <button
                onClick={handleCancel}
                style={{
                  padding: '8px 16px',
                  background: '#6b7280',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
      )}
    </div>
  );
}
