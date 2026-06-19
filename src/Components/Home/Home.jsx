


import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnimationBG from "../AnimationBG/AnimationBG.jsx";
import HomeNavbar from "../HomeNavbar/HomeNavbar.jsx";

/* ─── tiny hook: triggers when element enters viewport ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── data ─── */
const services = [
  {
    icon: "fa-solid fa-masks-theater",
    title: "Decoy Web Environments",
    desc: "Deploy fully customizable fake web pages — login portals, admin panels, API endpoints — that mimic your real systems and silently lure attackers into revealing their tactics.",
  },
  {
    icon: "fa-solid fa-magnifying-glass",
    title: "Behavioral Analysis",
    desc: "Every attacker interaction is captured and analyzed using rule-based detection and regex pattern matching, building a behavioral profile without relying on known signatures.",
  },
  {
    icon: "fa-solid fa-bolt",
    title: "Real-Time Alerting",
    desc: "Detected threats are instantly classified by severity — low, medium, high, or critical — and forwarded to your SOC team via Wazuh SIEM integration through Syslog.",
  },
  {
    icon: "fa-solid fa-chart-pie",
    title: "Intuitive Dashboard",
    desc: "A React-powered dashboard gives security analysts and SME owners clear visibility into sessions, attack trends, decoy health status, and exportable security reports.",
  },
  {
    icon: "fa-solid fa-link",
    title: "SIEM / SOC Integration",
    desc: "Structured JSON logs are normalized and forwarded to Wazuh, enabling correlation, alert classification, and deep investigation through the Discover feature.",
  },
  {
    icon: "fa-brands fa-docker",
    title: "Flexible Deployment",
    desc: "Ship Decopia as a SaaS multi-tenant solution or deploy it on your own server via Docker containers — no enterprise infrastructure required.",
  },
];

const stats = [
  { label: "Attack Vectors Detected", value: "6+" },
  { label: "Deployment Options", value: "2" },
  { label: "Market CAGR (MEA)", value: "13.7%" },
  { label: "Target Segment", value: "SMEs" },
];

const teamValues = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Proactive Defense",
    desc: "We believe security shouldn't be reactive. Decopia catches attackers during reconnaissance — before damage occurs.",
  },
  {
    icon: "fa-solid fa-lightbulb",
    title: "Simplicity First",
    desc: "Complex threat intelligence, made simple. Our dashboard translates raw attacker data into clear business insights.",
  },
  {
    icon: "fa-solid fa-earth-africa",
    title: "Built for MENA",
    desc: "Designed with the Middle East and Africa region in mind — regional threat intelligence, local support, and SME-friendly pricing.",
  },
];

/* ─── reusable fade-in wrapper ─── */
function Reveal({ children, delay = 0, direction = "up" }) {
  const [ref, visible] = useReveal();
  const transform = {
    up: "translateY(40px)",
    left: "translateX(-40px)",
    right: "translateX(40px)",
  }[direction];

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : transform,
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── main component ─── */
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#0a0a1a] text-white overflow-x-hidden">
      <AnimationBG />
      <HomeNavbar />

      {/* ══════════════ HERO ══════════════ */}
      <section
        id="home"
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24"
      >
        <Reveal delay={0}>
          <span className="inline-block mb-4 px-4 py-1 rounded-full border border-teal-500/40 text-teal-400 text-sm tracking-widest uppercase">
            Cybersecurity · Deception Technology
          </span>
        </Reveal>

        <Reveal delay={150}>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-white via-cyan-100 to-teal-400 bg-clip-text text-transparent">
            Decopia Security
          </h1>
        </Reveal>

        <Reveal delay={300}>
          <p className="text-3xl font-bold md:text-3xl  mb-4 ">
            Know Your Attackers Before They Know You
          </p>
        </Reveal>

        <Reveal delay={450}>
          <p className="text-gray-400 max-w-4xl  mx-auto mb-10 text-lg leading-relaxed">
            A lightweight web deception platform designed for SMEs — deploy realistic
            decoys, capture attacker behavior, and get actionable security insights in
            real time.
          </p>
        </Reveal>

        <Reveal delay={550}>
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => navigate("/login")}
              className="bg-teal-500 hover:bg-teal-400 transition-all duration-300 text-white font-medium rounded-lg px-8 py-3 text-base cursor-pointer hover:shadow-lg hover:shadow-teal-500/25 hover:-translate-y-0.5"
            >
              Login Now
            </button>
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="border border-teal-500/60 text-teal-400 hover:bg-teal-500/10 transition-all duration-300 font-medium rounded-lg px-8 py-3 text-base cursor-pointer hover:-translate-y-0.5"
            >
              Learn More ↓
            </button>
          </div>
        </Reveal>

        {/* Stats row */}
        <Reveal delay={700}>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div
                key={i}
                className="bg-white/5 border border-teal-900/40 rounded-xl p-4 backdrop-blur-sm"
              >
                <p className="text-2xl font-bold text-teal-400">{s.value}</p>
                <p className="text-gray-400 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Scroll cue */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-teal-500/60">
          <i className="fa-solid fa-chevron-down text-2xl"></i>
        </div>
      </section>

      {/* ══════════════ ABOUT ══════════════ */}
      <section id="about" className="relative py-24 px-4">
        {/* subtle glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-teal-400 text-sm uppercase tracking-widest">About Decopia</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
                What is{" "}
                <span className="text-teal-400">Decopia?</span>
              </h2>
              <p className="text-gray-400 max-w-4xl mx-auto text-lg">
                Decopia is a web-based deception and behavioral analysis platform tailored to the
                security needs of Small and Medium-Sized Enterprises.
              </p>
            </div>
          </Reveal>

          {/* Two-column: text + visual card */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <Reveal direction="left">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-white">The Problem</h3>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Organizations face a rapidly widening gap between increasingly sophisticated
                  attackers and their ability to detect real attack behavior — especially at the
                  web application layer. Traditional firewalls and signature-based tools frequently
                  miss early-stage or zero-day attacks.
                </p>
                <h3 className="text-2xl font-semibold mb-4 text-white">Our Solution</h3>
                <p className="text-gray-400 leading-relaxed">
                  Decopia deploys realistic decoy web pages that lure malicious actors and capture
                  their actions in real time. Instead of blocking known threats, we analyze
                  <em className="text-teal-300"> how</em> attackers behave — payloads, navigation
                  patterns, session flows — and surface actionable insights through an intuitive
                  dashboard.
                </p>
              </div>
            </Reveal>

            <Reveal direction="right" delay={150}>
              <div className="bg-white/5 border border-teal-900/40 rounded-2xl p-8 backdrop-blur-sm space-y-5">
                {[
                  { label: "Detection method", value: "Behavioral + Rule-based" },
                  { label: "Frontend", value: "React.js + Tailwind CSS" },
                  { label: "Backend", value: "ASP.NET Core Web API" },
                  { label: "SIEM Integration", value: "Wazuh (Open-source)" },
                  // { label: "Deployment", value: "SaaS or Docker container" },
                  { label: "Target market", value: "SMEs — Egypt & GCC" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-white/10 pb-3 last:border-0 last:pb-0">
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="text-teal-300 text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Values row */}
          <div className="grid md:grid-cols-3 gap-6">
            {teamValues.map((v, i) => (
              <Reveal key={i} delay={i * 120}>
                <div className="group bg-white/5 border border-teal-900/40 hover:border-teal-500/50 rounded-2xl p-7 transition-all duration-300 hover:bg-teal-500/5 hover:-translate-y-1">
                  <i className={`${v.icon} text-3xl text-teal-400 mb-4 block`}></i>
                  <h4 className="text-lg font-semibold text-white mb-2">{v.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" className="relative py-24 px-4">
        <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-teal-400 text-sm uppercase tracking-widest">What We Offer</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
                Our <span className="text-teal-400">Services</span>
              </h2>
              <p className="text-gray-400 max-w-4xl mx-auto text-lg">
                Everything an SME needs to gain early visibility into attackers — without
                enterprise-level complexity or cost.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative bg-white/5 border border-teal-900/40 hover:border-teal-500/60 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-2 hover:bg-teal-500/5 overflow-hidden">
                  {/* corner accent */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-teal-500/5 rounded-bl-full transition-all duration-300 group-hover:bg-teal-500/10" />

                  <i className={`${svc.icon} text-3xl text-teal-400 mb-5 block`}></i>
                  <h4 className="text-lg font-semibold text-white mb-3">{svc.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{svc.desc}</p>

                  {/* bottom line animation */}
                  <div className="mt-5 h-0.5 w-0 bg-teal-500 rounded-full transition-all duration-500 group-hover:w-full" />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pricing teaser */}
          {/* <Reveal delay={200}> */}
            {/* <div className="mt-16 grid md:grid-cols-3 gap-6">
              {[
                { plan: "Basic", price: "$99/mo", features: ["1 decoy page", "Real-time alerts", "Email support", "Basic dashboard"] },
                { plan: "Plus", price: "$299/mo", features: ["5 decoy pages", "SIEM integration", "Priority support", "Full analytics"], popular: true },
                { plan: "Enterprise", price: "$999+/mo", features: ["Unlimited decoys", "Custom deployment", "Dedicated SOC", "White-label option"] },
              ].map((tier, i) => (
                <div
                  key={i}
                  className={`relative rounded-2xl p-7 border transition-all duration-300 hover:-translate-y-1 ${
                    tier.popular
                      ? "border-teal-400 bg-teal-500/10"
                      : "border-teal-900/40 bg-white/5"
                  }`}
                >
                  {tier.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-teal-500 text-white text-xs px-4 py-1 rounded-full whitespace-nowrap">
                      Most Popular
                    </span>
                  )}
                  <p className="text-gray-400 text-sm mb-1">{tier.plan}</p>
                  <p className="text-3xl font-bold text-white mb-6">{tier.price}</p>
                  <ul className="space-y-2">
                    {tier.features.map((f, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                        <i className="fa-solid fa-check text-teal-400"></i> {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => navigate("/login")}
                    className={`mt-7 w-full py-2.5 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                      tier.popular
                        ? "bg-teal-500 hover:bg-teal-400 text-white"
                        : "border border-teal-500/50 text-teal-400 hover:bg-teal-500/10"
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              ))}
            </div>
          </Reveal> */}
        </div>
      </section>

      {/* ══════════════ CONTACT ══════════════ */}
      <section id="contact" className="relative py-24 px-4">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-screen-xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <span className="text-teal-400 text-sm uppercase tracking-widest">Get In Touch</span>
              <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-4">
                Contact <span className="text-teal-400">Us</span>
              </h2>
              <p className="text-gray-400 max-w-xl mx-auto text-lg">
                Interested in joining the beta or learning more? Reach out and we'll get back to you within 24 hours.
              </p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
            {/* Left: info */}
            <Reveal direction="left">
              <div className="space-y-8">
                {[
                  { icon: "fa-solid fa-location-dot", label: "Location", value: "Fayoum University, Egypt" },
                  { icon: "fa-solid fa-envelope", label: "Email", value: "contact@decopia.io" },
                  { icon: "fa-solid fa-earth-africa", label: "Market", value: "Egypt · KSA · UAE · GCC" },
                  { icon: "fa-solid fa-handshake", label: "Partnerships", value: "Open to MSSPs & SOCs" },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <i className={`${item.icon} text-2xl text-teal-400 mt-0.5 w-6 text-center`}></i>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest">{item.label}</p>
                      <p className="text-white font-medium mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Right: form */}
            <Reveal direction="right" delay={150}>
              <div className="bg-white/5 border border-teal-900/40 rounded-2xl p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full bg-white/5 border border-teal-900/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-teal-500 transition-colors duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Email</label>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full bg-white/5 border border-teal-900/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-teal-500 transition-colors duration-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1 block">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us about your security needs..."
                      className="w-full bg-white/5 border border-teal-900/40 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:ring-0 focus:border-teal-500 transition-colors duration-200 text-sm resize-none"
                    />
                  </div>
                  <button
                    type="button"
                    className="w-full bg-teal-500 hover:bg-teal-400 transition-all duration-300 text-white font-medium rounded-lg py-3 cursor-pointer hover:shadow-lg hover:shadow-teal-500/25"
                  >
                    Send Message →
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="border-t border-teal-900/30 py-8 px-4 text-center">
        <p className="text-gray-600 text-sm">
          © {new Date().getFullYear()} Decopia · Fayoum University ·{" "}
          <span className="text-teal-700">Know Your Attackers Before They Know You</span>
        </p>
      </footer>
    </div>
  );
}