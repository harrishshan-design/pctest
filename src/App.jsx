import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, Certificate, CheckCircle, GlobeHemisphereWest, List, Moon, Sparkle, Sun, Timer, X } from "@phosphor-icons/react";

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const navigation = [
  ["Capabilities", "#manufacturing"],
  ["ODM / OEM", "#manufacturing"],
  ["Products", "#products"],
  ["About", "#about"],
];

const chapters = [
  ["01", "Brief", "#home"],
  ["02", "Develop", "#manufacturing"],
  ["03", "Manufacture", "#about"],
  ["04", "Deliver", "#contact"],
];

const operations = [
  ["Production floor", asset("factory-lab.jpg"), "PCG production team operating filling equipment"],
  ["R&D and testing", asset("manufacturing-oem.jpg"), "Laboratory testing in product development"],
  ["Automated packaging", asset("factory-quality.jpg"), "Automated packaging line handling finished cartons"],
  ["Finished products", asset("product-cosmetics.jpg"), "Finished personal care and cosmetic packaging"],
];

const proofPoints = [
  ["Small to large", "production scale supported"],
  ["6", "documented manufacturing standards"],
  ["ASEAN", "innovation brought to mass production"],
];

const services = [
  {
    name: "ODM",
    prompt: "I need product development.",
    title: "Your idea. Our development expertise.",
    bestFor: "Best when you need formulation, packaging and regulatory support.",
    formValue: "ODM — develop my product",
    image: asset("factory-odm.jpg"),
    href: "https://pcgroup.com.my/odm/",
    steps: ["Market study and product R&D", "Raw material and packaging selection", "Testing and regulatory compliance", "Manufacturing, filling and logistics"],
  },
  {
    name: "OEM",
    prompt: "I have a specification.",
    title: "Your specification. Our manufacturing.",
    bestFor: "Best when your formula, product brief or specification is established.",
    formValue: "OEM — manufacture my specification",
    image: asset("factory-oem.jpg"),
    href: "https://pcgroup.com.my/oem/",
    steps: ["Supply-chain and material sourcing", "Flexible mixing for different order scales", "Filling across modern packaging formats", "Quality control through distribution"],
  },
];

const products = [
  ["Home Care", asset("product-home-care.jpg"), "https://pcgroup.com.my/our-products/#homecare"],
  ["Personal Care", asset("product-personal-care.jpg"), "https://pcgroup.com.my/our-products/#personal-care"],
  ["Food, Flavours & Colouring", asset("product-flavours.jpg"), "https://pcgroup.com.my/our-products/#food"],
  ["Cosmetics", asset("product-cosmetics.jpg"), "https://pcgroup.com.my/our-products/#cosmetics"],
];

const briefSignals = [
  { group: "path", value: "ODM — develop my product", description: "A new product idea that needs formulation, research, testing, packaging selection, regulatory support and development." },
  { group: "path", value: "OEM — manufacture my specification", description: "An established formula, recipe or product specification that is ready for sourcing, manufacturing, filling and packaging at scale." },
  { group: "category", value: "Home care", description: "Household cleaning products such as detergent, laundry care, dishwashing liquid and surface cleaner." },
  { group: "category", value: "Personal care", description: "Personal hygiene and care products such as shampoo, body wash, soap, deodorant, hair care and skin care." },
  { group: "category", value: "Food, flavours or colouring", description: "Food, beverage, edible ingredients, flavouring and food colouring products." },
  { group: "category", value: "Cosmetics", description: "Beauty and makeup products such as lipstick, foundation, mascara and colour cosmetics." },
  { group: "category", value: "Other", description: "A manufactured product outside household care, personal care, food, flavours, colouring or cosmetics." },
];

function SectionRail({ label, tone = "mint", mark = "teal" }) {
  return (
    <aside className={`section-rail section-rail--${tone}`} aria-hidden="true">
      <img className="rail-logo-spin" src={asset(`pcg-mark-${mark}.png`)} alt="" />
      <span>{label}</span>
    </aside>
  );
}

function ExperienceMarquee() {
  return (
    <section className="experience-banner" aria-label="More than 50 years of manufacturing experience">
      <div className="experience-badge"><strong>50+</strong><span>Years</span></div>
      <div className="experience-track" aria-hidden="true">
        {[0, 1].map((group) => (
          <div className="experience-group" key={group}>
            <strong>Years of manufacturing experience</strong><img src={asset("pcg-mark-mint.png")} alt="" />
            <strong>Built in Malaysia. Made for markets.</strong><img src={asset("pcg-mark-mint.png")} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const formRef = useRef(null);
  const extractorRef = useRef(null);
  const [briefAssist, setBriefAssist] = useState({ phase: "idle", status: "", progress: 0, suggestion: null });
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return window.localStorage.getItem("pcg-theme") === "dark";
    } catch {
      return false;
    }
  });
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? "dark" : "light";
    try {
      window.localStorage.setItem("pcg-theme", darkMode ? "dark" : "light");
    } catch {
      // The theme still works when browser storage is unavailable.
    }
  }, [darkMode]);

  useEffect(() => () => {
    if (extractorRef.current) void extractorRef.current.dispose();
  }, []);

  useEffect(() => {
    const sections = chapters.map(([, , href]) => document.querySelector(href));
    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(range > 0 ? (window.scrollY / range) * 100 : 0);
      document.documentElement.style.setProperty("--hero-shift", `${Math.min(window.scrollY * 0.13, 90)}px`);
      const marker = window.innerHeight * 0.42;
      let current = 0;
      sections.forEach((section, index) => {
        if (section && section.getBoundingClientRect().top <= marker) current = index;
      });
      setActiveChapter(current);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll("[data-reveal]");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const analyseBrief = async () => {
    const brief = formRef.current?.elements.namedItem("message")?.value.trim() ?? "";
    if (brief.length < 24) {
      setBriefAssist({ phase: "error", status: "Add a little more detail to your product brief first.", progress: 0, suggestion: null });
      return;
    }

    try {
      setBriefAssist({ phase: "loading", status: extractorRef.current ? "Reading your brief…" : "Loading the private on-device model…", progress: 0, suggestion: null });
      if (!extractorRef.current) {
        const { pipeline } = await import("@huggingface/transformers");
        extractorRef.current = await pipeline(
          "feature-extraction",
          "onnx-community/all-MiniLM-L6-v2-ONNX",
          {
            device: "wasm",
            progress_callback: (info) => {
              if (info.status === "progress") {
                setBriefAssist((current) => ({ ...current, phase: "loading", status: "Downloading the on-device model…", progress: Math.round(info.progress ?? 0) }));
              }
              if (info.status === "ready") {
                setBriefAssist((current) => ({ ...current, phase: "loading", status: "Reading your brief…", progress: 100 }));
              }
            },
          },
        );
      }

      const output = await extractorRef.current(
        [brief, ...briefSignals.map(({ description }) => description)],
        { pooling: "mean", normalize: true },
      );
      const width = output.dims.at(-1);
      const vectorAt = (index) => output.data.slice(index * width, (index + 1) * width);
      const briefVector = vectorAt(0);
      const scored = briefSignals.map((signal, index) => {
        const candidate = vectorAt(index + 1);
        let score = 0;
        for (let i = 0; i < width; i += 1) score += briefVector[i] * candidate[i];
        return { ...signal, score };
      });
      const bestFor = (group) => scored.filter((item) => item.group === group).sort((a, b) => b.score - a.score)[0];
      setBriefAssist({
        phase: "ready",
        status: "Suggestions ready — review them before applying.",
        progress: 100,
        suggestion: { path: bestFor("path").value, category: bestFor("category").value },
      });
    } catch (error) {
      console.error("On-device brief analysis failed", error);
      setBriefAssist({ phase: "error", status: "The on-device helper could not load. You can still complete the quote normally.", progress: 0, suggestion: null });
    }
  };

  const applyBriefSuggestion = () => {
    if (!briefAssist.suggestion || !formRef.current) return;
    formRef.current.elements.namedItem("path").value = briefAssist.suggestion.path;
    formRef.current.elements.namedItem("category").value = briefAssist.suggestion.category;
    setBriefAssist((current) => ({ ...current, phase: "applied", status: "Suggestions applied. You can change them at any time." }));
  };

  const submitEnquiry = (event) => {
    event.preventDefault();
    setSent(true);
  };

  const beginQuoteFor = (path) => {
    const field = formRef.current?.elements.namedItem("path");
    if (field) field.value = path;
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <button
        className={`menu-toggle ${menuOpen ? "menu-toggle--open" : ""}`}
        type="button"
        aria-label={menuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={34} weight="light" /> : <List size={34} weight="light" />}
      </button>

      <div className={`nav-scrim ${menuOpen ? "nav-scrim--open" : ""}`} onClick={closeMenu} aria-hidden="true" />
      <nav id="site-navigation" className={`site-navigation ${menuOpen ? "site-navigation--open" : ""}`} aria-label="Primary navigation">
        <img className="nav-mark" src={asset("pcg-mark-mint.png")} alt="" />
        <div className="nav-kicker">Premier Centre Group</div>
        <ul>
          {navigation.map(([label, href]) => (
            <li key={`${label}-${href}`}><a href={href} onClick={closeMenu}>{label}</a></li>
          ))}
        </ul>
        <a className="nav-cta" href="#contact" onClick={closeMenu}>Request a manufacturing quote <ArrowRight size={19} /></a>
      </nav>

      <div className="page-progress" aria-hidden="true"><span style={{ width: `${scrollProgress}%` }} /></div>

      <nav className="chapter-nav" aria-label="Page chapters">
        {chapters.map(([number, label, href], index) => (
          <a className={activeChapter === index ? "is-active" : ""} href={href} key={href}>
            <span>{number}</span>{label}
          </a>
        ))}
      </nav>

      <main id="main-content">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-media" aria-hidden="true" />
          <div className="hero-clouds" aria-hidden="true" />
          <div className="hero-shade" aria-hidden="true" />
          <div className="hero-rail" aria-hidden="true">
            <img className="top-logo-spin" src={asset("pcg-mark-mint.png")} alt="" />
            <span>Premier Centre Group</span>
          </div>
          <header className="hero-header">
            <a className="hero-brand" href="#home" aria-label="Premier Centre Group home">
              <img src={asset("pcg-wordmark.png")} alt="Premier Centre Group" />
            </a>
            <nav className="hero-nav" aria-label="Homepage">
              {navigation.map(([label, href]) => <a href={href} key={`${label}-${href}`}>{label}</a>)}
            </nav>
            <a className="header-cta" href="#contact">Request a quote <ArrowRight size={17} /></a>
          </header>
          <div className="hero-copy">
            <p className="hero-kicker">Malaysia · ODM &amp; OEM manufacturing</p>
            <h1 id="hero-title">From product brief to production line.</h1>
            <p>Formulation, sourcing, filling, packaging and quality control—one manufacturing partner from first idea to finished product.</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#contact">Start your manufacturing brief <ArrowRight size={19} /></a>
              <a className="text-cta" href="#manufacturing">Explore our process</a>
            </div>
          </div>
          <div className="hero-note">
            <span>01 — Brief</span>
            <p>Start with an idea, a formula or a production-ready specification.</p>
          </div>
          <a className="scroll-cue" href="#manufacturing" aria-label="Continue to manufacturing">
            <span>Scroll to explore</span><ArrowDown size={19} />
          </a>
        </section>

        <ExperienceMarquee />

        <section className="section-shell" id="manufacturing" aria-labelledby="manufacturing-title">
          <SectionRail label="Develop" tone="mint" mark="teal" />
          <div className="section-content manufacturing-content">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">Choose your manufacturing path</p>
              <h2 id="manufacturing-title">ODM or OEM? The difference is now unmistakable.</h2>
              <p className="lede">ODM helps create and commercialise the product. OEM turns your established specification into dependable, repeatable production.</p>
            </div>
            <div className="service-scroll">
              <div className="service-compare">
                {services.map((service, index) => (
                  <article className={`service-card service-card--${service.name.toLowerCase()}`} key={service.name}>
                    <div className="service-card-copy">
                      <div className="service-index">0{index + 1}</div>
                      <p className="service-label">{service.name}</p>
                      <p className="service-prompt">{service.prompt}</p>
                      <h3>{service.title}</h3>
                      <p className="service-best">{service.bestFor}</p>
                      <ul>
                        {service.steps.map((step) => <li key={step}><CheckCircle size={18} weight="fill" />{step}</li>)}
                      </ul>
                      <div className="service-actions">
                        <button type="button" onClick={() => beginQuoteFor(service.formValue)}>Choose {service.name} <ArrowRight size={17} /></button>
                        <a href={service.href}>Full capability</a>
                      </div>
                    </div>
                    <figure><img src={service.image} alt={`${service.name} manufacturing at Premier Centre Group`} /><figcaption>{service.name} · PCG Klang, Malaysia</figcaption></figure>
                  </article>
                ))}
              </div>
            </div>
            <div className="planning-grid" data-reveal>
              <div><GlobeHemisphereWest size={28} weight="light" /><span>01</span><h3>Market readiness</h3><p>Regulatory support plus importer and distributor sourcing services in Malaysia.</p></div>
              <div><Timer size={28} weight="light" /><span>02</span><h3>Lead-time planning</h3><p>Timing is confirmed after formula, packaging, compliance and order-volume review.</p></div>
              <div><Certificate size={28} weight="light" /><span>03</span><h3>Certified systems</h3><p>JAKIM Halal, BRCGS, Green5S, ISO9001:2015, GMP and ISO22000:2018.</p></div>
            </div>
          </div>
        </section>

        <section className="section-shell" id="about" aria-labelledby="about-title">
          <SectionRail label="Manufacture" tone="aqua" mark="teal" />
          <div className="section-content about-content">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">Inside PCG</p>
              <h2 id="about-title">Made inside real facilities, not behind generic claims.</h2>
              <p className="lede">R&amp;D, mixing, filling, packaging and quality control come together as one manufacturing partnership. Every image below comes from PCG’s own manufacturing materials.</p>
            </div>
            <div className="operations-grid" data-reveal>
              {operations.map(([label, image, alt], index) => (
                <figure className={`operation-card operation-card--${index + 1}`} key={label}>
                  <img src={image} alt={alt} />
                  <figcaption><span>0{index + 1}</span>{label}</figcaption>
                </figure>
              ))}
            </div>
            <div className="proof-grid" aria-label="Manufacturing proof points" data-reveal>
              {proofPoints.map(([value, label], index) => (
                <div className="proof-point" key={label}><span>0{index + 1}</span><strong>{value}</strong><p>{label}</p></div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell" id="products" aria-labelledby="products-title">
          <SectionRail label="Products" tone="blush" mark="white" />
          <div className="section-content products-content">
            <div className="section-intro" data-reveal>
              <p className="eyebrow">Product categories</p>
              <h2 id="products-title">What do you want to put into the world?</h2>
              <p className="lede">PCG supports a broad product mix across home care, personal care, food ingredients and cosmetics.</p>
            </div>
            <div className="product-grid" data-reveal>
              {products.map(([name, image, href], index) => (
                <a className="product-card" href={href} key={name}>
                  <span className="product-number">0{index + 1}</span>
                  <div className="product-image"><img src={image} alt="" /></div>
                  <span className="product-name">{name}</span><ArrowRight size={19} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell contact-shell" id="contact" aria-labelledby="contact-title">
          <SectionRail label="Deliver" tone="bright" mark="mint" />
          <div className="section-content contact-content">
            <div className="contact-intro" data-reveal>
              <p className="eyebrow">Request a manufacturing quote</p>
              <h2 id="contact-title">Give us the essentials. We’ll map the next step.</h2>
              <p className="quote-intro">Your brief helps PCG review the right path, feasibility, likely order requirements and delivery planning before the first conversation.</p>
              <ol className="quote-steps">
                <li><span>1</span><div><strong>Choose ODM or OEM</strong><p>Not sure? Select “Help me choose”.</p></div></li>
                <li><span>2</span><div><strong>Share your product target</strong><p>Category, quantity, market and launch timing.</p></div></li>
                <li><span>3</span><div><strong>Receive a scoped response</strong><p>PCG confirms what is needed for feasibility and quotation.</p></div></li>
              </ol>
            </div>

            {sent ? (
              <div className="form-success" role="status">
                <CheckCircle size={46} weight="light" />
                <h3>Your quote brief is ready for review.</h3>
                <p>This prototype does not send data, but the complete request-a-quote path is working.</p>
                <button type="button" onClick={() => setSent(false)}>Start another quote request</button>
              </div>
            ) : (
              <form className="contact-form" ref={formRef} onSubmit={submitEnquiry}>
                <div className="form-grid">
                  <label>Manufacturing path<select name="path" defaultValue="" required><option value="" disabled>Select one</option><option>ODM — develop my product</option><option>OEM — manufacture my specification</option><option>Help me choose</option></select></label>
                  <label>Product category<select name="category" defaultValue="" required><option value="" disabled>Select one</option><option>Home care</option><option>Personal care</option><option>Food, flavours or colouring</option><option>Cosmetics</option><option>Other</option></select></label>
                  <label>Company<input name="company" autoComplete="organization" required /></label>
                  <label>Your name<input name="name" autoComplete="name" required /></label>
                  <label>Work email<input name="email" type="email" autoComplete="email" required /></label>
                  <label>Target market(s)<input name="markets" placeholder="e.g. Malaysia, Singapore" required /></label>
                  <label>Estimated first order<select name="quantity" defaultValue="" required><option value="" disabled>Select a range</option><option>Not confirmed yet</option><option>Under 5,000 units</option><option>5,000–25,000 units</option><option>25,000–100,000 units</option><option>100,000+ units</option></select></label>
                  <label>Target launch month<input name="launch" type="month" required /></label>
                  <label>Packaging status<select name="packaging" defaultValue="" required><option value="" disabled>Select one</option><option>Need packaging support</option><option>Packaging concept ready</option><option>Packaging supplier confirmed</option></select></label>
                  <label>Certification needs<select name="certification" defaultValue=""><option value="">Not sure yet</option><option>Halal</option><option>GMP</option><option>Food safety</option><option>Multiple / market dependent</option></select></label>
                </div>
                <label>Product brief<textarea name="message" rows="5" placeholder="What are you making, what stage are you at, and what matters most?" required /></label>
                <div className="brief-assistant" aria-live="polite">
                  <div className="brief-assistant-heading">
                    <Sparkle size={22} weight="fill" aria-hidden="true" />
                    <div><strong>Private brief helper</strong><span>Runs in your browser with Transformers.js. Your text is not sent to PCG or an AI API.</span></div>
                  </div>
                  <button className="brief-assist-button" type="button" onClick={analyseBrief} disabled={briefAssist.phase === "loading"}>
                    {briefAssist.phase === "loading" ? "Analysing…" : "Check my brief with on-device AI"}
                  </button>
                  {briefAssist.phase === "loading" && <progress max="100" value={briefAssist.progress}>{briefAssist.progress}%</progress>}
                  {briefAssist.status && <p className={`brief-assist-status brief-assist-status--${briefAssist.phase}`}>{briefAssist.status}</p>}
                  {briefAssist.suggestion && (
                    <div className="brief-suggestion">
                      <p><span>Manufacturing path</span><strong>{briefAssist.suggestion.path}</strong></p>
                      <p><span>Product category</span><strong>{briefAssist.suggestion.category}</strong></p>
                      {briefAssist.phase !== "applied" && <button className="brief-apply-button" type="button" onClick={applyBriefSuggestion}>Apply these suggestions</button>}
                    </div>
                  )}
                </div>
                <button type="submit">Request manufacturing quote <ArrowRight size={20} /></button>
                <p className="form-note">This prototype does not transmit data. In production, these details would be used only to assess and respond to your request.</p>
              </form>
            )}
            <div className="contact-details">
              <h3>Premier Centre Group Sdn Bhd (13213-V)</h3>
              <address>Lot 6065, Jalan Haji Abdul Manan 1,<br />Batu 5½ off Jalan Meru,<br />41050 Klang, Selangor, Malaysia.</address>
              <p><a href="tel:+60333923888">+603 3392 3888</a><br /><a href="mailto:enquiry@pcgroup.com.my">enquiry@pcgroup.com.my</a></p>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <img src={asset("pcg-wordmark.png")} alt="Premier Centre Group" />
        <div className="footer-meta">
          <p>© 2026 Premier Centre Group Sdn. Bhd. All rights reserved.</p>
          <button
            className="theme-toggle"
            type="button"
            aria-label={`Switch to ${darkMode ? "light" : "dark"} mode`}
            aria-pressed={darkMode}
            onClick={() => setDarkMode((enabled) => !enabled)}
          >
            {darkMode ? <Sun size={14} weight="bold" /> : <Moon size={14} weight="bold" />}
            {darkMode ? "Light" : "Dark"}
          </button>
        </div>
      </footer>
    </>
  );
}
