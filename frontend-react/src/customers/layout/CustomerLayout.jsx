
import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Nav from './Nav';


  const Layout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  

    const toggleSidebar = () => {
      setSidebarOpen(!isSidebarOpen);
    };
  
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
          setSidebarOpen(false); 
        }
      };
  
      window.addEventListener("resize", handleResize);
  
    
      handleResize();
  
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    return (
      <>
        <Nav toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={isSidebarOpen} isMobile={isMobile} />
        <div className={`p-4 ${!isMobile ? "sm:ml-64" : ""}`}>
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Outlet />
          </div>
        </div>
        <Footer />
      </>
    );
  };
  
export default Layout;