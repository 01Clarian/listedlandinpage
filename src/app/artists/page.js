import React from "react";
import Layout from "@/components/Layout";
import ArtistSection from "@/components/ArtistSection";
import { getArtists } from "@/lib/contentful"; // Fetch artists from Contentful

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

  return (
    <Layout meta={page.meta || false} title={page.title || false}>
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
    </Layout>
  );
}
