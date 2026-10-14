import React from 'react';

export interface IconProps {
  className?: string;
  size?: number;
  style?: React.CSSProperties;
}

export const WhatsAppIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" stroke="none" fill="currentColor" />
    <path d="M8.5 9.5c.2-.5.5-.6.9-.6.3 0 .6.1.8.4l1 1.4c.2.3.2.6 0 .9l-.4.5c.4.8 1.1 1.5 1.9 1.9l.5-.4c.3-.2.6-.2.9 0l1.4 1c.3.2.4.5.4.8 0 .4-.1.7-.6.9-.6.3-1.6.4-3.1-.4-1.8-1-3.2-2.4-4.2-4.2-.8-1.5-.7-2.5-.4-3.1.2-.5.5-.6.7-.6z" fill="currentColor" stroke="none" />
  </svg>
);

export const WhatsAppFilledIcon: React.FC<IconProps> = ({ className = '', size = 24, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
  >
    <path d="M17.507 14.307l-.009.075c-2.099-1.002-2.464-.875-3.045-.15-.425.53-.478.718-.832.718-.658 0-2.05-1.34-2.748-2.072-.425-.445-.486-.688.083-1.355.228-.266.389-.533.456-.763.136-.467-.272-1.396-.64-2.285-.35-.85-.724-.87-1.059-.87-.308 0-.66.012-.962.012-.352 0-.825.132-1.258.604-.434.472-1.657 1.62-1.657 3.953s1.695 4.587 1.93 4.901c.236.315 3.272 5.003 8.045 6.942 3.96 1.609 4.767 1.289 5.626 1.209.859-.08 2.775-1.134 3.167-2.231.393-1.097.393-2.037.275-2.232-.118-.194-.434-.315-.916-.554l-.403-.208z" fill="none" />
    <path d="M12.004 2C6.486 2 2.01 6.477 2.01 11.996c0 1.905.534 3.688 1.464 5.215L2.002 22l4.945-1.428a9.93 9.93 0 0 0 5.057 1.421c5.518 0 9.996-4.477 9.996-9.997 0-5.518-4.478-9.996-9.996-9.996zm0 18.23a8.21 8.21 0 0 1-4.223-1.164l-.303-.18-3.13.903.926-3.037-.197-.315a8.204 8.204 0 0 1-1.29-4.441c0-4.542 3.695-8.236 8.217-8.236 4.523 0 8.218 3.694 8.218 8.236 0 4.543-3.695 8.237-8.218 8.237z"/>
    <path d="M15.98 13.918c-.22-.11-1.3-.642-1.501-.715-.201-.073-.347-.11-.494.11-.147.22-.568.715-.697.862-.128.146-.257.165-.476.055-.22-.11-.929-.342-1.77-1.092-.654-.583-1.096-1.303-1.224-1.523-.128-.22-.014-.339.096-.449.099-.099.22-.257.33-.385.11-.128.147-.22.22-.367.073-.146.037-.275-.018-.385-.055-.11-.495-1.192-.678-1.632-.178-.429-.36-.37-.494-.377l-.421-.007c-.147 0-.385.055-.586.275-.201.22-.77.752-.77 1.833s.789 2.126.899 2.273c.11.147 1.554 2.373 3.766 3.327.526.227.937.363 1.258.465.529.168 1.01.144 1.39.088.424-.064 1.3-.532 1.484-1.045.183-.513.183-.953.128-1.045-.055-.091-.201-.146-.421-.256z"/>
  </svg>
);

export const InstagramIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export const YouTubeIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"></polygon>
  </svg>
);

export const SpotifyIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
    style={style}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.563.387-.857.207-2.35-1.435-5.308-1.76-8.793-.963-.335.077-.67-.133-.746-.468-.077-.334.132-.67.467-.746 3.808-.871 7.076-.502 9.722 1.113.294.18.387.562.207.857zm1.224-2.719c-.226.368-.71.482-1.078.256-2.69-1.653-6.79-2.131-9.97-1.165-.413.125-.85-.107-.975-.52-.126-.414.106-.851.52-.976 3.632-1.102 8.147-.568 11.247 1.327.368.226.482.71.256 1.078zm.105-2.835C14.692 8.93 9.37 8.754 6.297 9.687c-.495.15-1.02-.134-1.17-.629-.15-.495.134-1.02.63-1.17 3.532-1.072 9.404-.863 13.114 1.34.444.263.59.84.327 1.284-.264.444-.84.59-1.284.327z"/>
  </svg>
);

export const PhoneIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
  </svg>
);

export const MailIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const MapPinIcon: React.FC<IconProps> = ({ className = '', size = 20, style }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="1.75" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
    style={style}
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export const ArrowUpRightIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 18 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export const DeezerIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M18.8 6.4h3.6v2.4h-3.6zM18.8 9.6h3.6v2.4h-3.6zM18.8 12.8h3.6v2.4h-3.6zM18.8 16h3.6v2.4h-3.6zM13.2 9.6h3.6v2.4h-3.6zM13.2 12.8h3.6v2.4h-3.6zM13.2 16h3.6v2.4h-3.6zM7.6 12.8h3.6v2.4H7.6zM7.6 16h3.6v2.4H7.6zM2 16h3.6v2.4H2z" />
  </svg>
);

export const AppleMusicIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.524 4.477 10 10 10s10-4.476 10-10c0-5.523-4.477-10-10-10zm4.237 6.786l-4.52 1.303a.586.586 0 0 0-.424.561v4.868c-.377-.282-.876-.438-1.424-.438-1.306 0-2.368.948-2.368 2.115 0 1.168 1.062 2.116 2.368 2.116 1.258 0 2.29-.877 2.364-1.996l.004-5.834 3.69-.974v2.79c-.377-.283-.876-.438-1.424-.438-1.306 0-2.368.947-2.368 2.115 0 1.168 1.062 2.116 2.368 2.116 1.257 0 2.29-.877 2.364-1.996l.004-6.388a.586.586 0 0 0-.635-.597z"/>
  </svg>
);

export const PlayIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M8 5.14v13.72a1 1 0 0 0 1.54.84l11-6.86a1 1 0 0 0 0-1.68l-11-6.86A1 1 0 0 0 8 5.14z"/>
  </svg>
);

export const PauseIcon: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 20 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={className}
  >
    <path d="M6 5h4v14H6zm8 0h4v14h-4z"/>
  </svg>
);

