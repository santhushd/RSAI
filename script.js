document.querySelectorAll(".menu li").forEach(function (item) {
  const dropdown = item.querySelector(".dropdown");

  item.addEventListener("click", function (event) {
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
});

const navigationMenu = document.getElementById("navigationMenu");
const navigation = document.getElementById("navigation");

function OpenMenu() {
  navigation.style.opacity = "1";
  navigationMenu.style.right = "0";
}

function CloseMenu() {
  navigation.style.opacity = "0";
  navigationMenu.style.right = "-100%";
}
