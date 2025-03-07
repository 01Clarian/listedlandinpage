"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "react-feather";
import Logo from "@/components/Logo";
import { SocialIcon } from "react-social-icons";
import { getArtists } from "@/lib/contentful"; // ✅ Fetch artists dynamically
import "./nav.css";

export default function Navigation() {
  const [active, setActive] = useState(false);
  const [artists, setArtists] = useState([]);
  const currentPath = usePathname();

  const colors = [
    "#FF7F00", // Light Orange
    "#FFFF00", // Yellow
    "#d8ffd8", // Light Green
    "#8888f4", // Soft Purple
    "#ef4137", // Red
    "#1895d3", // Blue
    "#814199", // Dark Purple
    "#12b258", // Green
  ];

  // ✅ Fetch artists when component mounts
  useEffect(() => {
    async function fetchArtists() {
      const fetchedArtists = await getArtists();
      setArtists(fetchedArtists);
    }
    fetchArtists();
  }, []);

  const handleMenuToggle = () => setActive(!active);
  const handleLinkClick = () => setActive(false); // ✅ Close menu when a link is clicked

  return (
    <nav className={`Nav ${active ? "Nav-active" : ""}`}>
      <div className="Nav--Container container">
        <Link href="/home/" onClick={handleLinkClick}>
          <Logo />
        </Link>

        {/* ✅ Social Icons including RA */}
        <div className="smedialinks">
          {[
            "https://www.facebook.com/listedbookings",
            "https://www.instagram.com/areulisted",
            "https://twitter.com/areulisted",
            "https://soundcloud.com/areulisted",
          ].map((url, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <SocialIcon url={url} style={{ height: 25, width: 25 }} />
            </span>
          ))}

          {/* ✅ Custom RA Icon using Next.js `<Image />` */}
          <span style={{ margin: "5px" }}>
            <a
              href="https://ra.co/promoters/91"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/ra.png"
                alt="RA"
                width={25}
                height={25}
                style={{
                  marginBottom: "-8.3px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  filter: "invert(1)", // Ensures visibility on dark backgrounds
                }}
                priority // ✅ Loads faster
              />
            </a>
          </span>
        </div>

        {/* ✅ Navigation Links */}
        <div className="Nav--Links">
          <Link
            id="navc1"
            href="/home/"
            className={`NavLink ${currentPath === "/home/" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Home
          </Link>

          {/* ✅ Artists Dropdown */}
          <div className="dropmenu">
            <Link
              id="navc2"
              href="/artists/" // ✅ Fixed incorrect link format
              className={`NavLink ${
                currentPath.startsWith("/artists") ? "active" : ""
              }`}
              onClick={handleLinkClick}
            >
              Artists
            </Link>
            <ul>
              {artists.length > 0 ? (
                artists.map((artist, index) => {
                  const hoverColor = colors[index % colors.length]; // ✅ Cycle through colors
                  return (
                    <li key={artist.slug}>
                      <Link
                        href={`/${artist.slug}`} // ✅ Correct artist dynamic link
                        onClick={handleLinkClick}
                        style={{
                          transition: "color 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => (e.target.style.color = hoverColor)}
                        onMouseLeave={(e) => (e.target.style.color = "white")} // Default color
                      >
                        {artist.title}
                      </Link>
                    </li>
                  );
                })
              ) : (
                <li>Loading artists...</li>
              )}
            </ul>
          </div>

          <Link
            id="navc3"
            href="/productions/"
            className={`NavLink ${
              currentPath === "/productions/" ? "active" : ""
            }`}
            onClick={handleLinkClick}
          >
            Productions
          </Link>
          <Link
            id="navc4"
            href="/buzz/"
            className={`NavLink ${currentPath === "/buzz/" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Buzz
          </Link>
          <Link
            id="navc5"
            href="/contact/"
            className={`NavLink ${currentPath === "/contact/" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Contact
          </Link>

          <a
            className=""
            href="https://visitor.r20.constantcontact.com/d.jsp?llr=csi9ozbab&p=oi&m=csi9ozbab&sit=zaxq5c9bb&f=56937576-3074-4bab-becd-a2b8ce970e8b"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Get listed</span>
          </a>
        </div>

        {/* Mobile Menu Button */}
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
