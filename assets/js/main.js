(function () {
  const header = document.querySelector("header");
  const menuButton = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-navigation");
  const menuIcon = document.getElementById("mobile-menu-icon");
  const navLinks = document.querySelectorAll(
    'nav a[data-path], header a[data-path], footer a[data-path]'
  );

  // Use the saved profile photo in both the brand mark and hero profile card.
  const profilePhoto = "images/foto.png";
  const brandLink = document.querySelector('header a[data-path="home"]');
  const brandMark = brandLink && brandLink.querySelector("span.w-9.h-9");
  if (brandMark) {
    const image = document.createElement("img");
    image.src = profilePhoto;
    image.alt = "Bintang Callista Virjianto";
    image.className = "w-full h-full rounded-full object-cover";
    brandMark.textContent = "";
    brandMark.appendChild(image);
    brandMark.setAttribute("aria-label", "Bintang Callista Virjianto");
  }

  // Remove the Atelier subtitle from the header brand.
  const brandText = brandLink && brandLink.querySelector("div.flex.flex-col");
  if (brandText) {
    const atelierLabel = Array.from(brandText.children).find(function (element) {
      return element.textContent.trim() === "Atelier Virjianto";
    });
    if (atelierLabel) atelierLabel.remove();
  }

  // Replace the placeholder account icon with a centered, consistently sized photo.
  const heroCard = document.querySelector("#home .max-w-md");
  const profileIcon = heroCard && Array.from(
    heroCard.querySelectorAll(".material-symbols-outlined")
  ).find(function (icon) {
    return icon.textContent.trim() === "account_circle";
  });

  if (profileIcon) {
    const photoFrame = profileIcon.parentElement;
    const image = document.createElement("img");
    image.src = profilePhoto;
    image.alt = "Foto profil Bintang Callista Virjianto";
    image.className = "block w-20 h-20 mx-auto rounded-full object-cover ring-4 ring-white/80 shadow-md";
    if (photoFrame) {
      photoFrame.replaceWith(image);
    } else {
      profileIcon.replaceWith(image);
    }
  }

  // Tighten the hero card layout so the photo, name and summary rows feel grouped.
  const heroProfileContent = heroCard && heroCard.querySelector(".relative.z-10.my-auto");
  if (heroProfileContent) {
    heroProfileContent.style.display = "flex";
    heroProfileContent.style.flexDirection = "column";
    heroProfileContent.style.alignItems = "center";
    heroProfileContent.style.gap = "0.75rem";
    heroProfileContent.style.marginTop = "auto";
    heroProfileContent.style.marginBottom = "auto";

    const profileIdentity = heroProfileContent.children[1];
    if (profileIdentity) profileIdentity.style.margin = "0";

    const summaryList = heroProfileContent.children[2];
    if (summaryList) {
      summaryList.style.width = "100%";
      summaryList.style.display = "grid";
      summaryList.style.gap = "0.5rem";
      summaryList.style.paddingTop = "0.25rem";
      Array.from(summaryList.children).forEach(function (row) {
        row.style.margin = "0";
      });
    }
  }

  // Correct all displayed occurrences of the GPA value.
  const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let textNode;
  while ((textNode = textWalker.nextNode())) {
    if (textNode.nodeValue.trim() === "88") {
      textNode.nodeValue = textNode.nodeValue.replace("88", "85,66");
    }
  }

  // Smoothly open and close the mobile navigation.
  function closeMenu() {
    if (!menu || !menuButton) return;
    menu.classList.remove("is-open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    if (menuIcon) menuIcon.textContent = "menu";
  }

  if (menuButton && menu) {
    menuButton.addEventListener("click", function () {
      const isOpen = menu.classList.toggle("is-open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
      );
      if (menuIcon) menuIcon.textContent = isOpen ? "close" : "menu";
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", function (event) {
      if (!menu.contains(event.target) && !menuButton.contains(event.target)) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });
  }

  // Give the fixed glass navbar a slightly stronger surface after scrolling.
  function updateHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Highlight the navigation item for the section currently in view.
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const activeId = entry.target.id;
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + activeId) {
            link.setAttribute("aria-current", "location");
          } else {
            link.removeAttribute("aria-current");
          }
        });
      });
    }, {
      rootMargin: "-28% 0px -58% 0px",
      threshold: 0
    });

    sections.forEach(function (section) {
      sectionObserver.observe(section);
    });
  }

  // Reveal each main section gently as it enters the viewport.
  if ("IntersectionObserver" in window &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    sections.forEach(function (section) {
      section.classList.add("reveal-on-scroll");
      revealObserver.observe(section);
    });
  }
})();
