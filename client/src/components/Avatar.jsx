import { useState } from "react";
import { resolveAvatarImage } from "../data/avatarAssets";

/*
========================================
AVATAR
========================================

Reusable dinosaur avatar. Resolves the correct
pre-rendered image from color + equipped slots.

Props:
  companionId    -> dinosaur color ("green" | "yellow" | "pink")
  companionName  -> optional display name
  equippedItems  -> { [avatarSlot]: itemId } or Map
  size           -> optional CSS size (default "100%")
  className      -> optional extra classes
*/

export default function Avatar({
  companionId,
  companionName,
  equippedItems,
  size = "100%",
  className = "",
}) {
  const [failed, setFailed] = useState(false);

  const src = resolveAvatarImage(companionId, equippedItems);

  const fallbackSrc = resolveAvatarImage(companionId, null);

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={failed ? fallbackSrc : src}
        alt={companionName || "Your dinosaur"}
        onError={() => setFailed(true)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
        draggable={false}
      />
    </div>
  );
}