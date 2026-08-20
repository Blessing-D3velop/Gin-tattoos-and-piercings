/* =========================================================
   GIN TATTOOS
   BOOKING
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const bookingForm =
    document.getElementById("bookingForm");

  const whatsappButton =
    document.getElementById("bookingWhatsapp");

  const emailButton =
    document.getElementById("bookingEmail");


  if (!bookingForm) return;


  /* =======================================================
     GET FORM DATA
     ======================================================= */

  function getBookingData() {

    const name =
      document.getElementById("bookingName").value.trim();

    const phone =
      document.getElementById("bookingPhone").value.trim();

    const service =
      document.getElementById("bookingService").value;

    const size =
      document.getElementById("bookingSize").value;

    const date =
      document.getElementById("bookingDate").value;

    const placement =
      document.getElementById("bookingPlacement").value.trim();

    const message =
      document.getElementById("bookingMessage").value.trim();


    return {
      name,
      phone,
      service,
      size,
      date,
      placement,
      message
    };

  }


  /* =======================================================
     VALIDATION
     ======================================================= */

  function validateBooking(data) {

    if (!data.name) {
      alert("Please enter your name.");
      return false;
    }


    if (!data.phone) {
      alert("Please enter your phone or WhatsApp number.");
      return false;
    }


    if (!data.service) {
      alert("Please select the service you want to book.");
      return false;
    }


    if (!data.message) {
      alert("Please tell us a little about your idea.");
      return false;
    }


    return true;

  }


  /* =======================================================
     WHATSAPP
     ======================================================= */

  whatsappButton?.addEventListener(
    "click",
    () => {

      const data =
        getBookingData();


      if (!validateBooking(data)) {
        return;
      }


      const whatsappMessage =

`Hi Gin Tattoos 👋

I'd like to make a booking.

NAME:
${data.name}

PHONE / WHATSAPP:
${data.phone}

SERVICE:
${data.service}

SIZE:
${data.size || "Not specified"}

PREFERRED DATE:
${data.date || "Not specified"}

PLACEMENT:
${data.placement || "Not specified"}

IDEA / DETAILS:
${data.message}


Thank you.`;

      
      const encodedMessage =
        encodeURIComponent(whatsappMessage);


      const whatsappURL =
        `https://wa.me/27820499217?text=${encodedMessage}`;


      window.open(
        whatsappURL,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );


  /* =======================================================
     EMAIL
     ======================================================= */

  emailButton?.addEventListener(
    "click",
    () => {

      const data =
        getBookingData();


      if (!validateBooking(data)) {
        return;
      }


      const subject =
        `Tattoo Booking Request - ${data.name}`;


      const emailBody =

`Hi Gin Tattoos,

I'd like to make a booking.

NAME:
${data.name}

PHONE / WHATSAPP:
${data.phone}

SERVICE:
${data.service}

SIZE:
${data.size || "Not specified"}

PREFERRED DATE:
${data.date || "Not specified"}

PLACEMENT:
${data.placement || "Not specified"}

IDEA / DETAILS:
${data.message}

Thank you.`;


      const mailtoURL =
        `mailto:Ofentsegin7@gmail.com` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(emailBody)}`;


      window.location.href =
        mailtoURL;

    }
  );


  /* =======================================================
     BOOKING BUTTONS / LINKS
     ======================================================= */

  document
    .querySelectorAll(
      'a[href="#booking"]'
    )
    .forEach((button) => {

      button.addEventListener(
        "click",
        () => {

          setTimeout(() => {

            document
              .getElementById("booking")
              ?.scrollIntoView({
                behavior: "smooth",
                block: "start"
              });

          }, 10);

        }
      );

    });

});