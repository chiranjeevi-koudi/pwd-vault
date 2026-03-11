import { useEffect, useState } from 'react';
import './App.css';
import PasswordForm from './components/PasswordForm';
import PasswordList from './components/PasswordList';
import MpinForm from './components/MpinForm';
import Modal from './components/Modal';
import Layout from './components/Layout';

export interface Password {
  id: string;
  type: string;
  site: string;
  username: string;
  password: string;
  notes?: string;
}

function App() {
  const [passwords, setPasswords] = useState<Password[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isAuthenticated) {
      const storedPasswords = localStorage.getItem('passwords');
      if (storedPasswords) {
        setPasswords(JSON.parse(storedPasswords));
      }
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('passwords', JSON.stringify(passwords));
    }
  }, [passwords, isAuthenticated]);

  const handleAuthentication = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <MpinForm onAuthenticated={handleAuthentication} />;
  }

  return (
    <Layout openModal={openModal}>
      <div className="container mx-auto">
        {/* The PasswordForm is now in the modal, so we only need the list here */}
        <PasswordList passwords={passwords} setPasswords={setPasswords} />
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <PasswordForm setPasswords={setPasswords} onSave={closeModal} />
      </Modal>
    </Layout>
  );
}

export default App
