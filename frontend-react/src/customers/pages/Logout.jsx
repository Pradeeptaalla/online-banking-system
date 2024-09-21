/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../security/AuthContext';

const Logout = () => {
  const { setIsAuthenticated, setIsOpened } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await fetch('http://localhost:8000/logout', {
          method: 'POST',
          credentials: 'include',
        });
        
    
        setIsAuthenticated(false);
        setIsOpened(false);
        
        navigate('/login');
      } catch (error) {
        
        setIsAuthenticated(false);
        setIsOpened(false);
        navigate('/home');
      }
    };

    handleLogout();
  }, [navigate, setIsAuthenticated, setIsOpened]);

  return <div>Logging out...</div>;
};

export default Logout;
