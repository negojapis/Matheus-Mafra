import React from 'react';
import { WhatsAppFilledIcon } from './Icons';

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export const FloatingWhatsApp: React.FC<FloatingWhatsAppProps> = ({
  phoneNumber = '5511996484730',
  defaultMessage = 'Olá, Matheus! Conheci seu trabalho pelo site e gostaria de saber mais sobre datas e orçamentos para o meu evento.'
}) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  return (
    <aside aria-label="Atendimento via WhatsApp">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir conversa no WhatsApp com Matheus Mafra"
        className="floating-whatsapp"
      >
        {/* Tooltip */}
        <div className="floating-whatsapp-tooltip">
          <span className="floating-whatsapp-tooltip-dot"></span>
          <span>Falar no WhatsApp</span>
        </div>

        {/* Button */}
        <div className="floating-whatsapp-btn">
          <span className="floating-whatsapp-pulse"></span>
          <WhatsAppFilledIcon size={32} />
          <span className="floating-whatsapp-status"></span>
        </div>
      </a>
    </aside>
  );
};

export default FloatingWhatsApp;
