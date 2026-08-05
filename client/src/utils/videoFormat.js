export const isSafari = /^((?!chrome|android).)*safari/i.test(
  navigator.userAgent
);

export const videoExt = isSafari ? "mov" : "webm";