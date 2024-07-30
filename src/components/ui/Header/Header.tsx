"use client"

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from "../../../../public/images/quick.png";
import SearchBar from '../search/SearchBar';
import Modal from '../modal';
import { RegisterForm } from '@/components/auth/register-form';
import { LoginForm } from '@/components/auth/login-form';

const Header = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false); // Add a state to track the modal visibility
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleLoginModalOpen = () => {
    setShowLoginModal(true);
  };

  const handleLoginModalClose = () => {
    setShowLoginModal(false);
  };

  return (
    <header className="w-full h-[10vh] p-4  shadow-lg flex justify-between items-center">
      <div>
        <Link href="/">
          <Image
            src={logo}
            alt="Quick Time Technologies Zambia Ltd"
            width={140}
            height={80}
            className="w-36 md:w-40 cursor-pointer"
          />
        </Link>
      </div>
      {/* <div>
        <SearchBar onSearch={handleSearch} />
      </div> */}
      <nav className="flex space-x-4">
        <Link href="/events">
          <span className="text-gray-700 hover:text-orange-500 cursor-pointer">Events</span>
        </Link>
        <Link href="/organizers">
          <span className="text-gray-700 hover:text-orange-500 cursor-pointer">Organizers</span>
        </Link>
        <Link href="/vendors">
          <span className="text-gray-700 hover:text-orange-500 cursor-pointer">Vendors</span>
        </Link>
        <Link href="/about">
          <span className="text-gray-700 hover:text-orange-500 cursor-pointer">About</span>
        </Link>
        <Link href="/blog">
          <span className="text-gray-700 hover:text-orange-500 cursor-pointer">Blog</span>
        </Link>
         {/* Login Button */}
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-orange-600 cursor-pointer mt-4 md:mt-0"
        onClick={handleLoginModalOpen}
      >
        LOGIN
      </button>
      
        <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 cursor-pointer" onClick={handleModalOpen}>Sign up</button>
      </nav>
      {/* Display search results */}
      {searchResults.map((result, index) => (
        <div key={index} className="mt-4">
          {JSON.stringify(result)}
        </div>
      ))}
  {/* Login Modal */}
  {showLoginModal && (
        <Modal onClose={handleLoginModalClose}>
          <LoginForm />
        </Modal>
      )}


      {/* Add the modal component */}
      {showModal && (
        <Modal onClose={handleModalClose}>
          <RegisterForm /> {/* Use the RegisterForm component as the modal content */}
        </Modal>
      )}
    </header>
  );
};

export default Header;


