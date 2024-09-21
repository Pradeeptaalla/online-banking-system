import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const OpenAuth = () => {
  const { isAuthenticated , isOpened } = useAuth();


  if (isAuthenticated === null) {
  
    return <div>Loading...</div>;
  }
  
  if (isAuthenticated) {
  
    return <Navigate to="/dashboard" />;
  }

  if(!isOpened && !isAuthenticated){

    return <Navigate to="/open-account" />;
  }

  if(isAuthenticated && !isOpened){
    return <Navigate to="/dashboard" />;
  }
 
  return <Outlet />;

  

};

export default OpenAuth;
