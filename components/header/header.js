document.addEventListener("DOMContentLoaded", function () {
  // Get element
  const footer = document.getElementById("footer");

  // Get current path from the element
  const currentPath = footer.getAttribute("data-content");

  // create url location for fetch element
  const url = (currentPath || "") + "components/header/header.html";

  // Linking styles
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${currentPath || ""}components/header/header.css`;
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

      //   Get and display content
      const header = document.getElementById("header");
      if (!header) return;
      header.innerHTML = content;

      // Fetch navigation data from json
      fetch(`${currentPath || ""}data/navigation.json`)
        .then((response) => response.json())
        .then((navigation) => renderNavigationMenu(navigation))
        .catch((error) =>
          console.error("Error loading navigation data:", error)
        );

      // Render navigation
      function renderNavigationMenu(navigationData) {
        const navMenu = document.getElementById("navMenuList");
        navigationData.forEach((nav) => {
          const navItem = document.createElement("li");

          if (nav.subNavigations.length === 0) {
            // Single-level navigation (e.g., Home)
            navItem.classList.add("home");
            navItem.innerHTML = `
              <a href="javascript:void(0)" onclick="ReloadHome()">Home</a>
              <button onclick="CloseMenu()">
                <i class="fa-solid fa-xmark"></i>
              </button>
            `;
          } else {
            // Multi-level navigation (e.g., Program)
            navItem.innerHTML = `
              <a href="javascript:void(0)">${nav.title}</a>
              <ul class="dropdown">
                ${nav.subNavigations
                  .map(
                    (subNav) => `
                  <li onclick="NavigateContent('${subNav.url}&${nav.id}&${subNav.id}')">
                    <a href="javascript:void(0)">${subNav.title}</a>
                  </li>
                `
                  )
                  .join("")}
              </ul>
            `;
          }
          navMenu.appendChild(navItem);
        });

        navMenu.addEventListener("click", function (event) {
          const item = event.target.closest("li");
          if (!item) return;

          const dropdown = item.querySelector(".dropdown");
          if (!dropdown) return;

          event.preventDefault();

          if (dropdown.style.height === "0px" || dropdown.style.height === "") {
            const dropdownHeight = dropdown.scrollHeight;
            dropdown.style.height = dropdownHeight + "px";
            dropdown.style.opacity = 1;
          } else {
            dropdown.style.height = 0;
            dropdown.style.opacity = 1;
          }
        });
      }

      // //   Menu click events for mobile devices
      // document.querySelectorAll(".menu li").forEach(function (item) {
      //   item.addEventListener("click", function (event) {
      //     if (window.innerWidth > 1080) return;
      //     const dropdown = item.querySelector(".dropdown");
      //     event.preventDefault();
      //     if (!dropdown) return;
      //     if (dropdown.style.height === "0px" || dropdown.style.height === "") {
      //       const dropdownHeight = dropdown.scrollHeight;
      //       dropdown.style.height = dropdownHeight + "px";
      //       dropdown.style.opacity = 1;
      //     } else {
      //       dropdown.style.height = 0;
      //       dropdown.style.opacity = 1;
      //     }
      //   });
      // });

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
        window.location.href = `${
          currentPath || ""
        }pages/content/content.html?${page}`;
      };

      //Navigate/Reload home page
      window.ReloadHome = function () {
        window.location.href = `${currentPath || ""}`;
      };

      // Set logo
      document.getElementById("regionalLogo").src = `${
        currentPath || ""
      }components/header/regional.png`;

      // =================
      // =================
      // =================
    })
    .catch((error) => {
      console.log(error, tempath);
    });
});
