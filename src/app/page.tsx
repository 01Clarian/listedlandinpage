import Image from "next/image";
import { FacebookIcon, InstagramIcon, TwitterIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="container drip flex flex-col items-center justify-center text-center gap-4">
      {/* Rainbow Dripping Elements */}
      {[...Array(18)].map((_, i) => (
        <div key={i} className="drip__drop"></div>
      ))}

      {/* Logo with Drips Falling from the Bottom */}
      <div className="drip drip--from-bottom relative flex flex-col items-center">
  <Image 
    src="/listed-logo.jpeg" 
    alt="Listed Logo" 
    width={300} 
    height={300} 
    className="logo"
    style={{ objectFit: "contain" }}
  />

  {/* Drips Under Logo */}
  <div className="relative flex justify-center mt-[-10px]">
    {[...Array(6)].map((_, i) => (
      <div key={i} className="drip__drop"></div>
    ))}
  </div>
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

    </main>
  );
}
