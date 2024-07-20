import React, { useState } from "react";
import { Link } from "react-router-dom";

const MobileMenu = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <div className="flex justify-end items-center">
        <button
          onClick={toggleMenu}
          className="p-2 text-gray-700 rounded-md outline-none inline-flex items-center justify-center"
        >
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute top-16 right-2 w-[12rem] text-center bg-white rounded-lg shadow-lg h-auto z-40 ${
            isOpen ? "slide-in" : "slide-out"
          }`}
        >
          <nav className="flex flex-col p-4 space-y-4">
            {menuItems?.map((menuItem) => (
              <Link
                key={menuItem.item}
                to={menuItem.route}
                className="text-gray-700 hover:text-gray-900"
              >
                {menuItem.item}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default MobileMenu;
