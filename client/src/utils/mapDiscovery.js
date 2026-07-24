export function mapDiscovery(discovery) {
  const statusMap = {
    "under-review": "reviewing",
    verified: "verified",
    featured: "featured",
    "field-draft": "pending",
  };

  return {
_id: discovery._id,
id: discovery._id,
    archiveId: discovery.archiveId,

    specimenId: discovery.archiveId,

    slug: discovery.archiveId,

    name: discovery.fossilName,

    species: discovery.species || "Unknown",

    image:
  discovery.evidence?.length > 0
    ? `http://localhost:3000/${discovery.evidence[0].path
        .replace(/^uploads[\\/]/, "uploads/")
        .replace(/\\/g, "/")}`
    : "/images/discoveries/default.png",

    location: discovery.location,

    country: "",

    era: discovery.era,

    discoveryYear: new Date(
      discovery.createdAt
    ).getFullYear(),

    status:
      statusMap[discovery.status] ||
      "reviewing",

    featured: discovery.featured,

    verifiedBy:
      discovery.verifiedBy?.join(", ") ||
      null,

    description:
      discovery.notes,

    evidence:
      discovery.evidence || [],

    evidenceCount:
      discovery.evidence?.length || 0,

    timeline: [
      "Discovery Submitted",
      "Evidence Uploaded",
      "Awaiting Verification",
    ],

upvotes: discovery.upvotes,
    comments: discovery.comments,
timeline: [
  "Discovery Submitted",
  "Evidence Uploaded",
  "Awaiting Verification",
],

upvotes: discovery.upvotes,

comments: discovery.comments,

aiVerification: discovery.aiVerification,

related: [],
    related: [],
  };
}