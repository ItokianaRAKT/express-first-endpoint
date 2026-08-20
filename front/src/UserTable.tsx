interface User {
  id: number;
  nom: string;
  prenom: string;
  email: string;
}

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
}


export default function UserTableTable({
  users,
  onDelete,
}: UserTableProps) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
      <thead>
        <tr style={{ background: '#f0f0f0', padding: '10px' }}>
          <th style={{ padding: '8px', textAlign: 'left' }}>ID</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Nom</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Prénom</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Email</th>
          <th style={{ padding: '8px', textAlign: 'left' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id} style={{ borderBottom: '1px solid #eee', padding: '10px' }}>
            <td style={{ padding: '8px' }}>{user.id}</td>
            <td style={{ padding: '8px' }}>{user.nom}</td>
            <td style={{ padding: '8px' }}>{user.prenom}</td>
            <td style={{ padding: '8px' }}>{user.email}</td>
            <td style={{ padding: '8px' }}>
              <button
                onClick={() => onDelete(user.id)}
                style={{
                  padding: '4px 8px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export { UserTableTable as UserTable, type UserTableProps, type User };