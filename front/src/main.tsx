import { StrictMode, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Login from './Login'
import { getToken, clearToken } from './services/api'

function Root() {
  const [loggedIn, setLoggedIn] = useState(() => !!getToken());

  useEffect(() => {
    setLoggedIn(!!getToken());
  }, []);

  function handleLogout() {
    clearToken();
    setLoggedIn(false);
  }

  return loggedIn ? (
    <App onLogout={handleLogout} />
  ) : (
    <Login onLogin={() => setLoggedIn(true)} />
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Root />
  </StrictMode>
)
