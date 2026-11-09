tailwind.config = { darkMode: "class", theme: { extend: { "colors": { "on-primary-container": "#3b4a32", "on-primary-fixed": "#121f0a", "on-error-container": "#93000a", "surface-variant": "#cee9d3", "outline": "#75786f", "on-secondary-fixed-variant": "#384c37", "primary-fixed": "#d7e8c7", "primary": "#546349", "error": "#ba1a1a", "inverse-on-surface": "#ddf8e1", "tertiary": "#705c2c", "primary-container": "#a8b99a", "surface-container-low": "#dffae4", "surface-container-lowest": "#ffffff", "inverse-primary": "#bbccac", "tertiary-container": "#cab179", "on-tertiary-fixed-variant": "#564417", "error-container": "#ffdad6", "secondary-fixed": "#d2e9cd", "tertiary-fixed": "#fbe0a4", "surface-container-high": "#d4efd9", "outline-variant": "#c5c8bd", "on-secondary-fixed": "#0e1f0e", "secondary-fixed-dim": "#b6cdb2", "on-secondary": "#ffffff", "on-tertiary-container": "#554316", "background": "#e9ffec", "surface": "#e9ffec", "secondary-container": "#d2e9cd", "on-primary-fixed-variant": "#3c4b33", "inverse-surface": "#1f3526", "on-surface": "#092012", "on-tertiary-fixed": "#251a00", "surface-dim": "#c6e1cb", "on-tertiary": "#ffffff", "secondary": "#50644e", "on-error": "#ffffff", "tertiary-fixed-dim": "#dec48a", "surface-tint": "#546349", "surface-bright": "#e9ffec", "on-secondary-container": "#556a53", "on-background": "#092012", "on-surface-variant": "#444840", "primary-fixed-dim": "#bbccac", "on-primary": "#ffffff", "surface-container-highest": "#cee9d3", "surface-container": "#daf5de" }, "borderRadius": { "DEFAULT": "0.25rem", "lg": "0.5rem", "xl": "0.75rem", "full": "9999px" }, "spacing": { "gutter": "1.5rem", "space-sm": "0.5rem", "space-xl": "3rem", "gutter-mobile": "1rem", "gutter-tablet": "1.25rem", "space-xs": "0.25rem", "margin": "4rem", "space-lg": "1.75rem", "margin-mobile": "1.25rem", "margin-tablet": "2rem", "space-md": "1rem" }, "fontFamily": { "headline-lg-mobile": ["Newsreader"], "headline-sm": ["Newsreader"], "body-md": ["Plus Jakarta Sans"], "title-lg": ["Plus Jakarta Sans"], "display-xl": ["Newsreader"], "body-lg": ["Plus Jakarta Sans"], "label-sm": ["Plus Jakarta Sans"], "headline-lg": ["Newsreader"], "body-sm": ["Plus Jakarta Sans"], "label-md": ["Plus Jakarta Sans"], "headline-md": ["Newsreader"], "display-xl-mobile": ["Newsreader"], "title-md": ["Plus Jakarta Sans"] }, "fontSize": { "headline-lg-mobile": ["2rem", { "lineHeight": "2.5rem", "letterSpacing": "-0.01em", "fontWeight": "400" }], "headline-sm": ["1.5rem", { "lineHeight": "2rem", "letterSpacing": "-0.01em", "fontWeight": "500" }], "body-md": ["1rem", { "lineHeight": "1.625rem", "letterSpacing": "0", "fontWeight": "400" }], "title-lg": ["1.25rem", { "lineHeight": "1.75rem", "letterSpacing": "-0.01em", "fontWeight": "600" }], "display-xl": ["4.5rem", { "lineHeight": "5rem", "letterSpacing": "-0.03em", "fontWeight": "400" }], "body-lg": ["1.125rem", { "lineHeight": "1.875rem", "letterSpacing": "0", "fontWeight": "400" }], "label-sm": ["0.6875rem", { "lineHeight": "0.875rem", "letterSpacing": "0.1em", "fontWeight": "600" }], "headline-lg": ["3rem", { "lineHeight": "3.5rem", "letterSpacing": "-0.02em", "fontWeight": "400" }], "body-sm": ["0.875rem", { "lineHeight": "1.375rem", "letterSpacing": "0.005em", "fontWeight": "400" }], "label-md": ["0.75rem", { "lineHeight": "1rem", "letterSpacing": "0.08em", "fontWeight": "600" }], "headline-md": ["2.25rem", { "lineHeight": "2.75rem", "letterSpacing": "-0.015em", "fontWeight": "400" }], "display-xl-mobile": ["2.75rem", { "lineHeight": "3.25rem", "letterSpacing": "-0.02em", "fontWeight": "400" }], "title-md": ["1.125rem", { "lineHeight": "1.625rem", "letterSpacing": "-0.005em", "fontWeight": "500" }] } } } };


    (function() {
      const copyBtn = document.getElementById('copy-email-btn');
      const copyLabel = document.getElementById('copy-label');
      const copyIcon = document.getElementById('copy-icon');
      const email = 'b.callista.v@gmail.com';

      if (copyBtn) {
        copyBtn.addEventListener('click', function() {
          if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(handleSuccess).catch(handleFallback);
          } else {
            handleFallback();
          }
        });
      }

      function handleSuccess() {
        if (copyLabel) copyLabel.textContent = 'Copied to Clipboard!';
        if (copyIcon) copyIcon.textContent = 'check';
        setTimeout(resetCopyBtn, 2800);
      }

      function handleFallback() {
        const tempInput = document.createElement('input');
        tempInput.value = email;
        document.body.appendChild(tempInput);
        tempInput.select();
        try {
          document.execCommand('copy');
          handleSuccess();
        } catch (err) {
          if (copyLabel) copyLabel.textContent = 'b.callista.v@gmail.com';
        }
        document.body.removeChild(tempInput);
      }

      function resetCopyBtn() {
        if (copyLabel) copyLabel.textContent = 'Copy Email';
        if (copyIcon) copyIcon.textContent = 'content_copy';
      }
    })();
  


(function () {
  const header = document.querySelector("header");
  const menuButton = document.getElementById("mobile-menu-toggle");
  const menu = document.getElementById("mobile-navigation");
  const menuIcon = document.getElementById("mobile-menu-icon");
  const navLinks = document.querySelectorAll(
    'nav a[data-path], header a[data-path], footer a[data-path]'
  );

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
