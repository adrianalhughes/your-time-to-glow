import { useState } from "react";
import "./App.css";

const intents = [
  "look less tired",
  "reduce fine lines",
  "get fuller lips",
  "even my skin tone",
  "tighten my skin",
  "remove dark spots",
];

const treatments = {
  "look less tired": [
    { name: "Botox / Neurotoxin", top: true, desc: "Relaxes muscles that cause dynamic wrinkles and a tired appearance. Results in 3–7 days, lasts 3–4 months.", cost: "$300–600", downtime: "None", sessions: "1" },
    { name: "Under-eye filler", top: false, desc: "Hyaluronic acid filler placed under the eyes to reduce hollowing and dark shadows. One of the most impactful treatments for a tired look.", cost: "$600–900", downtime: "1–3 days", sessions: "1" },
    { name: "Skin booster (Sculptra / Radiesse)", top: false, desc: "Stimulates collagen production for an overall refreshed, glowing appearance. Addresses volume loss that contributes to fatigue.", cost: "$800–1500", downtime: "Minimal", sessions: "2–3" },
  ],
  "reduce fine lines": [
    { name: "Botox / Neurotoxin", top: true, desc: "Targets dynamic lines caused by muscle movement — forehead, crow's feet, and the 11s between the brows.", cost: "$300–600", downtime: "None", sessions: "1" },
    { name: "Microneedling", top: false, desc: "Stimulates collagen and elastin production to smooth skin texture and soften fine lines over time.", cost: "$200–700", downtime: "1–3 days", sessions: "3–6" },
  ],
  "get fuller lips": [
    { name: "Lip filler (Hyaluronic acid)", top: true, desc: "Adds volume, definition, and hydration to the lips. Results are immediate and last 6–12 months.", cost: "$500–900", downtime: "1–3 days", sessions: "1" },
  ],
  "even my skin tone": [
    { name: "IPL / Photofacial", top: true, desc: "Intense pulsed light targets pigmentation, sun damage, and redness for a more even, luminous complexion.", cost: "$300–600", downtime: "3–5 days", sessions: "3–5" },
    { name: "Chemical peel", top: false, desc: "Exfoliates the top layers of skin to reduce hyperpigmentation, dark spots, and uneven texture.", cost: "$150–300", downtime: "3–7 days", sessions: "1–3" },
  ],
  "tighten my skin": [
    { name: "Ultherapy / Sofwave", top: true, desc: "Uses ultrasound or radiofrequency energy to stimulate deep collagen production and lift skin non-surgically.", cost: "$1500–3500", downtime: "Minimal", sessions: "1–2" },
    { name: "Morpheus8 (RF Microneedling)", top: false, desc: "Combines microneedling with radiofrequency energy to remodel collagen and tighten skin from the inside out.", cost: "$800–2000", downtime: "3–5 days", sessions: "3" },
  ],
  "remove dark spots": [
    { name: "IPL / Photofacial", top: true, desc: "The gold standard for targeting melanin-based pigmentation including sun spots, age spots, and melasma.", cost: "$300–600", downtime: "3–5 days", sessions: "3–5" },
    { name: "Laser resurfacing (Halo / Moxi)", top: false, desc: "Fractional laser treatment that targets pigmentation and resurfaces skin for a dramatically more even tone.", cost: "$800–2500", downtime: "3–7 days", sessions: "1–3" },
  ],
};

const blogPosts = [
  { tag: "Patient guide", title: "Questions worth asking your aesthetics provider", meta: "4 min read · Consultations" },
  { tag: "Treatments", title: "Botox vs. Dysport — what is actually different?", meta: "4 min read · Neurotoxins" },
  { tag: "Guides", title: "5 signs you are ready for filler", meta: "3 min read · Fillers" },
  { tag: "Clinical insight", title: "How your medications affect aesthetic treatment candidacy", meta: "6 min read · Safety · Your Pharmacist perspective" },
];

export default function App() {
  const [view, setView] = useState("tool");
  const [path, setPath] = useState("intent");
  const [intentValue, setIntentValue] = useState("");
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    const key = intentValue.trim().toLowerCase();
    const matched = treatments[key] || treatments["look less tired"];
    setResults({ intent: intentValue || "look less tired", items: matched });
  };

  return (
    <div className="app">
      <div className="brand">
        <div className="brand-name">Your Time to <span className="brand-accent">Glow</span></div>
        <div className="brand-tag">Personalized aesthetic treatment guidance</div>
      </div>
      <div className="glow-bar" />

      <nav className="nav">
        {[["tool","Find a treatment"],["blog","Learn"],["providers","Find providers"]].map(([v,label]) => (
          <button key={v} className={`nav-btn${view===v?" active":""}`} onClick={() => { setView(v); setResults(null); }}>{label}</button>
        ))}
      </nav>

      {view === "tool" && (
        <div>
          <div className="section-label">Choose your path</div>
          <div className={`path-card${path==="intent"?" active":""}`} onClick={() => { setPath("intent"); setResults(null); }}>
            {path==="intent" && <span className="active-dot" />}
            <span className="path-title">I want to...</span>
            <div className="path-desc">Tell us your goal and we will match you to treatments</div>
          </div>
          <div className={`path-card${path==="photo"?" active":""}`} onClick={() => { setPath("photo"); setResults(null); }}>
            {path==="photo" && <span className="active-dot" />}
            <span className="path-title">Analyze my skin</span>
            <div className="path-desc">Take or upload a photo for a personalized skin assessment</div>
          </div>

          {path === "intent" && (
            <div className="intent-section">
              <div className="intent-input-wrap">
                <span className="intent-prefix">I want to</span>
                <input className="intent-input" placeholder="look less tired..." value={intentValue} onChange={e => setIntentValue(e.target.value)} />
              </div>
              <div className="chips">
                {intents.map(i => <div key={i} className="chip" onClick={() => setIntentValue(i)}>{i}</div>)}
              </div>
            </div>
          )}

          {path === "photo" && (
            <div className="photo-zone">
              <svg viewBox="0 0 24 24" className="photo-icon" fill="none" stroke="#C9922A" strokeWidth="1.5">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <div className="photo-label">Tap to open camera</div>
              <div className="photo-sub">or upload a photo from your library</div>
            </div>
          )}

          <button className="analyze-btn" onClick={handleAnalyze}>
            {path==="photo" ? "Analyze my skin" : "Find my treatments"}
          </button>

          {results && (
            <div className="results">
              <div className="divider" />
              <div className="section-label">Recommended for you</div>
              <div className="concern-tag">Based on: I want to {results.intent}</div>
              {results.items.map(t => (
                <div key={t.name} className="result-card">
                  <div className="result-header">
                    <div className="result-name">{t.name}</div>
                    {t.top && <div className="result-badge">Top match</div>}
                  </div>
                  <div className="result-desc">{t.desc}</div>
                  <div className="result-meta">
                    <div className="meta-item">Cost <span className="meta-val">{t.cost}</span></div>
                    <div className="meta-item">Downtime <span className="meta-val">{t.downtime}</span></div>
                    <div className="meta-item">Sessions <span className="meta-val">{t.sessions}</span></div>
                  </div>
                  <button className="find-btn">Find a provider near me</button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {view === "blog" && (
        <div>
          <div className="section-label">The Glow Journal</div>
          {blogPosts.map(p => (
            <div key={p.title} className="blog-card">
              <div className="blog-tag">{p.tag}</div>
              <div className="blog-title">{p.title}</div>
              <div className="blog-meta">{p.meta}</div>
            </div>
          ))}
        </div>
      )}

      {view === "providers" && (
        <div>
          <div className="section-label">Find a provider</div>
          <div className="provider-placeholder">
            <div className="provider-text">Provider directory coming soon</div>
            <div className="provider-sub">Are you a provider? Get listed free during our launch.</div>
            <button className="analyze-btn" style={{marginTop:"1rem"}}>Apply for free listing</button>
          </div>
        </div>
      )}
    </div>
  );
}
