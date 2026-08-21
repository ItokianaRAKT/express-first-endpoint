import { useState, useEffect } from 'react';
import UserTable from './UserTable';
import { getEleves, createEleve, updateEleve, deleteEleve, type Eleve } from './services/api';

interface AppProps {
  onLogout: () => void;
}

export default function App({ onLogout }: AppProps) {
  const [users, setUsers] = useState<Eleve[]>([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' });
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
      setForm({ nom: '', prenom: '', email: '' });
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
    setForm({ nom: eleve.nom, prenom: eleve.prenom, email: eleve.email });
    setEditingId(eleve.id);
  }

  function handleCancel() {
    setForm({ nom: '', prenom: '', email: '' });
    setEditingId(null);
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>Gestion des Élèves</h2>
        <button
          onClick={onLogout}
          style={{
            padding: '8px 16px',
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Déconnexion
        </button>
      </div>

      {error && (
        <div style={{ padding: '10px', background: '#fee', color: '#c00', borderRadius: '4px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{editingId !== null ? 'Modifier un élève' : 'Ajouter un élève'}</h3>
        <div style={{ display: 'grid', gap: '10px', gridTemplateColumns: '1fr 1fr 1fr' }}>
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
          <button
            onClick={handleCancel}
            style={{
              padding: '8px 16px',
              background: '#9ca3af',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: '8px 16px',
              background: '#4f46e5',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              gridColumn: 'span 2',
            }}
          >
            {editingId !== null ? 'Modifier' : 'Ajouter'}
          </button>
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
