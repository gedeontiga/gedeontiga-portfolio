"use strict";

// ======== UTILITY FUNCTIONS ========
/**
 * Toggles the 'active' class on an element
 * @param {HTMLElement} elem - Element to toggle class on
 */
const toggleElementActive = function (elem) {
  elem.classList.toggle("active");
};

// ======== DOM ELEMENTS ========
// Organize all DOM element selections by feature
const DOMElements = {
  // Sidebar elements
  sidebar: {
    container: document.querySelector("[data-sidebar]"),
    toggleBtn: document.querySelector("[data-sidebar-btn]"),
  },

  // Technologies and modal elements
  technologies: {
    items: document.querySelectorAll("[data-technologies-item]"),
    modal: {
      container: document.querySelector("[data-modal-container]"),
      closeBtn: document.querySelector("[data-modal-close-btn]"),
      image: document.querySelector("[data-modal-img]"),
      title: document.querySelector("[data-modal-title]"),
      text: document.querySelector("[data-modal-text]"),
    },
    overlay: document.querySelector("[data-overlay]"),
  },

  // Filter elements
  filter: {
    select: document.querySelector("[data-select]"),
    selectItems: document.querySelectorAll("[data-select-item]"),
    selectValue: document.querySelector("[data-selecct-value]"),
    filterBtns: document.querySelectorAll("[data-filter-btn]"),
    filterItems: document.querySelectorAll("[data-filter-item]"),
  },

  // Contact form elements
  form: {
    container: document.querySelector("[data-form]"),
    inputs: document.querySelectorAll("[data-form-input]"),
    submitBtn: document.querySelector("[data-form-btn]"),
  },

  // Navigation elements
  navigation: {
    links: document.querySelectorAll("[data-nav-link]"),
    pages: document.querySelectorAll("[data-page]"),
  },
};

// ======== FEATURE: SIDEBAR FUNCTIONALITY ========
/**
 * Initialize sidebar toggle functionality for mobile
 */
function initSidebar() {
  const { container, toggleBtn } = DOMElements.sidebar;
  toggleBtn.addEventListener("click", () => toggleElementActive(container));
}

// ======== FEATURE: technologies MODAL ========
/**
 * Initialize technologies modal functionality
 */
function inittechnologiesModal() {
  const { items, modal, overlay } = DOMElements.technologies;

  // Toggle modal visibility function
  const toggleModal = function () {
    modal.container.classList.toggle("active");
    overlay.classList.toggle("active");
  };

  // Add click event to all testimonial items
  items.forEach((item) => {
    item.addEventListener("click", function () {
      // Update modal content with item data
      modal.image.src = this.querySelector("[data-technologies-avatar]").src;
      modal.image.alt = this.querySelector("[data-technologies-avatar]").alt;
      modal.title.innerHTML = this.querySelector(
        "[data-technologies-title]"
      ).innerHTML;
      modal.text.innerHTML = this.querySelector(
        "[data-technologies-text]"
      ).innerHTML;

      toggleModal();
    });
  });

  // Close modal when clicking close button or overlay
  modal.closeBtn.addEventListener("click", toggleModal);
  overlay.addEventListener("click", toggleModal);
}

// ======== FEATURE: FILTERING SYSTEM ========
/**
 * Initialize filtering functionality
 */
function initFiltering() {
  const { select, selectItems, selectValue, filterBtns, filterItems } =
    DOMElements.filter;

  // Toggle select dropdown
  select.addEventListener("click", function () {
    toggleElementActive(this);
  });

  /**
   * Filter items based on selected category
   * @param {string} selectedValue - Category to filter by
   */
  const filterByCategory = function (selectedValue) {
    filterItems.forEach((item) => {
      if (selectedValue === "all" || selectedValue === item.dataset.category) {
        item.classList.add("active");
      } else {
        item.classList.remove("active");
      }
    });
  };

  // Add click events to select items
  selectItems.forEach((item) => {
    item.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      toggleElementActive(select);
      filterByCategory(selectedValue);
    });
  });

  // Add click events to filter buttons for large screen
  let activeFilterBtn = filterBtns[0];

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const selectedValue = this.innerText.toLowerCase();
      selectValue.innerText = this.innerText;
      filterByCategory(selectedValue);

      // Update active button state
      activeFilterBtn.classList.remove("active");
      this.classList.add("active");
      activeFilterBtn = this;
    });
  });
}

// ======== FEATURE: CONTACT FORM ========
/**
 * Initialize contact form validation
 */
function initContactForm() {
  const { container, inputs, submitBtn } = DOMElements.form;

  // Validate form on input
  inputs.forEach((input) => {
    input.addEventListener("input", function () {
      // Enable/disable submit button based on form validity
      submitBtn.disabled = !container.checkValidity();
    });
  });
}

// ======== FEATURE: PAGE NAVIGATION ========
/**
 * Initialize page navigation system
 */
function initPageNavigation() {
  const { links, pages } = DOMElements.navigation;

  links.forEach((link) => {
    link.addEventListener("click", function () {
      const clickedPageName = this.innerHTML.toLowerCase();

      pages.forEach((page, pageIndex) => {
        const isTargetPage = clickedPageName === page.dataset.page;

        // Toggle active class on page and corresponding nav link
        page.classList.toggle("active", isTargetPage);
        links[pageIndex].classList.toggle("active", isTargetPage);

        // Scroll to top when switching pages
        if (isTargetPage) {
          window.scrollTo(0, 0);
        }
      });
    });
  });
}

// ======== FEATURE: SCROLL ANIMATIONS ========
/**
 * Initialize scroll-based animations
 */
function initScrollAnimations() {
  // Wait for DOM to be fully loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Create intersection observer for animation triggers
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Apply animations to service items
    const serviceItems = document.querySelectorAll(".service-item");
    serviceItems.forEach((item, index) => {
      observer.observe(item);
      item.classList.add("slide-up");
      item.style.opacity = "0";
      item.style.animationDelay = `${0.2 * index}s`;
    });

    // Apply animations to testimonial items
    const testimonialItems = document.querySelectorAll(".technologies-item");
    testimonialItems.forEach((item, index) => {
      observer.observe(item);
      item.classList.add("fade-in");
      item.style.opacity = "0";
      item.style.animationDelay = `${0.2 * index}s`;
    });

    // Add global style for visible class
    const style = document.createElement("style");
    style.textContent = `
      .visible {
        opacity: 1 !important;
      }
    `;
    document.head.appendChild(style);
  });
}

// ======== INITIALIZATION ========
/**
 * Initialize all features when DOM is loaded
 */
function initPortfolio() {
  initSidebar();
  inittechnologiesModal();
  initFiltering();
  initContactForm();
  initPageNavigation();
  initScrollAnimations();
}

// Start the application
initPortfolio();

document.addEventListener("DOMContentLoaded", function () {
  // Hide loader when everything is loaded
  window.addEventListener("load", function () {
    const loader = document.querySelector(".page-loader");
    if (loader) {
      loader.classList.add("hidden");
    }
  });

  // Backup timeout
  setTimeout(function () {
    const loader = document.querySelector(".page-loader");
    if (loader && !loader.classList.contains("hidden")) {
      loader.classList.add("hidden");
    }
  }, 3000);
});
