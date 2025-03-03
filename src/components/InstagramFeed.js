"use client";

import React, { useState, useEffect } from "react";
import Image from "@/components/Image";
import "./instagram-feed.css";

export default function InstagramFeed({ accessToken = "1051524659.452bff1.e557d42201cd4747a3a3b5fb42d1d4c9", count = 20 }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    clearStorage();
    fetchInstagram();
  }, []);

  const clearStorage = () => {
    const lastClear = localStorage.getItem("lastclear");
    const timeNow = new Date().getTime();
    // Clear storage every hour
    if (timeNow - lastClear > 1000 * 60 * 60 * 1) {
      localStorage.clear();
      localStorage.setItem("lastclear", timeNow);
    }
  };

  const fetchInstagram = async () => {
    try {
      // Temporary placeholder data
      const instaFeed = [
        {
          code: "placeholder1",
          display_src: "https://via.placeholder.com/150",
          caption: "Placeholder Post 1",
        },
        {
          code: "placeholder2",
          display_src: "https://via.placeholder.com/150",
          caption: "Placeholder Post 2",
        },
        {
          code: "placeholder3",
          display_src: "https://via.placeholder.com/150",
          caption: "Placeholder Post 3",
        },
      ];
  
      setPosts(instaFeed);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch Instagram data:", err);
      setPosts([]); // Fallback to empty state
      setLoading(false);
    }
  };
  

  if (loading) {
    return (
      <div className="InstagramFeed">
        {[...Array(count)].map((_, index) => (
          <div
            className="InstagramFeed--EmptyPost"
            data-display="Loading"
            key={`EmptyPost-${index}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="InstagramFeed">
      {posts.slice(0, count).map((post) => (
        <Post key={post.code} src={post.display_src} code={post.code} />
      ))}
    </div>
  );
}

const Post = ({ src, code }) => (
  <a
    className="InstagramFeed--EmptyPost InstagramFeed--EmptyPost-loaded"
    href={`https://instagram.com/p/${code}`}
    rel="noopener noreferrer"
    target="_blank"
    aria-label="Instagram Post Link"
  >
    <Image background src={src} lazy alt="Instagram image" />
  </a>
);