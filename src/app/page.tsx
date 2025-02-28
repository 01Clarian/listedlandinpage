"use client";

import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="container drip flex flex-col items-center justify-center text-center">
      {/* Rainbow Dripping Elements */}
      {[...Array(18)].map((_, i) => (
        <div key={i} className="drip__drop"></div>
      ))}

      {/* Main Text with Drips Falling from the Bottom */}
      <div className="text drip drip--from-bottom relative">
        Listed
        {[...Array(6)].map((_, i) => (
          <div key={i} className="drip__drop"></div>
        ))}
      </div>

      {/* "Coming Soon..." Text with Glow Effect */}
      <p className="coming-soon">Coming Soon</p>

      {/* Social Icons (Properly Spaced & Clickable) */}
      <div className="social-icons">
        <a 
          href="https://www.facebook.com/listedproductions/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <FacebookIcon size={30} className="text-white" />
        </a>
        <a 
          href="https://www.instagram.com/areulisted/?hl=en" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <InstagramIcon size={30} className="text-white" />
        </a>
        <a 
          href="https://x.com/areulisted/status/1210814507892625409" 
          target="_blank" 
          rel="noopener noreferrer"
          className="hover:scale-110 transition"
        >
          <TwitterIcon size={30} className="text-white" />
        </a>
      </div>

      {/* Footer (Fixed at the Bottom, Centered) */}
      <footer>© Listed Productions. All rights reserved.</footer>
    </main>
  );
}
