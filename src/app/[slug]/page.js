"use client"; // ✅ Mark as a Client Component

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Layout from "@/components/Layout";
import { getArtists } from "@/lib/contentful";
import "./slug.css";

export default function ArtistPage({ params }) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);

  useEffect(() => {
    async function fetchArtists() {
      const fetchedArtists = await getArtists();
      setArtists(fetchedArtists);
      setLoading(false);
    }
    fetchArtists();
  }, []);

  const artist = artists.find((a) => a.slug === params.slug);

  // ✅ Load Gigwell Script Dynamically
  useEffect(() => {
    if (artist?.gigwellAgencyId && artist?.gigwellArtistId) {
      const script = document.createElement("script");
      script.src = "https://connect.gigwell.com/roster/loader.js";
      script.async = true;
      script.crossOrigin = "*";
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [artist]);

  if (loading) {
    return (
      <Layout title="Loading Artist...">
        <div className="loading-container">
          <p className="loading-text">Loading...</p>
        </div>
      </Layout>
    );
  }

  if (!artist) {
    return (
      <Layout title="Artist Not Found">
        <div className="not-found">
          <h2>404 - Artist Not Found</h2>
          <p>Sorry, we could not find this artist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={artist.title}>
      <div className="ArtistPage">
        <h2 className="ArtistTitle">{artist.title}</h2>

        {/* ✅ Featured Image */}
        <div className="ImageWrapper">
          {imageLoading && <p className="loading-text">Loading...</p>}
          <Image
            src={artist.featuredImage}
            alt={artist.title}
            className="ArtistImage"
            width={600}
            height={600}
            style={{ objectFit: "cover", borderRadius: "20%" }}
            onLoad={() => setImageLoading(false)}
          />
        </div>

        {/* ✅ Social Links with Random Hover Font Colors */}
        {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
          <div className="ArtistSocials">
            {Object.entries(artist.socialLinks).map(([platform, url]) => {
              // Generate a random text color
              const randomColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 60%)`;

              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="SocialLink"
                  style={{ "--text-hover-color": randomColor }} // Pass color to CSS variable
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              );
            })}
          </div>
        )}


        {/* ✅ Updated Date */}
        {artist.dateCreated && (
          <p className="ArtistDate">
            Updated: {new Date(artist.dateCreated).toLocaleDateString()}
          </p>
        )}

        {/* ✅ Bio Section */}
        {artist.bio.length > 0 && (
          <div className="ArtistBio">
            <h2>About {artist.title}</h2>
            {artist.bio.map((block, index) => {
              if (block.nodeType === "paragraph") {
                return (
                  <p key={index} className="BioText">
                    {block.content.map((textNode) => textNode.value).join(" ")}
                  </p>
                );
              }
              return null;
            })}
          </div>
        )}

        {/* ✅ Move Gigwell Embed BELOW the Bio Section */}
        {artist.gigwellAgencyId && artist.gigwellArtistId && (
          <div className="GigwellEmbed">
            <h2>Tour Dates & Booking</h2>
            <gigwell-embedded-roster
              agency={artist.gigwellAgencyId}
              artist-id={artist.gigwellArtistId}
              settings={artist.gigwellSettings || "default"}
              standalone-profile={artist.gigwellStandaloneProfile ? "true" : "false"}
            ></gigwell-embedded-roster>
          </div>
        )}
      </div>
    </Layout>
  );
}
