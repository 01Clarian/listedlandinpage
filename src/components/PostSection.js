"use client";

import React, { useState } from "react";
import PostCard from "@/components/PostCard";
import "./post-section.css";

export default function PostSection({
  posts = [],
  title = "",
  limit = 12,
  showLoadMore = true,
  loadMoreTitle = "Load More",
  perPageLimit = 12,
}) {
  const [currentLimit, setCurrentLimit] = useState(limit);

  const increaseLimit = () => {
    setCurrentLimit((prevLimit) => prevLimit + perPageLimit);
  };

  const visiblePosts = posts.slice(0, currentLimit || posts.length);

  return (
    <div className="PostSection">
      {title && <h2 className="PostSection--Title">{title}</h2>}
      {!!visiblePosts.length && (
        <div className="PostSection--Grid">
          {visiblePosts.map((post, index) => (
            <PostCard key={post.title + index} {...post} />
          ))}
        </div>
      )}
      {showLoadMore && visiblePosts.length < posts.length && (
        <div className="taCenter">
          <button className="button" onClick={increaseLimit}>
            {loadMoreTitle}
          </button>
        </div>
      )}
    </div>
  );
}
