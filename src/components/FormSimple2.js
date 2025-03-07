"use client";

import React, { useState } from "react";
import "./form.css";

const FormSimple2 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "Type of Inquiry",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // ✅ State for Popup

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          type: "Type of Inquiry",
          message: "",
        });

        // ✅ Show Popup & Auto-Close After 3s
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <>
      {/* ✅ Popup Modal */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>✅ Message Sent!</h2>
            <p>Thank you for reaching out. We will get back to you soon.</p>
          </div>
        </div>
      )}

      <form className="Form" onSubmit={handleSubmit}>
        <label className="Form--Label" htmlFor="name"></label>
        <input
          style={{ color: "white" }}
          type="text"
          name="name"
          id="name"
          placeholder="Name"
          className="Form--Input"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="Form--Label" htmlFor="email"></label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="Form--Input"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="Form--Label has-arrow">
          <select
            className="Form--Input Form--Select"
            name="type"
            id="inquiry"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option disabled hidden>Type of Inquiry</option>
            <option>Bookings Inquiry</option>
            <option>Productions And Events</option>
            <option>General Inquiry</option>
          </select>
        </label>

        <label className="Form--Label" htmlFor="message"></label>
        <textarea
          name="message"
          id="message"
          placeholder="Message"
          className="Form--Input Form--Textarea"
          rows="10"
          value={formData.message}
          onChange={handleChange}
          required
        />

        <button
          name="contactSubmitButton"
          id="contactSubmitButton"
          type="submit"
          className="example_d"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Send"}
        </button>

        {status === "error" && <p className="error-message">❌ Something went wrong. Try again.</p>}
      </form>
    </>
  );
};

export default FormSimple2;
