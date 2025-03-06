"use client"; // ✅ Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import Content from "@/components/Content";
import Popup from "@/components/Popup";
import "./productions.css";
import { getProductionsPage } from "@/lib/contentful";

console.log("🔥 Top-Level Code: ProductionsPage.js is being parsed...");

export default function ProductionsPage() {
  console.log("🔥 ProductionsPage component is mounting...");

  const [data, setData] = useState(null);
  const colors = ["#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8", "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"];

  useEffect(() => {
    console.log("🔥 useEffect is running...");

    async function fetchData() {
      try {
        console.log("🔥 Fetching Productions Data...");
        const pageData = await getProductionsPage();

        if (pageData) {
          console.log("✅ Data Received in ProductionsPage:", pageData);
          setData(pageData);
        } else {
          console.warn("⚠️ No Data Found from Contentful!");
        }
      } catch (error) {
        console.error("❌ Error inside fetchData:", error);
      }
    }

    fetchData();
  }, []);

  const getRandomColor = () => colors[Math.floor(Math.random() * colors.length)];

  if (!data) {
    console.warn("⏳ Data is still loading...");
    return (
      <Layout title="Productions">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  console.log("✅ Rendering ProductionsPage with data:", data);

  return (
    <Layout title={data.title}>
      <div className="drip-container">
        {/* ✅ Left Side Drips (Each with a Random Color) */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`left-drip-${i}`} 
            className="drip__drop left-drip" 
            style={{ "--random-color": getRandomColor() }}
          ></div>
        ))}

        {/* ✅ Right Side Drips (Each with a Random Color) */}
        {[...Array(3)].map((_, i) => (
          <div 
            key={`right-drip-${i}`} 
            className="drip__drop right-drip" 
            style={{ "--random-color": getRandomColor() }}
          ></div>
        ))}

        <main className="Prod">
          {/* ✅ Video Section */}
          {data.video && (
            <section className="section video-section">
              <div className="container" style={{ textAlign: "center" }}>
                <h2>{data.videoTitle}</h2>
                <video width="100%" height="500" controls>
                  <source src={data.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </section>
          )}

          {/* ✅ Section 1 */}
          <section className="section">
            <div className="container">
              <Content source={data.section1} />
            </div>
          </section>

          {/* ✅ Gallery Image (Handled Directly Here Instead of Using `Gallery.js`) */}
          {data.gallery && (
            <section className="section marginFix">
              <div className="container">
                <h1>Recent Events Gallery</h1>
                <figure className="Gallery--Item">
                  <img src={data.gallery.image} alt={data.gallery.alt} style={{ width: "100%", borderRadius: "10px" }} />
                  {data.gallery.title && <figcaption>{data.gallery.title}</figcaption>}
                </figure>
              </div>
            </section>
          )}

          {/* ✅ Section 2 */}
          <section className="section marginFix">
            <div className="container">
              <Content source={data.section2} />
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
