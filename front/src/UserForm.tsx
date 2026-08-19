interface UserFormProps {
  onAdd: (user: { nom: string; prenom: string; email: string }) => void;
}

const UserForm: UserFormProps = { onAdd: () => {} };

export { UserForm, type UserFormProps };