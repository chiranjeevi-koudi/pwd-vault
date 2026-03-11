import React from 'react';
import PasswordItem from './PasswordItem';
import type { Password } from '../App';

interface PasswordListProps {
  passwords: Password[];
  setPasswords: React.Dispatch<React.SetStateAction<Password[]>>;
}

const PasswordList: React.FC<PasswordListProps> = ({ passwords, setPasswords }) => {
  if (passwords.length === 0) {
    return (
      <div className="password-list-container my-4 p-4">
        <p>No passwords saved yet.</p>
      </div>
    );
  }

  return (
    <div className="password-list-container">
      <table className="password-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Site</th>
            <th>Username</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passwords.map((password) => (
            <PasswordItem
              key={password.id}
              password={password}
              setPasswords={setPasswords}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PasswordList;
