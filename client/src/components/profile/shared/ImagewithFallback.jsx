// components/profile/shared/ImageWithFallback.jsx
import { useState } from "react";

export default function ImageWithFallback({ src, alt, className, icon: Icon, iconSize = 22 }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div className={`flex items-center justify-center bg-white/5 ${className || ""}`}>
        <Icon size={iconSize} className="text-white/20" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}