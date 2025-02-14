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
        checkFooter();
        let scrollPosition = window.innerHeight + window.scrollY;
        if (scrollPosition >= document.body.offsetHeight - 400) {
            footer.classList.add("show");
        }
    });
    checkFooter();

    // 🔥 TOGGLE MENU NAVIGASI (HAMBURGER MENU) - DITAMBAHKAN PERBAIKAN
    const menuIcon = document.querySelector(".menu-icon");
    const menuClose = document.querySelector(".menu-close");
    const nav = document.querySelector("nav");
    const body = document.body;
    
    function toggleMenu() {
        if (window.innerWidth < 1024) { // Cegah menu aktif di desktop
            nav.classList.add("nav-open");
            body.classList.add("nav-open");
            menuClose.style.display = "block";
            menuIcon.style.display = "none";
        }
    }

    function closeMenu() {
        if (window.innerWidth < 1024) {
            nav.classList.remove("nav-open");
            body.classList.remove("nav-open");
            menuClose.style.display = "none";
            menuIcon.style.display = "block";
        }
    }

    menuIcon.addEventListener("click", toggleMenu);
    menuClose.addEventListener("click", closeMenu);

    document.addEventListener("click", function (event) {
        if (!nav.contains(event.target) && !menuIcon.contains(event.target)) {
            closeMenu();
        }
    });

    // 🔥 Mencegah menu muncul di desktop setelah resize
    window.addEventListener("resize", function () {
        if (window.innerWidth >= 1024) {
            body.classList.remove("nav-open");
            nav.classList.remove("nav-open");
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
                
                if (makananName.includes(searchValue)) {
                    item.style.display = "block";  
                    setTimeout(() => item.classList.add("show"), 100);
                } else {
                    item.classList.remove("show");
                    setTimeout(() => item.style.display = "none", 400);
                }
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

    const observerOptions = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.2,
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add("show");
                }, index * 200);
            }
        });
    }, observerOptions);

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

    // 🔥 FUNGSI NAVIGASI KE HALAMAN MAKANAN
    document.querySelectorAll(".makanan").forEach(item => {
        item.addEventListener("click", function () {
            const makananName = this.querySelector("h3").innerText.replace(/\s+/g, "_").toLowerCase();
            window.location.href = `src/${makananName}.html`;
        });
    });
});
