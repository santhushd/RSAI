document.addEventListener("DOMContentLoaded", function () {
  fetch(`${window.location.origin}/components/footer/footer.html`)
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

      //   Link styles
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${window.location.origin}/components/footer/footer.css`;
      document.head.appendChild(link);

      //   Get and display content
      const footer = document.getElementById("footer");
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
