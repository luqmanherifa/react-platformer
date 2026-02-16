export const isMobileDevice = () => {
  return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
};

export const isPortrait = () => {
  return window.innerWidth < window.innerHeight;
};
