export function initHamburger() {
  const hamburgerButtonElement = document.querySelector("[data-hamburger-button]");

  if (!hamburgerButtonElement) {
    console.warn("Hamburger button not found!");
    return;
  }

  hamburgerButtonElement.addEventListener("click", () => {
    hamburgerButtonElement.dispatchEvent(new CustomEvent("mobile-sidebar-open-request", {
      bubbles: true
    }));
  });
}
