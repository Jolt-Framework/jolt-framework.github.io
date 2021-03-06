// Elements
const navLinks = document.querySelectorAll("#header nav a");
const navLinksCount = navLinks.length;
const header = document.querySelector("header");
const mobileMenuButton = document.querySelector("header #menu button");
const mobileMenu = document.querySelector("#mobile-menu");
const caseStudy = document.getElementById("case-study");
const caseStudyText = document.querySelector(".prose");
const toc = document.getElementById("toc");
const tocLinks = document.querySelectorAll("#toc a");
const tocLinksCount = tocLinks.length;
const team = document.querySelector("#our-team ul li");

// Handlers
const handleScroll = () => {
  handleMainSectionSelection();
  handleTocVisibility();
  handleTocSelection();
};

const handleResize = () => {
  handleProseSize();
  handleMainSectionSelection();
  handleTocVisibility();
  handleTocSelection();
};

const handlePageLoad = () => {
  handleProseSize();
  handleMainSectionSelection();
  handleTocVisibility();
  handleTocSelection();
  cycleJoltFeatures();
};

const handleProseSize = () => {
  if (window.innerWidth >= 1280) {
    caseStudyText.classList.remove("prose-lg");
    caseStudyText.classList.add("prose-xl");
  } else if (window.innerWidth >= 1024) {
    caseStudyText.classList.remove("prose-xl");
    caseStudyText.classList.add("prose-lg");
  } else {
    caseStudyText.classList.remove("prose-lg");
    caseStudyText.classList.remove("prose-xl");
  }
};

const handleMainSectionSelection = () => {
  const clearSelectedNav = () => {
    const selectedItems = document.querySelectorAll("header a.selected");
    selectedItems.forEach((selectedItem) => {
      selectedItem.classList.remove("selected");
    });
  };
  const selectNavItem = (hash) => {
    const links = document.querySelectorAll(`a[href="${hash}"]`);
    links.forEach((link) => {
      link.classList.add("selected");
    });
  };

  const teamInView =
    team.offsetTop + team.offsetHeight < window.scrollY + window.innerHeight;

  if (teamInView) {
    clearSelectedNav();
    selectNavItem("#our-team");
    return;
  }

  for (let i = navLinksCount - 1; i >= 0; i--) {
    const link = navLinks[i];

    if (link.hash) {
      const target = document.querySelector(link.hash);

      if (!!target && target.offsetTop <= window.scrollY + 16 * 5) {
        clearSelectedNav();
        selectNavItem(link.hash);
        break;
      }
    }
  }
};

const handleTocVisibility = () => {
  const tocIsVisible = () => {
    const caseStudyTopIsVisible = window.scrollY >= caseStudy.offsetTop;
    const caseStudyBottomIsVisible =
      window.scrollY + window.innerHeight >
      caseStudy.offsetHeight + caseStudy.offsetTop;

    return caseStudyTopIsVisible && !caseStudyBottomIsVisible;
  };

  if (tocIsVisible()) {
    toc.classList.add("show");
  } else {
    toc.classList.remove("show");
  }
};

const handleTocSelection = () => {
  const clearSelectedToc = () => {
    const selectedTocItems = document.querySelectorAll("#toc .selected");
    const subItems = document.querySelectorAll(`li.subitem.show`);

    subItems.forEach((subItem) => {
      subItem.classList.remove("show");
    });

    selectedTocItems.forEach((selectedTocItem) => {
      selectedTocItem.classList.remove("selected");
    });
  };

  const selectTocItem = (link) => {
    const tocItem = link.closest("li");
    const dataSection = tocItem.dataset.section;
    const subItems = document.querySelectorAll(
      `li.subitem[data-section="${dataSection}"]`
    );

    subItems.forEach((subItem) => {
      subItem.classList.add("show");
    });

    tocItem.classList.add("selected");
  };

  if (!toc.classList.contains("show")) return;

  for (let i = tocLinksCount - 1; i >= 0; i--) {
    const link = tocLinks[i];
    if (!link.hash) continue;
    const target = document.querySelector(link.hash);

    if (!!target && target.offsetTop <= window.scrollY) {
      clearSelectedToc();
      selectTocItem(link, target);

      break;
    }
  }
};

const handlemobileMenuClick = () => {
  const menuOpen = header.classList.contains("mobile-menu-open");

  if (menuOpen) {
    header.classList.remove("mobile-menu-open");
  } else {
    header.classList.add("mobile-menu-open");
  }
};

const cycleJoltFeatures = () => {
  const features = document.querySelector(".h-full h2").children;
  let currentIndex = 0;
  features[currentIndex].style.color = "#071E3D";

  setInterval(() => {
    features[currentIndex].style.color = "#fff";
    currentIndex += 1;

    if (currentIndex > 3) currentIndex = 0;

    features[currentIndex].style.color = "#071E3D";

  }, 2000);
}

// Helpers
const throttle = (callback, wait) => {
  let prevent = false;

  return function () {
    if (!prevent) {
      callback();
      prevent = true;
      setTimeout(function () {
        prevent = false;
      }, wait);
    }
  };
};

// Events
document.addEventListener("DOMContentLoaded", handlePageLoad);
document.addEventListener("scroll", throttle(handleScroll, 16));
window.addEventListener("resize", throttle(handleResize, 16));
mobileMenuButton.addEventListener("click", handlemobileMenuClick);
mobileMenu.addEventListener("click", handlemobileMenuClick);
