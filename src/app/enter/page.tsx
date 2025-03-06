"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import "./equalizer-animation.css";
import "./enter-page.scss";

const letters = [
  { char: "l", bars: 4, offset: -10 },
  { char: "i", bars: 2, offset: 25.5 },
  { char: "s", bars: 7, offset: 51 },
  { char: "t", bars: 3, offset: 107 },
  { char: "e", bars: 6, offset: 143 },
  { char: "d", bars: 6, offset: 202 },
  { char: "square", bars: 4, offset: 275.5 },
];

const barColors = [
  "#e156c5", "#fafafa", "#2EACE3", "#F9F345", "#ffbef0", "#1B9B59",
];

export default function EnterPage() {
  const router = useRouter();
  const [hydrated, setHydrated] = useState(false);
  const [animatedBars, setAnimatedBars] = useState([]);

  // ✅ Ensure this runs only on client to fix hydration mismatch
  useEffect(() => {
    setHydrated(true);

    // ✅ Generate animation durations **only on client**
    const barsWithAnimations = letters.map((letter) => ({
      ...letter,
      animations: Array.from({ length: letter.bars }, () => ({
        duration: `${1.5 + Math.random()}s`,
      })),
    }));
    setAnimatedBars(barsWithAnimations);
  }, []);

  const handleEnter = () => {
    window.location.href = "/home";
  };

  return (
    <main className="container drip flex flex-col items-center justify-center text-center gap-4 min-h-screen">
      <div className="equalizer-container">
        <div className="logo-wrapper">
          {/* ✅ Ensure rainbow elements only render AFTER hydration */}
          {hydrated &&
            [...Array(18)].map((_, i) => (
              <div key={i} className="drip__drop"></div>
            ))}

          {/* Logo with Drips Falling from the Bottom */}
          <div className="drip drip--from-bottom relative flex flex-col items-center">
            <Image
              src="/mainone.png"
              alt="Listed Logo"
              width={400}
              height={400}
              className="logo"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* ✅ Ensure drips render AFTER hydration */}
          {hydrated && (
            <div className="relative flex justify-center mt-[-10px]">
              {[...Array(1)].map((_, i) => (
                <div key={i} className="drip__drop"></div>
              ))}
            </div>
          )}
        </div>

        {/* ✅ Only show equalizer animation after hydration */}
        {hydrated && (
          <div className="equalizer">
            {animatedBars.map((letter, index) => (
              <div
                key={index}
                className="letter-group"
                style={{
                  left: `${letter.offset}px`,
                  bottom: "245px",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                  position: "absolute",
                  gap: "3px",
                }}
              >
                {letter.animations.map((bar, i) => (
                  <div
                    key={i}
                    className="bar"
                    style={{
                      backgroundColor: barColors[(index + i) % barColors.length],
                      animationDuration: bar.duration, // ✅ No SSR mismatch
                      width: "2.5px",
                      transformOrigin: "top",
                      position: "relative",
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ✅ ENTER Button with Full Page Load */}
        <div className="button-enter">
          <button className="example_d" onClick={handleEnter}>
            ENTER
          </button>
        </div>

        <br />
        <br />

        {/* ✅ Social Icons (No SSR mismatch) */}
        <div className="social-icons flex justify-center gap-6 mt-2">
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
      </div>

      {/* ✅ Footer (Always renders the same) */}
      <footer className="mt-3">© Listed Productions. All rights reserved.</footer>
    </main>
  );
}
