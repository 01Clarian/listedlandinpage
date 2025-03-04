import React from "react";
import { MapPin, Smartphone, Mail } from "react-feather";
import Layout from "@/components/Layout";
import FormSimple2 from "@/components/FormSimple2";
import Content from "@/components/Content";
import { getContactPage } from "@/lib/contentful"; // ✅ Fetch from Contentful
import "./contact-page.css";

export default async function ContactPage() {
  // ✅ Fetch contact data dynamically
  const contactData = await getContactPage();

  if (!contactData) {
    return (
      <Layout title="Contact">
        <div style={{ textAlign: "center", padding: "50px" }}>
          <h2>Contact Information Not Available</h2>
          <p>Please check back later.</p>
        </div>
      </Layout>
    );
  }

  const { title, subtitle, body, address, phone, email } = contactData;

  return (
    <Layout title={title}>
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
    </Layout>
  );
}
