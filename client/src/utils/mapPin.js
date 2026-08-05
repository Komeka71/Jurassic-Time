// Convert latitude/longitude to percentage position on the world map
function latLngToMap(latitude, longitude) {
  const lat = Number(latitude);
  const lng = Number(longitude);

  // Invalid coordinates -> center of map
  if (isNaN(lat) || isNaN(lng)) {
    return { x: 50, y: 50 };
  }

  // Convert longitude (-180 to 180) -> x (0 to 100)
  const x = ((lng + 180) / 360) * 100;

  // Convert latitude (90 to -90) -> y (0 to 100)
  const y = ((90 - lat) / 180) * 100;

  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(2, Math.min(98, y)),
  };
}

export function mapPin(discovery) {
  const position = latLngToMap(
    discovery.latitude,
    discovery.longitude
  );

  // Try to extract country from location
  // const locationParts = (discovery.location || "").split(",");

  return {
    id: discovery._id,

    x: position.x,
    y: position.y,

    dinosaur:
      discovery.fossilName || "Unknown Fossil",

    location: discovery.location || "Unknown",

    country: "",

    era: discovery.era || "Unknown",

    discoveryYear: discovery.createdAt
      ? new Date(discovery.createdAt).getFullYear()
      : "Unknown",

    status:
      discovery.status === "under-review"
        ? "under-review"
        : discovery.status === "field-draft"
        ? "pending"
        : discovery.status,

    verifiedBy:
      discovery.verifiedBy?.length
        ? discovery.verifiedBy.join(", ")
        : null,

    upvotes: discovery.upvotes || discovery.likes || 0,

    comments: discovery.comments || 0,
  };
}