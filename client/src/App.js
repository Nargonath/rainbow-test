import React from 'react';
import './App.css';

import LoginForm from 'features/user/LoginForm';
import LocalStorageUtils from 'utils/localStorage';
import SearchUserForm from 'features/user/SearchUserForm';

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

  const onUserSelect = (recipientUser) => console.log(recipientUser);

  return (
    <div>
      <h1 className="header">Rainbow test</h1>

      {isLoadingUser ? (
        <p className="loading">Loading...</p>
      ) : !user ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <>
          <h2 className="header">
            Welcome {user.userData.firstName}{' '}
            <span role="img" aria-label="wave hand">
              👋
            </span>
          </h2>

          <SearchUserForm onUserSelect={onUserSelect} />
        </>
      )}

      {errorMsg ? <div className="error">{errorMsg}</div> : null}
    </div>
  );
}

export default App;
