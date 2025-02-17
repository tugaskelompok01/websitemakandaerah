document.addEventListener("DOMContentLoaded", function () {
    // 🔥 ANIMASI FOOTER SAAT SCROLL
    const footer = document.querySelector("footer");

    function checkFooter() {
        if (!footer) return;
        const footerPosition = footer.getBoundingClientRect().top;
        if (footerPosition < window.innerHeight) {
            footer.classList.add("show");
        }
    }

    window.addEventListener("scroll", () => {
        requestAnimationFrame(checkFooter);
    });

    checkFooter(); // Cek saat pertama kali dimuat

    // 🔥 TOGGLE MENU NAVIGASI (HAMBURGER MENU)
    const menuIcon = document.querySelector(".menu-icon");
    const menuClose = document.querySelector(".menu-close");
    const nav = document.querySelector("nav");
    const body = document.body;

    function toggleMenu(open) {
        if (window.innerWidth < 1024) {
            nav.classList.toggle("nav-open", open);
            body.classList.toggle("nav-open", open);
            menuClose.style.display = open ? "block" : "none";
            menuIcon.style.display = open ? "none" : "block";
        }
    }

    menuIcon.addEventListener("click", () => toggleMenu(true));
    menuClose.addEventListener("click", () => toggleMenu(false));

    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
            toggleMenu(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 1024) {
            toggleMenu(false);
        }
    });

    // 🔥 FITUR TOGGLE MENU TAMBAHAN
    const menu = document.querySelector(".menu-container");
    const toggleBtn = document.querySelector(".menu-toggle");

    if (menu && toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            menu.classList.toggle("menu-visible");
        });
    }

    // 🔥 FITUR PENCARIAN
    const searchBox = document.getElementById("searchBox");

    if (searchBox) {
        searchBox.addEventListener("input", function () {
            let searchValue = this.value.toLowerCase();
            document.querySelectorAll(".makanan").forEach(item => {
                let makananName = item.querySelector("h3").innerText.toLowerCase();
                item.classList.toggle("show", makananName.includes(searchValue));
                item.style.display = makananName.includes(searchValue) ? "block" : "none";
            });
        });
    }

    // 🔥 VALIDASI INPUT FORM "KRITIK & SARAN"
    const namaInput = document.getElementById("namaInput");
    const form = document.querySelector(".feedback form");
    const errorText = document.getElementById("errorText");

    if (namaInput && form && errorText) {
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

        namaInput.addEventListener("input", () => {
            errorText.style.display = "none";
            namaInput.classList.remove("error");
        });
    }

    // 🔥 SCROLL REVEAL ANIMASI MAKANAN
    const makananCards = document.querySelectorAll(".makanan");

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    makananCards.forEach(card => observer.observe(card));

    // 🔥 SMOOTH SCROLLING UNTUK LINK NAVIGASI
    document.querySelectorAll("a[href^='#']").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 50,
                    behavior: "smooth"
                });
            }
        });
    });

    // 🔥 FUNGSI NAVIGASI KE HALAMAN MAKANAN
    document.querySelectorAll(".makanan").forEach(item => {
        item.addEventListener("click", function () {
            const makananName = this.querySelector("h3").innerText.replace(/\s+/g, "_").toLowerCase();
            window.location.href = `src/${makananName}.html`;
        });
    });
});
