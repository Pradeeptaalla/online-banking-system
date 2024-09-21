/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoLogOut } from "react-icons/io5";
import { IoCardSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { TbReport } from "react-icons/tb";
import { FaShoppingCart } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, isMobile }) => {
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false); 
  const [isCardDropdownOpen, setIsCardDropdownOpen] = useState(false); 

  const toggleAccountDropdown = () => {
    setIsAccountDropdownOpen(!isAccountDropdownOpen);
  };

  const toggleCardDropdown = () => {
    setIsCardDropdownOpen(!isCardDropdownOpen); 
  };

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
        isOpen || !isMobile ? "translate-x-0" : "-translate-x-full"
      } bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link
              to="/dashboard"
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
            >
              <MdDashboard size={25} />
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>

          <li>
            <button type="button" onClick={toggleAccountDropdown} 
              className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
              aria-controls="dropdown-account" data-collapse-toggle="dropdown-account">
              <MdAccountBalance size={25} />{" "}
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Account
              </span>
              <FaAngleDown size={20} />{" "}
            </button>
            <ul id="dropdown-account" className={`${ isAccountDropdownOpen ? "" : "hidden" } py-2 space-y-2`} >
              <li>
                <Link  to="/apply-account" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Apply
                </Link>
              </li>
              <li> 
              <Link  to="/accounts" className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" >
                  Details
                </Link >
              </li>
              <li> 
              <Link  to="/transfer"  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Transfer
              </Link>
              </li>
            </ul>
          </li>

          <li>
            <button type="button" onClick={toggleCardDropdown}  className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700" aria-controls="dropdown-cards" data-collapse-toggle="dropdown-cards">
              <IoCardSharp size={25} />{" "}
              <span className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">
                Cards
              </span>
              <FaAngleDown size={20} />{" "}
            </button> 
            <ul id="dropdown-cards" className={`${isCardDropdownOpen ? "" : "hidden"} py-2 space-y-2`} >
              <li>
              <Link  to="/apply-card"  className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Apply
              </Link>
              </li>
              <li>
              <Link  to="/cards"  href={"/cards"} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700">
                  Details
              </Link>
              </li>
            </ul>
          </li>

          <li>
          <Link  to="/bills"  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <FaShoppingCart size={25} /> <span className="ms-3">Bills</span>
          </Link>
          </li>
     
          <li>
          <Link  to="/statement"  className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <TbReport size={25} /> <span className="ms-3">Statements</span>
            </Link>
          </li>


         


          <li>
             <Link  to="/logout" 
              className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <IoLogOut size={25} />{" "}
              <span className="flex-1 ms-3 whitespace-nowrap">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
