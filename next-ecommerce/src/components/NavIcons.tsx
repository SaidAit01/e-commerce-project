"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CartModal from "./CartModel"; // Changed import name from CartModel to CartModal

export const NavIcons = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Added simple logout handler so the logout div works
  const handleLogout = () => {
    setIsProfileOpen(false);
    // Add logout logic here if needed
  };

  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      {" "}
      {/* Added relative here */}
      <Image
        src="/profile.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
        onClick={() => setIsProfileOpen(!isProfileOpen)}
      />
      {isProfileOpen && (
        <div className="absolute p-4 rounded-md top-12 left-0 bg-white text-sm shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20">
          {/* Added bg-white and z-20 */}
          <Link href="/">Profile</Link>
          <div className="mt-2 cursor-pointer" onClick={handleLogout}>
            Logout
          </div>
        </div>
      )}
      <Image
        src="/notification.png"
        alt=""
        width={22}
        height={22}
        className="cursor-pointer"
      />
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)} // Moved onClick here for whole cart div
      >
        <Image
          src="/cart.png"
          alt=""
          width={22}
          height={22}
          className="cursor-pointer"
        />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-lama rounded-full text-white text-sm flex items-center justify-center">
          2
        </div>
      </div>
      {isCartOpen && <CartModal />} {/* Changed component name here too */}
    </div>
  );
};

export default NavIcons;
