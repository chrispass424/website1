/* Dugnad School — navigation and enquiry form */

/*
  IMPORTANT:
  Add the school's real, monitored email address below before publishing.
  Example: const SCHOOL_EMAIL = "admissions@example.com";
  The enquiry form opens the visitor's email application; it does not send
  messages to a server. For direct website submissions, connect a secure
  form service or your own backend.
*/
const SCHOOL_EMAIL = "";

document.addEventListener("DOMContentLoaded", () => {
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const navLinks = navigation ? navigation.querySelectorAll("a") : [];
  const yearElement = document.querySelector("#year");
  const enquiryForm = document.querySelector("#enquiry-form");
  const formNote = document.querySelector("#form-note");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  const closeMenu = () => {
    if (!menuButton || !navigation) return;
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    navigation.classList.remove("is-open");
  };

  if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
      navigation.classList.toggle("is-open", !isOpen);
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
        menuButton.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navigation.contains(event.target) || menuButton.contains(event.target);
      if (!clickedInsideMenu) closeMenu();
    });
  }

  if (enquiryForm) {
    enquiryForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!enquiryForm.reportValidity()) return;

      const formData = new FormData(enquiryForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const interest = String(formData.get("interest") || "").trim();
      const message = String(formData.get("message") || "").trim();

      if (!SCHOOL_EMAIL.trim()) {
        if (formNote) {
          formNote.textContent = "The enquiry form is ready, but the school's official email address has not yet been configured. Please add it to SCHOOL_EMAIL in script.js before publishing.";
        }
        return;
      }

      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\nEnquiring as: ${interest}\n\nMessage:\n${message}`
      );

      if (formNote) formNote.textContent = "Opening your email application…";
      window.location.href = `mailto:${encodeURIComponent(SCHOOL_EMAIL)}?subject=${subject}&body=${body}`;
    });
  }
});
