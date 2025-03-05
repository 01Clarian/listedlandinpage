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

  const [currentPage, setCurrentPage] = useState(1); // ✅ Track current page

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
      <div className="fixcenter">
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

        <div style={{ textAlign: "center" }}>
          <div className="soundcloud-container">
            <h2>{data.listedmix}</h2>
            <br />
            <div className="glow-card">
              <iframe
                title="listed-playlist"
                width="98%"
                height="100%"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={data.listedmixlk}
              ></iframe>
            </div>
          </div>

          <div className="home-artists-links">
            <div style={{ textAlign: "center" }}>
              <br />
              <h2>Artists</h2>
              <p>
                {data.artists.map((artist) => (
                  <a key={artist.slug} href={artist.slug} style={{ marginRight: "1em" }}>
                    {artist.title.trim()}
                  </a>
                ))}
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
