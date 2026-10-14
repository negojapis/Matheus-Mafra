import React, { useState } from 'react';
import { PlayIcon, WhatsAppFilledIcon } from './Icons';

interface FormatItem {
  id: string;
  title: string;
  subtitle: string;
  desc: string;
  videoPreview: string;
}

export const EventFormatsSection: React.FC<{
  onOpenModalVideo?: (videoSrc: string) => void;
}> = ({ onOpenModalVideo }) => {
  const [activePreview, setActivePreview] = useState<string | null>(null);

  const formats: FormatItem[] = [
    {
      id: 'cerimonia',
      title: 'Cerimônia Acústica',
      subtitle: 'Voz e Violão',
      desc: 'Arranjos intimistas e emocionantes para entradas, votos e bênção com delicadeza acústica.',
      videoPreview: '/Videos/snapinsta-1791554979756.mp4',
    },
    {
      id: 'festa',
      title: 'Festa Pop / Sertanejo',
      subtitle: 'Banda Completa',
      desc: 'Energia contagiante na pista com sucessos atemporais e atuais para fazer todos cantarem juntos.',
      videoPreview: '/Videos/snapinsta-1791555120099.mp4',
    },
    {
      id: 'lounge',
      title: 'Recepção Lounge',
      subtitle: 'Voz, Violão e Percussão',
      desc: 'Atmosfera elegante e sofisticada para receber os convidados com um repertório acolhedor.',
      videoPreview: '/Videos/snapinsta-1791555056267.mp4',
    },
  ];

  const handlePlay = (item: FormatItem) => {
    if (onOpenModalVideo) {
      onOpenModalVideo(item.videoPreview);
    } else {
      setActivePreview(prev => prev === item.id ? null : item.id);
    }
  };

  return (
    <section id="formatos-eventos" className="formatos-eventos section-padding bg-darker">
      <div className="container">
        
        <div className="formatos-header text-center fade-up">
          <span className="eyebrow">FORMATOS PARA O SEU EVENTO</span>
          <h2 className="section-title">A FORMAÇÃO IDEAL PARA<br />CADA MOMENTO DA CELEBRAÇÃO.</h2>
          <p className="editorial-text text-center max-w-2xl mx-auto">
            Cada evento possui uma dinâmica única. Escolha a formação musical que melhor traduz a atmosfera da sua celebração.
          </p>
        </div>

        <div className="formatos-cards-grid">
          {formats.map((item) => (
            <div key={item.id} className="format-card fade-up">
              <div className="format-card-top">
                <div className="format-card-badge">FORMATO EXCLUSIVO</div>
                <button 
                  className={`format-play-btn ${activePreview === item.id ? 'active' : ''}`}
                  onClick={() => handlePlay(item)}
                  aria-label={`Ouvir demonstração de ${item.title}`}
                >
                  <PlayIcon size={18} />
                </button>
              </div>

              <div className="format-card-content">
                <h3 className="format-card-title">{item.title}</h3>
                <span className="format-card-subtitle">{item.subtitle}</span>
                <p className="format-card-desc">{item.desc}</p>
              </div>

              <div className="format-card-footer">
                <a 
                  href={`https://wa.me/5511996484730?text=${encodeURIComponent(`Olá, Matheus! Gostaria de informações sobre o formato "${item.title} (${item.subtitle})" para o meu evento.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="format-cta-link"
                >
                  <WhatsAppFilledIcon size={16} />
                  <span>Consultar disponibilidade</span>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
