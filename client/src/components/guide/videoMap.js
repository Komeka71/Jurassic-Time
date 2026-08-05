const isSafari =
  /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

const ext = isSafari ? "mov" : "webm";

export const videos = {
  idle: `/videos/dino/idle.${ext}`,

  happy: `/videos/dino/loveHappy.${ext}`,
  happyJumps: `/videos/dino/happyJumps.${ext}`,
  loveHappy: `/videos/dino/loveHappy.${ext}`,

  celebrate: `/videos/dino/celebrate.${ext}`,

  angry: `/videos/dino/angry.${ext}`,
  sad: `/videos/dino/sad.${ext}`,

  thinking: `/videos/dino/thinking.${ext}`,

  lookingAround: `/videos/dino/lookingAround.${ext}`,

  pointingRight: `/videos/dino/pointingRight.${ext}`,

  wave: `/videos/dino/wave.${ext}`,

  walkingRight: `/videos/dino/walkingRight.${ext}`,

  standing: `/videos/dino/standing.${ext}`,

  eating: `/videos/dino/eating.${ext}`,

  roar: `/videos/dino/roar.${ext}`,

  shushing: `/videos/dino/shushing.${ext}`,

  sleep: `/videos/dino/sleep.${ext}`,

  wakeup: `/videos/dino/wakeup.${ext}`,

  camp: `/videos/dino/eating.${ext}`,
};