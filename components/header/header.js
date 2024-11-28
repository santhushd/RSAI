document.addEventListener("DOMContentLoaded", function () {
  fetch(`${window.location.origin}/components/header/header.html`)
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

      // Linking styles
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = `${window.location.origin}/components/header/header.css`;
      document.head.appendChild(link);

      //   Get and display content
      const header = document.getElementById("header");
      if (!header) return;
      header.innerHTML = content;

      //   Menu click events for mobile devices
      document.querySelectorAll(".menu li").forEach(function (item) {
        item.addEventListener("click", function (event) {
          const dropdown = item.querySelector(".dropdown");
          event.preventDefault();
          if (!dropdown) return;
          if (dropdown.style.height === "0px" || dropdown.style.height === "") {
            const dropdownHeight = dropdown.scrollHeight;
            dropdown.style.height = dropdownHeight + "px";
            dropdown.style.opacity = 1;
          } else {
            dropdown.style.height = 0;
            dropdown.style.opacity = 1;
          }
        });
      });

      //   Get and create open and close method for menu bar (mobile devices)
      const navigationMenu = document.getElementById("navigationMenu");
      const navigation = document.getElementById("navigation");
      window.OpenMenu = function () {
        navigation.style.opacity = "1";
        navigationMenu.style.right = "0";
      };
      window.CloseMenu = function () {
        navigation.style.opacity = "0";
        navigationMenu.style.right = "-100%";
      };

      // Navigate to content tabs
      window.NavigateContent = function (page) {
        window.location.href = `${window.location.origin}/pages/content/content.html?${page}`;
      };

      // =================
      // =================
      // =================
    })
    .catch((error) => {
      console.log(error);
    });
});
