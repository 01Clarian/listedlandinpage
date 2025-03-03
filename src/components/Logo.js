"use client";

import React from "react";
import Image from "next/image";
import "./logo.css";

export default function Logo() {
  return (
    <div className="Logo">
      <Image src="/logo.png" alt="Logo" width={80} height={25} priority />
    </div>
  );
}