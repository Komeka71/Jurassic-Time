import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../../api/axios";
import { useAuth } from "../../../context/AuthContext";
import ExplorerDesk from "./ExplorerDesk";
import EvidenceTray from "./EvidenceTray";
import ArchiveSuccessModal from "./ArchiveSuccessModal";

export default function JournalSection() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const today = new Date().toLocaleDateString();

  const [journal, setJournal] = useState({
    fossilName: "",
    location: "",
    latitude: "",
    longitude: "",
    era: "",
    species: "",
    date: today,
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

  const resetJournal = () => {
    setJournal({
      fossilName: "",
      location: "",
      latitude: "",
      longitude: "",
      era: "",
      species: "",
      date: today,
      status: "Draft",
      notes: "",
      signature: "",
    });

    setEvidenceFiles([]);
  };

  const handleSubmit = async () => {
    if (loading) return;

    if (progress < 100) return;

    // Guests must log in before submitting.
    if (!user) {
      navigate("/login", { state: { from: location } });
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("fossilName", journal.fossilName.trim());
      formData.append("location", journal.location.trim());
      formData.append("latitude", journal.latitude);
      formData.append("longitude", journal.longitude);
      formData.append("era", journal.era || "Unknown");
      formData.append("species", journal.species.trim());
      formData.append("notes", journal.notes.trim());
      formData.append("signature", journal.signature.trim());

      evidenceFiles.forEach((file) => {
        formData.append("evidence", file);
      });

      setSubmitStage("Uploading Evidence...");
      await new Promise((r) => setTimeout(r, 600));

      setSubmitStage("Running AI Verification...");
      await new Promise((r) => setTimeout(r, 900));

      setSubmitStage("Checking Duplicate Discoveries...");
      await new Promise((r) => setTimeout(r, 700));

      setSubmitStage("Generating Archive ID...");
      await new Promise((r) => setTimeout(r, 600));

      const { data } = await api.post("/discoveries", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitStage("Applying Museum Seal...");
      await new Promise((r) => setTimeout(r, 500));

      setSavedDiscovery(data);
      setShowSuccess(true);

      toast.success("Discovery archived successfully!");

      resetJournal();

      setTimeout(() => {
        document.getElementById("discoveries")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        navigate("/login", { state: { from: location } });
        return;
      }

      toast.error(
        err.response?.data?.message ||
          "Failed to archive discovery."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative mx-auto max-w-[1800px] px-6 pt-8 pb-12">
      <div className="grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
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
          resetJournal();
        }}
      />
    </section>
  );
}