import React, { useState } from 'react';
import type { Password } from '../App';

interface PasswordFormProps {
  setPasswords: React.Dispatch<React.SetStateAction<Password[]>>;
  onSave?: () => void;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ setPasswords, onSave }) => {
  const [type, setType] = useState('');
  const [site, setSite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!type || !site || !username || !password) return;

    const newPassword: Password = {
      id: window.crypto.randomUUID(),
      type,
      site,
      username,
      password,
      notes,
    };
    setPasswords((prev) => [...prev, newPassword]);
    setSite('');
    setType('');
    setUsername('');
    setPassword('');
    setNotes('');

    if (onSave) {
      onSave();
    }
  };

  return (
    <div className="password-form">
      <h2>Add New Password</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="URL"
          value={site}
          onChange={(e) => setSite(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <textarea
          placeholder="Notes (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button type="submit">
          Save Password
        </button>
      </form>
    </div>
  );
};

export default PasswordForm;
