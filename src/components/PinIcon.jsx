import L from "leaflet";

const pinHtml = `
  <div class="pin-wrap">
    <div class="pin-ring"></div>
    <div class="pin-ring"></div>
    <div class="pin-dot"></div>
  </div>
`;

export const pinIcon = L.divIcon({
  className: "",
  html: pinHtml,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});