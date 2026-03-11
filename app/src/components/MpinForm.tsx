import React, { useState, useEffect } from 'react';
import MpinInput from './MpinInput';

interface MpinFormProps {
  onAuthenticated: () => void;
}

const MpinForm: React.FC<MpinFormProps> = ({ onAuthenticated }) => {
  const [mpin, setMpin] = useState('');
  const [confirmMpin, setConfirmMpin] = useState('');
  const [error, setError] = useState('');
  const [isMpinSet, setIsMpinSet] = useState(false);

  useEffect(() => {
    const storedMpin = localStorage.getItem('app_mpin');
    if (storedMpin) {
      setIsMpinSet(true);
    }
  }, []);

  const handleSubmit = () => {
    if (isMpinSet) {
      // Login logic
      const storedMpin = localStorage.getItem('app_mpin');
      if (mpin === storedMpin) {
        onAuthenticated();
      } else {
        setError('Invalid MPIN.');
      }
    } else {
      // Set new MPIN logic
      if (mpin.length !== 6 || !/^\d{6}$/.test(mpin)) {
        setError('MPIN must be 6 digits.');
        return;
      }
      if (mpin !== confirmMpin) {
        setError('MPINs do not match.');
        return;
      }
      localStorage.setItem('app_mpin', mpin);
      onAuthenticated();
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="mpin-screen">
      <form className="mpin-form-card" onSubmit={handleFormSubmit}>
        <img src="/vault_logo.jpg" alt="Logo" className="mpin-logo" />
        <div className="form-group">
          <label htmlFor="mpin">{isMpinSet ? 'Enter MPIN' : 'Create MPIN'}</label>
          <MpinInput
            length={6}
            onChange={(value) => {
              setError('');
              setMpin(value);
            }}
          />
        </div>
        {!isMpinSet && (
          <div className="form-group">
            <label htmlFor="confirm-mpin">Confirm MPIN</label>
            <MpinInput
              length={6}
              onChange={(value) => {
                setError('');
                setConfirmMpin(value);
              }}
            />
          </div>
        )}
        <button type="submit">
          {isMpinSet ? 'Log In' : 'Set MPIN'}
        </button>
        <p className="error">{error || ' '}</p>
      </form>
    </div>
  );
};

export default MpinForm;
