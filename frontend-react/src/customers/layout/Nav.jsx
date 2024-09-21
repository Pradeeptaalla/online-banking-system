/* eslint-disable react/prop-types */

import { ImMenu } from "react-icons/im";
import { FaRegUserCircle  } from "react-icons/fa";
import { Link } from "react-router-dom";

const Nav = ({ toggleSidebar }) => {
  return (
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar} // Toggle the sidebar on mobile view
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open sidebar</span>
              <ImMenu />
            </button>
            <a href={"/profile"} className="flex ms-2 md:me-24">
              <img
                src="../static/logo.png"
                className="h-8 me-3"
                alt="PSS BANK"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                PSS BANK
              </span>
            </a>
          </div>
          <div className="flex items-center">
            <div className="flex items-center ms-3"> 
              <button type="button"  className="flex text-sm  rounded-full" aria-expanded="false" data-dropdown-toggle="dropdown-user" >
                <span className="sr-only">Open user menu</span>
               <Link to='/profile'> <FaRegUserCircle  size={30} /></Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;