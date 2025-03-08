// src/components/ui/avatar.jsx
import React from "react";

export const Avatar = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

export const AvatarImage = ({ src, alt, className }) => (
  <img src={src} alt={alt} className={className} />
);

export const AvatarFallback = ({ children, className }) => (
  <div className={className}>{children}</div>
);