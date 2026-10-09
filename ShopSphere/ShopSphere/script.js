/* ============================================================
   ShopSphere - Static Web Page Script
   ============================================================
   This file adds small INTERACTIONS to the page.

   It is plain JavaScript (no React, no libraries).
   Each section below is explained step by step.

   How it works:
   1. The browser finishes loading the HTML.
   2. Our code "grabs" elements from the page.
   3. We listen for clicks and react to them.
   ============================================================ */


/* ------------------------------------------------------------
   1. MOBILE MENU (hamburger button)
   On small screens the nav links are hidden.
   Clicking the hamburger button shows/hides them.
   ------------------------------------------------------------ */

// Find the hamburger button and the nav links using their IDs from the HTML
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

// "addEventListener" waits for a click, then runs our function
menuToggle.addEventListener("click", function () {
  // The "open" class is defined in styles.css (drops the menu down)
  navLinks.classList.toggle("open");
});


/* ------------------------------------------------------------
   2. CATEGORY FILTER BUTTONS
   Only ONE button can look "selected" at a time.
   When you click a button, we move the "active" class to it.
   ------------------------------------------------------------ */

// Get every element that has the class "filter-btn"
const filterButtons = document.querySelectorAll(".filter-btn");

// Loop through each filter button
filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    // Remove "active" from ALL buttons first
    filterButtons.forEach(function (btn) {
      btn.classList.remove("active");
    });

    // Add "active" only to the button that was just clicked
    button.classList.add("active");
  });
});


/* ------------------------------------------------------------
   3. ADD TO CART BUTTONS (demo feedback)
   This is a static page, so we do not really save a cart yet.
   Instead, we briefly change the button text to give the
   user a little visual feedback - like a mini confirmation.
   ------------------------------------------------------------ */

// Get every "Add to Cart" button on the page
const addToCartButtons = document.querySelectorAll(".btn-primary");

addToCartButtons.forEach(function (button) {
  // Only handle buttons whose text says "Add to Cart"
  if (button.textContent.trim() === "Add to Cart") {
    button.addEventListener("click", function () {
      // Save the original label so we can restore it later
      const originalText = button.textContent;

      // Give instant feedback
      button.textContent = "Added ✓";
      button.disabled = true; // Prevent double-clicks

      // Update the cart badge number (top-right of navbar)
      const cartBadge = document.querySelector(".cart-badge");
      const currentCount = parseInt(cartBadge.textContent, 10); // base-10 number
      cartBadge.textContent = currentCount + 1;

      // After 1.2 seconds, restore the button to normal
      setTimeout(function () {
        button.textContent = originalText;
        button.disabled = false;
      }, 1200);
    });
  }
});


/* ------------------------------------------------------------
   That's it!
   For a static demo page these three small features are
   enough to make the page feel alive without any frameworks.
   Real cart/search logic will come later in the project.
   ------------------------------------------------------------
*/
