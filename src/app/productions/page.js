"use client"; // ✅ Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import Image from "next/image"; // ✅ Import Next.js Image
import Layout from "@/components/Layout";
import Content from "@/components/Content";
import "./productions.css";
import { getProductionsPage } from "@/lib/contentful";

console.log("🔥 Top-Level Code: ProductionsPage.js is being parsed...");

export default function ProductionsPage() {
  console.log("🔥 ProductionsPage component is mounting...");

  const [data, setData] = useState(null);
  const colors = ["#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8", "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"];
  const [dripColors, setDripColors] = useState({ left: "", right: "" });

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

  // ✅ Generate and set random colors **after hydration**
  useEffect(() => {
    setDripColors({
      left: colors[Math.floor(Math.random() * colors.length)],
      right: colors[Math.floor(Math.random() * colors.length)],
    });
  }, [colors]);

  if (!data) {
    console.warn("⏳ Data is still loading...");
    return (
      <Layout title="Productions">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2 className="glowing-text">Loading...</h2>
        </div>
      </Layout>
    );
  }

  console.log("✅ Rendering ProductionsPage with data:", data);

  return (
    <Layout title={data.title}>
      <div className="drip-container">
        {/* ✅ Left Side Drips */}
        <div className="drip__drop left-drip" style={{ backgroundColor: dripColors.left }}></div>

        {/* ✅ Right Side Drips */}
        <div className="drip__drop right-drip" style={{ backgroundColor: dripColors.right }}></div>

        <main className="Prod">
          {/* ✅ Video Section with Safari-Compatible Embed Handling */}
          {data.video && (
            <section className="section video-section">
              <div className="container" style={{ textAlign: "center" }}>
                <h2>{data.videoTitle}</h2>
                <div className="video-wrapper">
                  <iframe
                    src={data.video}
                    width="100%"
                    height="500"
                    allowFullScreen
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    referrerPolicy="no-referrer-when-downgrade"
                    onError={(e) => console.warn("Safari iframe block detected", e)}
                    style={{
                      border: "none",
                      display: "block",
                      margin: "0 auto",
                      backgroundColor: "black",
                    }}
                  ></iframe>
                </div>
              </div>
            </section>
          )}

          {/* ✅ Section 1 */}
          <section className="section">
            <div className="container">
              <Content source={data.section1} />
            </div>
          </section>

          {/* ✅ Gallery Image (Updated with Safari Compatibility) */}
          {data.gallery && (
            <section className="section marginFix">
              <div className="container">
                <h1>Recent Events Gallery</h1>
                <figure className="Gallery--Item">
                  <div style={{ position: "relative", width: "100%", height: "500px", borderRadius: "10px", overflow: "hidden" }}>
                    <Image
                      src={data.gallery.image.startsWith("http") ? data.gallery.image : "/fallback.jpg"}
                      alt={data.gallery.alt || "Gallery Image"}
                      fill // ✅ Ensures full coverage
                      style={{ objectFit: "cover" }} // ✅ Prevents cropping
                      priority
                      crossOrigin="anonymous" // ✅ Safari Compatibility
                    />
                  </div>
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
