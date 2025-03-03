"use client";

import React from "react";
import Head from "next/head";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "modern-normalize/modern-normalize.css";
import "@/styles/styles.css";

export default function Layout({ children, meta, title }) {
  // TODO: Replace with real API or static config file
  const siteTitle = "Listed Productions";
  const googleTrackingId = "YOUR_GOOGLE_TRACKING_ID";
  const socialMediaCard = { image: "/default-social-image.jpg" };
  const artists = []; // Fetch from an API or static file
  const subNav = { posts: [] }; // Fetch from an API or static file

  return (
    <>
      <Head>
        <title>{title ? `${title} | ${siteTitle}` : siteTitle}</title>
        <link href="https://ucarecdn.com" rel="preconnect" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://ucarecdn.com" />
        {/* Add other meta tags, fonts, and tracking scripts here */}
      </Head>

      {/* Meta Component (Optional) */}
      {googleTrackingId && (
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${googleTrackingId}`}
        ></script>
      )}
      {googleTrackingId && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleTrackingId}');
            `,
          }}
        ></script>
      )}

      <Nav subNav={subNav} artists={artists} />
      <main>{children}</main>
      <Footer />
    </>
  );
}