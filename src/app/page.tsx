"use client";

import Image from "next/image";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";
import "./EqualizerAnimation.css";
import { useEffect, useState } from "react";

// 🔧 Responsive hook to check for mobile screen
const useIsMobile = (breakpoint = 400) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkWidth = () => setIsMobile(window.innerWidth <= breakpoint);
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, [breakpoint]);

  return isMobile;
};

const barColors = [
  "#e156c5",
  "#fafafa",
  "#2EACE3",
  "#F9F345",
  "#ffbef0",
  "#1B9B59",
];

const artists = [
  "Anja Schneider", "Atish", "Atish & Slee", "Atnarko", "Beauty/The Beast (Philipp Jung+Holmar)",
  "Ben Annand", "Bilaliwood", "Christopher Mohn (Dance Spirit)", "Camea", "Clarian (live or DJ)",
  "Dory", "Dubtribe Sound System (live)", "Greg Paulus/No Regular Play",
  "Formerly (Holmar+Philipp Jung+Anstascia+Kenny Glasgow)", "Galen", "Halo Varga",
  "H Foundation (Hipp-e+Halo)", "Hipp-e", "Holmar", "Husa & Zeyada (live)", "Jay Tripwire",
  "Justin Marchacos (live)", "KMLN (Tooker+Shawna)", "Lovestruckk (Nico Stojan +Holmar)",
  "Mark Slee", "Matt Caines", "MightyKat", "m.O.N.R.O.E.", "Mr. C", "Naveen G",
  "Nico Stojan", "Niki Sadeki", "Nikita", "Nitin", "N/UM (live)", "Philipp Jung (M.A.N.D.Y.)",
  "Ray Zuniga+Nikita", "Ray Zuniga", "Reza Safinia (hybrid live)", "Robotek Reagan (Dance Spirit)",
  "Saqib", "Shawna (KMLN)", "Sinca", "Sunshine Jones (live)", "Tooker (KMLN)"
];

export default function Home() {
  const isMobile = useIsMobile(400);

  // ✅ Avoid SSR hydration issues by rendering random animations only after mount
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const letters = [
    { char: "l", bars: 4, offset: isMobile ? -141 : -150 },
    { char: "i", bars: 2, offset: isMobile ? -114 : -120 },
    { char: "s", bars: 7, offset: isMobile ? -78 : -81 },
    { char: "t", bars: 3, offset: isMobile ? -34 : -37 },
    { char: "e", bars: 6, offset: isMobile ? 8 : 10 },
    { char: "d", bars: 6, offset: isMobile ? 63 : 68 },
    { char: "square", bars: 4, offset: isMobile ? 127 : 135 },
  ];

  return (
    <main className="container drip flex flex-col items-center justify-center text-center gap-4 px-4 py-6 overflow-y-auto">
      <div className="equalizer-container max-w-screen-md w-full">
        <div className="logo-with-bars relative flex flex-col items-center">
          <Image 
            src="/mainone.png" 
            alt="Listed Logo" 
            width={400} 
            height={400} 
            className="logo"
            style={{ objectFit: "contain" }}
          />

          <div className="equalizer-bar-container">
            {hasMounted &&
              letters.map((letter, index) => (
                <div
                  key={index}
                  className="letter-group"
                  style={{
                    transform: `translateX(${letter.offset}px)`,
                  }}
                >
                  {[...Array(letter.bars)].map((_, i) => {
                    const barColor = barColors[(index + i) % barColors.length];
                    const randomDuration = `${1.5 + Math.random()}s`;

                    return (
                      <div
                        key={i}
                        className="bar"
                        style={{
                          backgroundColor: barColor,
                          animationDuration: randomDuration,
                        }}
                      />
                    );
                  })}
                </div>
              ))}
          </div>
        </div>

        <div className="event-section">
          <Link href="https://agzl.app.link/vsML7WU9CRb?_p=c71729c39a077af1e21490ffe9b3" target="_blank">
            <Image src="/cover.png" alt="Event Flyer" width={1200} height={1200} />
            <p className="event-rsvp">FREE with RSVP</p>
          </Link>

          <div className="artist-list">
            {artists.map((artist, idx) => (
              <span
                key={artist}
                className="artist-name"
                style={{
                  color: barColors[idx % barColors.length],
                }}
              >
                {artist}
              </span>
            ))}
          </div>

          <p className="mt-6 text-white text-sm">
            For bookings, please contact: <a href="mailto:gunita@listedbookings.com">gunita@listedbookings.com</a>
          </p>
        </div>

        <div className="social-icons flex justify-center gap-6 mt-6">
          <a href="https://www.facebook.com/listedproductions/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <FacebookIcon size={30} className="text-white" />
          </a>
          <a href="https://www.instagram.com/areulisted/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <InstagramIcon size={30} className="text-white" />
          </a>
          <a href="https://x.com/areulisted/status/1210814507892625409" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition">
            <TwitterIcon size={30} className="text-white" />
          </a>
        </div>

        <footer className="mt-6 text-xs text-white text-center">© Listed Productions. All rights reserved.</footer>
      </div>
    </main>
  );
}
