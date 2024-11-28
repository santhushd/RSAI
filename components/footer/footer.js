document.addEventListener("DOMContentLoaded", function () {
  // Get element
  const footer = document.getElementById("footer");

  // Get current path from the element
  const currentPath = footer.getAttribute("data-content");

  // Create url for fetch element
  const url = (currentPath || "") + "components/footer/footer.html";

  // Link styles
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${currentPath || ""}components/footer/footer.css`;
  document.head.appendChild(link);

  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Page not found");
      }
    })
    .then((content) => {
      // =================
      // =================
      // =================

      // Display content
      if (!footer) return;
      footer.innerHTML = content;

      // =================
      // =================
      // =================
    })
    .catch((error) => {
      console.log(error);
    });
});
