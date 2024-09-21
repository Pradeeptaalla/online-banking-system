

const Home = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="grid grid-cols-3 mt-6">
        <div className="mt-20 ml-5">

          <a href="#">
            <img className="rounded-t-lg" src="./static/bank.webp" alt="" width={"500px"} height={500} />
          </a>
        </div>


        <div className="col-span-2">
          <div className="p-5">
            <a href="#">
              <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Welcome to PSS BANK
              </h1>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Your Trusted Partner in Financial Success
              At PSS BANK , we believe in making banking simple, secure, and accessible for everyone. Whether you are managing your day-to-day finances, planning for the future, or seeking investment opportunities, were here to help you every step of the way.
            </p>

            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Our Services</h1>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" >
              Comprehensive Solutions for Every Need
              Personal Banking: Manage your finances with ease, access savings and checking accounts, and explore a variety of personal loans.
              Business Banking: Tailored solutions for businesses of all sizes. From corporate accounts to business loans, weve got you covered.
              Investments: Grow your wealth with our expert financial advice and wide range of investment products.
              Loans and Mortgages: Competitive rates and flexible terms to help you achieve your dreams, whether its buying a home, car, or funding your education.
            </p>

            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Why Choose PSS BANK?</h1>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" >
              Secure & Reliable: Your safety is our top priority. With advanced encryption and fraud protection, your money is always secure.
              24/7 Support: We are here to assist you anytime, anywhere. Our customer support team is always ready to help.
              User-Friendly Platform: Manage your accounts, pay bills, and transfer money seamlessly with our intuitive online banking platform.
              Community Focused: We believe in giving back. Our community programs and sustainable practices make a positive impact where it matters most.
            </p>

            <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Join Us Today
            </h1>

            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400" >
              Banking Made Simple, Secure, and Personal
              Open an account in minutes and experience the convenience of modern banking with [Your Bank Name]. Your financial future starts here.</p>

            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>

        </div>

      </div>



    </div>


  )
}

export default Home
