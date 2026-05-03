import { useEffect, useMemo, useRef, useState } from "react";
import {
  HashRouter,
  Link,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "@/App.css";
import {
  ArrowLeft,
  Award,
  Check,
  ChevronRight,
  Clock,
  Code,
  CreditCard,
  Download,
  Loader2,
  LogIn,
  LogOut,
  MessageSquare,
  Palette,
  Plus,
  QrCode,
  Save,
  Send,
  Shield,
  Star,
  Trash2,
  TrendingUp,
  Upload,
  Users,
  Wallet,
  X,
  Zap,
} from "lucide-react";
import {
  createDefaultSiteContent,
  isValidSiteContent,
} from "@/content/siteContent";

const CONTENT_STORAGE_KEY = "topup_game_digital_content_draft_v1";
const AUTH_STORAGE_KEY = "topup_game_digital_auth_v1";

const iconMap = {
  code: Code,
  message: MessageSquare,
  palette: Palette,
  zap: Zap,
  shield: Shield,
  clock: Clock,
  card: CreditCard,
  wallet: Wallet,
  qris: QrCode,
};

const formatPrice = (price) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(Number(price || 0));

const cloneData = (value) => JSON.parse(JSON.stringify(value));

const loadStoredAuth = () => {
  try {
    return JSON.parse(sessionStorage.getItem(AUTH_STORAGE_KEY) || "null");
  } catch {
    return null;
  }
};

const saveStoredAuth = (value) => {
  sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(value));
};

const clearStoredAuth = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

const getPublicContentUrl = () => {
  const base = process.env.PUBLIC_URL || ".";
  return `${base.replace(/\/$/, "")}/site-content.json`;
};

const useRevealOnScroll = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return sectionRef;
};

const downloadJsonFile = (filename, data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const updateArrayItem = (array, index, updates) =>
  array.map((item, currentIndex) =>
    currentIndex === index ? { ...item, ...updates } : item,
  );

const AppShell = () => {
  const [content, setContent] = useState(createDefaultSiteContent());
  const [contentLoaded, setContentLoaded] = useState(false);
  const [contentSource, setContentSource] = useState("default");
  const [auth, setAuth] = useState(loadStoredAuth());

  useEffect(() => {
    let active = true;

    const loadContent = async () => {
      let nextContent = createDefaultSiteContent();
      let nextSource = "default";

      try {
        const response = await fetch(getPublicContentUrl(), { cache: "no-store" });
        if (response.ok) {
          const remoteContent = await response.json();
          if (isValidSiteContent(remoteContent)) {
            nextContent = remoteContent;
            nextSource = "server-json";
          }
        }
      } catch {
        nextSource = "default";
      }

      try {
        const draft = localStorage.getItem(CONTENT_STORAGE_KEY);
        if (draft) {
          const draftContent = JSON.parse(draft);
          if (isValidSiteContent(draftContent)) {
            nextContent = draftContent;
            nextSource = "local-draft";
          }
        }
      } catch {
        nextSource = nextSource === "server-json" ? "server-json" : "default";
      }

      if (active) {
        setContent(nextContent);
        setContentSource(nextSource);
        setContentLoaded(true);
      }
    };

    loadContent();
    return () => {
      active = false;
    };
  }, []);

  const handleContentChange = (nextContent, source = "local-draft") => {
    setContent(nextContent);
    setContentSource(source);
    localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(nextContent));
  };

  const handleResetDraft = () => {
    localStorage.removeItem(CONTENT_STORAGE_KEY);
    window.location.reload();
  };

  const handleImportContent = async (file) => {
    const text = await file.text();
    const parsed = JSON.parse(text);
    if (!isValidSiteContent(parsed)) {
      throw new Error("Format file konten tidak valid.");
    }
    handleContentChange(parsed);
  };

  const handleLogin = (nextAuth) => {
    saveStoredAuth(nextAuth);
    setAuth(nextAuth);
  };

  const handleLogout = () => {
    clearStoredAuth();
    setAuth(null);
  };

  if (!contentLoaded) {
    return (
      <div className="app-loading-screen">
        <div className="spinner mb-4" />
        <p>Memuat konten website...</p>
      </div>
    );
  }

  return (
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <StorefrontPage
              content={content}
              auth={auth}
              onLogout={handleLogout}
            />
          }
        />
        <Route
          path="/login"
          element={<LoginPage content={content} onLogin={handleLogin} auth={auth} />}
        />
        <Route
          path="/user"
          element={
            <ProtectedRoute auth={auth} role="user">
              <UserDashboard content={content} auth={auth} onLogout={handleLogout} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute auth={auth} role="admin">
              <AdminDashboard
                content={content}
                onContentChange={handleContentChange}
                onResetDraft={handleResetDraft}
                onImportContent={handleImportContent}
                onLogout={handleLogout}
                contentSource={contentSource}
              />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
};

const ProtectedRoute = ({ auth, role, children }) => {
  if (!auth || auth.role !== role) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const SectionHeader = ({ label, title, description, light = false }) => (
  <div className="text-center mb-12 md:mb-16">
    <span className="section-kicker">{label}</span>
    <h2
      className={`text-3xl md:text-4xl lg:text-5xl font-bold font-['Outfit'] mb-4 ${
        light ? "text-[#0B1F3A]" : "text-white"
      }`}
    >
      {title}
    </h2>
    {description ? (
      <p
        className={`max-w-2xl mx-auto text-base md:text-lg ${
          light ? "text-[#0B1F3A]/65" : "text-white/60"
        }`}
      >
        {description}
      </p>
    ) : null}
  </div>
);

const Navbar = ({ scrollProgress, brandName, auth, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#produk", label: "Produk" },
    { href: "#jasa", label: "Layanan" },
    { href: "#tentang", label: "Tentang" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="scroll-progress-track">
        <div
          className="scroll-progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#top" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl text-white font-['Outfit']">
              {brandName}
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="nav-link text-sm font-medium">
                {link.label}
              </a>
            ))}
            {auth ? (
              <div className="flex items-center gap-3">
                <Link
                  to={auth.role === "admin" ? "/admin" : "/user"}
                  className="nav-panel-link"
                >
                  {auth.role === "admin" ? "Panel Admin" : "Panel User"}
                </Link>
                <button onClick={onLogout} className="nav-panel-link">
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-sm">
                Login
              </Link>
            )}
          </div>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden glass rounded-2xl mt-2 p-4 mb-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-white/80 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            {auth ? (
              <>
                <Link
                  to={auth.role === "admin" ? "/admin" : "/user"}
                  className="btn-primary text-sm w-full text-center mt-4 block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {auth.role === "admin" ? "Panel Admin" : "Panel User"}
                </Link>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="btn-secondary text-sm w-full mt-3"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn-primary text-sm w-full text-center mt-4 block"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroShowcase = ({ scrollY, content }) => {
  const showcaseCards = content.products.slice(0, 3);

  return (
    <div className="hero-showcase-grid">
      <div
        className="hero-device-frame hero-device-main"
        style={{ transform: `translateY(${scrollY * -0.05}px)` }}
      >
        <div className="hero-device-glow" />
        <div className="hero-device-screen">
          <div className="hero-device-topline">
            <span className="hero-dot" />
            <span className="hero-topline-text">Digital storefront</span>
          </div>
          <div className="hero-spotlight-card">
            <p className="hero-label">Featured layout</p>
            <h3>{content.siteConfig.brandName}</h3>
            <p className="hero-muted">
              Visual storefront dengan animasi halus, konten lokal, login role, dan panel admin.
            </p>
          </div>
          <div className="hero-product-stack">
            {showcaseCards.map((product, index) => (
              <div
                key={product.id}
                className="hero-floating-card"
                style={{
                  animationDelay: `${index * 0.18}s`,
                  transform: `translateY(${scrollY * (0.01 + index * 0.008)}px)`,
                }}
              >
                <img src={product.image} alt={product.imageAlt} />
                <div>
                  <p>{product.name}</p>
                  <span>{formatPrice(product.variants[0]?.price || 0)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className="hero-side-card hero-side-top"
        style={{ transform: `translateY(${scrollY * -0.08}px)` }}
      >
        <p className="hero-label">Admin</p>
        <strong>Edit semua konten</strong>
        <span>Harga, icon path, testimoni, kontak, sampai kredensial admin bisa diatur.</span>
      </div>

      <div
        className="hero-side-card hero-side-bottom"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      >
        <p className="hero-label">Hosting</p>
        <strong>cPanel friendly</strong>
        <span>Export JSON, upload `build`, lalu tim lain tinggal lanjut dari repo yang sama.</span>
      </div>
    </div>
  );
};

const HeroSection = ({ transactionCount, scrollY, content }) => (
  <section id="top" className="hero-gradient min-h-screen flex items-center pt-20">
    <div className="hero-noise" />
    <div className="hero-beam hero-beam-left" />
    <div className="hero-beam hero-beam-right" />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 relative z-10">
      <div className="hero-layout">
        <div className="hero-copy text-center lg:text-left max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-white/80">
              {transactionCount.toLocaleString()} transaksi simulasi hari ini
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Outfit'] tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            {content.siteConfig.heroTitleTop} <br className="hidden sm:block" />
            <span className="gradient-text">{content.siteConfig.heroTitleAccent}</span>
          </h1>

          <p
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl lg:mx-0 mx-auto animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            {content.siteConfig.heroDescription}
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up"
            style={{ animationDelay: "0.3s" }}
          >
            <a href="#produk" className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2">
              {content.siteConfig.heroPrimaryCta}
              <ChevronRight className="w-5 h-5" />
            </a>
            <Link to="/login" className="btn-secondary text-lg px-8 py-4">
              Login Admin / User
            </Link>
          </div>

          <div
            className="flex flex-wrap justify-center lg:justify-start gap-4 md:gap-8 mt-16 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">{content.siteConfig.trustBadges[0]}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Users className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">{content.siteConfig.trustBadges[1]}</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">{content.siteConfig.trustBadges[2]}</span>
            </div>
          </div>
        </div>
        <HeroShowcase scrollY={scrollY} content={content} />
      </div>
    </div>
  </section>
);

const ProductCard = ({ product, onBuy }) => (
  <div className="product-card-surface bg-[#112A4F] rounded-2xl overflow-hidden card-hover border border-white/5">
    <div className="product-image-container bg-[#0B1F3A]">
      <img src={product.image} alt={product.imageAlt} loading="lazy" />
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-lg text-white mb-3 font-['Outfit']">{product.name}</h3>
      <div className="space-y-2">
        {product.variants.map((variant) => (
          <button
            key={variant.id}
            onClick={() => onBuy(product, variant)}
            className="w-full flex items-center justify-between bg-white/5 hover:bg-[#1E90FF]/20 border border-white/10 hover:border-[#1E90FF]/50 rounded-xl px-4 py-3 transition-all group"
          >
            <div className="text-left">
              <p className="text-sm text-white/80">{variant.name}</p>
              <p className="text-[#1E90FF] font-bold">{formatPrice(variant.price)}</p>
            </div>
            <span className="text-xs bg-[#1E90FF] text-white px-3 py-1.5 rounded-lg group-hover:bg-[#1E90FF]/80 transition-colors">
              Beli
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

const ProductsSection = ({ content, onBuy }) => {
  const sectionRef = useRevealOnScroll();
  return (
    <section id="produk" className="py-20 md:py-28 section-dark fade-in-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={content.siteConfig.sectionLabels.products}
          title={content.siteConfig.sections.productsTitle}
          description={content.siteConfig.sections.productsDescription}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-6">
          {content.products.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ content }) => {
  const sectionRef = useRevealOnScroll();
  return (
    <section id="jasa" className="py-20 md:py-28 section-light fade-in-section" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label={content.siteConfig.sectionLabels.services}
          title={content.siteConfig.sections.servicesTitle}
          description={content.siteConfig.sections.servicesDescription}
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {content.services.map((service) => {
            const ServiceIcon = iconMap[service.icon] || Code;
            return (
              <div key={service.id} className="admin-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="service-icon">
                  <ServiceIcon className="w-7 h-7 text-[#1E90FF]" />
                </div>
                <h3 className="text-xl font-bold text-[#0B1F3A] mb-3 font-['Outfit']">{service.title}</h3>
                <p className="text-[#0B1F3A]/60">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const WhyChooseSection = ({ content }) => (
  <section className="py-20 md:py-28 section-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        label={content.siteConfig.sectionLabels.whyChoose}
        title={content.siteConfig.sections.whyChooseTitle}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {content.siteConfig.whyChoose.map((feature, index) => {
          const FeatureIcon = iconMap[feature.icon] || Zap;
          return (
            <div key={`${feature.title}-${index}`} className="text-center p-8 bg-[#112A4F] rounded-2xl border border-white/5 hover:border-[#1E90FF]/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-[#1E90FF]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FeatureIcon className="w-8 h-8 text-[#1E90FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">{feature.title}</h3>
              <p className="text-white/60">{feature.description}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-wrap justify-center gap-4 mt-16">
        <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
          <Award className="w-5 h-5 text-[#1E90FF]" />
          <span className="text-white font-medium">{content.siteConfig.trustBadges[0]}</span>
        </div>
        <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
          <TrendingUp className="w-5 h-5 text-[#1E90FF]" />
          <span className="text-white font-medium">{content.siteConfig.trustBadges[1]}</span>
        </div>
        <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
          <Clock className="w-5 h-5 text-[#1E90FF]" />
          <span className="text-white font-medium">{content.siteConfig.trustBadges[2]}</span>
        </div>
      </div>
    </div>
  </section>
);

const TestimonialsSection = ({ content }) => (
  <section className="py-20 md:py-28 section-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        label={content.siteConfig.sectionLabels.testimonials}
        title={content.siteConfig.sections.testimonialsTitle}
        light
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {content.testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-1 mb-4">
              {[...Array(Number(testimonial.rating || 5))].map((_, index) => (
                <Star key={index} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-[#0B1F3A]/70 mb-6 italic">"{testimonial.text}"</p>
            <div className="flex items-center gap-3">
              <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border border-[#E2E8F0]" loading="lazy" />
              <span className="font-semibold text-[#0B1F3A]">{testimonial.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const PaymentMethodsSection = ({ content }) => (
  <section className="py-20 md:py-28 section-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        label={content.siteConfig.sectionLabels.payments}
        title={content.siteConfig.sections.paymentsTitle}
        description={content.siteConfig.sections.paymentsDescription}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {content.siteConfig.paymentMethods.map((method) => {
          const PaymentIcon = iconMap[method.icon] || CreditCard;
          return (
            <div key={method.id} className="bg-[#112A4F] rounded-2xl p-8 text-center border border-white/5 hover:border-[#1E90FF]/30 transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-4">
                <PaymentIcon className="w-8 h-8 text-[#1E90FF]" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{method.title}</h3>
              <p className="text-white/50 text-sm">{method.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const RecentTransactionsSection = ({ content }) => (
  <section className="py-20 md:py-28 section-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeader
        label={content.siteConfig.sectionLabels.transactions}
        title={content.siteConfig.sections.transactionsTitle}
        light
      />
      <div className="max-w-2xl mx-auto overflow-hidden rounded-2xl shadow-lg">
        <table className="w-full bg-white">
          <thead className="bg-[#0B1F3A] text-white">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold">Nama</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Produk</th>
              <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {content.fakeTransactions.map((transaction, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-[#0B1F3A]">{transaction.name}</td>
                <td className="px-6 py-4 text-[#0B1F3A]/70">{transaction.product}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${transaction.status === "Sukses" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {transaction.status === "Sukses" ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const AboutSection = ({ content }) => (
  <section id="tentang" className="py-20 md:py-28 section-dark">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <span className="section-kicker">{content.siteConfig.sectionLabels.about}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-6">
          {content.siteConfig.sections.aboutTitle}
        </h2>
        <p className="text-lg text-white/70 leading-relaxed">
          {content.siteConfig.sections.aboutDescription}
        </p>
      </div>
    </div>
  </section>
);

const ContactSection = ({ content }) => (
  <section id="kontak" className="py-20 md:py-28 section-light">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <span className="section-kicker">{content.siteConfig.sectionLabels.contact}</span>
        <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] font-['Outfit'] mb-6">
          {content.siteConfig.sections.contactTitle}
        </h2>
        <p className="text-[#0B1F3A]/70 mb-8">{content.siteConfig.sections.contactDescription}</p>
        <a href={content.siteConfig.contact.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-[#0088cc] hover:bg-[#006699] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">
          <Send className="w-5 h-5" />
          {content.siteConfig.contact.label}
        </a>
      </div>
    </div>
  </section>
);

const Footer = ({ content }) => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="bg-[#071428] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-white font-['Outfit']">{content.siteConfig.brandName}</span>
            </div>
            <p className="text-white/50 text-sm">
              Landing page top up game, login role, dan panel admin untuk edit konten.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#produk" className="text-white/50 hover:text-white text-sm transition-colors">Produk</a></li>
              <li><a href="#jasa" className="text-white/50 hover:text-white text-sm transition-colors">Layanan</a></li>
              <li><a href="#tentang" className="text-white/50 hover:text-white text-sm transition-colors">Tentang</a></li>
              <li><a href="#kontak" className="text-white/50 hover:text-white text-sm transition-colors">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <a href={content.siteConfig.contact.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-[#1E90FF] transition-colors text-sm">
              <Send className="w-4 h-4" />
              {content.siteConfig.contact.label}
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} {content.siteConfig.brandName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

const CheckoutPopup = ({ isOpen, onClose, product, variant }) => {
  const [userId, setUserId] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setUserId("");
      setPaymentMethod("");
      setIsLoading(false);
      setIsSuccess(false);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!userId || !paymentMethod) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1800);
  };

  if (!isOpen) return null;

  return (
    <div className={`popup-overlay ${isOpen ? "active" : ""}`} onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="popup-content relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>
        {!isSuccess ? (
          <>
            {!isLoading ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-2">Checkout</h3>
                  <p className="text-white/60 text-sm">{product?.name} - {variant?.name}</p>
                  <p className="text-[#1E90FF] font-bold text-xl mt-2">{variant && formatPrice(variant.price)}</p>
                </div>
                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-2">User ID / Email</label>
                  <input type="text" value={userId} onChange={(event) => setUserId(event.target.value)} placeholder="Masukkan User ID atau Email" className="input-field" />
                </div>
                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-3">Metode Pembayaran</label>
                  <div className="grid grid-cols-3 gap-3">
                    <button onClick={() => setPaymentMethod("bank")} className={`payment-btn ${paymentMethod === "bank" ? "selected" : ""}`}>
                      <CreditCard className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">Transfer Bank</span>
                    </button>
                    <button onClick={() => setPaymentMethod("ewallet")} className={`payment-btn ${paymentMethod === "ewallet" ? "selected" : ""}`}>
                      <Wallet className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">E-Wallet</span>
                    </button>
                    <button onClick={() => setPaymentMethod("qris")} className={`payment-btn ${paymentMethod === "qris" ? "selected" : ""}`}>
                      <QrCode className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">QRIS</span>
                    </button>
                  </div>
                </div>
                <button onClick={handleSubmit} disabled={!userId || !paymentMethod} className={`w-full btn-primary py-4 text-lg ${!userId || !paymentMethod ? "opacity-50 cursor-not-allowed" : ""}`}>
                  Bayar Sekarang
                </button>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="spinner mx-auto mb-6" />
                <p className="text-white/80">Memproses pembayaran...</p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="success-checkmark mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-2">Transaksi Berhasil!</h3>
            <p className="text-white/60 mb-6">Pesanan Anda sedang diproses.</p>
            <div className="bg-white/5 rounded-xl p-4 mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Produk</span>
                <span className="text-white text-sm">{product?.name} - {variant?.name}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-sm">Total</span>
                <span className="text-[#1E90FF] font-bold">{variant && formatPrice(variant.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60 text-sm">Status</span>
                <span className="inline-flex items-center gap-1 text-yellow-400 text-sm">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Sedang diproses
                </span>
              </div>
            </div>
            <button onClick={onClose} className="w-full btn-primary py-4">Tutup</button>
          </div>
        )}
      </div>
    </div>
  );
};

const FloatingTelegram = ({ url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer" className="telegram-float">
    <Send className="w-6 h-6 text-white relative z-10" />
  </a>
);

const ActivityNotification = ({ activity, isVisible }) => (
  <div className={`activity-notification ${isVisible ? "show" : ""}`}>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0">
        <Check className="w-5 h-5 text-white" />
      </div>
      <div>
        <p className="text-white text-sm font-medium">{activity.name} baru saja top up</p>
        <p className="text-white/60 text-xs">{activity.product}</p>
      </div>
    </div>
  </div>
);

const StorefrontPage = ({ content, auth, onLogout }) => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [transactionCount, setTransactionCount] = useState(content.siteConfig.transactionStartingCount);
  const [currentActivity, setCurrentActivity] = useState(content.recentActivities[0]);
  const [activityVisible, setActivityVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setTransactionCount(content.siteConfig.transactionStartingCount);
    setCurrentActivity(content.recentActivities[0]);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setScrollY(nextScrollY);
      setScrollProgress(maxScroll > 0 ? nextScrollY / maxScroll : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactionCount((previous) => previous + Math.floor(Math.random() * 3) + 1);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let activityIndex = 0;
    const showNotification = () => {
      setActivityVisible(true);
      setTimeout(() => setActivityVisible(false), 4000);
    };
    const interval = setInterval(() => {
      activityIndex = (activityIndex + 1) % content.recentActivities.length;
      setCurrentActivity(content.recentActivities[activityIndex]);
      showNotification();
    }, 7000);
    const timeout = setTimeout(showNotification, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [content.recentActivities]);

  const handleBuy = (product, variant) => {
    setSelectedProduct(product);
    setSelectedVariant(variant);
    setCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0B1F3A]">
      <Navbar
        scrollProgress={scrollProgress}
        brandName={content.siteConfig.brandName}
        auth={auth}
        onLogout={onLogout}
      />
      <HeroSection transactionCount={transactionCount} scrollY={scrollY} content={content} />
      <ProductsSection content={content} onBuy={handleBuy} />
      <ServicesSection content={content} />
      <WhyChooseSection content={content} />
      <TestimonialsSection content={content} />
      <PaymentMethodsSection content={content} />
      <RecentTransactionsSection content={content} />
      <AboutSection content={content} />
      <ContactSection content={content} />
      <Footer content={content} />
      <CheckoutPopup
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={selectedProduct}
        variant={selectedVariant}
      />
      <FloatingTelegram url={content.siteConfig.contact.url} />
      <ActivityNotification activity={currentActivity} isVisible={activityVisible} />
    </div>
  );
};

const LoginPage = ({ content, onLogin, auth }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (auth?.role === "admin") navigate("/admin", { replace: true });
    if (auth?.role === "user") navigate("/user", { replace: true });
  }, [auth, navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!username.trim() || !password.trim()) {
      setError("Username dan password wajib diisi.");
      return;
    }

    if (
      username.trim() === content.auth.admin.username &&
      password === content.auth.admin.password
    ) {
      onLogin({ role: "admin", name: "Administrator" });
      navigate("/admin");
      return;
    }

    onLogin({ role: "user", name: username.trim() });
    navigate("/user");
  };

  return (
    <div className="portal-shell">
      <div className="portal-card">
        <Link to="/" className="portal-back-link">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke website
        </Link>

        <div className="portal-heading">
          <span className="section-kicker">Portal Login</span>
          <h1>{content.siteConfig.brandName}</h1>
          <p>
            Satu pintu login buat akses portal. Kalau kredensial yang masuk cocok dengan akun admin,
            sistem bakal otomatis arahin ke panel admin. Selain itu bakal masuk ke portal user.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="portal-form">
          <div>
            <label>Username</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Masukkan username"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Masukkan password"
            />
          </div>
          <div className="portal-note">
            {content.auth.user.description}
          </div>

          {error ? <p className="portal-error">{error}</p> : null}

          <button type="submit" className="btn-primary portal-submit">
            <LogIn className="w-4 h-4" />
            Masuk Sekarang
          </button>
        </form>
      </div>
    </div>
  );
};

const UserDashboard = ({ content, auth, onLogout }) => (
  <div className="admin-shell">
    <div className="admin-topbar">
      <div>
        <span className="section-kicker">User Panel</span>
        <h1>{content.auth.user.headline}</h1>
        <p>Halo {auth?.name || "User"}, kamu bisa balik ke storefront atau hubungi admin dari sini.</p>
      </div>
      <div className="admin-topbar-actions">
        <Link to="/" className="btn-secondary">
          <ArrowLeft className="w-4 h-4" />
          Website
        </Link>
        <button onClick={onLogout} className="btn-secondary">
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </div>

    <div className="admin-grid">
      <div className="admin-card">
        <h2>Produk Populer</h2>
        <div className="dashboard-product-list">
          {content.products.slice(0, 4).map((product) => (
            <div key={product.id} className="dashboard-product-item">
              <img src={product.image} alt={product.imageAlt} />
              <div>
                <strong>{product.name}</strong>
                <span>{formatPrice(product.variants[0]?.price || 0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="admin-card">
        <h2>Kontak Toko</h2>
        <p className="admin-card-copy">{content.siteConfig.sections.contactDescription}</p>
        <a href={content.siteConfig.contact.url} target="_blank" rel="noopener noreferrer" className="btn-primary inline-flex">
          <Send className="w-4 h-4" />
          {content.siteConfig.contact.label}
        </a>
      </div>
    </div>
  </div>
);

const AdminDashboard = ({
  content,
  onContentChange,
  onResetDraft,
  onImportContent,
  onLogout,
  contentSource,
}) => {
  const [draft, setDraft] = useState(cloneData(content));
  const [message, setMessage] = useState("");
  const [advancedFields, setAdvancedFields] = useState({
    paymentMethods: JSON.stringify(content.siteConfig.paymentMethods, null, 2),
    whyChoose: JSON.stringify(content.siteConfig.whyChoose, null, 2),
    recentActivities: JSON.stringify(content.recentActivities, null, 2),
    fakeTransactions: JSON.stringify(content.fakeTransactions, null, 2),
  });

  useEffect(() => {
    setDraft(cloneData(content));
    setAdvancedFields({
      paymentMethods: JSON.stringify(content.siteConfig.paymentMethods, null, 2),
      whyChoose: JSON.stringify(content.siteConfig.whyChoose, null, 2),
      recentActivities: JSON.stringify(content.recentActivities, null, 2),
      fakeTransactions: JSON.stringify(content.fakeTransactions, null, 2),
    });
  }, [content]);

  const sourceLabel = useMemo(() => {
    if (contentSource === "local-draft") return "Draft lokal browser";
    if (contentSource === "server-json") return "site-content.json dari hosting";
    return "Default repo";
  }, [contentSource]);

  const saveDraft = () => {
    try {
      const nextDraft = cloneData(draft);
      nextDraft.siteConfig.paymentMethods = JSON.parse(advancedFields.paymentMethods);
      nextDraft.siteConfig.whyChoose = JSON.parse(advancedFields.whyChoose);
      nextDraft.recentActivities = JSON.parse(advancedFields.recentActivities);
      nextDraft.fakeTransactions = JSON.parse(advancedFields.fakeTransactions);

      if (!isValidSiteContent(nextDraft)) {
        throw new Error("Struktur data konten belum lengkap.");
      }

      onContentChange(nextDraft);
      setMessage("Draft tersimpan ke browser dan langsung dipakai untuk preview.");
    } catch (error) {
      setMessage(error.message || "Ada data yang belum valid.");
    }
  };

  const exportJson = () => {
    try {
      const nextDraft = cloneData(draft);
      nextDraft.siteConfig.paymentMethods = JSON.parse(advancedFields.paymentMethods);
      nextDraft.siteConfig.whyChoose = JSON.parse(advancedFields.whyChoose);
      nextDraft.recentActivities = JSON.parse(advancedFields.recentActivities);
      nextDraft.fakeTransactions = JSON.parse(advancedFields.fakeTransactions);
      downloadJsonFile("site-content.json", nextDraft);
      setMessage("File site-content.json sudah diunduh. Upload file itu ke cPanel biar perubahan permanen.");
    } catch (error) {
      setMessage(error.message || "Export gagal.");
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      await onImportContent(file);
      setMessage("File JSON berhasil diimport dan dijadikan draft aktif.");
    } catch (error) {
      setMessage(error.message || "Import file gagal.");
    }
    event.target.value = "";
  };

  const updateSiteConfig = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      siteConfig: {
        ...previous.siteConfig,
        [field]: value,
      },
    }));
  };

  const updateSectionText = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      siteConfig: {
        ...previous.siteConfig,
        sections: {
          ...previous.siteConfig.sections,
          [field]: value,
        },
      },
    }));
  };

  const updateContact = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      siteConfig: {
        ...previous.siteConfig,
        contact: {
          ...previous.siteConfig.contact,
          [field]: value,
        },
      },
    }));
  };

  const updateAdminAuth = (field, value) => {
    setDraft((previous) => ({
      ...previous,
      auth: {
        ...previous.auth,
        admin: {
          ...previous.auth.admin,
          [field]: value,
        },
      },
    }));
  };

  const addProduct = () => {
    setDraft((previous) => ({
      ...previous,
      products: [
        ...previous.products,
        {
          id: Date.now(),
          name: "Produk Baru",
          image: "/images/products/mobile-legends.svg",
          imageAlt: "Logo produk baru",
          variants: [{ id: Date.now() + 1, name: "Varian Baru", price: 10000 }],
        },
      ],
    }));
  };

  const updateProduct = (index, field, value) => {
    setDraft((previous) => ({
      ...previous,
      products: updateArrayItem(previous.products, index, { [field]: value }),
    }));
  };

  const removeProduct = (index) => {
    setDraft((previous) => ({
      ...previous,
      products: previous.products.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const addVariant = (productIndex) => {
    setDraft((previous) => ({
      ...previous,
      products: previous.products.map((product, currentIndex) =>
        currentIndex === productIndex
          ? {
              ...product,
              variants: [
                ...product.variants,
                { id: Date.now(), name: "Varian Baru", price: 0 },
              ],
            }
          : product,
      ),
    }));
  };

  const updateVariant = (productIndex, variantIndex, field, value) => {
    setDraft((previous) => ({
      ...previous,
      products: previous.products.map((product, currentIndex) =>
        currentIndex === productIndex
          ? {
              ...product,
              variants: product.variants.map((variant, currentVariantIndex) =>
                currentVariantIndex === variantIndex
                  ? {
                      ...variant,
                      [field]: field === "price" ? Number(value) : value,
                    }
                  : variant,
              ),
            }
          : product,
      ),
    }));
  };

  const removeVariant = (productIndex, variantIndex) => {
    setDraft((previous) => ({
      ...previous,
      products: previous.products.map((product, currentIndex) =>
        currentIndex === productIndex
          ? {
              ...product,
              variants: product.variants.filter((_, currentVariantIndex) => currentVariantIndex !== variantIndex),
            }
          : product,
      ),
    }));
  };

  const updateService = (index, field, value) => {
    setDraft((previous) => ({
      ...previous,
      services: updateArrayItem(previous.services, index, { [field]: value }),
    }));
  };

  const addService = () => {
    setDraft((previous) => ({
      ...previous,
      services: [
        ...previous.services,
        {
          id: Date.now(),
          icon: "code",
          title: "Layanan Baru",
          description: "Deskripsi layanan baru.",
        },
      ],
    }));
  };

  const removeService = (index) => {
    setDraft((previous) => ({
      ...previous,
      services: previous.services.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  const updateTestimonial = (index, field, value) => {
    setDraft((previous) => ({
      ...previous,
      testimonials: updateArrayItem(previous.testimonials, index, {
        [field]: field === "rating" ? Number(value) : value,
      }),
    }));
  };

  const addTestimonial = () => {
    setDraft((previous) => ({
      ...previous,
      testimonials: [
        ...previous.testimonials,
        {
          id: Date.now(),
          name: "Nama Baru",
          avatar: "/images/testimonials/andi.svg",
          text: "Testimoni baru.",
          rating: 5,
        },
      ],
    }));
  };

  const removeTestimonial = (index) => {
    setDraft((previous) => ({
      ...previous,
      testimonials: previous.testimonials.filter((_, currentIndex) => currentIndex !== index),
    }));
  };

  return (
    <div className="admin-shell">
      <div className="admin-topbar">
        <div>
          <span className="section-kicker">Admin Dashboard</span>
          <h1>Panel Konten & Login</h1>
          <p>
            Sumber aktif: {sourceLabel}. Simpan draft untuk preview, lalu export
            `site-content.json` buat diupload ke cPanel.
          </p>
        </div>
        <div className="admin-topbar-actions">
          <Link to="/" className="btn-secondary">
            <ArrowLeft className="w-4 h-4" />
            Website
          </Link>
          <button onClick={saveDraft} className="btn-primary">
            <Save className="w-4 h-4" />
            Simpan Draft
          </button>
          <button onClick={exportJson} className="btn-secondary">
            <Download className="w-4 h-4" />
            Export JSON
          </button>
          <label className="btn-secondary cursor-pointer">
            <Upload className="w-4 h-4" />
            Import JSON
            <input type="file" accept="application/json" hidden onChange={handleImport} />
          </label>
          <button onClick={onResetDraft} className="btn-secondary">
            Reset Draft
          </button>
          <button onClick={onLogout} className="btn-secondary">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>

      {message ? <div className="admin-flash">{message}</div> : null}

      <div className="admin-grid">
        <section className="admin-card">
          <div className="admin-section-head">
            <h2>Brand, Hero, dan Kontak</h2>
            <p>Bagian yang paling sering kamu ganti buat branding dan CTA utama.</p>
          </div>
          <div className="admin-form-grid">
            <div>
              <label>Nama Brand</label>
              <input value={draft.siteConfig.brandName} onChange={(event) => updateSiteConfig("brandName", event.target.value)} />
            </div>
            <div>
              <label>Hero Title Atas</label>
              <input value={draft.siteConfig.heroTitleTop} onChange={(event) => updateSiteConfig("heroTitleTop", event.target.value)} />
            </div>
            <div>
              <label>Hero Title Aksen</label>
              <input value={draft.siteConfig.heroTitleAccent} onChange={(event) => updateSiteConfig("heroTitleAccent", event.target.value)} />
            </div>
            <div>
              <label>Kontak Label</label>
              <input value={draft.siteConfig.contact.label} onChange={(event) => updateContact("label", event.target.value)} />
            </div>
            <div className="admin-field-full">
              <label>Hero Description</label>
              <textarea value={draft.siteConfig.heroDescription} onChange={(event) => updateSiteConfig("heroDescription", event.target.value)} rows={3} />
            </div>
            <div className="admin-field-full">
              <label>Link Kontak</label>
              <input value={draft.siteConfig.contact.url} onChange={(event) => updateContact("url", event.target.value)} />
            </div>
            <div className="admin-field-full">
              <label>Deskripsi Tentang</label>
              <textarea value={draft.siteConfig.sections.aboutDescription} onChange={(event) => updateSectionText("aboutDescription", event.target.value)} rows={4} />
            </div>
          </div>
        </section>

        <section className="admin-card">
          <div className="admin-section-head">
            <h2>Login Admin</h2>
            <p>Login sekarang satu pintu. Kalau username dan password cocok, akses otomatis masuk ke panel admin.</p>
          </div>
          <div className="admin-form-grid">
            <div>
              <label>Username Admin</label>
              <input value={draft.auth.admin.username} onChange={(event) => updateAdminAuth("username", event.target.value)} />
            </div>
            <div>
              <label>Password Admin</label>
              <input value={draft.auth.admin.password} onChange={(event) => updateAdminAuth("password", event.target.value)} />
            </div>
            <div className="admin-field-full">
              <label>Deskripsi User Panel</label>
              <textarea
                value={draft.auth.user.description}
                onChange={(event) =>
                  setDraft((previous) => ({
                    ...previous,
                    auth: {
                      ...previous.auth,
                      user: { ...previous.auth.user, description: event.target.value },
                    },
                  }))
                }
                rows={3}
              />
            </div>
          </div>
        </section>
      </div>

      <section className="admin-card admin-card-block">
        <div className="admin-section-head">
          <h2>Produk, Harga, dan Icon Path</h2>
          <p>Edit nama produk, file icon/logo, dan daftar harga. Path gambar pakai file lokal di folder `public/images/products`.</p>
        </div>
        <div className="admin-stack">
          {draft.products.map((product, productIndex) => (
            <div key={product.id} className="editor-item">
              <div className="editor-item-head">
                <strong>{product.name}</strong>
                <button onClick={() => removeProduct(productIndex)} className="icon-action danger">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="admin-form-grid">
                <div>
                  <label>Nama Produk</label>
                  <input value={product.name} onChange={(event) => updateProduct(productIndex, "name", event.target.value)} />
                </div>
                <div>
                  <label>Path Icon / Logo</label>
                  <input value={product.image} onChange={(event) => updateProduct(productIndex, "image", event.target.value)} />
                </div>
                <div className="admin-field-full">
                  <label>Alt Text</label>
                  <input value={product.imageAlt} onChange={(event) => updateProduct(productIndex, "imageAlt", event.target.value)} />
                </div>
              </div>
              <div className="variant-list">
                {product.variants.map((variant, variantIndex) => (
                  <div key={variant.id} className="variant-row">
                    <input value={variant.name} onChange={(event) => updateVariant(productIndex, variantIndex, "name", event.target.value)} placeholder="Nama varian" />
                    <input type="number" value={variant.price} onChange={(event) => updateVariant(productIndex, variantIndex, "price", event.target.value)} placeholder="Harga" />
                    <button onClick={() => removeVariant(productIndex, variantIndex)} className="icon-action danger">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={() => addVariant(productIndex)} className="btn-secondary slim-button">
                <Plus className="w-4 h-4" />
                Tambah Varian
              </button>
            </div>
          ))}
        </div>
        <button onClick={addProduct} className="btn-primary mt-6">
          <Plus className="w-4 h-4" />
          Tambah Produk
        </button>
      </section>

      <div className="admin-grid">
        <section className="admin-card">
          <div className="admin-section-head">
            <h2>Layanan</h2>
            <p>Icon layanan pakai keyword: `code`, `message`, atau `palette`.</p>
          </div>
          <div className="admin-stack">
            {draft.services.map((service, index) => (
              <div key={service.id} className="editor-item">
                <div className="editor-item-head">
                  <strong>{service.title}</strong>
                  <button onClick={() => removeService(index)} className="icon-action danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="admin-form-grid">
                  <div>
                    <label>Judul</label>
                    <input value={service.title} onChange={(event) => updateService(index, "title", event.target.value)} />
                  </div>
                  <div>
                    <label>Icon</label>
                    <input value={service.icon} onChange={(event) => updateService(index, "icon", event.target.value)} />
                  </div>
                  <div className="admin-field-full">
                    <label>Deskripsi</label>
                    <textarea value={service.description} onChange={(event) => updateService(index, "description", event.target.value)} rows={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addService} className="btn-secondary mt-4">
            <Plus className="w-4 h-4" />
            Tambah Layanan
          </button>
        </section>

        <section className="admin-card">
          <div className="admin-section-head">
            <h2>Testimoni</h2>
            <p>Avatar juga bisa diarahkan ke file lokal di `public/images/testimonials`.</p>
          </div>
          <div className="admin-stack">
            {draft.testimonials.map((testimonial, index) => (
              <div key={testimonial.id} className="editor-item">
                <div className="editor-item-head">
                  <strong>{testimonial.name}</strong>
                  <button onClick={() => removeTestimonial(index)} className="icon-action danger">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="admin-form-grid">
                  <div>
                    <label>Nama</label>
                    <input value={testimonial.name} onChange={(event) => updateTestimonial(index, "name", event.target.value)} />
                  </div>
                  <div>
                    <label>Avatar Path</label>
                    <input value={testimonial.avatar} onChange={(event) => updateTestimonial(index, "avatar", event.target.value)} />
                  </div>
                  <div>
                    <label>Rating</label>
                    <input type="number" min="1" max="5" value={testimonial.rating} onChange={(event) => updateTestimonial(index, "rating", event.target.value)} />
                  </div>
                  <div className="admin-field-full">
                    <label>Isi Testimoni</label>
                    <textarea value={testimonial.text} onChange={(event) => updateTestimonial(index, "text", event.target.value)} rows={3} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button onClick={addTestimonial} className="btn-secondary mt-4">
            <Plus className="w-4 h-4" />
            Tambah Testimoni
          </button>
        </section>
      </div>

      <section className="admin-card admin-card-block">
        <div className="admin-section-head">
          <h2>Advanced JSON</h2>
          <p>Bagian ini buat data yang lebih enak diedit sekaligus. Simpan draft setelah selesai.</p>
        </div>
        <div className="admin-form-grid">
          <div className="admin-field-full">
            <label>Metode Pembayaran (JSON)</label>
            <textarea value={advancedFields.paymentMethods} onChange={(event) => setAdvancedFields((previous) => ({ ...previous, paymentMethods: event.target.value }))} rows={8} />
          </div>
          <div className="admin-field-full">
            <label>Why Choose (JSON)</label>
            <textarea value={advancedFields.whyChoose} onChange={(event) => setAdvancedFields((previous) => ({ ...previous, whyChoose: event.target.value }))} rows={8} />
          </div>
          <div className="admin-field-full">
            <label>Recent Activities (JSON)</label>
            <textarea value={advancedFields.recentActivities} onChange={(event) => setAdvancedFields((previous) => ({ ...previous, recentActivities: event.target.value }))} rows={8} />
          </div>
          <div className="admin-field-full">
            <label>Fake Transactions (JSON)</label>
            <textarea value={advancedFields.fakeTransactions} onChange={(event) => setAdvancedFields((previous) => ({ ...previous, fakeTransactions: event.target.value }))} rows={8} />
          </div>
        </div>
      </section>

      <section className="admin-card admin-card-block">
        <div className="admin-section-head">
          <h2>Workflow GitHub dan cPanel</h2>
          <p>Biar developer lain enak lanjut, ikuti alur ini setelah edit konten.</p>
        </div>
        <ol className="workflow-list">
          <li>Simpan draft dari panel admin untuk preview langsung.</li>
          <li>Export `site-content.json` dan taruh file itu ke `frontend/public/site-content.json` kalau mau jadi bagian repo.</li>
          <li>Jalankan `npm run build` lalu upload isi folder `frontend/build` ke `public_html` atau subfolder domain di cPanel.</li>
          <li>Commit perubahan repo, update changelog, lalu push ke GitHub.</li>
        </ol>
      </section>
    </div>
  );
};

export default AppShell;
