document.addEventListener("DOMContentLoaded", function () {
    const navMenu = document.getElementById("navMenu");
    const menuIcon = document.querySelector(".menu-icon");
    const menuClose = document.querySelector(".menu-close");

    // Fungsi untuk toggle menu responsif
    function toggleMenu() {
        navMenu.classList.toggle("open");

        if (navMenu.classList.contains("open")) {
            menuIcon.style.display = "none";
            menuClose.style.display = "block";
        } else {
            menuIcon.style.display = "block";
            menuClose.style.display = "none";
        }
    }

    // Menambahkan event listener untuk tombol hamburger dan close
    if (menuIcon && menuClose) {
        menuIcon.addEventListener("click", toggleMenu);
        menuClose.addEventListener("click", toggleMenu);
    }
});
