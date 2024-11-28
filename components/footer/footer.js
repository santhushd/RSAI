document.addEventListener("DOMContentLoaded", function () {
  const footer = document.getElementById("footer");
  const componentPath = footer.getAttribute("data-content");
  const url = componentPath + "/footer/footer.html";
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

      // Link styles
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${componentPath}/footer/footer.css`;
      document.head.appendChild(link);

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
