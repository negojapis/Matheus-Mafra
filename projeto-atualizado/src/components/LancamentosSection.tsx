import React, { useState, useEffect, useRef } from 'react';
import { 
  SpotifyIcon, 
  YouTubeIcon, 
  DeezerIcon, 
  AppleMusicIcon, 
  PlayIcon, 
  PauseIcon,
  ArrowUpRightIcon 
} from './Icons';

interface OtherRelease {
  id: string;
  title: string;
  date: string;
  type: string;
  cover: string;
  previewAudio?: string;
  streamingUrl: string;
}

export const LancamentosSection: React.FC<{
  onOpenModalVideo?: (videoSrc: string) => void;
}> = ({ onOpenModalVideo }) => {
  // Target release date: 06 de Novembro de 2026 às 00:00 (Horário de Brasília)
  const targetDate = new Date('2026-11-06T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isReleased: false,
  });

  const [isPlayingTeaser, setIsPlayingTeaser] = useState(false);
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null);
  const [isPreSaveOpen, setIsPreSaveOpen] = useState(false);
  const teaserVideoRef = useRef<HTMLVideoElement | null>(null);
  const audioPreviewRef = useRef<HTMLAudioElement | null>(null);

  // Dynamic Countdown calculation
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isReleased: true,
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds,
          isReleased: false,
        });
      }
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const elList = document.querySelectorAll('#lancamentos .fade-up, #lancamentos .fade-in');
    elList.forEach(el => el.classList.add('visible'));
  }, []);

  const toggleTeaserPlayback = () => {
    if (!teaserVideoRef.current) return;
    if (isPlayingTeaser) {
      teaserVideoRef.current.pause();
      setIsPlayingTeaser(false);
    } else {
      teaserVideoRef.current.muted = false;
      teaserVideoRef.current.play().then(() => {
        setIsPlayingTeaser(true);
      }).catch(() => {
        if (!teaserVideoRef.current) return;
        teaserVideoRef.current.muted = true;
        teaserVideoRef.current.play().then(() => {
          setIsPlayingTeaser(true);
        }).catch(() => {
          if (onOpenModalVideo) {
            onOpenModalVideo('/Videos/IMG_9605.mp4');
          } else {
            setIsPlayingTeaser(false);
          }
        });
      });
    }
  };

  const handleOpenTeaserModal = () => {
    if (teaserVideoRef.current && isPlayingTeaser) {
      teaserVideoRef.current.pause();
      setIsPlayingTeaser(false);
    }
    if (onOpenModalVideo) {
      onOpenModalVideo('/Videos/IMG_9605.mp4');
    } else {
      toggleTeaserPlayback();
    }
  };

  const otherReleases: OtherRelease[] = [
    {
      id: 'pensando-em-voce',
      title: 'Pensando em Você',
      date: '23.04.2022',
      type: 'Single',
      cover: '/pensando-em-voce-cover.jpg',
      previewAudio: 'https://p.scdn.co/mp3-preview/319df5736b909fdc296caf8645e0dad72b0dcfdc',
      streamingUrl: 'https://open.spotify.com/intl-pt/track/7gi67XGyhCqt2uPSuUrUx4?si=8a46973019e24280',
    },
    {
      id: 'fica-com-deus',
      title: 'Fica Com Deus',
      date: '2026',
      type: 'Single',
      cover: '/fica-com-deus-cover.jpg',
      streamingUrl: 'https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg',
    },
    {
      id: 'quem-ama-cuida',
      title: 'Quem Ama Cuida',
      date: '2026',
      type: 'Single',
      cover: '/quem-ama-cuida-cover.jpg',
      streamingUrl: 'https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg',
    },
    {
      id: 'so-voce',
      title: 'Só Você',
      date: '2026',
      type: 'Single',
      cover: '/so-voce-cover.jpg',
      streamingUrl: 'https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg',
    },
    {
      id: 'conto-com-voce',
      title: 'Conto Com Você',
      date: '2023',
      type: 'Single',
      cover: '/conto-com-voce-cover.jpg',
      streamingUrl: 'https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg',
    },
    {
      id: 'pequena-mudanca',
      title: 'Pequena Mudança',
      date: 'Single',
      type: 'Single',
      cover: '/pequena-mudanca-cover.jpg',
      streamingUrl: 'https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg',
    },
  ];

  const handlePlayOther = (item: OtherRelease) => {
    if (item.previewAudio) {
      if (playingTrackId === item.id) {
        audioPreviewRef.current?.pause();
        setPlayingTrackId(null);
      } else {
        if (audioPreviewRef.current) {
          audioPreviewRef.current.src = item.previewAudio;
          audioPreviewRef.current.play().then(() => {
            setPlayingTrackId(item.id);
          }).catch(() => {
            window.open(item.streamingUrl, '_blank');
          });
        }
      }
    } else {
      window.open(item.streamingUrl, '_blank');
    }
  };

  return (
    <section id="lancamentos" className="lancamentos section-padding">
      <div className="container">
        
        {/* Main Release 2-Column Hero */}
        <div className="lancamento-main-grid">
          
          {/* Left Column: Info, Countdown & CTAs */}
          <div className="lancamento-info-col fade-up">
            
            <div className="lancamento-kicker-wrapper">
              <span className="lancamento-kicker">
                {timeLeft.isReleased ? 'JÁ DISPONÍVEL' : 'PRÓXIMO LANÇAMENTO'}
              </span>
            </div>

            <h2 className="lancamento-title">COPO AMERICANO</h2>
            
            <div className="lancamento-meta">
              <span className="lancamento-meta-tag">NOVO SINGLE</span>
              <span className="lancamento-meta-separator">•</span>
              <span className="lancamento-meta-date">06.11.2026</span>
            </div>

            <p className="lancamento-description">
              Uma nova fase da trajetória de Matheus Mafra está prestes a começar. 
              <strong> &ldquo;Copo Americano&rdquo;</strong> chega às plataformas digitais no dia 6 de novembro. 
              Prepare-se para conhecer um novo capítulo dessa história.
            </p>

            {/* Countdown or Available Badge */}
            {!timeLeft.isReleased ? (
              <div className="countdown-sophisticated">
                <span className="countdown-eyebrow-text">CONTAGEM REGRESSIVA PARA O LANÇAMENTO</span>
                <div className="countdown-values-row">
                  <div className="countdown-stat">
                    <span className="countdown-val">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="countdown-lbl">DIAS</span>
                  </div>
                  <span className="countdown-divider">/</span>
                  <div className="countdown-stat">
                    <span className="countdown-val">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-lbl">HORAS</span>
                  </div>
                  <span className="countdown-divider">/</span>
                  <div className="countdown-stat">
                    <span className="countdown-val">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-lbl">MIN</span>
                  </div>
                  <span className="countdown-divider">/</span>
                  <div className="countdown-stat">
                    <span className="countdown-val">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-lbl">SEG</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="released-banner">
                <span className="released-badge">DISPONÍVEL AGORA</span>
                <p>Ouça agora em todas as suas plataformas de streaming favoritas.</p>
              </div>
            )}

            {/* Call to Action Buttons */}
            <div className="lancamento-actions">
              {!timeLeft.isReleased ? (
                <button 
                  className="btn-lancamento-primary"
                  onClick={() => setIsPreSaveOpen(true)}
                  aria-label="Fazer Pré-save de Copo Americano"
                >
                  <span className="btn-glow"></span>
                  <SpotifyIcon size={18} />
                  <span>FAZER PRÉ-SAVE</span>
                </button>
              ) : (
                <a 
                  href="https://open.spotify.com/search/Matheus%20Mafra" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="btn-lancamento-primary"
                >
                  <span className="btn-glow"></span>
                  <PlayIcon size={18} />
                  <span>OUVIR AGORA</span>
                </a>
              )}

              <button 
                className="btn-lancamento-secondary"
                onClick={handleOpenTeaserModal}
                aria-label="Assistir ao Teaser de Copo Americano"
              >
                <PlayIcon size={16} />
                <span>ASSISTIR AO TEASER</span>
              </button>
            </div>

          </div>

          {/* Right Column: Official Cover, Sound Wave & Interactive Teaser */}
          <div className="lancamento-cover-col fade-up delay-1">
            <div 
              className="lancamento-cover-wrapper"
              onClick={toggleTeaserPlayback}
              style={{ cursor: 'pointer' }}
              title={isPlayingTeaser ? "Clique para pausar o teaser" : "Clique para reproduzir o teaser"}
            >
              
              {/* Official Cover Artwork */}
              <img 
                src="/Capa-Copo Americano.jpeg" 
                alt="Capa Oficial do Single Copo Americano - Matheus Mafra" 
                className={`lancamento-cover-img ${isPlayingTeaser ? 'is-playing' : ''}`}
                loading="eager"
              />

              {/* Embedded video player when playing inline teaser */}
              <video 
                ref={teaserVideoRef}
                src="/Videos/IMG_9605-fast.mp4"
                playsInline
                loop
                preload="metadata"
                className={`lancamento-teaser-video ${isPlayingTeaser ? 'active' : ''}`}
                onEnded={() => setIsPlayingTeaser(false)}
              />

              {/* Gradient overlay */}
              <div className="lancamento-cover-overlay"></div>

              {/* Discreet Preview text indicator (no card) */}
              <span className="lancamento-previa-text">
                {isPlayingTeaser ? 'REPRODUZINDO PRÉVIA' : 'PRÉVIA OFICIAL'}
              </span>

              {/* Interactive Play/Pause Button on Cover */}
              <button 
                className={`cover-play-button ${isPlayingTeaser ? 'playing' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleTeaserPlayback();
                }}
                aria-label={isPlayingTeaser ? 'Pausar Teaser' : 'Reproduzir Teaser'}
              >
                {isPlayingTeaser ? <PauseIcon size={22} /> : <PlayIcon size={22} />}
              </button>

            </div>
          </div>

        </div>


        {/* Subseção: Outros Lançamentos */}
        <div className="outros-lancamentos-section fade-up">
          <div className="outros-header">
            <div>
              <span className="outros-eyebrow">DISCOGRAFIA</span>
              <h3 className="outros-title">OUTROS LANÇAMENTOS</h3>
            </div>
            <a 
              href="https://open.spotify.com/intl-pt/artist/1njnBjpC4mGUCdMaFpKWDy?si=YNHmcxg9RDqRytzbnuPiJg" 
              target="_blank" 
              rel="noreferrer" 
              className="outros-view-all"
            >
              Ver perfil completo no Spotify
              <ArrowUpRightIcon size={16} />
            </a>
          </div>

          <div className="outros-grid">
            {otherReleases.map((release) => (
              <div key={release.id} className="other-release-card">
                <div className="other-cover-wrapper">
                  <img src={release.cover} alt={release.title} className="other-cover-img" loading="lazy" />
                  <button 
                    className="other-play-btn"
                    onClick={() => handlePlayOther(release)}
                    aria-label={`Ouvir ${release.title}`}
                  >
                    {playingTrackId === release.id ? <PauseIcon size={16} /> : <PlayIcon size={16} />}
                  </button>
                </div>
                
                <div className="other-info">
                  <div className="other-meta">
                    <span className="other-type">{release.type}</span>
                    <span className="other-dot">•</span>
                    <span className="other-year">{release.date}</span>
                  </div>
                  <h4 className="other-track-title">{release.title}</h4>
                  <span className="other-artist">Matheus Mafra</span>
                </div>

                <a 
                  href={release.streamingUrl} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="other-listen-link"
                  aria-label={`Ouvir ${release.title} no streaming`}
                >
                  <SpotifyIcon size={16} />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Player for Song Previews */}
        <audio 
          ref={audioPreviewRef} 
          onEnded={() => setPlayingTrackId(null)}
          onPause={() => setPlayingTrackId(null)}
        />
      </div>

      {/* Pre-save Modal */}
      {isPreSaveOpen && (
        <div className="presave-modal-overlay" onClick={() => setIsPreSaveOpen(false)}>
          <div className="presave-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="presave-close-btn" 
              onClick={() => setIsPreSaveOpen(false)}
              aria-label="Fechar"
            >
              ✕
            </button>

            <div className="presave-header">
              <img src="/copo-americano-cover.jpg" alt="Copo Americano" className="presave-modal-thumb" />
              <div>
                <span className="presave-tag">PRÉ-SAVE OFICIAL</span>
                <h4>COPO AMERICANO</h4>
                <p>Matheus Mafra • Lançamento em 06/11/2026</p>
              </div>
            </div>

            <p className="presave-instruction">
              Escolha sua plataforma favorita para salvar a música e ser o primeiro a ouvir no instante do lançamento:
            </p>

            <div className="presave-options">
              <a 
                href="https://open.spotify.com/search/Matheus%20Mafra" 
                target="_blank" 
                rel="noreferrer" 
                className="presave-option spotify"
              >
                <SpotifyIcon size={20} />
                <span>Salvar no Spotify</span>
                <ArrowUpRightIcon size={16} />
              </a>

              <a 
                href="https://music.apple.com/search?term=Matheus%20Mafra" 
                target="_blank" 
                rel="noreferrer" 
                className="presave-option apple"
              >
                <AppleMusicIcon size={20} />
                <span>Adicionar no Apple Music</span>
                <ArrowUpRightIcon size={16} />
              </a>

              <a 
                href="https://www.deezer.com/search/Matheus%20Mafra" 
                target="_blank" 
                rel="noreferrer" 
                className="presave-option deezer"
              >
                <DeezerIcon size={20} />
                <span>Salvar no Deezer</span>
                <ArrowUpRightIcon size={16} />
              </a>

              <a 
                href="https://www.youtube.com/@matheusmafra" 
                target="_blank" 
                rel="noreferrer" 
                className="presave-option youtube"
              >
                <YouTubeIcon size={20} />
                <span>Inscrever-se no YouTube</span>
                <ArrowUpRightIcon size={16} />
              </a>
            </div>

            <button className="presave-done-btn" onClick={() => setIsPreSaveOpen(false)}>
              Concluído
            </button>
          </div>
        </div>
      )}

    </section>
  );
};
