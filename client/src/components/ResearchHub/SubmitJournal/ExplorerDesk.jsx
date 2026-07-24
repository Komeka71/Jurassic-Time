import JournalOverlay from "./JournalOverlay";

export default function ExplorerDesk({
  journal,
  setJournal,
  evidenceFiles,
}) {
  return (
    <div className="relative">

      <JournalOverlay
        journal={journal}
        setJournal={setJournal}
        evidenceFiles={evidenceFiles}
      />

    </div>
  );
}