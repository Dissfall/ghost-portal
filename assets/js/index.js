let elem = document.querySelector(".grid");

if (elem) {
  let msnry = new Masonry(elem, {
    itemSelector: ".grid-item",
    percentPosition: true,
  });

  imagesLoaded(elem, () => {
    msnry.layout();
  });
}

(function () {
  // Function to convert HEX to HSL
  function hexToHSL(hex) {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }
    var r = parseInt(hex.substring(0, 2), 16) / 255;
    var g = parseInt(hex.substring(2, 4), 16) / 255;
    var b = parseInt(hex.substring(4, 6), 16) / 255;

    var max = Math.max(r, g, b),
      min = Math.min(r, g, b);
    var h,
      s,
      l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h = h / 6;
    }

    h = Math.round(360 * h);
    s = Math.round(100 * s) + "%";
    l = Math.round(100 * l) + "%";
    return { h: h + "deg", s, l };
  }

  // Get the value of --ghost-accent-color
  var accentColor = getComputedStyle(document.documentElement)
    .getPropertyValue("--ghost-accent-color")
    .trim();

  // Compute HSL values
  var hsl = hexToHSL(accentColor);

  // Set the HSL variables
  var root = document.documentElement;
  root.style.setProperty("--ghost-accent-color-hue", hsl.h);
  root.style.setProperty("--ghost-accent-color-saturation", hsl.s);
  root.style.setProperty("--ghost-accent-color-lightness", hsl.l);
})();

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

// JavaScript to show/hide the Back to Top button and scroll to top
const backToTopButton = document.getElementById("back-to-top");

// Show or hide the button based on scroll position
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    backToTopButton.classList.add("show");
    backToTopButton.classList.remove("hide");
  } else {
    backToTopButton.classList.add("hide");
    backToTopButton.classList.remove("show");
  }
});

// Scroll smoothly to the top when the button is clicked
backToTopButton.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
