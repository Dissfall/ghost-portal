let elem = document.querySelector(".grid");

let msnry = new Masonry(elem, {
  itemSelector: ".grid-item",
  percentPosition: true,
});

imagesLoaded(elem, () => {
  console.log("asdfsd");
  msnry.layout();
});

const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");
const header = document.getElementById("header");
const capsule = document.getElementById("capsule");
const hamburger = document.querySelector(".hamburger");

// Define transition durations (in milliseconds)
const capsuleTransitionDuration = 500; // Matches the duration in CSS
const mobileMenuTransitionDuration = 500; // Matches the duration in CSS

// Mobile menu toggle with animation
menuButton.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("open");

  if (isOpen) {
    // Close the mobile menu first
    mobileMenu.classList.remove("open");
    hamburger.classList.remove("active");

    // After the mobile menu closes, change capsule corners back
    setTimeout(() => {
      capsule.classList.add("rounded-full");
      capsule.classList.remove("rounded-t-[30px]");
    }, mobileMenuTransitionDuration);
  } else {
    // Change capsule corners first
    capsule.classList.remove("rounded-full");
    capsule.classList.add("rounded-t-[30px]");

    // After the capsule corners change, open the mobile menu
    setTimeout(() => {
      mobileMenu.classList.add("open");
      hamburger.classList.add("active");
    }, capsuleTransitionDuration);
  }
});

let lastScrollPosition = 0;
let ticking = false;

window.addEventListener("scroll", function () {
  lastScrollPosition = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      handleScroll(lastScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
});

function handleScroll(scrollPos) {
  const header = document.getElementById("header");
  const isScrolled = scrollPos > 50;

  if (isScrolled) {
    if (!header.classList.contains("scrolled")) {
      header.classList.add("scrolled");
      adjustHeaderWidth();
    }
  } else {
    if (header.classList.contains("scrolled")) {
      header.classList.remove("scrolled");
      adjustHeaderWidth();
    }
  }
}

function adjustHeaderWidth() {
  const header = document.getElementById("header");
  const capsule = document.getElementById("capsule");

  if (header.classList.contains("scrolled")) {
    // Clone the capsule to measure its width without affecting layout
    const clone = capsule.cloneNode(true);
    clone.style.cssText =
      "position: absolute; visibility: hidden; height: auto; width: fit-content;";
    document.body.appendChild(clone);

    const contentWidth = clone.offsetWidth + 60;
    document.body.removeChild(clone);

    // Set the header width to the content width
    header.style.width = contentWidth + "px";
  } else {
    // Reset to full width
    header.style.width = "";
  }
}
