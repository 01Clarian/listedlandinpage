import React from "react";
import Layout from "@/components/Layout";
import { getArtists } from "@/lib/contentful";
import './slug.css';

// ✅ Generate static paths for artist pages
export async function generateStaticParams() {
  const artists = await getArtists();
  return artists.map((artist) => ({ slug: artist.slug }));
}

// ✅ Fetch artist dynamically from Contentful
export default async function ArtistPage({ params }) {
  const artists = await getArtists();
  const artist = artists.find((a) => a.slug === params.slug);

  if (!artist) {
    return (
      <Layout title="Artist Not Found">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>404 - Artist Not Found</h2>
          <p>Sorry, we couldn't find this artist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={artist.title}>
      <div className="ArtistPage" style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
        {/* Title */}
        <h2 style={{ textAlign: "center" }}>{artist.title}</h2>

        {/* Featured Image */}
        {artist.featuredImage && (
          <img
            src={artist.featuredImage}
            alt={artist.title}
            style={{
              width: "100%",
              maxWidth: "600px",
              borderRadius: "10px",
              display: "block",
              margin: "20px auto",
            }}
          />
        )}

                {/* Social Links */}
                {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
          <div className="ArtistSocials" style={{ marginTop: "30px", textAlign: "center" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
              {Object.entries(artist.socialLinks).map(([platform, url]) => (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "10px 20px",
                    backgroundColor: "#000",
                    color: "#fff",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: "bold",
                  }}
                >
                  {platform.charAt(0).toUpperCase() + platform.slice(1)}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Date Created */}
        {artist.dateCreated && (
          <p style={{ textAlign: "center", fontStyle: "italic", color: "#888" }}>
            Updated: {new Date(artist.dateCreated).toLocaleDateString()}
          </p>
        )}

        {/* Bio Section */}
        {artist.bio.length > 0 && (
          <div className="ArtistBio" style={{ marginTop: "20px", textAlign: "left" }}>
            <h2>About {artist.title}</h2>
            {artist.bio.map((block, index) => {
              if (block.nodeType === "paragraph") {
                return (
                  <p key={index} style={{ lineHeight: "1.6", fontSize: "16px" }}>
                    {block.content.map((textNode) => textNode.value).join(" ")}
                  </p>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </Layout>
  );
}
