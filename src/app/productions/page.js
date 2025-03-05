"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PageHeader from "@/components/PageHeader";
import Content from "@/components/Content";
import Gallery from "@/components/Gallery";
import Popup from "@/components/Popup";
import { getProductionsPage } from "@/lib/contentful"; // ✅ Fetch from Contentful
import "./productions-page.css";

// ✅ Productions Page Component
export default function ProductionsPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const pageData = await getProductionsPage();
      setData(pageData);
    }
    fetchData();
  }, []);

  if (!data) {
    return (
      <Layout title="Productions">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading...</h2>
        </div>
      </Layout>
    );
  }

  const {
    title,
    featuredImage,
    section1,
    section2,
    video,
    videoPoster,
    videoTitle,
    gallery,
  } = data;

  return (
    <Layout title={title}>
      <main className="Prod">
        {/* ✅ Page Header */}
        <PageHeader backgroundImage={featuredImage} />

        {/* ✅ Section 1 */}
        <section className="section">
          <div className="container">
            <Content source={section1} />
          </div>
        </section>

        {/* ✅ Background Video Section (Uncomment if needed) */}
        {/* <section className="BackgroundVideo-section section">
          <BackgroundVideo poster={videoPoster} videoTitle={videoTitle}>
            {video && <source src={video} type="video/mp4" />}
          </BackgroundVideo>
        </section> */}

        {/* ✅ Recent Events Gallery */}
        <section className="section marginFix">
          <div className="container">
            <h1>Recent Events Gallery</h1>
            <Gallery images={gallery} />
          </div>
        </section>

        {/* ✅ Section 2 */}
        <section className="section marginFix">
          <div className="container">
            <Content source={section2} />
          </div>
        </section>

        {/* ✅ Popup Section */}
        <section className="section marginFix">
          <div className="container">
            <Popup>
              <Content source={section1} />
            </Popup>
          </div>
        </section>
      </main>
    </Layout>
  );
}
