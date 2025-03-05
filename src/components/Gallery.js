"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { PhotoProvider, PhotoView } from "react-photo-view"; // ✅ Lightbox for images
import "react-photo-view/dist/react-photo-view.css";
import "./gallery.css";

const Gallery = ({ images }) => {
  if (!images || images.length === 0) {
    return <p>No images available.</p>;
  }

  return (
    <PhotoProvider>
      <div className="Gallery">
        {images.map((image, index) => (
          <figure key={index} className="Gallery--Item">
            <PhotoView src={image.image}>
              <img
                src={image.image}
                alt={image.alt || `Gallery image ${index}`}
                className="Gallery--Image"
              />
            </PhotoView>
            {image.title && <figcaption>{image.title}</figcaption>}
          </figure>
        ))}
      </div>
    </PhotoProvider>
  );
};

Gallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string.isRequired,
      alt: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
};

export default Gallery;
