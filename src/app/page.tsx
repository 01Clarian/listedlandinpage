import Image from "next/image";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";
import "./EqualizerAnimation.css";

const letters = [
  { char: "l", bars: 4, offset: -10 },
  { char: "i", bars: 2, offset: 25.5 },
  { char: "s", bars: 6, offset: 57 },
  { char: "t", bars: 3, offset: 116 },
  { char: "e", bars: 4, offset: 146 },
  { char: "d", bars: 5, offset: 192 },
  { char: "square", bars: 3, offset: 244 },
];

const barColors = ["red", "orange", "yellow", "green", "blue", "purple"];

export default function Home() {
  return (
    <main className="container drip flex flex-col items-center justify-center text-center gap-4">
      <div className="equalizer-container">
      <div className="logo-wrapper">
      {/* Rainbow Dripping Elements */}
      {[...Array(18)].map((_, i) => (
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
  {/* Drips Under Logo */}
  <div className="relative flex justify-center mt-[-10px]">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="drip__drop"></div>
    ))}
  </div>
</div>

<div className="equalizer">
        {letters.map((letter, index) => (
          <div
            key={index}
            className="letter-group"
            style={{
              left: `${letter.offset}px`,
              bottom: "247px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              position: "absolute",
              gap: "3px",
            }}
          >
            {[...Array(letter.bars)].map((_, i) => {
              const barColor = barColors[(index + i) % barColors.length];
              return (
                <div
                  key={i}
                  className="bar"
                  style={{
                    backgroundColor: barColor,
                    animationDuration: `${1.5 + Math.random()}s`,
                    width: "2.5px",
                    transformOrigin: "top",
                    position: "relative",
                  }}
                />
              );
            })}
          </div>
        ))}
      </div>

{/* "Coming Soon..." Text (Adjust margin for closer positioning) */}
<p className="coming-soon mt-[-20px]">Coming Soon</p>

{/* Social Icons (Reduced spacing & positioned closer) */}
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

{/* Footer (Closer to Icons) */}
<footer className="mt-3">© Listed Productions. All rights reserved.</footer>
</div>
    </main>
  );
}
