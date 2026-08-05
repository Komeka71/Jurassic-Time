const dinosaurMessages = {
  trex: [
    "The mighty Tyrannosaurus rex never fails to impress.",
    "Watch those powerful jaws!",
    "The king of the Late Cretaceous has arrived.",
  ],

  triceratops: [
    "Those horns were excellent defensive weapons.",
    "A true gentle giant with impressive defenses.",
    "One of the most recognizable herbivores ever discovered.",
  ],

  brachiosaurus: [
    "Look how high it could reach!",
    "A peaceful giant of the Jurassic forests.",
    "Its long neck helped it browse the tallest trees.",
  ],

  mosasaurus: [
    "An apex predator of the ancient oceans.",
    "Don't let the fins fool you—it wasn't a dinosaur!",
    "The seas had their own terrifying rulers.",
  ],

  default: [
    "Excellent choice!",
  ],
};

export function getDinosaurMessage(dinosaur) {
  const messages =
    dinosaurMessages[dinosaur] ||
    dinosaurMessages.default;

  return messages[
    Math.floor(Math.random() * messages.length)
  ];
}