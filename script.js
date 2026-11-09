(function () {
  // ==================== Email Copy Micro-Interaction ====================
  const copyBtn = document.getElementById('copy-email-btn');
  const copyLabel = document.getElementById('copy-label');
  const copyIcon = document.getElementById('copy-icon');
  const email = 'b.callista.v@gmail.com';

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
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

  // ==================== Navigation & Scroll Behavior ====================
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
