import React, { useState } from 'react';
import type { Password } from '../App';

interface PasswordItemProps {
  password: Password;
  setPasswords: React.Dispatch<React.SetStateAction<Password[]>>;
}

const PasswordItem: React.FC<PasswordItemProps> = ({ password, setPasswords }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleDelete = () => {
    setPasswords((prev) => prev.filter((p) => p.id !== password.id));
  };

  return (
    <tr>
      <td>{password.type}</td>
      <td>{password.site}</td>
      <td>{password.username}</td>
      <td>
        <div className="password-cell">
          <span>{showPassword ? password.password : '••••••••'}</span>
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
      </td>
      <td>
        <div className="actions-cell">
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default PasswordItem;
