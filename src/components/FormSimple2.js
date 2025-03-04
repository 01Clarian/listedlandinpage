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

  // ✅ Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Example: Send form data to an API endpoint
      console.log("Form submitted:", formData);
      
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong.");
    }
  };

  return (
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

      {/* ✅ Button with Color-Transition Effect */}
      <button
        name="contactSubmitButton"
        id="contactSubmitButton"
        type="submit"
        className="example_d" // ✅ Uses the correct animation class
      >
        <span>Send</span>
      </button>
    </form>
  );
};

export default FormSimple2;
