document.addEventListener("DOMContentLoaded", function () {
  // Get page name from the url
  const url = window.location.href;
  const queryString = url.split("?")[1];
  const pageName = queryString || "default";
  const fetchUrl = `${window.location.origin}/pages/articles/${pageName}/${pageName}.html`;

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
      articleArea.innerHTML = content;
    })
    .catch((error) => {
      console.log(error);
      //   Display content
      if (!articleArea) return;
      articleArea.innerHTML = "Not Found!";
    });
});
