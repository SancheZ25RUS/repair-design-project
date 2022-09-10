
function fixHeightOnMobile() {
  const app = document.documentElement;
  const WINDOW_HEIGHT = window.innerHeight * 0.01;
  app.style.setProperty("--app-vh", `${WINDOW_HEIGHT}px`);
};


fixHeightOnMobile();
window.addEventListener("resize", fixHeightOnMobile)
