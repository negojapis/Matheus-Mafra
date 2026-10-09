import React, { useEffect, useState } from 'react';
import VideoStreamHero from './components/VideoStreamHero';
import { BlurText } from './components/BlurText';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ptBR } from 'date-fns/locale/pt-BR';

registerLocale('pt-BR', ptBR);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const [eventDate, setEventDate] = useState<Date | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = document.querySelectorAll('section');
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id') || '';
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .fade-in').forEach(element => {
      observer.observe(element);
    });
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

  const galleryData = [
    {
      title: "Uma noite inesquecível",
      category: "Casamento",
      videoSrc: "/videos/weddings/video-1.mp4",
      posterSrc: "/images/posters/momento-1.jpg",
      orientation: "horizontal"
    },
    {
      title: "O início de uma nova história",
      category: "Cerimônia",
      videoSrc: "/videos/weddings/video-2.mp4",
      posterSrc: "/images/posters/momento-2.jpg",
      orientation: "vertical"
    },
    {
      title: "Quando todos cantam juntos",
      category: "Celebração",
      videoSrc: "/videos/events/video-3.mp4",
      posterSrc: "/images/posters/momento-3.jpg",
      orientation: "vertical"
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
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="nav-container">
          <a href="#hero" className="logo" aria-label="Início">
            <img src="/logo-monograma.png" alt="Matheus Mafra" />
          </a>
          
          <nav className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="nav-links">
            <a href="#hero" className={`nav-link ${activeSection === 'hero' ? 'active' : ''}`} onClick={closeMenu}>Início</a>
            <a href="#artista" className={`nav-link ${activeSection === 'artista' ? 'active' : ''}`} onClick={closeMenu}>O Artista</a>
            <a href="#experiencias" className={`nav-link ${activeSection === 'experiencias' ? 'active' : ''}`} onClick={closeMenu}>Experiências</a>
            <a href="#repertorio" className={`nav-link ${activeSection === 'repertorio' ? 'active' : ''}`} onClick={closeMenu}>Repertório</a>
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
            
            <div className="video-highlight-wrapper fade-up delay-2" onClick={() => openModal("/Videos/mafra-filme-1.mp4")}>
              <video 
                src="/Videos/mafra-filme-1.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="video-poster" 
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </section>

        {/* 05. MOMENTOS REAIS */}
        <section id="momentos" className="momentos section-padding bg-darker">
          <div className="container">
            <h2 className="section-title fade-up">MOMENTOS QUE GANHARAM<br/>UMA TRILHA SONORA.</h2>
            
            <div className="gallery-grid" id="video-gallery">
              {galleryData.map((item, index) => {
                const delayClass = index > 0 ? `delay-${index}` : '';
                return (
                  <div key={index} className={`gallery-item ${item.orientation} fade-up ${delayClass}`} onClick={() => openModal(item.videoSrc)}>
                    <img src={item.posterSrc} alt={item.title} className="gallery-poster" loading="lazy" />
                    <div className="gallery-info">
                        <span className="gallery-category">{item.category}</span>
                        <h3>{item.title}</h3>
                    </div>
                    <button className="play-button" aria-label="Reproduzir vídeo">
                        <svg viewBox="0 0 24 24" fill="none"><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 06. REPERTÓRIO */}
        <section id="repertorio" className="repertorio section-padding">
          <div className="container repertorio-grid">
            <div className="repertorio-text fade-up">
              <h2 className="section-title">UM REPERTÓRIO QUE<br/>ACOMPANHA CADA MOMENTO.</h2>
              <p className="editorial-text">Da emoção da cerimônia à energia da celebração, cada apresentação é construída de acordo com a história, o público e a atmosfera do evento.</p>
              
              <ul className="repertorio-categories">
                <li>MPB</li>
                <li>Pop</li>
                <li>Sertanejo</li>
                <li>Samba</li>
                <li>Românticas</li>
                <li>Internacionais</li>
              </ul>
              <p className="repertorio-note">O repertório pode ser personalizado de acordo com o perfil e os momentos da celebração.</p>
            </div>
            
            <div className="repertorio-players fade-up delay-1">
              <div className="player-card">
                <div className="player-info">
                  <h4>Cerimônia Acústica</h4>
                  <span>Voz e Violão</span>
                </div>
                <button className="player-btn" aria-label="Tocar áudio">
                  <svg viewBox="0 0 24 24" fill="none" style={{width: '20px', height: '20px', marginLeft: '4px'}}><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>
                </button>
              </div>
              <div className="player-card">
                <div className="player-info">
                  <h4>Festa Pop/Sertanejo</h4>
                  <span>Banda Completa</span>
                </div>
                <button className="player-btn" aria-label="Tocar áudio">
                  <svg viewBox="0 0 24 24" fill="none" style={{width: '20px', height: '20px', marginLeft: '4px'}}><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>
                </button>
              </div>
              <div className="player-card">
                <div className="player-info">
                  <h4>Recepção Lounge</h4>
                  <span>Voz, Violão e Percussão</span>
                </div>
                <button className="player-btn" aria-label="Tocar áudio">
                  <svg viewBox="0 0 24 24" fill="none" style={{width: '20px', height: '20px', marginLeft: '4px'}}><path d="M8 5V19L19 12L8 5Z" fill="currentColor"/></svg>
                </button>
              </div>
            </div>
          </div>
        </section>

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
                
                <p className="signature">Porque toda história merece uma trilha sonora. ✨</p>
              </div>
            </div>
          </div>
        </section>



        {/* 09. CONTATO */}
        <section id="contato" className="contato section-padding bg-darker">
          <div className="container contato-grid">
            <div className="contato-text fade-up">
              <h2 className="section-title">VAMOS CRIAR A TRILHA<br/>SONORA DA SUA HISTÓRIA?</h2>
              <p className="editorial-text">Conte um pouco sobre a sua celebração e receba uma proposta personalizada.</p>
              
              <a href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Conheci%20seu%20trabalho%20pelo%20site%20e%20gostaria%20de%20solicitar%20informa%C3%A7%C3%B5es%20para%20o%20meu%20evento." target="_blank" rel="noreferrer" className="btn-primary large-btn" style={{marginTop: '2rem'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '8px'}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                Fale com Matheus
              </a>
            </div>
            
            <div className="contato-form fade-up delay-1">
              <form id="contactForm" onSubmit={(e) => { e.preventDefault(); alert('Em breve! Por enquanto, utilize o botão do WhatsApp.'); }}>
                <div className="form-group">
                  <label htmlFor="name">Nome completo</label>
                  <input type="text" id="name" required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">WhatsApp</label>
                  <input type="tel" id="phone" required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="eventType">Tipo de evento</label>
                    <select id="eventType" required>
                      <option value="">Selecione...</option>
                      <option value="casamento">Casamento</option>
                      <option value="aniversario">Aniversário</option>
                      <option value="corporativo">Corporativo</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Data do evento</label>
                    <DatePicker 
                      id="date" 
                      selected={eventDate} 
                      onChange={(date) => setEventDate(date)} 
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
                  <input type="text" id="city" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Mensagem</label>
                  <textarea id="message" rows={4} placeholder="Conte um pouco sobre o evento..."></textarea>
                </div>
                <button type="submit" className="btn-secondary w-100" style={{marginTop: '1rem'}}>Enviar Mensagem</button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* 10. RODAPÉ */}
      <footer className="footer">
        <div className="container footer-bottom">
          <p>&copy; 2026 Matheus Mafra. Todos os direitos reservados.</p>
          <a href="https://gracecodesystems.com" target="_blank" rel="noopener noreferrer" className="dev-link">Desenvolvido por Grace Code Systems</a>
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
