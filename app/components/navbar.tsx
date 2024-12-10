"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(0);

  const navItems = [
    { name: "Home", icon: "home-outline", href: "/" },
    { name: "Profile", icon: "person-outline", href: "/profile" },
    { name: "Contact", icon: "chatbubble-outline", href: "/messages" },
    { name: "Log In", icon: "log-in-outline", href: "/login" },
    { name: "Register", icon: "person-add-outline", href: "/register" },
  ];

  // const navItems = [
  //   { name: "Home", href: "/" },
  //   { name: "Profile", href: "/profile" },
  //   { name: "Contact", href: "/messages" },
  //   { name: "Log In", href: "/login" },
  //   { name: "Register", href: "/register" },
  // ];

  useEffect(() => {
    const currentIndex = navItems.findIndex((item) => item.href === pathname);
    setActiveIndex(currentIndex !== -1 ? currentIndex : 0);
  }, [pathname]);

  return (
    <>
      <div className="navigation">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`list ${activeIndex === index ? "active" : ""}`}
              onClick={() => setActiveIndex(index)}
            >
              <Link href={item.href}>
                <span className="icon">
                  <ion-icon name={item.icon}></ion-icon>
                </span>
                <span className="text">{item.name}</span>
              </Link>
            </li>
          ))}
          <div
            className="indicator"
            style={{
              transform: `translateX(calc(70px * ${activeIndex}))`,
            }}
          ></div>
        </ul>
      </div>

      {/* Simple Text Navbar */}
      {/* <nav className="w-full flex justify-center">
        <ul className="flex w-1/2 items-center justify-between">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link
                href={item.href}
                className={`text-white text-xl py-1 px-2 ${
                  activeIndex === index ? "border-b-2" : "hover:border-b-2"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
    </>
  );
}
