"use client";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import NextImage from "next/image"; // ✅ Import Next.js Image
import Observer from "@/components/Observer";
import "./image.css";

const Image = ({
  background,
  backgroundSize = "cover",
  resolutions = "1000x",
  className = "",
  src,
  secSet = "",
  onClick,
  title = "",
  alt = "",
  lazy = true,
  width = 1000, // ✅ Default width (adjustable)
  height = 800, // ✅ Default height (adjustable)
}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const handleIntersection = (e) => {
    if (e.isIntersecting) {
      setIsIntersecting(true);
    }
  };

  const checkIsUploadcare = (src) => typeof src === "string" && src.includes("ucarecdn.com");

  const isUploadcare = checkIsUploadcare(src);

  const fullSrc = `${src}${isUploadcare ? "-/progressive/yes/-/format/auto/-/resize/" + resolutions + "/" : ""}`;
  const smallSrc = `${src}${isUploadcare ? "-/progressive/yes/-/format/auto/-/resize/10x/" : ""}`;

  const style = background
    ? {
        backgroundImage: `url(${isIntersecting ? fullSrc : smallSrc})`,
        backgroundSize,
      }
    : {};

  return (
    <>
      {isUploadcare && lazy ? (
        <Observer onChange={handleIntersection}>
          <div
            className="BackgroundImage"
            ref={ref}
            style={{ backgroundImage: `url(${smallSrc})`, backgroundSize: "cover" }}
          >
            {!background ? (
              <NextImage
                className={`LazyImage ${className} ${isIntersecting ? "faded" : ""}`}
                src={isIntersecting ? fullSrc : smallSrc}
                width={width}
                height={height}
                onClick={onClick}
                title={title}
                alt={alt}
                priority={lazy ? false : true} // ✅ Load non-lazy images with priority
              />
            ) : (
              <div
                className={`LazyImage BackgroundImage absolute ${className} ${isIntersecting ? "faded" : ""}`}
                style={style}
              />
            )}
          </div>
        </Observer>
      ) : (
        <NextImage
          className={className}
          src={fullSrc}
          width={width}
          height={height}
          onClick={onClick}
          title={title}
          alt={alt}
          priority={lazy ? false : true}
        />
      )}
    </>
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
};

export default Image;
