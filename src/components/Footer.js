"use client";

import React from "react";
import InstagramFeed from "@/components/InstagramFeed";
import "./footer.css";
import { SocialIcon } from "react-social-icons";

export default function Footer() {
  return (
    <div>
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

      <h3 className="taCenter" style={{ margin: "0" }}>
        <br />
        <div>
          {["https://www.facebook.com/listedbookings", 
            "https://www.instagram.com/areulisted", 
            "https://twitter.com/areulisted", 
            "https://soundcloud.com/areulisted"].map((url, index) => (
            <span key={index} style={{ margin: "5px" }}>
              <SocialIcon url={url} />
            </span>
          ))}
        </div>
      </h3>
      <InstagramFeed count="8" />
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