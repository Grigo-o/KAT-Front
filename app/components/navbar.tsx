"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);

    const navItems = [
        { name: "Home", icon: "home-outline", href: "/" },
        { name: "Profile", icon: "person-outline", href: "/profile" },
        { name: "Message", icon: "chatbubble-outline", href: "/messages" },
        { name: "Log In", icon: "log-in-outline", href: "/login" },
        { name: "Register", icon: "person-add-outline", href: "/register" },
    ];

    return (
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
                                <ion-icon
                                //  name={item.icon}

                                ></ion-icon>
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
    );
}
