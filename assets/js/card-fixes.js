(function () {
  const heroCard = document.querySelector("#home .max-w-md");
  if (heroCard) {
    // Override the original 4:5 aspect ratio so the footer row follows the summary rows.
    heroCard.style.setProperty("aspect-ratio", "auto", "important");
    heroCard.style.setProperty("height", "auto", "important");
    heroCard.style.setProperty("min-height", "0", "important");
    heroCard.style.setProperty("justify-content", "flex-start", "important");
    heroCard.style.setProperty("gap", "1rem", "important");

    const profileContent = heroCard.querySelector(".relative.z-10.my-auto");
    if (profileContent) {
      profileContent.style.setProperty("margin", "0", "important");
      profileContent.style.setProperty("display", "flex", "important");
      profileContent.style.setProperty("flex-direction", "column", "important");
      profileContent.style.setProperty("align-items", "center", "important");
      profileContent.style.setProperty("gap", "0.625rem", "important");

      const summaryList = profileContent.children[2];
      if (summaryList) {
        summaryList.style.setProperty("width", "100%", "important");
        summaryList.style.setProperty("display", "grid", "important");
        summaryList.style.setProperty("gap", "0.5rem", "important");
        summaryList.style.setProperty("padding-top", "0", "important");
      }
    }

    // Correct the GPA by matching the visible label, not a particular wrapper element.
    heroCard.querySelectorAll("span").forEach(function (span) {
      if (/^88\s*\/\s*100\s*GPA$/i.test(span.textContent.trim())) {
        span.textContent = "85,66 / 100 GPA";
      }
      if (/^Available\s+2026$/i.test(span.textContent.trim())) {
        span.textContent = "Available";
      }
    });

    const availabilityRow = heroCard.lastElementChild;
    if (availabilityRow) {
      availabilityRow.style.setProperty("margin-top", "0", "important");
      availabilityRow.style.setProperty("padding-top", "0", "important");
    }
  }

  // Keep the hero metric and any standalone GPA value consistent with the corrected score.
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.trim() === "88") {
      node.nodeValue = node.nodeValue.replace("88", "85,66");
    }
  }
})();
