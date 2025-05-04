document.addEventListener("DOMContentLoaded", function() {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll("header nav ul li a[href^=\'#\']");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            e.preventDefault();
            const targetId = this.getAttribute("href");
            const targetElement = document.querySelector(targetId);
            const navMenu = document.querySelector("header nav ul");
            const menuToggle = document.querySelector(".menu-toggle");

            if (targetElement) {
                const headerOffset = document.querySelector("header").offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close mobile menu after clicking a link
                if (navMenu.classList.contains("active")) {
                    navMenu.classList.remove("active");
                    menuToggle.classList.remove("active");
                    // Change icon back to bars if using Font Awesome
                    menuToggle.querySelector("i").classList.remove("fa-times");
                    menuToggle.querySelector("i").classList.add("fa-bars");
                }
            }
        });
    });

    // Form submission handling
    const form = document.getElementById("form-orcamento");
    if (form) {
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            const nome = document.getElementById("nome").value.trim();
            const email = document.getElementById("email").value.trim();
            const telefone = document.getElementById("telefone").value.trim();
            const mensagem = document.getElementById("mensagem").value.trim();

            if (nome === "" || email === "" || mensagem === "" || telefone === "") {
                alert("Por favor, preencha todos os campos obrigatórios.");
                return;
            }

            // --- Replace with actual form submission logic --- 
            console.log("Form data:", { nome, email,telefone, mensagem });
            alert("Obrigado por sua solicitação! Entraremos em contato em breve.");
            form.reset();
        });
    }

    // Header scroll effect
    const header = document.querySelector("header");
    if (header) {
        window.addEventListener("scroll", function() {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("header nav ul");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("active");
            menuToggle.classList.toggle("active");

            // Toggle icon if using Font Awesome
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-times");
            } else {
                icon.classList.remove("fa-times");
                icon.classList.add("fa-bars");
            }
        });
    }

    // Card hover effect - update mouse position CSS variables
    const cards = document.querySelectorAll(".servico-card, .projeto-card");

    cards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element.
            const y = e.clientY - rect.top;  // y position within the element.

            card.style.setProperty("--mouse-x", `${x}px`);
            card.style.setProperty("--mouse-y", `${y}px`);
        });
         card.addEventListener("mouseleave", () => {
            // Optional: Reset position or keep last known if preferred
            // card.style.setProperty("--mouse-x", `50%`);
            // card.style.setProperty("--mouse-y", `50%`);
        });
    });

});

