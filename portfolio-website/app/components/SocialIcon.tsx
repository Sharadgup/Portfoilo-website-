// components/SocialIcon.tsx
import React from "react";

interface SocialIconProps {
  Icon: React.ElementType; // This allows passing any React component (like icons)
  href: string;
  ariaLabel: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ Icon, href, ariaLabel }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
    <Icon className="text-2xl" /> {/* You can adjust size and styling here */}
  </a>
);

export default SocialIcon;
