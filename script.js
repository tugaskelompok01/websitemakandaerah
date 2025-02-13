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
            checkFooter(); // Cek posisi footer setiap scroll
            
            let scrollPosition = window.innerHeight + window.scrollY;
            if (scrollPosition >= document.body.offsetHeight - 400) { // Munculkan footer lebih awal
                footer.classList.add("show");
            }
        });

        checkFooter(); // Cek saat halaman pertama kali dimuat

        // 🔥 TOGGLE MENU NAVIGASI (HAMBURGER MENU)
        const menuIcon = document.querySelector(".menu-icon");
        const menuClose = document.querySelector(".menu-close");
        const nav = document.querySelector("nav");
        const body = document.body;

        // Fungsi untuk membuka menu
        menuIcon.addEventListener("click", function () {
            nav.classList.add("nav-open");
            body.classList.add("nav-open");
            menuClose.style.display = "block";
            menuIcon.style.display = "none";
        });

        // Fungsi untuk menutup menu
        menuClose.addEventListener("click", function () {
            nav.classList.remove("nav-open");
            body.classList.remove("nav-open");
            menuClose.style.display = "none";
            menuIcon.style.display = "block";
        });

        // Tutup menu jika klik di luar area navbar
        document.addEventListener("click", function (event) {
            if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
                nav.classList.remove("nav-open");
                body.classList.remove("nav-open");
                menuClose.style.display = "none";
                menuIcon.style.display = "block";
            }
        });
        // 🔥 FITUR PENCARIAN
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

        // 🔥 VALIDASI INPUT FORM "KRITIK & SARAN"
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

        // 🔥 SCROLL REVEAL ANIMASI MAKANAN
        const makananCards = document.querySelectorAll(".makanan");

        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        });

        makananCards.forEach(card => observer.observe(card));

        // 🔥 SMOOTH SCROLLING UNTUK LINK NAVIGASI
        const navLinks = document.querySelectorAll("a[href^='#']");
        
        navLinks.forEach(link => {
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
    });
