import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

// ─── REVEAL WRAPPER ───────────────────────────────────────────────
function Reveal({ children, delay = 0, y = 40, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

// ─── MARQUEE ──────────────────────────────────────────────────────
const MARQUEE_ITEMS = [
  "Strategie", "Content Creation", "Copywriting",
  "Social Media Management", "Audit & Analiza", "Lead Generation",
];

function Marquee() {
  const doubled = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <div style={{
      borderTop: "1px solid rgba(255,255,255,0.08)",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      background: "#141412",
      overflow: "hidden",
      padding: "18px 0",
    }}>
      <motion.div
        style={{ display: "flex", whiteSpace: "nowrap" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 22, ease: "linear" }}
      >
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 28, padding: "0 44px" }}>
            <span style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6860" }}>
              {item}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "#9B9890", flexShrink: 0, display: "inline-block" }} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────
function Nav({ scrollY }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const unsub = scrollY.on("change", v => setScrolled(v > 60));
    return unsub;
  }, [scrollY]);

  return (
    <motion.nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
        padding: "28px 60px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        background: scrolled ? "rgba(12,12,11,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        transition: "background 0.4s, backdrop-filter 0.4s",
      }}
    >
      <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "0.06em", color: "#fff", textDecoration: "none" }}>
        <span style={{ color: "#C8C2B4" }}>I'</span>MSL Creative
      </a>
      <div style={{ display: "flex", gap: 40 }}>
        {["Servicii", "Portofoliu", "Proces"].map(link => (
          <a key={link} href={`#${link.toLowerCase()}`} style={{ color: "#6B6860", textDecoration: "none", fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "color 0.3s" }}
            onMouseEnter={e => e.target.style.color = "#F5F0E8"}
            onMouseLeave={e => e.target.style.color = "#6B6860"}
          >{link}</a>
        ))}
      </div>
      <a href="#contact" style={{
        background: "transparent", border: "1px solid rgba(255,255,255,0.2)", color: "#C8C2B4",
        padding: "10px 24px", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
        textDecoration: "none", transition: "all 0.3s",
      }}
        onMouseEnter={e => { e.target.style.background = "#F5F0E8"; e.target.style.color = "#0C0C0B"; }}
        onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = "#C8C2B4"; }}
      >Hai sa vorbim</a>
    </motion.nav>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────
function Hero({ scrollYProgress }) {
  const y = useTransform(scrollYProgress, [0, 0.25], [0, -120]);
  const opacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);

  const lines = [
    { text: "Social", color: "#fff", italic: false, delay: 0.5 },
    { text: "media care", color: "#C8C2B4", italic: true, delay: 0.72 },
    { text: "vinde.", color: "#fff", italic: false, delay: 0.94 },
  ];

  return (
    <motion.section style={{ y, opacity, position: "relative", height: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 60px", overflow: "hidden" }}>
      {/* Grain */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`, opacity: 0.35, pointerEvents: "none", zIndex: 1 }} />

      {/* Tag */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        style={{ fontSize: "0.68rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#9B9890", border: "1px solid rgba(255,255,255,0.15)", padding: "7px 18px", marginBottom: 44, display: "inline-block", position: "relative", zIndex: 2 }}
      >
        Social Media that Sells
      </motion.div>

      {/* Title */}
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(4.5rem, 9vw, 9.5rem)", fontWeight: 900, lineHeight: 0.92, overflow: "hidden", position: "relative", zIndex: 2 }}>
        {lines.map(({ text, color, italic, delay }) => (
          <motion.span key={text} style={{ display: "block", color, fontStyle: italic ? "italic" : "normal" }}
            initial={{ opacity: 0, y: "100%" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
          >{text}</motion.span>
        ))}
      </h1>

      {/* Sub */}
      <motion.p
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        style={{ marginTop: 48, fontSize: "0.98rem", color: "#6B6860", maxWidth: 360, lineHeight: 1.8, fontWeight: 300, position: "relative", zIndex: 2 }}
      >
        Nu facem continut de dragul contentului. Construim prezente digitale care transforma followeri in clienti.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.6 }}
        style={{ display: "flex", gap: 20, marginTop: 52, position: "relative", zIndex: 2 }}
      >
        <a href="#portofoliu" style={{ background: "#F5F0E8", color: "#0C0C0B", border: "none", padding: "16px 44px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
          onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.transform = "translateY(-2px)"; }}
          onMouseLeave={e => { e.target.style.background = "#F5F0E8"; e.target.style.transform = "translateY(0)"; }}
        >Vezi rezultate</a>
        <a href="#contact" style={{ background: "transparent", color: "#9B9890", border: "1px solid rgba(255,255,255,0.12)", padding: "16px 44px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
          onMouseEnter={e => { e.target.style.color = "#F5F0E8"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
          onMouseLeave={e => { e.target.style.color = "#9B9890"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
        >Hai sa vorbim</a>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.9 }}
        style={{ position: "absolute", right: 60, bottom: 60, display: "flex", flexDirection: "column", gap: 28, zIndex: 2 }}
      >
        {[{ num: "+31k", label: "Followeri noi" }, { num: "4.2%", label: "Engagement rate" }, { num: "20+", label: "Leaduri / luna" }].map(({ num, label }) => (
          <div key={label} style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.6rem", fontWeight: 700, color: "#C8C2B4", lineHeight: 1 }}>{num}</div>
            <div style={{ fontSize: "0.62rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#6B6860", marginTop: 5 }}>{label}</div>
          </div>
        ))}
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 2.1 }}
        style={{ position: "absolute", bottom: 44, left: 60, display: "flex", alignItems: "center", gap: 14, zIndex: 2 }}
      >
        <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.15)", position: "relative", overflow: "hidden" }}>
          <motion.div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "#C8C2B4" }}
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          />
        </div>
        <span style={{ fontSize: "0.62rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#6B6860" }}>Scroll</span>
      </motion.div>
    </motion.section>
  );
}

// ─── STICKY CINEMATIC IMAGE ────────────────────────────────────────
function StickyImage({ scrollYProgress }) {
  const scale = useTransform(scrollYProgress, [0.18, 0.55], [1, 1.18]);
  const textOpacity = useTransform(scrollYProgress, [0.32, 0.52], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.32, 0.52], [30, 0]);
  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0.2, 0.65]);

  return (
    <section style={{ height: "200vh", position: "relative" }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}>
        <motion.div style={{ scale, width: "100%", height: "100%", transformOrigin: "center center" }}>
          {/* Placeholder elegant invece di immagine */}
          <div style={{
            width: "100%", height: "100%",
            background: "linear-gradient(135deg, #1a1a17 0%, #252520 40%, #1C1C19 100%)",
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 32,
          }}>
            {/* Grid elegante come placeholder */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2, width: 480, opacity: 0.25 }}>
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} style={{ height: 160, background: i === 4 ? "#C8C2B4" : "#2a2a27", border: "1px solid rgba(255,255,255,0.04)" }} />
              ))}
            </div>
            <span style={{ fontSize: "0.6rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#3a3a37" }}>Imaginea ta de impact</span>
          </div>
        </motion.div>

        {/* Dark overlay */}
        <motion.div style={{ position: "absolute", inset: 0, background: "#0C0C0B", opacity: overlayOpacity }} />

        {/* Text over image */}
        <motion.div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", opacity: textOpacity, y: textY, textAlign: "center", padding: "0 60px" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9B9890", marginBottom: 32 }}>
            I'MSL Creative — Filozofia noastra
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.6rem, 5.5vw, 5.5rem)", fontWeight: 700, lineHeight: 1.12, color: "#fff", maxWidth: 860 }}>
            Viata ta se schimba.<br />
            Nu cauta doar un brand —<br />
            <span style={{ color: "#C8C2B4", fontStyle: "italic" }}>cauta ceva care misca.</span>
          </h2>
          <div style={{ width: 48, height: 1, background: "rgba(255,255,255,0.2)", margin: "48px auto 0" }} />
        </motion.div>
      </div>
    </section>
  );
}

// ─── STORY (two-column) ───────────────────────────────────────────
function Story() {
  return (
    <div id="story" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "80vh" }}>
      {/* Visual */}
      <Reveal y={0} style={{ overflow: "hidden" }}>
        <div style={{ height: "100%", minHeight: 600, background: "#1C1C19", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 24, position: "relative" }}>
          <div style={{ width: 260, height: 320, border: "1px solid rgba(255,255,255,0.12)", position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ position: "absolute", top: -1, left: 40, width: 60, height: 2, background: "#C8C2B4" }} />
            <div style={{ position: "absolute", bottom: -1, right: 40, width: 60, height: 2, background: "#C8C2B4" }} />
            <div style={{ width: 80, height: 80, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />
            </div>
          </div>
          <span style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#4a4a47" }}>Imaginea ta aici</span>
        </div>
      </Reveal>

      {/* Content */}
      <div style={{ padding: "100px 80px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#0C0C0B", borderLeft: "1px solid rgba(255,255,255,0.06)" }}>
        <Reveal delay={0.1}>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9B9890", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />
            Cine suntem
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.2rem, 4vw, 4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: 32 }}>
            Nu suntem o agentie.<br />Suntem <span style={{ fontStyle: "italic", color: "#C8C2B4" }}>partenerii tai.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p style={{ color: "#6B6860", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 16, fontWeight: 300 }}>
            Lucram cu branduri selectate, nu cu zeci de clienti simultan. Asta ne permite sa ne implicam total, sa intelegem audienta ta si sa livram rezultate care conteaza cu adevarat.
          </p>
          <p style={{ color: "#6B6860", fontSize: "0.95rem", lineHeight: 1.85, marginBottom: 48, fontWeight: 300 }}>
            Fiecare strategie e construita de la zero, dupa realitatea brandului tau — nu dintr-un template generic.
          </p>
        </Reveal>
        <Reveal delay={0.4}>
          <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: 14, fontSize: "0.75rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#C8C2B4", textDecoration: "none" }}
            onMouseEnter={e => { e.currentTarget.querySelector(".cta-line").style.width = "52px"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.querySelector(".cta-line").style.width = "36px"; e.currentTarget.style.color = "#C8C2B4"; }}
          >
            <span className="cta-line" style={{ width: 36, height: 1, background: "currentColor", transition: "width 0.3s", display: "inline-block" }} />
            <span>Hai sa ne cunoastem</span>
          </a>
        </Reveal>
      </div>
    </div>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────
const SERVICES = [
  { num: "01", name: "Strategie & Audit", desc: "Analiza completa a prezentei actuale, identificarea gap-urilor si construirea strategiei pe piloni clari." },
  { num: "02", name: "Content Creation", desc: "Continut vizual si scris consistent, creat pentru a atrage, educa si convinge audienta sa actioneze." },
  { num: "03", name: "Community Management", desc: "Gestionarea comentariilor, DM-urilor si cresterea organica. Relatia cu audienta e cheia conversiei." },
  { num: "04", name: "Copywriting", desc: "Texte care vand: caption-uri, stories, bio-uri, CTA-uri. Fiecare cuvant are un scop clar." },
  { num: "05", name: "Lead Generation", desc: "Sistem integrat de generare de leaduri direct din Instagram si TikTok, de la follower la client." },
  { num: "06", name: "Raportare Lunara", desc: "Date reale, analizate si traduse in decizii. Stii exact ce functioneaza si ce urmeaza." },
];

function Services() {
  return (
    <section id="servicii" style={{ padding: "130px 60px", background: "#141412", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <Reveal>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9B9890", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />Ce facem
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 6.5rem)", fontWeight: 900, lineHeight: 0.95, marginBottom: 90 }}>
          Servicii care<br /><span style={{ fontStyle: "italic", color: "#C8C2B4" }}>genereaza</span> vanzari.
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {SERVICES.map(({ num, name, desc }, i) => (
          <Reveal key={num} delay={i * 0.08}>
            <motion.div
              style={{ background: "#141412", padding: "52px 44px", position: "relative", overflow: "hidden", height: "100%" }}
              whileHover={{ background: "#1C1C19", y: -6 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                style={{ position: "absolute", bottom: 0, left: 0, height: 1, background: "#C8C2B4" }}
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />
              <div style={{ fontSize: "0.62rem", letterSpacing: "0.22em", color: "#4a4a47", marginBottom: 40 }}>{num}</div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.7rem", fontWeight: 700, marginBottom: 18, lineHeight: 1.15, color: "#C8C2B4" }}>{name}</h3>
              <p style={{ color: "#6B6860", fontSize: "0.85rem", lineHeight: 1.75, fontWeight: 300 }}>{desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── DARK FULL SERVICE ─────────────────────────────────────────────
function DarkSection() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", minHeight: "70vh" }}>
      <div style={{ padding: "120px 80px", display: "flex", flexDirection: "column", justifyContent: "center", background: "#fff", borderRight: "1px solid rgba(0,0,0,0.08)" }}>
        <Reveal>
          <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "rgba(0,0,0,0.35)", marginBottom: 32, display: "flex", alignItems: "center", gap: 14 }}>
            <span style={{ width: 28, height: 1, background: "rgba(0,0,0,0.2)", display: "inline-block" }} />Pachetul nostru premium
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(6rem, 12vw, 14rem)", fontWeight: 900, lineHeight: 0.88, color: "#0C0C0B", letterSpacing: "-0.02em" }}>
            Full<br />Service.
          </h2>
        </Reveal>
      </div>
      <div style={{ padding: "120px 80px", display: "flex", flexDirection: "column", justifyContent: "flex-end", background: "#F5F2EC" }}>
        <Reveal>
          <p style={{ fontSize: "1.1rem", color: "rgba(0,0,0,0.5)", lineHeight: 1.8, maxWidth: 400, fontWeight: 300, marginBottom: 48 }}>
            Preiei controlul total al prezentei pe social media. De la strategie si continut, la comunitate si leaduri — noi ne ocupam de tot.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 56 }}>
            {["Strategie personalizata lunara", "Continut zilnic pe toate platformele", "Community management dedicat", "Raport de performanta lunar", "Sistem de generare leaduri"].map(f => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 16, fontSize: "0.82rem", color: "rgba(0,0,0,0.6)", letterSpacing: "0.03em" }}>
                <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0C0C0B", flexShrink: 0 }} />
                {f}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <a href="#contact" style={{ background: "#0C0C0B", color: "#fff", padding: "18px 48px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", display: "inline-block", alignSelf: "flex-start", transition: "all 0.3s" }}
            onMouseEnter={e => { e.target.style.background = "#222"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#0C0C0B"; e.target.style.transform = "translateY(0)"; }}
          >Vreau sa stiu mai multe</a>
        </Reveal>
      </div>
    </div>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────
function Portfolio() {
  return (
    <section id="portofoliu" style={{ padding: "130px 60px", background: "#0C0C0B" }}>
      <Reveal>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9B9890", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />Rezultate reale
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 6vw, 6.5rem)", fontWeight: 900, lineHeight: 0.95, marginBottom: 16 }}>
          Povesti de<br /><span style={{ fontStyle: "italic", color: "#C8C2B4" }}>succes.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}>
        <p style={{ color: "#6B6860", marginBottom: 90, fontSize: "0.92rem", fontWeight: 300 }}>Branduri care au ales sa faca lucrurile diferit.</p>
      </Reveal>

      {/* Case 1 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center", marginBottom: 120, paddingBottom: 120, borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <Reveal>
          <div style={{ aspectRatio: "4/3", background: "#141412", border: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20, padding: 48 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.8rem", fontWeight: 700, color: "#C8C2B4", textAlign: "center", lineHeight: 1.2 }}>Garten<br />Residenz</div>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#4a4a47" }}>Real Estate Premium — Ploiesti</div>
          </div>
        </Reveal>
        <div>
          <Reveal><div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B9890", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "inline-block" }}>Real Estate Premium — Ploiesti</div></Reveal>
          <Reveal delay={0.1}><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, marginBottom: 24, color: "#C8C2B4", lineHeight: 1.1 }}>Garten Residenz</h3></Reveal>
          <Reveal delay={0.15}><p style={{ color: "#6B6860", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: 16, fontWeight: 300 }}>Brand cu concept exceptional — cartier german, 72 de vile individuale, 900m de padure — dar cu 145 de followeri dupa 162 de posturi. Zero strategie, zero identitate vizuala, zero leaduri.</p></Reveal>
          <Reveal delay={0.2}><p style={{ color: "#6B6860", fontSize: "0.88rem", lineHeight: 1.85, marginBottom: 28, fontWeight: 300 }}>Am construit de la zero: audit complet, strategie pe 5 piloni, identitate vizuala consistenta si un sistem de generare de leaduri direct din Instagram.</p></Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 36 }}>
              {["SMM", "Strategie", "Content Creation", "Copywriting"].map(t => (
                <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", border: "1px solid rgba(255,255,255,0.12)", color: "#9B9890" }}>{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: "flex", gap: 48 }}>
              {[{ num: "+31k", label: "Followeri noi" }, { num: "4.2%", label: "Engagement rate" }, { num: "20+", label: "Leaduri / luna" }].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#C8C2B4", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6860", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>

      {/* Case 2 placeholder */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
        <div>
          <Reveal><div style={{ fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9B9890", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,0.06)", display: "inline-block" }}>In curand</div></Reveal>
          <Reveal delay={0.1}><h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.4rem", fontWeight: 700, marginBottom: 24, color: "#C8C2B4", lineHeight: 1.1 }}>Urmatorul client</h3></Reveal>
          <Reveal delay={0.15}><p style={{ color: "#6B6860", fontSize: "0.88rem", lineHeight: 1.85, fontWeight: 300 }}>Locul acesta e rezervat urmatoarei povesti de succes. Daca vrei ca brandul tau sa apara aici — hai sa vorbim.</p></Reveal>
          <Reveal delay={0.2}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 28, marginBottom: 36 }}>
              {["Nisa ta", "Rezultatele tale"].map(t => (
                <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", padding: "6px 16px", border: "1px solid rgba(255,255,255,0.12)", color: "#9B9890" }}>{t}</span>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.25}>
            <div style={{ display: "flex", gap: 48 }}>
              {[{ num: "?k", label: "Followeri noi" }, { num: "?%", label: "Engagement rate" }, { num: "?+", label: "Leaduri / luna" }].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.2rem", fontWeight: 700, color: "#C8C2B4", lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "#6B6860", marginTop: 6 }}>{label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal>
          <div style={{ aspectRatio: "4/3", background: "rgba(255,255,255,0.02)", border: "1px dashed rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "5rem", color: "rgba(255,255,255,0.04)", lineHeight: 1 }}>?</div>
            <div style={{ fontSize: "0.58rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#3a3a37" }}>Brandul tau aici</div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────
const STEPS = [
  { num: "01", name: "Audit & Analiza", desc: "Analizez prezenta actuala, competitorii si audienta. Identific gap-urile si oportunitatile reale." },
  { num: "02", name: "Strategie", desc: "Construiesc strategia pe piloni clari cu obiective, KPI-uri si calendar editorial pentru 30–90 zile." },
  { num: "03", name: "Executie", desc: "Creez si postez continut zilnic. Gestionez comentariile, DM-urile si cresterea organica." },
  { num: "04", name: "Optimizare", desc: "Raport lunar cu date reale. Ajustam ce nu functioneaza. Scalam ce functioneaza." },
];

function Process() {
  return (
    <section id="proces" style={{ padding: "130px 60px", background: "#141412", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <Reveal>
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "#9B9890", marginBottom: 28, display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 28, height: 1, background: "rgba(255,255,255,0.15)", display: "inline-block" }} />Cum lucram
        </p>
      </Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3rem, 5vw, 5.5rem)", fontWeight: 900, lineHeight: 1, marginBottom: 90 }}>
          Procesul<br /><span style={{ fontStyle: "italic", color: "#C8C2B4" }}>nostru.</span>
        </h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(255,255,255,0.06)" }}>
        {STEPS.map(({ num, name, desc }, i) => (
          <Reveal key={num} delay={i * 0.1}>
            <motion.div
              style={{ background: "#141412", padding: "52px 44px", height: "100%" }}
              whileHover={{ background: "#1C1C19" }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 900, color: "rgba(255,255,255,0.05)", lineHeight: 1, marginBottom: 28 }}>{num}</div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", fontWeight: 700, color: "#C8C2B4", marginBottom: 16, lineHeight: 1.2 }}>{name}</div>
              <div style={{ color: "#6B6860", fontSize: "0.83rem", lineHeight: 1.75, fontWeight: 300 }}>{desc}</div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────
function CTA() {
  return (
    <section id="contact" style={{ textAlign: "center", padding: "180px 60px", background: "#0C0C0B", borderTop: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,194,180,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
      <Reveal><p style={{ fontSize: "0.65rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9B9890", marginBottom: 36 }}>Gata sa incepi?</p></Reveal>
      <Reveal delay={0.1}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(3.5rem, 7vw, 8rem)", fontWeight: 900, lineHeight: 1, marginBottom: 32, position: "relative", zIndex: 1 }}>
          Hai sa facem<br />ceva <span style={{ fontStyle: "italic", color: "#C8C2B4" }}>remarcabil.</span>
        </h2>
      </Reveal>
      <Reveal delay={0.2}><p style={{ color: "#6B6860", fontSize: "1rem", fontWeight: 300, marginBottom: 60, position: "relative", zIndex: 1 }}>Ai intrebari? Hai sa le clarificam impreuna. Acum.</p></Reveal>
      <Reveal delay={0.3}>
        <div style={{ display: "flex", gap: 20, justifyContent: "center", position: "relative", zIndex: 1 }}>
          <a href="mailto:contact@imslcreative.ro" style={{ background: "#F5F0E8", color: "#0C0C0B", padding: "16px 44px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={e => { e.target.style.background = "#fff"; e.target.style.transform = "translateY(-2px)"; }}
            onMouseLeave={e => { e.target.style.background = "#F5F0E8"; e.target.style.transform = "translateY(0)"; }}
          >Vreau sa stiu mai multe</a>
          <a href="https://instagram.com/imslcreative" style={{ background: "transparent", color: "#9B9890", border: "1px solid rgba(255,255,255,0.12)", padding: "16px 44px", fontSize: "0.82rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", transition: "all 0.3s", display: "inline-block" }}
            onMouseEnter={e => { e.target.style.color = "#F5F0E8"; e.target.style.borderColor = "rgba(255,255,255,0.3)"; }}
            onMouseLeave={e => { e.target.style.color = "#9B9890"; e.target.style.borderColor = "rgba(255,255,255,0.12)"; }}
          >@imslcreative</a>
        </div>
      </Reveal>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ padding: "48px 60px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "#141412" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1rem", fontWeight: 700, color: "#C8C2B4" }}>
        <span style={{ color: "#6B6860" }}>I'</span>MSL Creative
      </div>
      <p style={{ fontSize: "0.72rem", color: "#4a4a47", letterSpacing: "0.04em" }}>© 2025 I'MSL Creative — Ana Maria Ivascu</p>
      <div style={{ display: "flex", gap: 32 }}>
        {["Instagram", "TikTok", "LinkedIn"].map(l => (
          <a key={l} href="#" style={{ fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B6860", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={e => e.target.style.color = "#C8C2B4"}
            onMouseLeave={e => e.target.style.color = "#6B6860"}
          >{l}</a>
        ))}
      </div>
    </footer>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────
export default function IMSLCreative() {
  const ref = useRef(null);
  const { scrollYProgress, scrollY } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />
      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { background: #0C0C0B; color: #fff; font-family: 'DM Sans', sans-serif; overflow-x: hidden; }
        body::before { content: ''; position: fixed; inset: 0; background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E"); opacity: 0.3; pointer-events: none; z-index: 100; }
      `}</style>

      <div ref={ref} style={{ background: "#0C0C0B", color: "#fff", fontFamily: "'DM Sans', sans-serif" }}>
        <Nav scrollY={scrollY} />
        <Hero scrollYProgress={scrollYProgress} />
        <Marquee />
        <StickyImage scrollYProgress={scrollYProgress} />
        <Story />
        <Services />
        <DarkSection />
        <Portfolio />
        <Process />
        <CTA />
        <Footer />
      </div>
    </>
  );
}
