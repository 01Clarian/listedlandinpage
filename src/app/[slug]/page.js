import React from "react";
import Layout from "@/components/Layout";
import { getArtists } from "@/lib/contentful";
import "./slug.css";

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
        <div className="not-found">
          <h2>404 - Artist Not Found</h2>
          <p>Sorry, we couldn not find this artist.</p>
        </div>
      </Layout>
    );
  }

  const socialColors = ["#e476ae", "#ef4137", "#1895d3", "#814199"]; // 🎨 Social Link Colors

  return (
    <Layout title={artist.title}>
      <div className="ArtistPage">
        {/* Title */}
        <h2 className="ArtistTitle">{artist.title}</h2>

        {/* Featured Image */}
        {artist.featuredImage && (
          <img
            src={artist.featuredImage}
            alt={artist.title}
            className="ArtistImage"
          />
        )}

        {/* Social Links */}
        {artist.socialLinks && Object.keys(artist.socialLinks).length > 0 && (
          <div className="ArtistSocials">
            {Object.entries(artist.socialLinks).map(([platform, url], index) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: "#000",
                  color: socialColors[index % socialColors.length], // ✅ Cycle colors
                  borderRadius: "8px",
                  padding: "10px 20px",
                  textDecoration: "none",
                  fontWeight: "bold",
                  fontSize: "14px",
                  display: "inline-block",
                  margin: "5px",
                  transition: "0.3s ease",
                }}
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        )}

        {/* Date Created */}
        {artist.dateCreated && (
          <p className="ArtistDate">
            Updated: {new Date(artist.dateCreated).toLocaleDateString()}
          </p>
        )}

        {/* Bio Section */}
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
      </div>
    </Layout>
  );
}
