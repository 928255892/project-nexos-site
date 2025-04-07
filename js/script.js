document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  menuToggle.addEventListener("click", function () {
    mobileMenu.style.display = mobileMenu.style.display === "flex" ? "none" : "flex";
  });

  document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.style.display = "none";
    });
  });
});
