const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Company</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">About</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Careers</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Brand Center</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Help Center</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">Discord Server</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Twitter</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Facebook</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Licensing</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Terms & Conditions</a></li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Download</h2>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4"><a href="#" className="hover:underline">iOS</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Android</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">Windows</a></li>
              <li className="mb-4"><a href="#" className="hover:underline">MacOS</a></li>
            </ul>
          </div>
        </div>
        <div className="px-4 py-6 bg-gray-100 dark:bg-gray-700 flex flex-col md:flex-row md:justify-between items-center">
          <span className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-5 rtl:space-x-reverse">
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
                <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.035l.236-3z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 16">
                <path fillRule="evenodd" d="M21.446 5.507c-.844.375-1.75.627-2.703.743a4.652 4.652 0 0 0 2.034-2.569c-.86.511-1.81.883-2.83 1.082A4.642 4.642 0 0 0 15.725 5c-2.572 0-4.662 2.089-4.662 4.662 0 .365.042.723.12 1.066-3.872-.194-7.306-2.044-9.607-4.84A4.662 4.662 0 0 0 1.873 7.586c-.27.465-.425.993-.425 1.558 0 1.077.548 2.031 1.376 2.585a4.635 4.635 0 0 1-2.109-.58v.057c0 1.503 1.07 2.752 2.487 3.045a4.708 4.708 0 0 1-2.104.079c.591 1.844 2.308 3.194 4.332 3.231a9.356 9.356 0 0 1-5.799 1.989c-.375 0-.747-.021-1.115-.064A13.195 13.195 0 0 0 8.334 15c8.154 0 12.621-6.75 12.621-12.621 0-.192-.005-.382-.014-.572a8.97 8.97 0 0 0 2.2-2.29z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-900 dark:hover:text-white">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 11">
                <path fillRule="evenodd" d="M12.22 0h-10.44A1.78 1.78 0 0 0 0 1.78v7.44c0 .983.797 1.78 1.78 1.78h10.44a1.78 1.78 0 0 0 1.78-1.78V1.78A1.78 1.78 0 0 0 12.22 0zm-8.284 7.174H2.957V4.713h1.979v2.461zM2.968 3.5a1.82 1.82 0 1 1 0-3.639 1.82 1.82 0 0 1 0 3.639zm8.632 4.865h-1.979v-1.07c0-.641-.165-1.084-.655-1.084-.448 0-.715.28-.834.549-.043.104-.053.248-.053.396v1.209H6.684V5.237h1.903v.665c.264-.409.734-.751 1.287-.751 1.354 0 2.146.887 2.146 2.799v2.227z" clipRule="evenodd"/>
              </svg>
              <span className="sr-only">GitHub page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
