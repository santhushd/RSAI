document.addEventListener("DOMContentLoaded", function () {
  // Get element
  const banner = document.getElementById("banner");

  // Get current path from the element
  const currentPath = footer.getAttribute("data-content");

  // Create url for fetch element
  const url = (currentPath || "") + "components/banner/banner.html";

  // Link styles
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `${currentPath || ""}components/banner/banner.css`;
  document.head.appendChild(link);

  // Current slide index
  let currentSlideIndex = 1;
  let beforeSlideIndex;

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
      if (!banner) return;
      banner.innerHTML = content;

      //   Load slide images
      const slideImages = document.querySelectorAll(".slide-image");

      // Slide show
      window.moveToImage = function (num) {
        // Update before slide index
        if (currentSlideIndex == 1) {
          beforeSlideIndex = slideImages.length;
        } else {
          beforeSlideIndex = currentSlideIndex - 1;
        }

        console.log("Indexes");
        console.log(beforeSlideIndex, currentSlideIndex);

        if (num > 0) {
          if (currentSlideIndex == slideImages.length) {
            currentSlideIndex = 1;
          } else {
            currentSlideIndex++;
          }
        } else {
          if (currentSlideIndex == 1) {
            currentSlideIndex = slideImages.length;
          } else {
            currentSlideIndex--;
          }
        }
        slideImages.forEach((element, i) => {
          if (i === currentSlideIndex - 1) {
            if (num > 0) {
              element.classList.add("slide-left-anim");
              slideImages[beforeSlideIndex - 1].classList.add(
                "slide-left-close-anim"
              );
            } else {
              element.classList.add("slide-right-anim");
              slideImages[beforeSlideIndex - 1].classList.add(
                "slide-right-close-anim"
              );
            }
            element.style.display = "block";
          } else {
            // if (i === beforeSlideIndex - 1) {
            //   //   setTimeout(() => {
            //   //     element.style.display = "block";
            //   //   }, 1000);
            //   element.style.opacity = "0";
            // } else {
            //   element.style.display = "none";
            // }
            element.style.opacity = "0";
          }
        });

        setTimeout(() => {
          slideImages.forEach((element, i) => {
            element.classList.remove("slide-right-anim");
            element.classList.remove("slide-left-anim");
            element.classList.remove("slide-left-close-anim");
            element.classList.remove("slide-right-close-anim");

            // slideImages[beforeSlideIndex - 1].style.opacity = "1";
            // slideImages[beforeSlideIndex - 1].style.display = "none";

            if (i !== currentSlideIndex - 1) {
              element.style.display = "none";
            }
            element.style.opacity = "1";
          });
        }, 1000);
      };

      // =================
      // =================
      // =================
    })
    .catch((error) => {
      console.log(error);
    });
});
