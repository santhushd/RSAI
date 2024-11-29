document.addEventListener("DOMContentLoaded", function () {
  // Get page name from the url
  const url = window.location.href;
  const queryString = url.split("?")[1];
  const params = queryString.split("&");

  // Access parameters
  const pageUrl = params[0];
  const menuId = params[1];
  let currentId = params[2];

  const pageName = pageUrl || "default";
  const fetchUrl = `../articles/${pageName}/${pageName}.html`;

  LoadArticle(fetchUrl);

  let LoadedNavigationData;

  // Load navigation sections
  console.log(pageUrl, menuId, currentId);

  fetch(`../../data/navigation.json`)
    .then((response) => response.json())
    .then((navigation) => {
      LoadedNavigationData = navigation;
      console.log(LoadedNavigationData);
      loadSubNavigationsByMainId(menuId);
    })
    .catch((error) => console.error("Error loading navigation data:", error));

  function loadSubNavigationsByMainId(mainId) {
    const mainNavItem = LoadedNavigationData.find(
      (nav) => nav.id === Number(mainId)
    );
    if (!mainNavItem) {
      console.log(`Main navigation with ID ${mainId} not found.`);
      return;
    }
    const subNavContainer = document.getElementById("subNavContainer");
    subNavContainer.innerHTML = "";
    if (mainNavItem.subNavigations.length > 0) {
      mainNavItem.subNavigations.forEach((subNav) => {
        const subNavItem = document.createElement("li");
        subNavItem.classList.add("click-item");
        if (subNav.id == currentId) {
          subNavItem.classList.add("active");
        }
        subNavItem.innerHTML = `
              <a href="javascript:void(0)">${subNav.title}</a>
              <button><i class="fa-solid fa-angle-right"></i></button>
          `;

        const pageName = subNav.url || "default";
        const fetchUrl = `../articles/${pageName}/${pageName}.html`;

        subNavItem.addEventListener("click", function () {
          document
            .querySelectorAll(".menu-items .click-item")
            .forEach((el) => el.classList.remove("active"));

          subNavItem.classList.add("active");
          LoadArticle(fetchUrl);
        });
        subNavContainer.appendChild(subNavItem);
      });
    } else {
      subNavContainer.innerHTML = "<li>No sub-navigations available</li>";
    }
  }

  //   Get article area
  const articleArea = document.getElementById("articleArea");
});

window.LoadArticle = function (url) {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Page not found");
      }
    })
    .then((content) => {
      //   Display content
      if (!articleArea) return;

      // Create a temp div and get all the scripts inside content
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = content;
      const scripts = tempDiv.querySelectorAll("script");
      scripts.forEach((script) => {
        const newScript = document.createElement("script");
        if (script.src) {
          newScript.src = script.src;
        } else {
          newScript.textContent = script.textContent;
        }
        document.body.appendChild(newScript);
      });

      // Remove all script content and display the content
      articleArea.innerHTML = tempDiv.innerHTML.replace(
        /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
        ""
      );

      document.querySelectorAll(".menu-items .click-item").forEach((item) => {
        item.addEventListener("click", () => {
          // Remove 'active' class from all items
          document
            .querySelectorAll(".menu-items .click-item")
            .forEach((el) => el.classList.remove("active"));

          // Add 'active' class to the clicked item
          item.classList.add("active");
        });
      });
    })
    .catch((error) => {
      console.log(error);
      //   Display content
      if (!articleArea) return;
      articleArea.innerHTML = "Not Found!";
    });
};
