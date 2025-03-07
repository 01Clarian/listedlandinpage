"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export default function Observer({ children, onChange }) {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  // ✅ Memoized function to prevent unnecessary re-creation
  const getCurrentScrollPos = useCallback(() => {
    return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  }, []);

  const handleScroll = useCallback(() => {
    if (!ref.current) return;
    
    const threshold = getCurrentScrollPos() + window.innerHeight;
    const elementTop = ref.current.getBoundingClientRect().top;
    
    if (!isIntersecting && elementTop <= threshold) {
      setIsIntersecting(true);
      onChange();
      window.removeEventListener("scroll", handleScroll);
    }
  }, [getCurrentScrollPos, isIntersecting, onChange]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return <div ref={ref}>{children}</div>;
}
