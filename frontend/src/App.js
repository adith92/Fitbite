import { useState, useEffect, useRef } from "react";
import "@/App.css";
import { 
  Zap, 
  Shield, 
  Clock, 
  Code, 
  MessageSquare, 
  Palette,
  ChevronRight,
  X,
  Check,
  CreditCard,
  Wallet,
  QrCode,
  Send,
  Star,
  TrendingUp,
  Users,
  Award,
  Loader2
} from "lucide-react";

// Products Data - using emoji icons with gradient backgrounds
const products = [
  {
    id: 1,
    name: "Mobile Legends",
    icon: "⚔️",
    color: "from-orange-500 to-red-600",
    variants: [
      { id: 1, name: "86 Diamond", price: 20000 },
      { id: 2, name: "172 Diamond", price: 40000 }
    ]
  },
  {
    id: 2,
    name: "Free Fire",
    icon: "🔥",
    color: "from-yellow-500 to-orange-600",
    variants: [
      { id: 1, name: "70 Diamond", price: 10000 }
    ]
  },
  {
    id: 3,
    name: "PUBG Mobile",
    icon: "🎯",
    color: "from-amber-500 to-yellow-600",
    variants: [
      { id: 1, name: "60 UC", price: 15000 }
    ]
  },
  {
    id: 4,
    name: "Google Play",
    icon: "▶️",
    color: "from-green-500 to-emerald-600",
    variants: [
      { id: 1, name: "Voucher Rp50.000", price: 50000 }
    ]
  },
  {
    id: 5,
    name: "Steam Wallet",
    icon: "🎮",
    color: "from-blue-500 to-indigo-600",
    variants: [
      { id: 1, name: "Voucher Rp100.000", price: 100000 }
    ]
  }
];

// Services Data
const services = [
  {
    icon: Code,
    title: "Pembuatan Website",
    description: "Website profesional dengan desain modern dan responsif untuk bisnis Anda."
  },
  {
    icon: MessageSquare,
    title: "Konsultasi IT",
    description: "Solusi IT terbaik untuk mengoptimalkan operasional bisnis Anda."
  },
  {
    icon: Palette,
    title: "Desain UI/UX",
    description: "Desain antarmuka yang menarik dan user-friendly untuk aplikasi Anda."
  }
];

// Testimonials Data
const testimonials = [
  {
    name: "Andi",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    text: "Top up cepat dan aman! Proses kurang dari 1 menit langsung masuk.",
    rating: 5
  },
  {
    name: "Budi",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    text: "Harga murah banget! Lebih hemat dibanding tempat lain.",
    rating: 5
  },
  {
    name: "Rina",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face",
    text: "Proses instan, recommended! Pelayanannya juga ramah.",
    rating: 5
  }
];

// Recent activities for notification
const recentActivities = [
  { name: "Budi", product: "86 Diamond Mobile Legends" },
  { name: "Andi", product: "Voucher Google Play Rp50.000" },
  { name: "Rina", product: "Free Fire 70 Diamond" },
  { name: "Dimas", product: "PUBG Mobile 60 UC" },
  { name: "Sari", product: "Steam Wallet Rp100.000" },
  { name: "Rudi", product: "172 Diamond Mobile Legends" }
];

// Fake transactions for table
const fakeTransactions = [
  { name: "Budi", product: "ML 86 Diamond", status: "Sukses" },
  { name: "Andi", product: "PUBG 60 UC", status: "Diproses" },
  { name: "Rina", product: "FF 70 Diamond", status: "Sukses" },
  { name: "Dimas", product: "Google Play", status: "Sukses" },
  { name: "Sari", product: "Steam Wallet", status: "Diproses" }
];

// Format currency
const formatPrice = (price) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};

// Navbar Component
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#produk", label: "Produk" },
    { href: "#jasa", label: "Jasa" },
    { href: "#tentang", label: "Tentang" },
    { href: "#kontak", label: "Kontak" }
  ];

  return (
    <nav 
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-2" data-testid="logo">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg md:text-xl text-white font-['Outfit']">
              Digital Hypebeast
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-medium"
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </a>
            ))}
            <a 
              href="#produk"
              className="btn-primary text-sm"
              data-testid="nav-cta"
            >
              Top Up Sekarang
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="mobile-menu-btn"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`w-full h-0.5 bg-white transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass rounded-2xl mt-2 p-4 mb-4" data-testid="mobile-menu">
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
            <a 
              href="#produk"
              className="btn-primary text-sm w-full text-center mt-4 block"
              onClick={() => setMobileMenuOpen(false)}
            >
              Top Up Sekarang
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Section
const HeroSection = ({ transactionCount }) => {
  return (
    <section 
      data-testid="hero-section"
      className="hero-gradient min-h-screen flex items-center pt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-sm text-white/80" data-testid="live-counter">
              {transactionCount.toLocaleString()} transaksi sukses hari ini
            </span>
          </div>

          {/* Main Heading */}
          <h1 
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 font-['Outfit'] tracking-tight animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Top Up Game & <br className="hidden sm:block" />
            <span className="gradient-text">Jasa Digital</span>
          </h1>

          {/* Subheading */}
          <p 
            className="text-lg md:text-xl text-white/70 mb-10 max-w-2xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Menyediakan layanan top up game, voucher digital, dan jasa pembuatan website dengan proses cepat & aman.
          </p>

          {/* CTA Buttons */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a 
              href="#produk" 
              className="btn-primary text-lg px-8 py-4 flex items-center justify-center gap-2"
              data-testid="hero-cta"
            >
              Top Up Sekarang
              <ChevronRight className="w-5 h-5" />
            </a>
            <a 
              href="#jasa" 
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-semibold transition-all"
              data-testid="hero-services-btn"
            >
              Lihat Jasa
            </a>
          </div>

          {/* Trust Badges */}
          <div 
            className="flex flex-wrap justify-center gap-4 md:gap-8 mt-16 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex items-center gap-2 text-white/60">
              <Shield className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">Trusted Digital Service</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Users className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">1000+ Transaksi Berhasil</span>
            </div>
            <div className="flex items-center gap-2 text-white/60">
              <Clock className="w-5 h-5 text-[#1E90FF]" />
              <span className="text-sm">Layanan 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Product Card Component
const ProductCard = ({ product, onBuy }) => {
  return (
    <div 
      className="bg-[#112A4F] rounded-2xl overflow-hidden card-hover border border-white/5"
      data-testid={`product-card-${product.id}`}
    >
      <div className={`aspect-square bg-gradient-to-br ${product.color} p-6 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 bg-black/10"></div>
        <span className="text-7xl drop-shadow-lg relative z-10">{product.icon}</span>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#112A4F] to-transparent"></div>
      </div>
      <div className="p-5">
        <h3 className="font-semibold text-lg text-white mb-3 font-['Outfit']">{product.name}</h3>
        <div className="space-y-2">
          {product.variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onBuy(product, variant)}
              className="w-full flex items-center justify-between bg-white/5 hover:bg-[#1E90FF]/20 border border-white/10 hover:border-[#1E90FF]/50 rounded-xl px-4 py-3 transition-all group"
              data-testid={`buy-btn-${product.id}-${variant.id}`}
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
};

// Products Section
const ProductsSection = ({ onBuy }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="produk" 
      className="py-20 md:py-28 section-dark fade-in-section"
      ref={sectionRef}
      data-testid="products-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Produk Digital
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-4">
            Top Up Game & Voucher
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Proses cepat kurang dari 1 menit, harga bersaing, dan transaksi aman.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} onBuy={onBuy} />
          ))}
        </div>
      </div>
    </section>
  );
};

// Services Section
const ServicesSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = sectionRef.current;
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section 
      id="jasa" 
      className="py-20 md:py-28 section-light fade-in-section"
      ref={sectionRef}
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Layanan Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] font-['Outfit'] mb-4">
            Jasa Digital Profesional
          </h2>
          <p className="text-[#0B1F3A]/60 max-w-2xl mx-auto">
            Solusi digital lengkap untuk kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 border border-gray-100"
              data-testid={`service-card-${index}`}
            >
              <div className="service-icon">
                <service.icon className="w-7 h-7 text-[#1E90FF]" />
              </div>
              <h3 className="text-xl font-bold text-[#0B1F3A] mb-3 font-['Outfit']">
                {service.title}
              </h3>
              <p className="text-[#0B1F3A]/60">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Choose Us Section
const WhyChooseSection = () => {
  const features = [
    {
      icon: Zap,
      title: "Proses Instan",
      description: "Transaksi selesai dalam waktu kurang dari 1 menit."
    },
    {
      icon: Shield,
      title: "Pembayaran Aman",
      description: "Sistem pembayaran terenkripsi dan terpercaya."
    },
    {
      icon: Clock,
      title: "Support 24 Jam",
      description: "Tim support siap membantu kapan saja."
    }
  ];

  return (
    <section 
      className="py-20 md:py-28 section-dark"
      data-testid="why-choose-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Keunggulan
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-4">
            Kenapa Pilih Kami?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="text-center p-8 bg-[#112A4F] rounded-2xl border border-white/5 hover:border-[#1E90FF]/30 transition-all"
              data-testid={`feature-${index}`}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-[#1E90FF]/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-[#1E90FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-['Outfit']">
                {feature.title}
              </h3>
              <p className="text-white/60">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-16">
          <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
            <Award className="w-5 h-5 text-[#1E90FF]" />
            <span className="text-white font-medium">Trusted Digital Service</span>
          </div>
          <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
            <TrendingUp className="w-5 h-5 text-[#1E90FF]" />
            <span className="text-white font-medium">1000+ Transaksi Berhasil</span>
          </div>
          <div className="flex items-center gap-3 bg-[#1E90FF]/10 border border-[#1E90FF]/30 rounded-full px-6 py-3 badge-glow">
            <Clock className="w-5 h-5 text-[#1E90FF]" />
            <span className="text-white font-medium">Layanan 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// Testimonials Section
const TestimonialsSection = () => {
  return (
    <section 
      className="py-20 md:py-28 section-light"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Testimoni
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] font-['Outfit'] mb-4">
            Apa Kata Mereka?
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              data-testid={`testimonial-${index}`}
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[#0B1F3A]/70 mb-6 italic">"{testimonial.text}"</p>
              <div className="flex items-center gap-3">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <span className="font-semibold text-[#0B1F3A]">{testimonial.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Payment Methods Section
const PaymentMethodsSection = () => {
  return (
    <section 
      className="py-20 md:py-28 section-dark"
      data-testid="payment-methods-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Pembayaran
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-4">
            Metode Pembayaran
          </h2>
          <p className="text-white/60">
            Pilih metode pembayaran yang paling nyaman untuk Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          <div className="bg-[#112A4F] rounded-2xl p-8 text-center border border-white/5 hover:border-[#1E90FF]/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CreditCard className="w-8 h-8 text-[#1E90FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Transfer Bank</h3>
            <p className="text-white/50 text-sm">BCA, Mandiri, BNI, BRI</p>
          </div>
          
          <div className="bg-[#112A4F] rounded-2xl p-8 text-center border border-white/5 hover:border-[#1E90FF]/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-[#1E90FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">E-Wallet</h3>
            <p className="text-white/50 text-sm">GoPay, OVO, DANA, ShopeePay</p>
          </div>
          
          <div className="bg-[#112A4F] rounded-2xl p-8 text-center border border-white/5 hover:border-[#1E90FF]/30 transition-all">
            <div className="w-16 h-16 bg-gradient-to-br from-[#1E90FF]/20 to-transparent rounded-2xl flex items-center justify-center mx-auto mb-4">
              <QrCode className="w-8 h-8 text-[#1E90FF]" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">QRIS</h3>
            <p className="text-white/50 text-sm">Scan & Pay</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Recent Transactions Section
const RecentTransactionsSection = () => {
  return (
    <section 
      className="py-20 md:py-28 section-light"
      data-testid="transactions-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Aktivitas
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] font-['Outfit'] mb-4">
            Transaksi Terakhir
          </h2>
        </div>

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
              {fakeTransactions.map((tx, index) => (
                <tr 
                  key={index} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  data-testid={`transaction-row-${index}`}
                >
                  <td className="px-6 py-4 text-[#0B1F3A]">{tx.name}</td>
                  <td className="px-6 py-4 text-[#0B1F3A]/70">{tx.product}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === 'Sukses' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {tx.status === 'Sukses' ? <Check className="w-3 h-3" /> : <Loader2 className="w-3 h-3 animate-spin" />}
                      {tx.status}
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
};

// About Section
const AboutSection = () => {
  return (
    <section 
      id="tentang" 
      className="py-20 md:py-28 section-dark"
      data-testid="about-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Tentang Kami
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white font-['Outfit'] mb-6">
            Digital Hypebeast
          </h2>
          <p className="text-lg text-white/70 leading-relaxed">
            Digital Hypebeast adalah platform digital terpercaya yang menyediakan layanan top up game, 
            voucher digital, dan jasa IT profesional. Kami berkomitmen memberikan pelayanan terbaik 
            dengan proses cepat, harga bersaing, dan keamanan transaksi yang terjamin.
          </p>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const ContactSection = () => {
  return (
    <section 
      id="kontak" 
      className="py-20 md:py-28 section-light"
      data-testid="contact-section"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-[#1E90FF] mb-4 block">
            Kontak
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0B1F3A] font-['Outfit'] mb-6">
            Hubungi Kami
          </h2>
          <p className="text-[#0B1F3A]/70 mb-8">
            Punya pertanyaan atau butuh bantuan? Hubungi kami langsung via Telegram.
          </p>
          <a 
            href="https://t.me/DigitalHypebeast" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#0088cc] hover:bg-[#006699] text-white px-8 py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl"
            data-testid="contact-telegram-btn"
          >
            <Send className="w-5 h-5" />
            @DigitalHypebeast
          </a>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="bg-[#071428] py-12"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg text-white font-['Outfit']">
                Digital Hypebeast
              </span>
            </div>
            <p className="text-white/50 text-sm">
              Platform top up game & jasa digital terpercaya.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h4 className="font-semibold text-white mb-4">Menu</h4>
            <ul className="space-y-2">
              <li><a href="#produk" className="text-white/50 hover:text-white text-sm transition-colors">Produk</a></li>
              <li><a href="#jasa" className="text-white/50 hover:text-white text-sm transition-colors">Jasa</a></li>
              <li><a href="#tentang" className="text-white/50 hover:text-white text-sm transition-colors">Tentang</a></li>
              <li><a href="#kontak" className="text-white/50 hover:text-white text-sm transition-colors">Kontak</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Kontak</h4>
            <a 
              href="https://t.me/DigitalHypebeast" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/50 hover:text-[#1E90FF] transition-colors text-sm"
            >
              <Send className="w-4 h-4" />
              @DigitalHypebeast
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center">
          <p className="text-white/40 text-sm">
            © {currentYear} Digital Hypebeast. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Checkout Popup Component
const CheckoutPopup = ({ isOpen, onClose, product, variant }) => {
  const [step, setStep] = useState(1);
  const [userId, setUserId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!userId || !paymentMethod) return;
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleClose = () => {
    setStep(1);
    setUserId('');
    setPaymentMethod('');
    setIsLoading(false);
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`popup-overlay ${isOpen ? 'active' : ''}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      data-testid="checkout-popup"
    >
      <div className="popup-content">
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          data-testid="close-popup-btn"
        >
          <X className="w-6 h-6" />
        </button>

        {!isSuccess ? (
          <>
            {!isLoading ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-2">
                    Checkout
                  </h3>
                  <p className="text-white/60 text-sm">
                    {product?.name} - {variant?.name}
                  </p>
                  <p className="text-[#1E90FF] font-bold text-xl mt-2">
                    {variant && formatPrice(variant.price)}
                  </p>
                </div>

                {/* Step 1: User ID */}
                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-2">
                    User ID / Email
                  </label>
                  <input 
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="Masukkan User ID atau Email"
                    className="input-field"
                    data-testid="input-user-id"
                  />
                </div>

                {/* Step 2: Payment Method */}
                <div className="mb-6">
                  <label className="block text-white/80 text-sm mb-3">
                    Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    <button
                      onClick={() => setPaymentMethod('bank')}
                      className={`payment-btn ${paymentMethod === 'bank' ? 'selected' : ''}`}
                      data-testid="payment-bank"
                    >
                      <CreditCard className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">Transfer Bank</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('ewallet')}
                      className={`payment-btn ${paymentMethod === 'ewallet' ? 'selected' : ''}`}
                      data-testid="payment-ewallet"
                    >
                      <Wallet className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">E-Wallet</span>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('qris')}
                      className={`payment-btn ${paymentMethod === 'qris' ? 'selected' : ''}`}
                      data-testid="payment-qris"
                    >
                      <QrCode className="w-6 h-6 text-[#1E90FF]" />
                      <span className="text-xs text-white/80">QRIS</span>
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!userId || !paymentMethod}
                  className={`w-full btn-primary py-4 text-lg ${
                    (!userId || !paymentMethod) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  data-testid="submit-payment-btn"
                >
                  Bayar Sekarang
                </button>
              </>
            ) : (
              // Loading State
              <div className="text-center py-12" data-testid="loading-state">
                <div className="spinner mx-auto mb-6"></div>
                <p className="text-white/80">Memproses pembayaran...</p>
              </div>
            )}
          </>
        ) : (
          // Success State
          <div className="text-center py-8" data-testid="success-state">
            <div className="success-checkmark mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white font-['Outfit'] mb-2">
              Transaksi Berhasil!
            </h3>
            <p className="text-white/60 mb-6">
              Pesanan Anda sedang diproses.
            </p>
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
            <button
              onClick={handleClose}
              className="w-full btn-primary py-4"
              data-testid="close-success-btn"
            >
              Tutup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Floating Telegram Button
const FloatingTelegram = () => {
  return (
    <a 
      href="https://t.me/DigitalHypebeast" 
      target="_blank" 
      rel="noopener noreferrer"
      className="telegram-float"
      data-testid="floating-telegram"
    >
      <Send className="w-6 h-6 text-white relative z-10" />
    </a>
  );
};

// Activity Notification
const ActivityNotification = ({ activity, isVisible }) => {
  return (
    <div 
      className={`activity-notification ${isVisible ? 'show' : ''}`}
      data-testid="activity-notification"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#1E90FF] to-[#0066cc] rounded-full flex items-center justify-center flex-shrink-0">
          <Check className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-white text-sm font-medium">
            {activity.name} baru saja top up
          </p>
          <p className="text-white/60 text-xs">
            {activity.product}
          </p>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [transactionCount, setTransactionCount] = useState(1273);
  const [currentActivity, setCurrentActivity] = useState(recentActivities[0]);
  const [activityVisible, setActivityVisible] = useState(false);

  // Handle buy click
  const handleBuy = (product, variant) => {
    setSelectedProduct(product);
    setSelectedVariant(variant);
    setCheckoutOpen(true);
  };

  // Simulate live counter
  useEffect(() => {
    const interval = setInterval(() => {
      setTransactionCount(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // Activity notification rotation
  useEffect(() => {
    let activityIndex = 0;
    
    const showNotification = () => {
      setActivityVisible(true);
      setTimeout(() => {
        setActivityVisible(false);
      }, 4000);
    };

    const interval = setInterval(() => {
      activityIndex = (activityIndex + 1) % recentActivities.length;
      setCurrentActivity(recentActivities[activityIndex]);
      showNotification();
    }, 7000);

    // Show first notification after 3 seconds
    setTimeout(showNotification, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B1F3A]">
      <Navbar />
      <HeroSection transactionCount={transactionCount} />
      <ProductsSection onBuy={handleBuy} />
      <ServicesSection />
      <WhyChooseSection />
      <TestimonialsSection />
      <PaymentMethodsSection />
      <RecentTransactionsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      <CheckoutPopup 
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        product={selectedProduct}
        variant={selectedVariant}
      />
      
      <FloatingTelegram />
      <ActivityNotification activity={currentActivity} isVisible={activityVisible} />
    </div>
  );
}

export default App;
