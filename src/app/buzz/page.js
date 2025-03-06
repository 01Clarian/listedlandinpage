"use client";

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import PostSection from "@/components/PostSection";
import { getArticles } from "@/lib/contentful"; // ✅ Fetch articles
import "./buzz-page.css";

export default function BuzzPage() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedArticles = await getArticles();
      setArticles(fetchedArticles);
    }
    fetchData();
  }, []);

  return (
    <Layout title="Buzz">
      <div className="drip-container">
        {/* ✅ Left Side Drips */}
        {[...Array(3)].map((_, i) => (
          <div key={`left-drip-${i}`} className="drip__drop left-drip"></div>
        ))}

        {/* ✅ Right Side Drips */}
        {[...Array(3)].map((_, i) => (
          <div key={`right-drip-${i}`} className="drip__drop right-drip"></div>
        ))}

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
