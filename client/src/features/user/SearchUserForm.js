import React from 'react';
import PropTypes from 'prop-types';
import rainbowSDK from 'rainbow-web-sdk';
import debounce from 'lodash/debounce';

import './SearchUserForm.scss';

function SearchUserForm({ onUserSelect }) {
  const [value, setValue] = React.useState('');
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState('');

  const searchUser = React.useMemo(() => {
    return debounce(
      (value) =>
        rainbowSDK.contacts
          .searchByName(value, 5)
          .then((usersFound) => setUsers(usersFound))
          .catch(setError),
      300,
    );
  }, [setError, setUsers]);
  const onChange = (e) => {
    const { value: searchValue } = e.target;
    setValue(searchValue);
    searchUser(searchValue);
  };

  return (
    <div className="user-search">
      <input type="text" value={value} onChange={onChange}></input>
      {users ? (
        <ul className="user-search__suggestion">
          {users.map((user, index) => (
            <li key={index} className="user-search__suggestion__item">
              {user.firstname} {user.lastname} ({user.loginEmail})
              <button type="button" onClick={() => onUserSelect(user)}>
                choose
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

SearchUserForm.propTypes = {
  onUserSelect: PropTypes.func.isRequired,
};

export default SearchUserForm;
