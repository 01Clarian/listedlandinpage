"use client";

import React from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import "./footer.css";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <div>
      {/* ✅ Get Listed Button */}
      <div style={{ textAlign: "center" }}>
        <a
          className="example_e"
          href="https://visitor.r20.constantcontact.com/d.jsp?llr=csi9ozbab&p=oi&m=csi9ozbab&sit=zaxq5c9bb&f=56937576-3074-4bab-becd-a2b8ce970e8b"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>Get listed</h2>
        </a>
      </div>

      {/* ✅ Social Icons */}
      <h3 className="taCenter" style={{ margin: "0" }}>
        <br />
        <div>
          {/* ✅ Existing Social Icons */}
          {[
            "https://www.facebook.com/listedbookings",
            "https://www.instagram.com/areulisted",
            "https://twitter.com/areulisted",
            "https://soundcloud.com/areulisted",
          ].map((url, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <SocialIcon url={url} />
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
                width={50}
                height={50}
                style={{
                  marginBottom: "-20px",
                  borderRadius: "50%",
                  objectFit: "contain",
                  filter: "invert(1)", // Ensures visibility on dark backgrounds
                }}
                priority // ✅ Ensures faster loading
              />
            </a>
          </span>
        </div>
      </h3>

      {/* ✅ Footer */}
      <footer className="footer">
        <div className="container taCenter">
          <span style={{ color: "white" }}>
            &copy; Copyright Listed {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
