/* =========================================================
   GIN TATTOOS
   GALLERY JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const galleryItems = [
    ...document.querySelectorAll(".gallery-item")
  ];

  const filterButtons = [
    ...document.querySelectorAll(".gallery-filter")
  ];

  const modal = document.getElementById("galleryModal");
  const modalImage = document.getElementById("galleryModalImage");
  const modalTitle = document.getElementById("galleryModalTitle");
  const modalCategory = document.getElementById("galleryModalCategory");
  const modalCounter = document.getElementById("galleryModalCounter");

  const closeButton =
    document.getElementById("galleryModalClose");

  const previousButton =
    document.getElementById("galleryModalPrev");

  const nextButton =
    document.getElementById("galleryModalNext");


  let visibleItems = [...galleryItems];
  let currentIndex = 0;


  /* =======================================================
     FILTER
     ======================================================= */

  filterButtons.forEach(button => {

    button.addEventListener("click", () => {

      const filter =
        button.dataset.filter;


      filterButtons.forEach(btn => {

        btn.classList.remove("active");

      });


      button.classList.add("active");


      visibleItems = [];


      galleryItems.forEach(item => {

        const category =
          item.dataset.category;


        const shouldShow =
          filter === "all" ||
          category === filter;


        if (shouldShow) {

          item.classList.remove("is-hidden");

          item.classList.add("is-visible");

          visibleItems.push(item);

        } else {

          item.classList.remove("is-visible");

          item.classList.add("is-hidden");

        }

      });

    });

  });


  /* =======================================================
     OPEN MODAL
     ======================================================= */

  function openGallery(index) {

    if (!visibleItems.length) return;


    currentIndex = index;


    updateModal();


    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body.style.overflow =
      "hidden";

  }


  /* =======================================================
     UPDATE MODAL
     ======================================================= */

  function updateModal() {

    const item =
      visibleItems[currentIndex];


    if (!item) return;


    const image =
      item.dataset.image;

    const title =
      item.dataset.title || "Gin Tattoos";

    const category =
      item.dataset.category || "tattoos";


    modalImage.src = image;

    modalImage.alt = title;

    modalTitle.textContent = title;

    modalCategory.textContent =
      category.replace("-", " ").toUpperCase();


    modalCounter.textContent =
      `${String(currentIndex + 1).padStart(2, "0")} / ${String(visibleItems.length).padStart(2, "0")}`;

  }


  /* =======================================================
     CLOSE MODAL
     ======================================================= */

  function closeGallery() {

    modal.classList.remove("active");

    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body.style.overflow =
      "";


    setTimeout(() => {

      if (!modal.classList.contains("active")) {

        modalImage.src = "";

      }

    }, 350);

  }


  /* =======================================================
     NEXT IMAGE
     ======================================================= */

  function nextImage() {

    if (!visibleItems.length) return;


    currentIndex =
      (currentIndex + 1) %
      visibleItems.length;


    updateModal();

  }


  /* =======================================================
     PREVIOUS IMAGE
     ======================================================= */

  function previousImage() {

    if (!visibleItems.length) return;


    currentIndex =
      (currentIndex - 1 +
        visibleItems.length) %
      visibleItems.length;


    updateModal();

  }


  /* =======================================================
     IMAGE CLICK
     ======================================================= */

  galleryItems.forEach(item => {

    item.addEventListener("click", () => {

      visibleItems =
        galleryItems.filter(
          galleryItem =>
            !galleryItem.classList.contains(
              "is-hidden"
            )
        );


      const index =
        visibleItems.indexOf(item);


      if (index !== -1) {

        openGallery(index);

      }

    });

  });


  /* =======================================================
     CONTROLS
     ======================================================= */

  closeButton.addEventListener(
    "click",
    closeGallery
  );


  nextButton.addEventListener(
    "click",
    nextImage
  );


  previousButton.addEventListener(
    "click",
    previousImage
  );


  /* =======================================================
     BACKDROP
     ======================================================= */

  modal
    .querySelector(".gallery-modal-backdrop")
    .addEventListener(
      "click",
      closeGallery
    );


  /* =======================================================
     KEYBOARD
     ======================================================= */

  document.addEventListener("keydown", event => {

    if (!modal.classList.contains("active")) {
      return;
    }


    if (event.key === "Escape") {

      closeGallery();

    }


    if (event.key === "ArrowRight") {

      nextImage();

    }


    if (event.key === "ArrowLeft") {

      previousImage();

    }

  });


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  galleryItems.forEach(item => {

    item.classList.add("is-visible");

  });

});