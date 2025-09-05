import React from 'react';

interface ExternalLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: React.ReactNode;
}

const ExternalLink: React.FC<ExternalLinkProps> = ({ href, children, className = '', ...rest }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`external-link ${className}`}
      {...rest}
    >
      {children}
    </a>
  );
};

export default ExternalLink;