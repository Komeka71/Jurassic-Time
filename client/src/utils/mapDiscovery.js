export function mapDiscovery(discovery) {
  const statusMap = {
    "under-review": "reviewing",
    verified: "verified",
    featured: "featured",
    "field-draft": "pending",
  };

  const apiUrl = (
    import.meta.env.VITE_API_URL ||
    "http://localhost:3000/api"
  ).replace(/\/api\/?$/, "");

  const evidencePath = discovery.evidence?.[0]?.path;

  const image = evidencePath
    ? `${apiUrl}/${evidencePath
        .replace(/^\/+/, "")
        .replace(/^uploads[\\/]/, "uploads/")
        .replace(/\\/g, "/")}`
    : "/images/discoveries/default.png";

  return {
    _id: discovery._id,
    id: discovery._id,

    archiveId: discovery.archiveId,
    specimenId: discovery.archiveId,
    slug: discovery.archiveId,

    name: discovery.fossilName,
    species: discovery.species || "Unknown",

    // IMPORTANT
    image,

    location: discovery.location,
    country: "",

    era: discovery.era,

    discoveryYear: discovery.createdAt
      ? new Date(discovery.createdAt).getFullYear()
      : "",

    status:
      statusMap[discovery.status] || "reviewing",

    featured: discovery.featured,

    verifiedBy:
      discovery.verifiedBy?.join(", ") || null,

    description: discovery.notes,

    evidence: discovery.evidence || [],

    evidenceCount:
      discovery.evidence?.length || 0,

    timeline: [
      "Discovery Submitted",
      "Evidence Uploaded",
      "Awaiting Verification",
    ],

    upvotes: discovery.upvotes || 0,
    comments: discovery.comments || 0,

    aiVerification: discovery.aiVerification,

    related: [],
  };
}