import React from "react";
import Layout from "@/components/Layout";
import ArtistSection from "@/components/ArtistSection";
import { getArtists } from "@/lib/contentful"; // Fetch artists from Contentful
import "./artists.css"; // ✅ Import the new styles

// Fetch data on the server side (Next.js App Router)
export default async function ArtistPage() {
  // Fetch artists dynamically
  const artists = await getArtists(); // Fetch from Contentful
  const page = {
    title: "Artists",
    meta: {
      description: "List of artists",
    },
  };

  // Define possible colors for glowing drips
  const colors = ["#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8", "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"];

  // Function to randomly select a color for each drip
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  return (
    <Layout meta={page.meta || false} title={page.title || false}>
      <div className="drip-container">
        {/* ✅ Left Side Drips (Each with a Random Color) */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`left-drip-${i}`} 
            className="drip__drop left-drip" 
            style={{ "--random-color": getRandomColor() }}
          ></div>
        ))}

        {/* ✅ Right Side Drips (Each with a Random Color) */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`right-drip-${i}`} 
            className="drip__drop right-drip" 
            style={{ "--random-color": getRandomColor() }}
          ></div>
        ))}

        <div>
          <h1>Artists</h1>
        </div>

        <main className="Blog">
          {!!artists.length && (
            <section className="section">
              <div className="container">
                <ArtistSection posts={artists} />
              </div>
            </section>
          )}
        </main>
      </div>
    </Layout>
  );
}
