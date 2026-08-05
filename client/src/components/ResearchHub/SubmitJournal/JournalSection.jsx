import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import ExplorerDesk from "./ExplorerDesk";
import EvidenceTray from "./EvidenceTray";
import ArchiveSuccessModal from "./ArchiveSuccessModal";


export default function JournalSection() {
const { user } = useAuth();
const navigate = useNavigate();
const location = useLocation();

const [journal, setJournal] = useState({
  fossilName: "",
  location: "",
  latitude: "",
  longitude: "",
  era: "",
  species: "",
  date: new Date().toLocaleDateString(),
  status: "Draft",
  notes: "",
  signature: "",
});

  const [evidenceFiles, setEvidenceFiles] = useState([]);
const [loading, setLoading] = useState(false);
const [showSuccess, setShowSuccess] = useState(false);
const [savedDiscovery, setSavedDiscovery] = useState(null);

const [submitStage, setSubmitStage] = useState("");


const progress = (() => {
    let score = 0;

    if (journal.fossilName.trim()) score += 20;
    if (journal.location.trim()) score += 20;
    if (journal.notes.trim()) score += 20;
    if (journal.signature.trim()) score += 20;
    if (evidenceFiles.length > 0) score += 20;

    return score;
  })();
const handleSubmit = async () => {
  if (progress < 100) return;

  // Submissions are tied to a real researcher account now — send guests
  // to log in first, then bring them right back here.
  if (!user) {
    navigate("/login", { state: { from: location } });
    return;
  }

  try {
    setLoading(true);

const formData = new FormData();

formData.append(
  "fossilName",
  journal.fossilName
);

formData.append(
  "location",
  journal.location
);
formData.append(
  "latitude",
  journal.latitude
);

formData.append(
  "longitude",
  journal.longitude
);
formData.append(
  "era",
  journal.era || "Unknown"
);

formData.append(
  "species",
  journal.species
);

formData.append(
  "notes",
  journal.notes
);

formData.append(
  "signature",
  journal.signature
);

evidenceFiles.forEach((file) => {
  formData.append("evidence", file);
});

setSubmitStage("Uploading Evidence...");
await new Promise((r) => setTimeout(r, 800));

setSubmitStage("Running AI Verification...");
await new Promise((r) => setTimeout(r, 1000));

setSubmitStage("Checking Duplicate Discoveries...");
await new Promise((r) => setTimeout(r, 800));

setSubmitStage("Generating Archive ID...");
await new Promise((r) => setTimeout(r, 800));

const { data } = await api.post(
  "/discoveries",
  formData,
  {
    headers: {
      "Content-Type":
        "multipart/form-data",
    },
  }
);

    console.log("Discovery Saved", data);
setSubmitStage("Applying Museum Seal...");
await new Promise((r) => setTimeout(r, 800));
setSavedDiscovery(data);

setShowSuccess(true);
    setJournal({
  fossilName: "",
  location: "",
  latitude: "",
  longitude: "",
  era: "",
  species: "",
  date: new Date().toLocaleDateString(),
  status: "Draft",
  notes: "",
  signature: "",
});

    setEvidenceFiles([]);

  } catch (err) {
    console.error(err);

    if (err.response?.status === 401) {
      navigate("/login", { state: { from: location } });
      return;
    }

    alert("Submission failed.");
  } finally {
    setLoading(false);
  }
};
  return (
<section className="relative mx-auto max-w-[1800px] px-6 pt-8 pb-12">      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
        <ExplorerDesk
          journal={journal}
          setJournal={setJournal}
          evidenceFiles={evidenceFiles}
        />

        <EvidenceTray
    journal={journal}
    setJournal={setJournal}
    evidenceFiles={evidenceFiles}
    setEvidenceFiles={setEvidenceFiles}
    progress={progress}
    handleSubmit={handleSubmit}
    loading={loading}
/>
      </div>
    <ArchiveSuccessModal
  open={loading || showSuccess}
  loading={loading && !showSuccess}
  stage={submitStage}
  archiveId={savedDiscovery?.discovery?.archiveId}
  species={savedDiscovery?.discovery?.species}
  confidence={
    savedDiscovery?.discovery?.aiVerification?.confidence
  }
  status={savedDiscovery?.discovery?.status}
  onClose={() => {
    setShowSuccess(false);
setSubmitStage("");
  }}
  onNew={() => {
    setShowSuccess(false);
    setSubmitStage("");

    setJournal({
      fossilName: "",
      location: "",
      latitude: "",
      longitude: "",
      era: "",
      species: "",
      date: new Date().toLocaleDateString(),
      status: "Draft",
      notes: "",
      signature: "",
    });

    setEvidenceFiles([]);
  }}
/>
    </section>
  );
}