"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import Image from "@/components/Image";
import "./post-card.css";

const PostCard = ({
  featuredImage,
  title,
  excerpt,
  date,
  url,
  className = "",
}) => {
  const isURL = excerpt && excerpt.startsWith("http");
  const [embedFailed, setEmbedFailed] = useState(false);

  return (
    <div className={`PostCard ${className}`}>
      <a href={url} target="_blank" rel="noopener noreferrer">
        {featuredImage && (
          <div className="PostCard--Image relative">
            <Image background src={featuredImage} alt={title} />
          </div>
        )}
        <div className="PostCard--Content">
          {date && (
            <time
              className="SinglePost--Meta--Date"
              itemProp="dateCreated pubdate datePublished"
              dateTime={date}
            >
              {format(new Date(date), "MMMM do, yyyy")}
            </time>
          )}
        </div>
      </a>

      {/* If the excerpt is a URL, try embedding it */}
      {isURL && !embedFailed ? (
        <iframe
          src={excerpt}
          width="100%"
          height="600px"
          style={{ border: "none", marginTop: "10px" }}
          title={title}
          onError={() => setEmbedFailed(true)}
        ></iframe>
      ) : isURL ? (
        <p>
          🔗 <a href={excerpt} target="_blank" rel="noopener noreferrer">Read Article</a>
        </p>
      ) : (
        <p className="PostCard--excerpt">{excerpt}</p>
      )}
    </div>
  );
};

export default PostCard;
