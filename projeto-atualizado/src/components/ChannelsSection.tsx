import React from 'react';
import { 
  WhatsAppFilledIcon, 
  InstagramIcon, 
  YouTubeIcon, 
  SpotifyIcon, 
  ArrowUpRightIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon
} from './Icons';

export const ChannelsSection: React.FC = () => {
  const channels = [
    {
      id: 'whatsapp',
      className: 'whatsapp',
      name: 'WhatsApp Oficial',
      badge: 'Atendimento Rápido',
      handle: '(11) 99648-4730',
      description: 'Canal direto para consulta de datas, formatos de apresentação (acústico ou banda completa) e envio de proposta sob medida.',
      cta: 'Iniciar Conversa',
      href: 'https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Conheci%20seu%20trabalho%20pelo%20site%20e%20gostaria%20de%20consultar%20disponibilidade%20para%20o%20meu%20evento.',
      icon: <WhatsAppFilledIcon size={26} />
    },
    {
      id: 'instagram',
      className: 'instagram',
      name: 'Instagram',
      badge: '@matheusmafra',
      handle: 'Shows & Bastidores',
      description: 'Acompanhe a rotina semanal de apresentações ao vivo, trechos de casamentos, cerimônias emocionantes e stories diários.',
      cta: 'Acompanhar no Instagram',
      href: 'https://www.instagram.com/matheusmafra/',
      icon: <InstagramIcon size={26} />
    },
    {
      id: 'youtube',
      className: 'youtube',
      name: 'YouTube',
      badge: 'Performances HD',
      handle: 'Vídeos & Canções',
      description: 'Assista a vídeos gravados em alta definição, interpretações acústicas voz e violão, medleys especiais e apresentações completas.',
      cta: 'Assistir no YouTube',
      href: 'https://www.youtube.com/@matheusmafra',
      icon: <YouTubeIcon size={26} />
    },
    {
      id: 'spotify',
      className: 'spotify',
      name: 'Spotify & Streaming',
      badge: 'Músicas & Áudio',
      handle: 'Faixas & Playlists',
      description: 'Ouça músicas gravadas, seleções de repertório e referências sonoras para se inspirar e montar a trilha ideal do seu momento.',
      cta: 'Ouvir no Spotify',
      href: 'https://open.spotify.com/search/Matheus%20Mafra',
      icon: <SpotifyIcon size={26} />
    }
  ];

  return (
    <section id="canais" className="channels-section section-padding">
      <div className="container">
        {/* Section Header */}
        <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto 1.5rem' }}>
          <span className="eyebrow">CANAIS & CONEXÕES</span>
          <h2 className="section-title">
            ONDE ME ENCONTRAR,<br />OUVIR E CONVERSAR.
          </h2>
          <p className="editorial-text text-center" style={{ margin: '0 auto' }}>
            Acompanhe o trabalho em tempo real pelas redes sociais, ouça as músicas nas plataformas de streaming ou chame diretamente no WhatsApp para tirar dúvidas sobre o seu evento.
          </p>
        </div>

        {/* Channels Cards Grid */}
        <div className="channels-grid">
          {channels.map((channel) => (
            <a
              key={channel.id}
              href={channel.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`channel-card ${channel.className}`}
            >
              <div className="channel-card-glow"></div>

              <div>
                <div className="channel-card-header">
                  <div className="channel-card-icon">
                    {channel.icon}
                  </div>
                  <span className="channel-card-badge">
                    {channel.badge}
                  </span>
                </div>

                <h3 className="channel-card-title">{channel.name}</h3>
                <span className="channel-card-handle">{channel.handle}</span>
                <p className="channel-card-desc">{channel.description}</p>
              </div>

              <div className="channel-card-action">
                <span>{channel.cta}</span>
                <span className="channel-card-action-icon">
                  <ArrowUpRightIcon size={14} />
                </span>
              </div>
            </a>
          ))}
        </div>

        {/* Banner with Direct Contacts and Coverage */}
        <div className="channels-banner">
          <div className="channels-banner-items">
            <div className="channels-banner-item">
              <PhoneIcon size={22} style={{ color: '#25D366' }} />
              <div>
                <span className="label">Telefone / WhatsApp</span>
                <a 
                  href="https://wa.me/5511996484730" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="value"
                >
                  +55 (11) 99648-4730
                </a>
              </div>
            </div>

            <div className="channels-banner-item">
              <MapPinIcon size={22} style={{ color: '#ffffff' }} />
              <div>
                <span className="label">Região de Atuação</span>
                <span className="value">São Paulo, Jundiaí, Campinas & Brasil</span>
              </div>
            </div>

            <div className="channels-banner-item">
              <MailIcon size={22} style={{ color: '#ffffff' }} />
              <div>
                <span className="label">E-mail de Contato</span>
                <a href="mailto:contato@matheusmafra.com.br" className="value">
                  contato@matheusmafra.com.br
                </a>
              </div>
            </div>
          </div>

          <a 
            href="https://wa.me/5511996484730?text=Ol%C3%A1%2C%20Matheus!%20Gostaria%20de%20solicitar%20uma%20proposta%20personalizada%20para%20o%20meu%20evento."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
            style={{ textDecoration: 'none' }}
          >
            Falar Diretamente Agora
          </a>
        </div>
      </div>
    </section>
  );
};

export default ChannelsSection;
