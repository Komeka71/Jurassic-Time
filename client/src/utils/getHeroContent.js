export function getHeroContent(preferences = {}) {
  const {
    purpose = "Learning",
    interests = "",
    ageGroup = "Teen",
    companion = "raptor",
  } = preferences;

  let title = "";
  let subtitle = "";

  switch (purpose) {
    case "Fun":
      title = "Ready for today's adventure?";
      subtitle =
        "Earn coins, complete challenges and discover amazing dinosaurs.";
      break;

    case "Research":
      title = "Welcome back, Researcher.";
      subtitle =
        "New fossil evidence and discoveries are waiting for you.";
      break;

    case "Teaching":
      title = "Build your next lesson.";
      subtitle =
        "Curated exhibits and classroom-friendly resources await.";
      break;

    default:
      title = "Welcome back to Jurassic Time.";
      subtitle =
        "Explore dinosaurs, fossils and prehistoric worlds at your own pace.";
  }

  let recommendation = "";

  switch (interests) {
    case "Carnivores":
      recommendation = "Today's recommendation: Tyrannosaurus rex";
      break;

    case "Flying reptiles":
      recommendation = "Today's recommendation: Pteranodon";
      break;

    case "Marine reptiles":
      recommendation = "Today's recommendation: Mosasaurus";
      break;

    case "Fossils & geology":
      recommendation = "Today's recommendation: Fossil Dig Site";
      break;

    case "Extinction science":
      recommendation = "Today's recommendation: End-Cretaceous Exhibit";
      break;

    default:
      recommendation = "Today's recommendation: Dinosaur Explorer";
  }

  return {
    title,
    subtitle,
    recommendation,
    ageGroup,
    companion,
  };
}