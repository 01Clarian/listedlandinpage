"use client"; // ✅ Fix: Mark this as a Client Component

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import PostSection from "@/components/PostSection";
import { getArtists, getArticles, getBanners } from "@/lib/contentful";
import Slider from "react-slick";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "./home-page.css";
import "@/styles/styles.css";

const ARTICLES_PER_PAGE = 6; // ✅ Limit to 6 articles per page

const rainbowColors = [
  "#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8",
  "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"
];

// ✅ Function to get a random color
const getRandomColor = () => {
  return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
};

const SlideContent = ({ url }) => {
  const [type, setType] = useState("");

  useEffect(() => {
    if (!url) return;
    getType(url);
  }, [url]);

  const getType = async (url) => {
    if (!url || url.includes("via.placeholder.com")) {
      setType("image");
      return;
    }

    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      setType(res.headers.get("Content-Type") || "");
    } catch (error) {
      console.error("Failed to fetch URL:", url, error);
      setType("");
    }
  };

  return (
    <>
      {type.includes("image") && <img src={url} alt="Slide" />}
      {type.includes("video") && <video controls src={url}></video>}
    </>
  );
};

export default function HomePage() {
  const [data, setData] = useState({
    listedmix: "Mix Of The Month",
    listedmixlk:
      "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1997778871&show_artwork=true",
    posts: [],
    artists: [],
    featuredImages: [],
  });

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const artistsData = await getArtists();
      const articlesData = await getArticles();
      const bannersData = await getBanners();

      setData((prevData) => ({
        ...prevData,
        artists: artistsData,
        posts: articlesData,
        featuredImages: bannersData.map((banner) => banner.imageUrl),
      }));
    }

    fetchData();
  }, []);

  // ✅ **Apply Randomized Colors Dynamically**
  useEffect(() => {
    const drips = document.querySelectorAll(".drip__drop");
    drips.forEach((drip) => {
      const changeColor = () => {
        const randomColor = getRandomColor();
        drip.style.background = `radial-gradient(circle, 
          rgba(0, 0, 0, 0) 40%, 
          ${randomColor} 70%, 
          rgba(255, 255, 255, 0.1) 90%)`;
        drip.style.boxShadow = `0 0 20px ${randomColor}, 
          0 0 40px ${randomColor}, 
          inset 0 0 10px ${randomColor}`;
      };

      changeColor();
      drip.addEventListener("animationiteration", changeColor);
    });

    return () => {
      drips.forEach((drip) => {
        drip.removeEventListener("animationiteration", () => {});
      });
    };
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    fade: true,
    autoplay: true,
    autoplaySpeed: 2800,
    speed: 2800,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // ✅ **Pagination Logic**
  const indexOfLastArticle = currentPage * ARTICLES_PER_PAGE;
  const indexOfFirstArticle = indexOfLastArticle - ARTICLES_PER_PAGE;
  const currentArticles = data.posts.slice(indexOfFirstArticle, indexOfLastArticle);

  const nextPage = () => {
    if (indexOfLastArticle < data.posts.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <Layout title="Home">
      <div className="fixcenter drip">
        {/* Rainbow Drips Falling from the Top */}
        {[...Array(6)].map((_, i) => (
          <div key={`drip-${i}`} className="drip__drop"></div>
        ))}

        {/* Only Two Side Drips (Left & Right, Positioned Inward) */}
        <div className="drip__drop side-drip left-drip"></div>
        <div className="drip__drop side-drip right-drip"></div>

        <Slider {...settings} className="slider">
          {data.featuredImages.length > 0 ? (
            data.featuredImages.map((image, index) => (
              <div className="slide" key={index}>
                <SlideContent url={image} />
              </div>
            ))
          ) : (
            <p>Loading banners...</p>
          )}
        </Slider>
      </div>

      <div style={{ textAlign: "center" }}>
        <br />
        <h2>Buzz</h2>
        <br />
      </div>

      <main className="Blog">
        <section className="section">
          <div className="container">
            <br />
            {currentArticles.length > 0 ? (
              <>
                <PostSection posts={currentArticles} />
                <div className="pagination">
                  <button onClick={prevPage} disabled={currentPage === 1}>
                    ← Previous
                  </button>
                  <span> Page {currentPage} </span>
                  <button onClick={nextPage} disabled={indexOfLastArticle >= data.posts.length}>
                    Next →
                  </button>
                </div>
              </>
            ) : (
              <p>Loading articles...</p>
            )}
          </div>
        </section>
      </main>
    </Layout>
  );
}
