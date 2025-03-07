"use client";

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PhotoProvider, PhotoView } from "react-photo-view"; // ✅ Lightbox for images
import "react-photo-view/dist/react-photo-view.css";
import "./gallery.css";
import Image from "next/image";
import _kebabCase from "lodash/kebabCase";

// ✅ Gallery Component
const Gallery = ({ images }) => {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    // ✅ Fetch image dimensions dynamically
    async function fetchImageInfo(img, i) {
      try {
        const res = await fetch(img.image + "-/json/");
        if (!res.ok) throw new Error("Failed to fetch image metadata");
        const result = await res.json();

        setSliderImages((prev) => {
          const newImagesArr = [...prev];
          newImagesArr[i] = {
            src: img.image,
            title: img.title,
            w: result.width,
            h: result.height,
          };
          return newImagesArr;
        });
      } catch (error) {
        console.error("Error fetching image metadata:", error);
      }
    }

    images.forEach((img, i) => fetchImageInfo(img, i));
  }, [images]);

  return (
    <PhotoProvider>
      <div className="Gallery">
        {images.map((image, idx) => (
          <figure
            className="Gallery--Item"
            key={`${_kebabCase(image.alt)}-${idx}`}
          >
            <div>
              <PhotoView src={image.image}>
                <Image
                  src={image.image}
                  alt={image.alt}
                  width={300} // Adjust size accordingly
                  height={200}
                  style={{ objectFit: "cover", borderRadius: "8px" }}
                />
              </PhotoView>
            </div>
            {image.title && <figcaption>{image.title}</figcaption>}
          </figure>
        ))}
      </div>
    </PhotoProvider>
  );
};

// ✅ PropTypes validation
Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default Gallery;
