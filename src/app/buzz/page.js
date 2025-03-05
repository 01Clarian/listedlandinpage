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
    </Layout>
  );
}
