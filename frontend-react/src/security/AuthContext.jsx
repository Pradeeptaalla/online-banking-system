/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */


import { createContext, useState, useContext, useEffect ,useNavigate  } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [isOpened , setIsOpened] = useState(null);

  //const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
     
      try {
        const response = await fetch("http://localhost:8000/users/account-verification", {
          method: "GET",
          credentials: "include",
        });
    
        const data = await response.json();


        if(data.accountStatus == "OPEN")
        {
          setIsAuthenticated(true);
          setIsOpened(false);
        }
        else if(data.accountStatus == "null" || data.accountStatus == "PENDING")
        {
          setIsAuthenticated(false);
          setIsOpened(true); 
        }
        else{
      
          setIsAuthenticated(false);
          setIsOpened(true);
   
        }

      } catch (error) {
  
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []); 

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated , isOpened , setIsOpened }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

