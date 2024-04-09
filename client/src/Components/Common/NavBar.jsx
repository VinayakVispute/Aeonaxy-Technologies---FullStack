import { Link } from "react-router-dom";
import Logo from "../../assets/DribbbleIcon.png";
import { BsFillBagXFill } from "react-icons/bs";
const NavBar = () => {
  return (
    <header className="flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 md:py-0  ">
      <nav
        className="relative max-w-[85rem] w-full mx-auto px-4 md:flex md:items-center md:justify-between md:px-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex items-center justify-between">
          <Link className="flex-none text-xl font-semibold " href="/">
            <img src={Logo} alt="Logo" className="w-auto h-6 lg:h-8" />
          </Link>
          <div className="md:hidden">
            <button
              type="button"
              className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none     "
              data-hs-collapse="#navbar-collapse-with-animation"
              aria-controls="navbar-collapse-with-animation"
              aria-label="Toggle navigation"
            >
              <svg
                className="hs-collapse-open:hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1={3} x2={21} y1={6} y2={6} />
                <line x1={3} x2={21} y1={12} y2={12} />
                <line x1={3} x2={21} y1={18} y2={18} />
              </svg>
              <svg
                className="hs-collapse-open:block hidden flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
        </div>
        <div
          id="navbar-collapse-with-animation"
          className="hs-collapse  overflow-hidden transition-all duration-300 basis-full grow md:flex justify-between items-center"
        >
          <div className="flex flex-col w-full  gap-y-4 gap-x-0 mt-5 md:flex-row md:items-center md:gap-y-0 lg:gap-x-7 md:gap-x-4 md:mt-0 md:ps-4 lg:ps-7 mr-2">
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center   "
              href="/inspiration"
            >
              Inspiration
            </Link>
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center   "
              href="/find-work"
            >
              Find Work
            </Link>
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center   "
              href="/learn-design"
            >
              Learn Design
            </Link>
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center   "
              href="/go-pro"
            >
              Go Pro
            </Link>
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center   "
              href="/hire-designers"
            >
              Hire Designers
            </Link>
            <Link
              className="font-medium  text-gray-500 hover:text-gray-400 md:py-6 text-sm text-left md:text-center block md:hidden   "
              href="/upload"
            >
              Upload
            </Link>
          </div>
          <div className="flex justify-between items-center w-full md:w-[78%] my-2 md:my-0 gap-2">
            <div className="flex items-center gap-x-4 md:ms-auto">
              <div className="relative block w-full">
                <div className="absolute inset-y-0  start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-4 h-4 text-gray-500 "
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search icon</span>
                </div>
                <input
                  type="text"
                  id="search-navbar"
                  className="block w-full p-2 ps-8 text-sm text-gray-700 font-normal  rounded-lg bg-gray-100 outline-none"
                  placeholder="Search"
                />
              </div>
              <BsFillBagXFill size={28} className="pb-1 hidden md:block" />
            </div>
            <img
              className="inline-block size-10 rounded-full"
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80"
              alt="Image Description"
            />
            <button
              type="button"
              className="focus:outline-none  text-white bg-pink-500 hover:bg-pink-600 font-medium rounded-lg text-xs lg:text-sm px-3 py-1.5 hidden md:block "
            >
              Upload
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
