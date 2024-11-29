document.addEventListener("DOMContentLoaded", function () {
  // Get page name from the url
  const url = window.location.href;
  const queryString = url.split("?")[1];
  const pageName = queryString || "default";
  const fetchUrl = `../articles/${pageName}/${pageName}.html`;

  //   Get article area
  const articleArea = document.getElementById("articleArea");

  fetch(fetchUrl)
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
    })
    .catch((error) => {
      console.log(error);
      //   Display content
      if (!articleArea) return;
      articleArea.innerHTML = "Not Found!";
    });
});
