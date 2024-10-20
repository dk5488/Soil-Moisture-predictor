import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const navItems = [
    { text: "Home", path: "/" },
    { text: "Dashboard", path: "/dashboard" },
    { text: "How It Works", path: "/how-it-works" },
    { text: "Contact Us", path: "/contact-us" }, 
    { text: "Testimonials", path: "/testimonials" }, 
    { text: "Login/SignUp", path: "/login-signup" }, 
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-green-800 text-white p-4 z-50">
      <nav className="flex justify-end space-x-8">
        {navItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className="px-4 py-2 hover:bg-green-900 rounded"
            activeClassName="bg-green-900"
          >
            {item.text}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
