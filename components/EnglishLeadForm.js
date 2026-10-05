"use client";

import { useRef, useState } from "react";
import { trackEvent } from "../lib/tracking";
import { enquiryCities, englishEnquiryUrl } from "../lib/english-enquiry";

export default function EnglishLeadForm({ city = "", service }) {
  const [form, setForm] = useState({ city, otherCity: "", district: "", housing: "Apartment" });
  const [error, setError] = useState("");
  const started = useRef(false);

  function start() {
    if (started.current) return;
    started.current = true;
    trackEvent("coverage_check_start", { page_path: window.location.pathname, language: "en-SA" });
  }

  function update(event) {
    setForm({ ...form, [event.target.name]: event.target.value, ...(event.target.name === "city" && { otherCity: "" }) });
    setError("");
  }

  function send(event) {
    event.preventDefault();
    if (form.city === "other" && (form.otherCity.trim().length < 2 || form.otherCity.trim().length > 100)) {
      setError("Please enter a city or governorate name (2–100 characters).");
      return;
    }
    if (!form.district.trim()) {
      setError("Please enter your area or neighbourhood.");
      return;
    }
    trackEvent("coverage_check_submit", { page_path: window.location.pathname, language: "en-SA", channel: "whatsapp" });
    trackEvent("click_whatsapp", { page_path: window.location.pathname, channel: "enquiry_form" });
    window.location.assign(englishEnquiryUrl({ ...form, service }));
  }

  return (
    <form className="en-enquiry" onSubmit={send} onFocus={start}>
      <span className="en-kicker">Start with an address check</span>
      <h2>Tell us about your home</h2>
      <p>Send your enquiry on WhatsApp. No payment or ID upload is needed here.</p>
      <label htmlFor="en-city">City</label>
      <select id="en-city" name="city" value={form.city} onChange={update} required>
        <option value="" disabled>Select your city</option>
        {enquiryCities.map((name) => <option key={name}>{name}</option>)}
        <option value="other">Other city or governorate / مدينة أو محافظة أخرى</option>
      </select>
      {form.city === "other" && <>
        <label htmlFor="en-other-city">City or governorate name</label>
        <input id="en-other-city" name="otherCity" value={form.otherCity} onChange={update} autoComplete="address-level2" required minLength={2} maxLength={100} />
      </>}
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
