"use client";

import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
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
}) => {
  const ref = useRef(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const imageSizes = [
    "320",
    "450",
    "640",
    "750",
    "800",
    "900",
    "1000",
    "1200",
    "1500",
    "1600",
    "2000",
  ];

  const handleIntersection = (e) => {
    if (e.isIntersecting) {
      setIsIntersecting(true);
    }
  };

  const checkIsUploadcare = (src) => typeof src === "string" && src.includes("ucarecdn.com");

  const getResolutionString = (res) => {
    if (res === "small") return "800x";
    if (res === "medium") return "1000x";
    if (res === "large") return "2000x";
    return res;
  };

  const isUploadcare = checkIsUploadcare(src);
  const fullImage = !isUploadcare || !lazy;

  if (isUploadcare) {
    secSet = imageSizes.map(
      (size) => `${src}-/progressive/yes/-/format/auto/-/preview/${size}x${size}/-/quality/lightest/${size}.jpg ${size}w`
    );
  }

  const fullSrc = `${src}${
    isUploadcare
      ? "-/progressive/yes/-/format/auto/-/resize/" + getResolutionString(resolutions) + "/"
      : ""
  }`;

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
          <div className="BackgroundImage" ref={ref} style={{ backgroundImage: `url(${smallSrc})`, backgroundSize: "cover" }}>
            {!background ? (
              <img
                className={`LazyImage ${className} ${isIntersecting ? "faded" : ""}`}
                src={isIntersecting ? fullSrc : ""}
                srcSet={isIntersecting ? secSet : ""}
                sizes="100vw"
                onClick={onClick}
                title={title}
                alt={alt}
              />
            ) : (
              <div className={`LazyImage BackgroundImage absolute ${className} ${isIntersecting ? "faded" : ""}`} style={style} />
            )}
          </div>
        </Observer>
      ) : fullImage ? (
        <>
          {background ? (
            <div className={`BackgroundImage absolute ${className}`} style={style} />
          ) : (
            <img className={className} src={fullSrc} srcSet={secSet} sizes="100vw" onClick={onClick} title={title} alt={alt} />
          )}
        </>
      ) : null}
    </>
  );
};

Image.propTypes = {
  alt: PropTypes.string.isRequired,
};

export default Image;
