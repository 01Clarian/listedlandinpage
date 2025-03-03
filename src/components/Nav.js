"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "react-feather";
import Logo from "@/components/Logo";
import { SocialIcon } from "react-social-icons";
import "./nav.css";

export default function Navigation({ artists = [] }) {
  const [active, setActive] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState(false);
  const currentPath = usePathname();

  const handleMenuToggle = () => setActive(!active);
  const handleLinkClick = () => active && handleMenuToggle();
  const toggleSubNav = (subNav) => setActiveSubNav(activeSubNav === subNav ? false : subNav);

  const NavLink = ({ to, className, children, dropmenu, items, ...props }) => (
    <>
      {dropmenu ? (
        <div className="dropmenu">
          <Link
            href={to}
            className={`NavLink ${to === currentPath ? "active" : ""} ${className}`}
            onClick={handleLinkClick}
            {...props}
          >
            {children}
          </Link>
          <ul>
            {items?.map((item) => (
              <li key={item.node.frontmatter.title}>
                <Link href={item.node.fields.slug}>{item.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          href={to}
          className={`NavLink ${to === currentPath ? "active" : ""} ${className}`}
          onClick={handleLinkClick}
          {...props}
        >
          {children}
        </Link>
      )}
    </>
  );

  return (
    <nav className={`Nav ${active ? "Nav-active" : ""}`}>
      <div className="Nav--Container container">
        <Link href="/home/" onClick={handleLinkClick}>
          <Logo />
        </Link>
        <div className="smedialinks">
          {["https://www.facebook.com/listedbookings", 
            "https://www.instagram.com/areulisted", 
            "https://twitter.com/areulisted", 
            "https://soundcloud.com/areulisted"].map((url, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <SocialIcon url={url} style={{ height: 25, width: 25 }} />
            </span>
          ))}
        </div>
        <div className="Nav--Links">
          <NavLink id="navc1" to="/home/">Home</NavLink>
          <NavLink id="navc2" dropmenu items={artists.edges} to="/artists/">Artists</NavLink>
          <NavLink id="navc3" to="/productions/">Productions</NavLink>
          <NavLink id="navc4" to="/news/">Buzz</NavLink>
          <NavLink id="navc5" to="/contact/">Contact</NavLink>
          <a
            className="example_d"
            href="https://visitor.r20.constantcontact.com/d.jsp?llr=csi9ozbab&p=oi&m=csi9ozbab&sit=zaxq5c9bb&f=56937576-3074-4bab-becd-a2b8ce970e8b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get listed</span>
          </a>
        </div>
        <button
          className="Button-blank Nav--MenuButton"
          style={{ color: "white" }}
          onClick={handleMenuToggle}
        >
          {active ? <X /> : <Menu />}
        </button>
      </div>
    </nav>
  );
}
