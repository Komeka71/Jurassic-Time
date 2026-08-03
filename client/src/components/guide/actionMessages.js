const actionMessages = {
  quizPerfect: {
    mood: "celebrate",
    message: "Perfect score! You're becoming a real paleontologist!",
  },

  quizComplete: {
    mood: "happy",
    message: "Great job finishing the quiz!",
  },

  fossilDiscovered: {
    mood: "happy",
    message: "Amazing! A new fossil has been discovered.",
  },

  discoveryOpened: {
    mood: "thinking",
    message:
      "Interesting discovery! Let's examine this fossil more closely.",
  },

  // NEW
  overviewViewed: {
    mood: "thinking",
    message:
      "Here's the complete summary of this discovery before we dive deeper.",
  },

  evidenceViewed: {
    mood: "pointingRight",
    message:
      "These fossils, scans, and field records are the scientific evidence behind this specimen.",
  },

  verificationViewed: {
    mood: "happy",
    message:
      "Every discovery goes through multiple verification stages before entering our museum archive.",
  },

  aiViewed: {
    mood: "thinking",
    message:
      "Our AI is comparing this specimen with thousands of prehistoric records.",
  },

  discussionViewed: {
    mood: "loveHappy",
    message:
      "Researchers from around the world can discuss and improve this discovery together.",
  },

  timelineCompleted: {
    mood: "celebrate",
    message: "You've explored the entire prehistoric timeline!",
  },

  mapLocationFound: {
    mood: "pointingRight",
    message: "Another excavation site has been uncovered!",
  },

  itemPurchased: {
    mood: "loveHappy",
    message: "Nice choice! Your collection keeps growing.",
  },

  default: {
    mood: "happy",
    message: "Nice work!",
  },
};

export function getActionReaction(action) {
  return (
    actionMessages[action] ||
    actionMessages.default
  );
}