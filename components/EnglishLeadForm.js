"use client";

import { useState } from "react";
import { enquiryCities, englishEnquiryUrl } from "../lib/english-enquiry";

export default function EnglishLeadForm({ city = "", service }) {
  const [form, setForm] = useState({ city, district: "", housing: "Apartment" });
  const [error, setError] = useState("");

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  }

  function send(event) {
    event.preventDefault();
    if (!form.district.trim()) {
      setError("Please enter your area or neighbourhood.");
      return;
    }
    window.location.assign(englishEnquiryUrl({ ...form, service }));
  }

  return (
    <form className="en-enquiry" onSubmit={send}>
      <span className="en-kicker">Start with an address check</span>
      <h2>Tell us about your home</h2>
      <p>Send your enquiry on WhatsApp. No payment or ID upload is needed here.</p>
      <label htmlFor="en-city">City</label>
      <select id="en-city" name="city" value={form.city} onChange={update} required>
        <option value="" disabled>Select your city</option>
        {enquiryCities.map((name) => <option key={name}>{name}</option>)}
      </select>
      <label htmlFor="en-housing">Housing type</label>
      <select id="en-housing" name="housing" value={form.housing} onChange={update}>
        <option>Apartment</option>
        <option>Furnished apartment</option>
        <option>Compound residence</option>
        <option>Villa / house</option>
      </select>
      <label htmlFor="en-district">Area / neighbourhood</label>
      <input id="en-district" name="district" value={form.district} onChange={update} placeholder="Enter your area" autoComplete="address-level3" maxLength={150} required aria-invalid={Boolean(error)} aria-describedby={error ? "en-form-error" : undefined} />
      {error && <p id="en-form-error" className="en-error" role="alert">{error}</p>}
      <button type="submit" className="en-button en-button-wa">Send on WhatsApp <span aria-hidden="true">↗</span></button>
      <span className="en-form-note">Share a building map pin in the conversation to help us get your enquiry started.</span>
    </form>
  );
}
