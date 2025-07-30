import { useRef, useState } from 'react';
import './styles/LandingPage.css';
import mapImage from './assets/images/map-preview.jpg';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function LandingPage() {
  const [form, setForm] = useState({ name: '', email: '', role: '' , comments: '' });
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef(null); // 👈 1. Create form ref

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, role ,comments} = form;

    const { error } = await supabase
      .from('waitlist')
      .insert([{ name, email, role, comments }]);

    if (error) {
      console.error('Supabase error:', error);
      alert('Something went wrong. Try again.');
      return;
    }

    setSubmitted(true);
  };

  const handleCTA = (role) => {
    setForm((prev) => ({ ...prev, role }));
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Speed J🍎bs ⍩⃝ . .</h1>
        <p>
          Hire or Get Hired—Fast, Flexible, and Nearby. Whether you need a helping hand or you're looking to earn, SpeedJobs connects job posters and seekers for short-term, part-time, and one-day gigs.
        </p>
        <br/>
        <p>
          A job a day keeps the bills away! 👻
        </p>
        <div className="cta-buttons">
          <button className="cta-seeker" onClick={() => handleCTA('job-seeker')}>I'm Looking for Work</button>
          <button className="cta-employer" onClick={() => handleCTA('employer')}>I'm Hiring</button>
          <button className="cta-both" onClick={() => handleCTA('both')}>I can do both</button>
        </div>
      </section>

      {/* Map Preview for Employers */}
      <section className="map-preview">
        <h2>Find Nearby Workers in Real Time</h2>
        <p>See available part-timers around your location, along with their ratings and skills. Hire instantly with confidence. Or do both!</p>
        <img src={mapImage} alt="Map preview with part-timer icons and ratings" className="map-image" />
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="columns">
          <div className="column">
            <h3>For Job Seekers</h3>
            <ul>
              <li>Browse nearby gigs</li>
              <li>Apply in one tap</li>
              <li>Get paid directly</li>
            </ul>
          </div>
          <div className="column">
            <h3>For Employers</h3>
            <ul>
              <li>Post a job in 1 minute</li>
              <li>Get matched with workers</li>
              <li>Manage hires from your dashboard</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Signup Form */}
      <section className="signup-form" ref={formRef}>
        <h2>Join the Waitlist</h2>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              required
            >
              <option value="">I'm interested in...</option>
              <option value="job-seeker">Looking for work</option>
              <option value="employer">Hiring help</option>
              <option value="both">I'd do both!</option>
            </select>
            <input
              name="comments"
              placeholder="Your comments (optional)"
              value={form.comments}
              onChange={handleChange}
            />
            <button type="submit">Join Now</button>
          </form>
        ) : (
          <div className="thank-you">
            Thank you for signing up! We'll notify you soon.
          </div>
        )}
      </section>

      {/* Footer */}
      <footer>
        © {new Date().getFullYear()} SpeedJobs. All rights reserved.
      </footer>
    </div>
  );
}
