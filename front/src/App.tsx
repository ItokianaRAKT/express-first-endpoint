import { useState } from 'react';
import UserTable, { type User } from './UserTable';

export default function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ nom: '', prenom: '', email: '' });
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleSubmit = () => {
    if (editingId !== null) {
      setUsers(users.map((u) => (u.id === editingId ? { ...u, ...form } : u)));
    } else {
      const newUser = { id: Date.now(), ...form };
      setUsers([...users, newUser]);
    }
    setForm({ nom: '', prenom: '', email: '' });
    setEditingId(null);
  };

  const handleEdit = (user: User) => {
    setForm({ nom: user.nom, prenom: user.prenom, email: user.email });
    setEditingId(user.id);
  };

  const handleCancel = () => {
    setForm({ nom: '', prenom: '', email: '' });
    setEditingId(null);
  };

  const handleDelete = (id: number) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: '20px' }}>Gestion des Utilisateurs</h2>

      <div style={{ marginBottom: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>{editingId !== null ? 'Modifier un utilisateur' : 'Ajouter un utilisateur'}</h3>
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

      <UserTable users={users} onDelete={handleDelete} onEdit={handleEdit} />
    </div>
  );
}
