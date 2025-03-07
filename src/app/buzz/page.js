"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PostSection from "@/components/PostSection";
import { getArticles } from "@/lib/contentful";
import "./buzz-page.css";

export default function BuzzPage() {
  const [articles, setArticles] = useState([]);
  const colors = ["#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8", "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"];
  
  // Function to get a new random color
  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  // ✅ State to store colors for each drip, so they change dynamically
  const [dripColors, setDripColors] = useState({
    left: getRandomColor(),
    right: getRandomColor()
  });

  useEffect(() => {
    // ✅ Interval to update colors every fall cycle
    const colorInterval = setInterval(() => {
      setDripColors({
        left: getRandomColor(),  // New color for left drip
        right: getRandomColor()  // New color for right drip
      });
    }, 6000); // Syncs with `drop-fall` animation

    return () => clearInterval(colorInterval);
  }, [getRandomColor]);

  useEffect(() => {
    async function fetchData() {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    }
    fetchData();
  }, [getRandomColor]);

  return (
    <Layout title="Buzz">
      <div className="drip-container">
        {/* ✅ Left Drip (Starts First) */}
        <div 
          className="drip__drop left-drip" 
          style={{ "--random-color": dripColors.left }}
        ></div>

        {/* ✅ Right Drip (Starts 3s Later) */}
        <div 
          className="drip__drop right-drip" 
          style={{ "--random-color": dripColors.right }}
        ></div>

        <div style={{ textAlign: "center" }}>
          <br />
          <h2>Buzz</h2>
          <br />
        </div>

        <main className="Blog">
          <section className="section">
            <div className="container">
              <br />
              {/* ✅ Pass dynamically fetched articles as posts */}
              {articles.length > 0 ? (
                <PostSection posts={articles} />
              ) : (
                <p>Loading articles...</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
