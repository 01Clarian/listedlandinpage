"use client"; // ✅ Fix: Mark this as a Client Component

import React, { useState } from "react";
import ArtistCard from "./ArtistCard";
import "./artist-section.css";

const ArtistSection = ({
  posts = [],
  title = "",
  limit = 50,
  showLoadMore = true,
  loadMoreTitle = "Load More",
  perPageLimit = 50,
}) => {
  const [currentLimit, setCurrentLimit] = useState(limit);

  const increaseLimit = () => {
    setCurrentLimit((prevLimit) => prevLimit + perPageLimit);
  };

  const visiblePosts = posts.slice(0, currentLimit || posts.length);

  return (
    <div className="ArtistSection">
      {title && <h2 className="ArtistSection--Title">{title}</h2>}
      {!!visiblePosts.length && (
        <div className="ArtistSection--Grid">
          {visiblePosts.map((post, index) => (
            <ArtistCard key={post.title + index} {...post} />
          ))}
        </div>
      )}
      {showLoadMore && visiblePosts.length < posts.length && (
        <button className="ArtistSection--LoadMore" onClick={increaseLimit}>
          {loadMoreTitle}
        </button>
      )}
    </div>
  );
};

export default ArtistSection;
