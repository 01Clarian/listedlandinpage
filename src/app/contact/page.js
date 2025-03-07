"use client"; // ✅ Ensure this is a Client Component

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { MapPin, Smartphone, Mail } from "react-feather";
import Layout from "@/components/Layout";
import FormSimple2 from "@/components/FormSimple2";
import Content from "@/components/Content";
import { getContactPage } from "@/lib/contentful"; // ✅ Fetch from Contentful
import "./contact-page.css";

export default function ContactPage() {
  // ✅ Define all states at the top
  const [contactData, setContactData] = useState(null);

  const colors = useMemo(() => [
    "#f9bebe", "#FF7F00", "#FFFF00", "#d8ffd8", "#8888f4", "#bd73f2", "#c482fa", "#FFFFFF"
  ], []);
  
  const getRandomColor = useCallback(() => {
    return colors[Math.floor(Math.random() * colors.length)];
  }, [colors]);

  const [dripColors, setDripColors] = useState({
    left: getRandomColor(),
    right: getRandomColor(),
  });

  useEffect(() => {
    async function fetchData() {
      const data = await getContactPage();
      setContactData(data);
    }

    fetchData();
  }, []); // ✅ Removed unnecessary `getRandomColor` dependency

  useEffect(() => {
    // ✅ Interval to update colors every fall cycle
    const colorInterval = setInterval(() => {
      setDripColors({
        left: getRandomColor(), // New color for left drip
        right: getRandomColor(), // New color for right drip
      });
    }, 6000); // Syncs with `drop-fall` animation

    return () => clearInterval(colorInterval);
  }, [getRandomColor]); // ✅ Dependency is now stable

  if (!contactData) {
    return (
      <Layout title="Contact">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Loading Contact Information...</h2>
        </div>
      </Layout>
    );
  }

  const { title, subtitle, body, address, phone, email } = contactData;

  return (
    <Layout title={title}>
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

        <main className="Contact">
          <section className="section Contact--Section1">
            <div className="container Contact--Section1--Container">
              <div>
                <h2>{title}</h2>
                {subtitle && <h3>{subtitle}</h3>}
                <Content source={body} />

                {/* Contact Details */}
                <div className="Contact--Details">
                  {address && (
                    <a
                      className="Contact--Details--Item"
                      href={`https://www.google.com/maps/search/${encodeURI(
                        address
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MapPin /> {address}
                    </a>
                  )}
                  {phone && (
                    <a className="Contact--Details--Item" href={`tel:${phone}`}>
                      <Smartphone /> {phone}
                    </a>
                  )}
                  {email && (
                    <a className="Contact--Details--Item" href={`mailto:${email}`}>
                      <Mail /> {email}
                    </a>
                  )}
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <FormSimple2 />
              </div>
            </div>
          </section>
        </main>
      </div>
    </Layout>
  );
}
