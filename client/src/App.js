import React from 'react';
import './App.css';

import LoginForm from 'features/user/LoginForm';
import LocalStorageUtils from 'utils/localStorage';

function App() {
  console.log('*** Welcome to Rainbow Web SDK Starter Kit for React ***');
  const [errorMsg, setErrorMsg] = React.useState('');
  const [isLoadingUser, setIsLoadingUser] = React.useState(true);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    try {
      const savedUser = LocalStorageUtils.get('user');
      setUser(savedUser);
      setIsLoadingUser(false);
    } catch (e) {
      setErrorMsg(`Erreur récupération données utilisateur : ${e.message}`);
    }
  }, [setErrorMsg, setUser, setIsLoadingUser]);

  const onLogin = (userData) => {
    try {
      LocalStorageUtils.save('user', userData);
      setUser(userData);
    } catch (error) {
      setErrorMsg(`Erreur sauvegarde données utilisateur : ${error.message}`);
    }
  };

  return (
    <div>
      <h1 className="header">Rainbow test</h1>

      {isLoadingUser ? (
        <p className="loading">Loading...</p>
      ) : !user ? (
        <LoginForm onLogin={onLogin} />
      ) : null}

      {errorMsg ? <div className="error">{errorMsg}</div> : null}
    </div>
  );
}

export default App;
