import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";
import "./page-header.css";

const PageHeader = ({ title, subtitle, backgroundImage, large, className = "" }) => {
  if (large) className += " PageHeader-large";

  console.log("🖼️ PageHeader Rendering...", { title, backgroundImage }); // ✅ Debug log

  return (
    <div className={`PageHeader relative ${className}`}>
      {/* ✅ Background Image */}
      {backgroundImage ? (
        <div className="PageHeader--ImageWrapper">
          <Image
            src={backgroundImage}
            alt={title || "Page Header"}
            fill={true} // ✅ Use `fill` instead of `layout="fill"`
            style={{ objectFit: "cover" }} // ✅ Ensure proper image fit
            quality={90}
            priority
          />
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "red" }}>⚠️ No Background Image</p>
      )}

      {/* ✅ Page Title & Subtitle */}
      <div className="container relative">
        {title && <h1 className="PageHeader--Title">{title}</h1>}
        {subtitle && <h2 className="PageHeader--Subtitle">{subtitle}</h2>}
      </div>
    </div>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  large: PropTypes.bool,
  className: PropTypes.string,
};

export default PageHeader;
