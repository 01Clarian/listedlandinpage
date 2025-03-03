"use client";

import React from "react";
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
  ...props
}) => (
  <div>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`PostCard ${className}`}
    >
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
    {excerpt && <p className="PostCard--excerpt">{excerpt}</p>}
  </div>
);

export default PostCard;
