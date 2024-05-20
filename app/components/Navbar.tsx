"use client";

import React, { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { set } from "mongoose";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const [user, setUser] = useState(null);

  const getUserFromLocalStorage = () => {
    const user = localStorage.getItem("user");

    if (user) {
      setUser(JSON.parse(user));
    }
  };

  console.log("User:", user);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");

    router.push("/login");

    window.location.reload();
  };

  useEffect(() => {
    getUserFromLocalStorage();
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex items-center justify-between text-white">
        <h1
          className="text-2xl font-bold"
          onClick={() => {
            router.push("/");
          }}
        >
          Vraj Uni
        </h1>
        {user && (
          <div className="relative">
            <div
              className="flex items-center cursor-pointer"
              onClick={handleProfileClick}
            >
              <FaUserCircle size={24} />
              <span className="ml-2">{user.name}</span>
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <Link
                  href="/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Profile
                </Link>
                <span
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
