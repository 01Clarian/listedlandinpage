"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "react-feather";
import Logo from "@/components/Logo";
import { SocialIcon } from "react-social-icons";
import { getArtists } from "@/lib/contentful"; // ✅ Fetch artists dynamically
import "./nav.css";

export default function Navigation() {
  const [active, setActive] = useState(false);
  const [artists, setArtists] = useState([]); // ✅ Store artists dynamically
  const currentPath = usePathname();

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

          {/* ✅ Custom RA Icon */}
          <span style={{ margin: "5px" }}>
            <a
              href="https://ra.co/promoters/91"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/ra.png"
                alt="RA"
                style={{
                  marginBottom:"-8.3px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  filter: "invert(1)", // Ensures visibility on dark backgrounds
                }}
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
              href="/artists/"
              className={`NavLink ${
                currentPath.startsWith("/artists") ? "active" : ""
              }`}
              onClick={handleLinkClick}
            >
              Artists
            </Link>
            <ul>
              {artists.length > 0 ? (
                artists.map((artist, index) => (
                  <li key={artist.slug} className={`artist-${index % 8}`}>
                    <Link href={`/artists/${artist.slug}`} onClick={handleLinkClick}>
                      {artist.title}
                    </Link>
                  </li>
                ))
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
            className={`NavLink ${currentPath === "/news/" ? "active" : ""}`}
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

