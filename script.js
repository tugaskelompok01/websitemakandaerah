document.addEventListener("DOMContentLoaded", function () {
    // 🔥 ANIMASI FOOTER SAAT SCROLL
    const footer = document.querySelector("footer");

    function checkFooter() {
        if (!footer) return;
        const footerPosition = footer.getBoundingClientRect().top;
        const screenHeight = window.innerHeight;

        if (footerPosition < screenHeight) {
            footer.classList.add("show");
        }
    }

    window.addEventListener("scroll", function () {
        let scrollPosition = window.innerHeight + window.scrollY;

        if (scrollPosition >= document.body.offsetHeight - 100) {
            footer.classList.add("show");
        }
    });

    checkFooter();
});

// 🔥 TOGGLE MENU NAVIGASI (HAMBURGER MENU) - GLOBAL FUNCTION
function toggleMenu() {
    let nav = document.getElementById("navMenu");
    let menuIcon = document.querySelector(".menu-icon");
    let menuClose = document.querySelector(".menu-close");

    nav.classList.toggle("nav-open");
    menuIcon.classList.toggle("open");

    if (nav.classList.contains("nav-open")) {
        menuIcon.style.display = "none"; // Sembunyikan hamburger
        menuClose.style.display = "block"; // Tampilkan tombol X
    } else {
        menuIcon.style.display = "block"; // Tampilkan hamburger
        menuClose.style.display = "none"; // Sembunyikan tombol X
    }
}


// 🔥 FITUR PENCARIAN
document.addEventListener("DOMContentLoaded", function () {
    const searchBox = document.getElementById("searchBox");

    if (searchBox) {
        searchBox.addEventListener("input", function () {
            let searchValue = this.value.toLowerCase();
            let makananItems = document.querySelectorAll(".makanan");

            makananItems.forEach(item => {
                let makananName = item.querySelector("h3").innerText.toLowerCase();
                item.style.display = makananName.includes(searchValue) ? "block" : "none";
            });
        });
    }
});

// 🔥 VALIDASI INPUT FORM "KRITIK & SARAN"
document.addEventListener("DOMContentLoaded", function () {
    const namaInput = document.getElementById("namaInput");
    const form = document.querySelector(".feedback form");
    const errorText = document.getElementById("errorText");

    if (namaInput && form && errorText) {
        errorText.style.display = "none";
        errorText.style.color = "red";
        errorText.style.fontSize = "12px";
        errorText.style.marginTop = "5px";

        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const namaValue = namaInput.value.trim();
            const namaRegex = /^[A-Za-z\s]{3,}$/; 

            if (!namaRegex.test(namaValue)) {
                errorText.style.display = "block";
                namaInput.classList.add("error");
                return;
            }

            errorText.style.display = "none";
            namaInput.classList.remove("error");

            alert("Kritik & Saran berhasil dikirim!");
            form.reset();
        });

        namaInput.addEventListener("input", function () {
            errorText.style.display = "none";
            namaInput.classList.remove("error");
        });
    }
});
