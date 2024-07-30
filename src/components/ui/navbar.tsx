// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <span className="font-semibold text-xl tracking-tight cursor-pointer">Logo</span>
        </Link>
      </div>
      <div className="block lg:hidden">
        {/* Mobile menu button */}
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/login">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
              Login
            </span>
          </Link>
          <Link href="/signup">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
              Signup
            </span>
          </Link>
          <Link href="/events">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 cursor-pointer">
              Events
            </span>
          </Link>
          <Link href="/vendors">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white cursor-pointer">
              Vendors
            </span>
          </Link>
        </div>
        <div>
          <input type="search" placeholder="Search..." className="search-bar" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
