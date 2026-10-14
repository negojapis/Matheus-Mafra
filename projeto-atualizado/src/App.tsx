import React, { useEffect, useState, useRef } from 'react';
import VideoStreamHero from './components/VideoStreamHero';
import { BlurText } from './components/BlurText';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';
import { LancamentosSection } from './components/LancamentosSection';
import { 
  WhatsAppFilledIcon, 
  InstagramIcon, 
  YouTubeIcon, 
  SpotifyIcon,
  ArrowUpRightIcon
} from './components/Icons';

registerLocale('pt-BR', ptBR);

// High-performance video card for the gallery:
// Only plays when inside viewport, pauses when scrolled out or when full-screen modal is active
const GalleryVideoItem: React.FC<{
  item: { title: string; category: string; videoSrc: string };
  onOpen: () => void;
  isModalOpen: boolean;
}> = ({ item, onOpen, isModalOpen }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15, rootMargin: '60px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (inView && !isModalOpen) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [inView, isModalOpen]);

  return (
    <div
      ref={cardRef}
      className="gallery-item"
      onClick={onOpen}
      onMouseEnter={() => {
        if (!isModalOpen && videoRef.current) {
          videoRef.current.play().catch(() => {});
        }
      }}
    >
      <video
        ref={videoRef}
        src={`${item.videoSrc}#t=0.1`}
        loop
        muted
        playsInline
        preload="metadata"
        className="gallery-video"
      />
      <div className="gallery-info">
        <h3 className="gallery-title">{item.category}</h3>
      </div>
    </div>
  );
};

// High-performance live experience highlight video
const HighlightVideo: React.FC<{
  videoSrc: string;
  onOpen: () => void;
  isModalOpen: boolean;
}> = ({ videoSrc, onOpen, isModalOpen }) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (inView && !isModalOpen) {
      vid.play().catch(() => {});
    } else {
      vid.pause();
    }
  }, [inView, isModalOpen]);

  return (
    <div
      ref={wrapperRef}
      className="video-highlight-wrapper fade-up delay-2"
      onClick={onOpen}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        muted
        playsInline
        preload="metadata"
        className="video-poster"
        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
      />
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    eventType: '',
    city: '',
    message: ''
  });

  // Throttled scroll listener using requestAnimationFrame to prevent layout thrashing
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);

          const sections = document.querySelectorAll('section');
          let current = '';
          const scrollPos = window.scrollY;
          sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= sectionTop - 200) {
              current = section.getAttribute('id') || '';
            }
          });
          if (current) setActiveSection(current);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '80px 0px',
      threshold: 0.05
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const observeAll = () => {
      document.querySelectorAll('.fade-up:not(.visible), .fade-in:not(.visible)').forEach(element => {
        observer.observe(element);
      });
    };

    observeAll();
    const timer = setTimeout(observeAll, 300);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    document.body.classList.remove('no-scroll');
  };

  const openModal = (src: string) => {
    setModalVideo(src);
    document.body.classList.add('no-scroll');
  };

  const closeModal = () => {
    setModalVideo(null);
    document.body.classList.remove('no-scroll');
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedDate = eventDate ? eventDate.toLocaleDateString('pt-BR') : 'A combinar';
    const text = `Olá, Matheus! Meu nome é ${formData.name}.
Gostaria de uma proposta para o meu evento:
• Tipo de Evento: ${formData.eventType || 'Não especificado'}
• Data do Evento: ${formattedDate}
• Cidade/Local: ${formData.city || 'Não informado'}
• WhatsApp: ${formData.phone}
${formData.message ? `• Mensagem: ${formData.message}` : ''}`;

    window.open(`https://wa.me/5511996484730?text=${encodeURIComponent(text)}`, '_blank');
  };

  const galleryData = [
    {
      title: "Uma Noite Inesquecível",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791555011720.mp4"
    },
    {
      title: "Voz e Violão na Cerimônia",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791554979756.mp4"
    },
    {
      title: "Emoção com os Noivos",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791555056267.mp4"
    },
    {
      title: "Energia na Pista de Dança",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791555120099.mp4"
    },
    {
      title: "Quando Todos Cantam Juntos",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791555136570.mp4"
    },
    {
      title: "Apresentação com Banda",
      category: "Casamento",
      videoSrc: "/Videos/snapinsta-1791555214315.mp4"
    },
    {
      title: "A Trilha Sonora da História",
      category: "Show",
      videoSrc: "/Videos/snapinsta-1791555222989.mp4"
    },
    {
      title: "Acústico ao Ar Livre",
      category: "Chá Revelação",
      videoSrc: "/Videos/snapinsta-1791906965525.mp4"
    },
    {
      title: "Momento da Revelação",
      category: "Chá Revelação",
      videoSrc: "/Videos/snapinsta-1791906993931.mp4"
    },
    {
      title: "Celebração com Convidados",
      category: "Chá Revelação",
      videoSrc: "/Videos/snapinsta-1791907073465.mp4"
    },
    {
      title: "Identidade & Estrutura",
      category: "Evento",
      videoSrc: "/Videos/snapinsta-1791907083880.mp4"
    },
    {
      title: "Visita & Ação Especial",
      category: "Ação Especial",
      videoSrc: "/Videos/snapinsta-1791907169170.mp4"
    },
    {
      title: "Recepção Elegante",
      category: "Evento",
      videoSrc: "/Videos/snapinsta-1791907244709.mp4"
    },
    {
      title: "Mercedes-Benz & Som",
      category: "Evento Corporativo",
      videoSrc: "/Videos/snapinsta-1791907286509.mp4"
    },
    {
      title: "BMW • Ocasião Exclusiva",
      category: "Evento Corporativo",
      videoSrc: "/Videos/snapinsta-1791907294029.mp4"
    },
    {
      title: "Cenário & Emoção",
      category: "Show",
      videoSrc: "/Videos/snapinsta-1791907401710.mp4"
    },
    {
      title: "Voz e Presença no Palco",
      category: "Show",
      videoSrc: "/Videos/snapinsta-1791907460644.mp4"
    }
  ];

  const heroVideos = [
    { src: "/Videos/snapinsta-1791554979756.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555011720.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555056267.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555120099.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555136570.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555214315.mp4#t=10", poster: "" },
    { src: "/Videos/snapinsta-1791555222989.mp4#t=10", poster: "" },
  ];

  return (
    <>
      {/* 00. NAVBAR */}
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#hero" className="logo" aria-label="Início">
            <img src="/logo-monograma.png" alt="Matheus Mafra" />
          </a>
          
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
            <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={closeMenu}>Início</a>
            <a href="#artista" className={`nav-link ${activeSection === 'artista' ? 'active' : ''}`} onClick={closeMenu}>O Artista</a>
            <a href="#experiencias" className={`nav-link ${activeSection === 'experiencias' ? 'active' : ''}`} onClick={closeMenu}>Experiências</a>
            <a href="#lancamentos" className={`nav-link ${activeSection === 'lancamentos' ? 'active' : ''}`} onClick={closeMenu}>Lançamentos</a>
            <a href="#momentos" className={`nav-link ${activeSection === 'momentos' ? 'active' : ''}`} onClick={closeMenu}>Momentos</a>
            <a href="#contato" className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`} onClick={closeMenu}>Contato</a>
            
            <a href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Conheci%20seu%20trabalho%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20apresenta%C3%A7%C3%A3o%20para%20o%20meu%20evento." target="_blank" rel="noreferrer" className="btn-primary nav-btn" onClick={closeMenu}>Solicitar Orçamento</a>
          </nav>

          <button className={`hamburger ${isMenuOpen ? 'active' : ''}`} id="hamburger" aria-label="Abrir menu" aria-expanded={isMenuOpen} onClick={toggleMenu}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </button>
        </div>
      </header>

      <main>
        {/* 01. HERO */}
        <section id="hero" className="hero relative min-h-screen flex flex-col justify-center overflow-hidden bg-black">
          
          {/* Centered Main Name */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4 z-10 pointer-events-none">
            <div className="relative text-center">
              <div>
                <BlurText
                  text="MATHEUS"
                  delay={100}
                  animateBy="letters"
                  direction="top"
                  className="font-black text-[15vw] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap text-white drop-shadow-2xl"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                />
              </div>
              <div>
                <BlurText
                  text="MAFRA"
                  delay={100}
                  animateBy="letters"
                  direction="top"
                  className="font-black text-[15vw] leading-[0.75] tracking-tighter uppercase justify-center whitespace-nowrap text-white drop-shadow-2xl"
                  style={{ fontFamily: "'Fira Code', monospace" }}
                />
              </div>

            </div>
          </div>

          {/* Tagline */}
          <div className="absolute bottom-16 sm:bottom-24 left-1/2 -translate-x-1/2 w-full px-6 z-10">
            <div className="flex flex-col items-center justify-center gap-6">
              <div className="hero-actions opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards]">
                <a href="#experiencias" className="btn-secondary">Conheça a Experiência</a>
                <a href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Conheci%20seu%20trabalho%20pelo%20site%20e%20gostaria%20de%20conversar%20sobre%20uma%20apresenta%C3%A7%C3%A3o%20para%20o%20meu%20evento." target="_blank" rel="noreferrer" className="btn-primary">Solicitar Orçamento</a>
              </div>
            </div>
          </div>

          <div className="scroll-indicator z-10">
            <span>Rolar</span>
            <div className="scroll-line"></div>
          </div>
        </section>

        {/* 02. ASSINATURA DE POSICIONAMENTO */}
        <section id="assinatura" className="w-full py-20 bg-black">
          <VideoStreamHero 
            videos={heroVideos} 
            cards={7}
            speed={25}
            className="w-full h-[90vh] flex flex-col items-center justify-center text-center px-4"
          >
            <div className="relative z-10 max-w-2xl mx-auto fade-up px-4" style={{ transform: 'translateY(-12rem)' }}>
              <h2 className="section-title text-white" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1.1, marginBottom: '1rem' }}>
                MOMENTOS REAIS.
              </h2>
              <p className="editorial-text mx-auto text-white opacity-80" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.25rem)' }}>
                A energia inconfundível de uma apresentação ao vivo.
              </p>
            </div>
          </VideoStreamHero>
        </section>

        {/* 03. EXPERIÊNCIAS */}
        <section id="experiencias" className="experiencias section-padding bg-darker">
          <div className="container">
            <h2 className="section-title text-center fade-up">UMA EXPERIÊNCIA PARA<br/>CADA HISTÓRIA.</h2>
            
            <div className="experiencias-grid">
              <article className="experiencia-card fade-up">
                <div className="card-image-wrapper">
                  <img src="/matheus-mafra-casamento-hdshot.png" alt="Casamentos" className="card-image" loading="lazy" style={{ objectPosition: 'top' }} />
                </div>
                <div className="card-content">
                  <h3>Casamentos</h3>
                  <p>Música para cerimônia, recepção e celebração, respeitando a atmosfera e a história de cada casal.</p>
                </div>
              </article>

              <article className="experiencia-card fade-up delay-1">
                <div className="card-image-wrapper">
                  <img src="/matheus-mafra-violao-hdshot.png" alt="Aniversários" className="card-image" loading="lazy" style={{ objectPosition: 'top' }} />
                </div>
                <div className="card-content">
                  <h3>Aniversários</h3>
                  <p>Repertório, presença e energia para transformar a comemoração em uma experiência memorável.</p>
                </div>
              </article>

              <article className="experiencia-card fade-up delay-2">
                <div className="card-image-wrapper">
                  <img src="/matheus-mafra-show-hdshot.png" alt="Eventos Especiais" className="card-image" loading="lazy" style={{ objectPosition: 'top' }} />
                </div>
                <div className="card-content">
                  <h3>Eventos Especiais</h3>
                  <p>Apresentações personalizadas para celebrações particulares, corporativas e ocasiões importantes.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* 04. EXPERIÊNCIA AO VIVO */}
        <section id="experiencia-ao-vivo" className="experiencia-ao-vivo section-padding">
          <div className="container text-center">
            <h2 className="section-title fade-up">NÃO É APENAS SOBRE OUVIR.</h2>
            <span className="highlight-text fade-up delay-1">É SOBRE SENTIR, CELEBRAR E LEMBRAR.</span>
            
            <HighlightVideo 
              videoSrc="/Videos/mafra-filme-1.mp4"
              onOpen={() => openModal("/Videos/mafra-filme-1.mp4")}
              isModalOpen={!!modalVideo}
            />
          </div>
        </section>

        {/* 05. MOMENTOS REAIS */}
        <section id="momentos" className="momentos section-padding bg-darker">
          <div className="container">
            <h2 className="section-title fade-up">MOMENTOS QUE GANHARAM<br/>UMA TRILHA SONORA.</h2>
            
            <div className="gallery-grid" id="video-gallery">
              {galleryData.map((item, index) => (
                <GalleryVideoItem 
                  key={index}
                  item={item}
                  onOpen={() => openModal(item.videoSrc)}
                  isModalOpen={!!modalVideo}
                />
              ))}

              {/* Card CTA: Qual será o seu momento? */}
              <a 
                href="#contato"
                className="gallery-item gallery-cta-card"
                aria-label="Qual será o seu momento? Solicite uma proposta para o seu evento"
              >
                <div className="gallery-cta-glow"></div>
                <div className="gallery-cta-content">
                  <div className="gallery-cta-badge">
                    <span className="gallery-cta-dot"></span>
                    <span>SEU EVENTO</span>
                  </div>

                  <div className="gallery-cta-center">
                    <div className="gallery-cta-icon-wrap">
                      <img src="/logo-monograma.png" alt="Matheus Mafra" className="gallery-cta-monogram" />
                    </div>
                    <h3 className="gallery-cta-title">
                      QUAL SERÁ O SEU MOMENTO?
                    </h3>
                    <p className="gallery-cta-desc">
                      Casamento, aniversário, show ou corporativo.
                    </p>
                  </div>

                  <div className="gallery-cta-footer">
                    <span className="gallery-cta-btn">
                      <span>Solicitar Proposta</span>
                      <ArrowUpRightIcon size={14} />
                    </span>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </section>

        {/* 06. LANÇAMENTOS */}
        <LancamentosSection onOpenModalVideo={openModal} />

        {/* 07. O ARTISTA */}
        <section id="artista" className="artista section-padding bg-darker">
          <div className="container artista-grid">
            <div className="artista-image-wrapper fade-in">
              <img src="/foto-960x1280.jpg" alt="Matheus Mafra" className="artista-image" loading="lazy" />
            </div>
            <div className="artista-text fade-up">
              <span className="eyebrow">MATHEUS MAFRA</span>
              <h2 className="section-title">O ARTISTA POR<br/>TRÁS DA VOZ.</h2>
              
              <div className="editorial-body">
                <p>Cantor há mais de 10 anos, Matheus Mafra encontrou na música uma forma de transformar encontros em memórias. Sua trajetória reúne apresentações, celebrações e histórias vividas ao lado de pessoas que escolheram a música para marcar momentos importantes.</p>
                <p>Hoje, sua experiência se encontra com uma proposta mais próxima, elegante e personalizada: criar a atmosfera certa para casamentos, aniversários e celebrações especiais.</p>
                <p>Mais do que interpretar canções, Matheus busca compreender a história por trás de cada evento e transformá-la em uma experiência com significado.</p>
                
                <p className="signature">Porque toda história merece uma trilha sonora.</p>
              </div>


            </div>
          </div>
        </section>

        {/* 09. CONTATO */}
        <section id="contato" className="contato section-padding bg-darker">
          <div className="container contato-grid">
            <div className="contato-text fade-up">
              <span className="eyebrow">CONTATO & AGENDAMENTO</span>
              <h2 className="section-title">VAMOS CRIAR A TRILHA<br/>SONORA DA SUA HISTÓRIA?</h2>
              <p className="editorial-text">Conte um pouco sobre a sua celebração e receba uma proposta personalizada com os formatos ideais para você.</p>
              


              <a 
                href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Conheci%20seu%20trabalho%20pelo%20site%20e%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20para%20o%20meu%20evento." 
                target="_blank" 
                rel="noreferrer" 
                className="btn-primary large-btn" 
                style={{ marginTop: '2rem' }}
              >
                <WhatsAppFilledIcon size={20} style={{ marginRight: '8px' }} />
                Falar com Matheus no WhatsApp
              </a>
            </div>
            
            <div className="contato-form fade-up delay-1">
              <form id="contactForm" onSubmit={handleContactSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Nome completo</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Seu nome"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">WhatsApp</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    required 
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="(11) 99999-9999"
                  />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Tipo de evento</label>
                    <select 
                      id="eventType" 
                      required
                      value={formData.eventType}
                      onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                    >
                      <option value="">Selecione...</option>
                      <option value="Casamento (Cerimônia / Festa)">Casamento</option>
                      <option value="Aniversário / Festa Privada">Aniversário</option>
                      <option value="Evento Corporativo">Corporativo</option>
                      <option value="Outro Evento Especial">Outro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Data do evento</label>
                    <DatePicker 
                      id="date" 
                      selected={eventDate} 
                      onChange={(date: Date | null) => setEventDate(date)} 
                      dateFormat="dd/MM/yyyy"
                      placeholderText="dd/mm/aaaa"
                      locale="pt-BR"
                      fixedHeight
                      className="w-full bg-transparent border-b border-white/20 text-white py-3 font-body text-base outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="city">Cidade/Local</label>
                  <input 
                    type="text" 
                    id="city" 
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Ex: São Paulo, Campinas..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensagem / Observações</label>
                  <textarea 
                    id="message" 
                    rows={4} 
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Conte um pouco sobre o evento ou formato desejado..."
                  ></textarea>
                </div>
                <button type="submit" className="btn-secondary w-100" style={{marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'}}>
                  <WhatsAppFilledIcon size={18} />
                  <span>Enviar Briefing via WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 10. RODAPÉ DE LUXO */}
      <footer className="footer bg-darker" style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="container">
          <div className="footer-grid-4">
            {/* Brand */}
            <div className="footer-brand">
              <a href="#hero" style={{ display: 'inline-block', marginBottom: '1.25rem' }}>
                <img src="/logo-monograma.png" alt="Matheus Mafra" style={{ height: '48px', width: 'auto' }} />
              </a>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                Transformando celebrações em memórias inesquecíveis através da música ao vivo. Repertório exclusivo e sensibilidade para cada ocasião.
              </p>
              <span style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-accent)', fontFamily: 'monospace' }}>
                São Paulo &bull; Campinas &bull; Atendimento Nacional
              </span>
            </div>

            {/* Quick Links */}
            <div className="footer-links">
              <h4>Navegação</h4>
              <a href="#hero">Início</a>
              <a href="#artista">O Artista</a>
              <a href="#experiencias">Experiências</a>
              <a href="#lancamentos">Lançamentos</a>
              <a href="#momentos">Momentos</a>
              <a href="#contato">Contato</a>
            </div>

            {/* Canais Oficiais */}
            <div className="footer-social">
              <h4>Canais Oficiais</h4>
              <ul className="footer-social-list">
                <li>
                  <a href="https://wa.me/5511996484730" target="_blank" rel="noreferrer" className="wa">
                    <WhatsAppFilledIcon size={18} style={{ color: '#25D366' }} />
                    <span>WhatsApp: (11) 99648-4730</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/matheusmafra/" target="_blank" rel="noreferrer" className="ig">
                    <InstagramIcon size={18} style={{ color: '#E1306C' }} />
                    <span>Instagram: @matheusmafra</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.youtube.com/@matheusmafra" target="_blank" rel="noreferrer" className="yt">
                    <YouTubeIcon size={18} style={{ color: '#FF0000' }} />
                    <span>YouTube: @matheusmafra</span>
                  </a>
                </li>
                <li>
                  <a href="https://open.spotify.com/search/Matheus%20Mafra" target="_blank" rel="noreferrer" className="sp">
                    <SpotifyIcon size={18} style={{ color: '#1DB954' }} />
                    <span>Spotify & Streaming</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Atendimento & Contato */}
            <div>
              <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.2rem', marginBottom: '1.5rem', color: '#fff' }}>Atendimento</h4>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.88rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                Atendimento personalizado para casais, famílias e produtoras de eventos.
              </p>
              <a 
                href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Gostaria%20de%20conversar%20sobre%20uma%20apresenta%C3%A7%C3%A3o%20para%20o%20meu%20evento."
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
                style={{ width: '100%', textAlign: 'center', fontSize: '0.8rem', padding: '0.85rem 1rem' }}
              >
                Solicitar Orçamento
              </a>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom">
            <p>&copy; 2026 Matheus Mafra. Todos os direitos reservados.</p>
            <a href="https://gracecodesystems.com" target="_blank" rel="noopener noreferrer" className="dev-link">
              Desenvolvido por Grace Code Systems
            </a>
          </div>
        </div>
      </footer>

      {/* Video Modal */}
      <div className={`video-modal ${modalVideo ? 'active' : ''}`} id="videoModal" aria-hidden={!modalVideo} role="dialog" onClick={closeModal}>
        <button className="close-modal" aria-label="Fechar vídeo" onClick={closeModal}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        <div className="modal-content" onClick={e => e.stopPropagation()}>
          {modalVideo && (
            <video controls playsInline id="modalVideo" className="modal-video" src={modalVideo} autoPlay></video>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
