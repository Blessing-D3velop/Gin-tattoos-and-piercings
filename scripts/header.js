/* =========================================================
   GIN TATTOOS
   HEADER JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
     ========================================================= */

  const header = document.getElementById("siteHeader");

  const mobileMenuBtn =
    document.getElementById("mobileMenuBtn");

  const mobileNav =
    document.getElementById("mobileNav");

  const mobileCloseBtn =
    document.getElementById("mobileCloseBtn");

  const mobileNavOverlay =
    document.getElementById("mobileNavOverlay");

  const mobileLinks =
    document.querySelectorAll(".mobile-links a");

  const mobileBookBtn =
    document.querySelector(".mobile-book-btn");


  /* =========================================================
     SAFETY CHECK
     ========================================================= */

  if (
    !header ||
    !mobileMenuBtn ||
    !mobileNav ||
    !mobileCloseBtn ||
    !mobileNavOverlay
  ) {
    console.warn("Gin Tattoos header elements not found.");
    return;
  }


  /* =========================================================
     HEADER SCROLL EFFECT
     ========================================================= */

  const handleHeaderScroll = () => {

    if (window.scrollY > 20) {

      header.classList.add("scrolled");

    } else {

      header.classList.remove("scrolled");

    }

  };


  window.addEventListener(
    "scroll",
    handleHeaderScroll,
    { passive: true }
  );


  /* Run once on page load */
  handleHeaderScroll();


  /* =========================================================
     OPEN MOBILE NAV
     ========================================================= */

  const openMobileNav = () => {

    mobileNav.classList.add("open");

    mobileNavOverlay.classList.add("open");

    mobileMenuBtn.classList.add("open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      "true"
    );

    mobileMenuBtn.setAttribute(
      "aria-label",
      "Close navigation menu"
    );

    mobileNav.setAttribute(
      "aria-hidden",
      "false"
    );

    /*
     * Prevent the page behind the menu
     * from scrolling.
     */
    document.body.style.overflow = "hidden";

  };


  /* =========================================================
     CLOSE MOBILE NAV
     ========================================================= */

  const closeMobileNav = () => {

    mobileNav.classList.remove("open");

    mobileNavOverlay.classList.remove("open");

    mobileMenuBtn.classList.remove("open");

    mobileMenuBtn.setAttribute(
      "aria-expanded",
      "false"
    );

    mobileMenuBtn.setAttribute(
      "aria-label",
      "Open navigation menu"
    );

    mobileNav.setAttribute(
      "aria-hidden",
      "true"
    );

    /*
     * Restore page scrolling.
     */
    document.body.style.overflow = "";

  };


  /* =========================================================
     TOGGLE MOBILE NAV
     ========================================================= */

  mobileMenuBtn.addEventListener(
    "click",
    () => {

      const isOpen =
        mobileNav.classList.contains("open");

      if (isOpen) {

        closeMobileNav();

      } else {

        openMobileNav();

      }

    }
  );


  /* =========================================================
     CLOSE BUTTON
     ========================================================= */

  mobileCloseBtn.addEventListener(
    "click",
    closeMobileNav
  );


  /* =========================================================
     OVERLAY CLICK
     ========================================================= */

  mobileNavOverlay.addEventListener(
    "click",
    closeMobileNav
  );


  /* =========================================================
     MOBILE NAV LINKS
     ========================================================= */

  mobileLinks.forEach((link) => {

    link.addEventListener(
      "click",
      () => {

        closeMobileNav();

      }
    );

  });


  /* =========================================================
     MOBILE BOOKING BUTTON
     ========================================================= */

  if (mobileBookBtn) {

    mobileBookBtn.addEventListener(
      "click",
      () => {

        closeMobileNav();

      }
    );

  }


  /* =========================================================
     ESCAPE KEY
     ========================================================= */

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key === "Escape" &&
        mobileNav.classList.contains("open")
      ) {

        closeMobileNav();

        mobileMenuBtn.focus();

      }

    }
  );


  /* =========================================================
     CLOSE MENU WHEN RESIZING TO DESKTOP
     ========================================================= */

  const desktopBreakpoint = 850;

  window.addEventListener(
    "resize",
    () => {

      if (
        window.innerWidth > desktopBreakpoint &&
        mobileNav.classList.contains("open")
      ) {

        closeMobileNav();

      }

    }
  );


  /* =========================================================
     ACTIVE NAVIGATION
     ========================================================= */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  const desktopLinks = document.querySelectorAll(
    ".desktop-nav .nav-link"
  );


  const updateActiveNav = () => {

    const scrollPosition =
      window.scrollY + 160;

    let currentSection = "home";


    sections.forEach((section) => {

      const sectionTop =
        section.offsetTop;

      const sectionHeight =
        section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <
          sectionTop + sectionHeight
      ) {

        currentSection =
          section.getAttribute("id");

      }

    });


    desktopLinks.forEach((link) => {

      const href =
        link.getAttribute("href");

      link.classList.toggle(
        "active",
        href === `#${currentSection}`
      );

    });

  };


  window.addEventListener(
    "scroll",
    updateActiveNav,
    { passive: true }
  );


  window.addEventListener(
    "resize",
    updateActiveNav
  );


  /* Run once */
  updateActiveNav();


  /* =========================================================
     SMOOTH SCROLL
     ========================================================= */

  const anchorLinks =
    document.querySelectorAll(
      'a[href^="#"]'
    );


  anchorLinks.forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const targetId =
          link.getAttribute("href");

        if (
          !targetId ||
          targetId === "#"
        ) {
          return;
        }


        const target =
          document.querySelector(targetId);

        if (!target) {
          return;
        }


        event.preventDefault();


        /*
         * Always close mobile navigation
         * before scrolling.
         */
        if (
          mobileNav.classList.contains("open")
        ) {

          closeMobileNav();

        }


        const headerHeight =
          header.offsetHeight;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight;


        window.scrollTo({
          top: targetPosition,
          behavior: "smooth"
        });

      }
    );

  });


  /* =========================================================
     INITIAL ACCESSIBILITY STATE
     ========================================================= */

  mobileNav.setAttribute(
    "aria-hidden",
    "true"
  );


  /* =========================================================
     PREVENT MOBILE MENU FROM GETTING STUCK
     ========================================================= */

  window.addEventListener(
    "pageshow",
    () => {

      closeMobileNav();

    }
  );

});