import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminAuth = () => {
  const { isAuthenticated , isOpened } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  if(isOpened) {
   return <Navigate to="/open-account" />
  } 

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if(!isOpened && !isAuthenticated){

    return <Navigate to="/open-account" />;
  }




  return <Outlet />;
};

export default AdminAuth;
