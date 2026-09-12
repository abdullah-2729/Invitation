/* =========================================================
   WEDDING INVITATION — SCRIPT.JS
   Alisha ❤️ Ayan
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================================
     ELEMENTS
  ========================================================= */

  const openingScreen = document.getElementById("openingScreen");
  const cssEnvelope = document.getElementById("cssEnvelope");
  const openInvitation = document.getElementById("openInvitation");

  const mainInvitation = document.getElementById("mainInvitation");

  const weddingMusic = document.getElementById("weddingMusic");
  const musicControl = document.getElementById("musicControl");


  /* =========================================================
     INITIAL STATE
  ========================================================= */

  document.body.style.overflow = "hidden";

  if (mainInvitation) {
    mainInvitation.classList.remove("show");
    mainInvitation.style.display = "block";
  }


  /* =========================================================
     OPEN WEDDING INVITATION
  ========================================================= */

  if (openInvitation) {

    openInvitation.addEventListener("click", async function () {

      /* Prevent double click */
      if (openInvitation.dataset.opened === "true") return;

      openInvitation.dataset.opened = "true";


      /* Envelope opening animation */
      if (cssEnvelope) {
        cssEnvelope.classList.add("opening");
      }


      /* Start music after user tap */
      if (weddingMusic) {

        try {

          weddingMusic.volume = 0.65;

          await weddingMusic.play();

          if (musicControl) {
            musicControl.classList.add("playing");
            musicControl.textContent = "🔊";
          }

        } catch (error) {

          console.log("Music could not start:", error);

        }

      }


      /* Wait for envelope animation */
      setTimeout(() => {

        /* Hide opening screen */
        if (openingScreen) {
          openingScreen.classList.add("hide");
        }


        /* IMPORTANT:
           Make main invitation visible */
        if (mainInvitation) {
          mainInvitation.style.display = "block";
          mainInvitation.classList.add("show");
        }


        /* Enable scrolling */
        document.body.style.overflow = "auto";


        /* Always start from top */
        window.scrollTo({
          top: 0,
          behavior: "auto"
        });


        /* Reveal first scene */
        const firstScene =
          document.querySelector(".scene");

        if (firstScene) {
          firstScene.classList.add("visible");
          firstScene.classList.add("active");
        }

      }, 1200);

    });

  }


  /* =========================================================
     MUSIC CONTROL
  ========================================================= */

  if (musicControl && weddingMusic) {

    musicControl.addEventListener("click", async () => {

      if (weddingMusic.paused) {

        try {

          await weddingMusic.play();

          musicControl.classList.add("playing");
          musicControl.textContent = "🔊";

        } catch (error) {

          console.log("Unable to play music:", error);

        }

      } else {

        weddingMusic.pause();

        musicControl.classList.remove("playing");
        musicControl.textContent = "🎵";

      }

    });

  }


  /* =========================================================
     SCROLL REVEAL
     ========================================================= */

    /* =========================================================
     SCROLL REVEAL
  ========================================================= */

  const scenes = document.querySelectorAll(".scene");

  if ("IntersectionObserver" in window) {

    const sceneObserver = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add("visible");
            entry.target.classList.add("active");

          }

        });

      },
      {
        threshold: 0.18
      }
    );


    scenes.forEach((scene) => {

      sceneObserver.observe(scene);

    });

  } else {

    /* Fallback for older browsers */

    scenes.forEach((scene) => {

      scene.classList.add("visible");
      scene.classList.add("active");

    });

  }

  /* =========================================================
     NIKAH COUNTDOWN
     ========================================================= */

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  /*
     IMPORTANT:
     Exact Nikah time was not provided.

     Currently countdown is set to:
     31 October 2026 — 12:00 PM

     Change "12:00:00" when exact Nikah time is confirmed.
  */

  const nikahDate = new Date("October 31, 2026 12:00:00").getTime();

  function updateCountdown() {

    const now = new Date().getTime();
    const distance = nikahDate - now;

    if (distance <= 0) {

      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";

      return;
    }

    const days = Math.floor(
      distance / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );

    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );

    const seconds = Math.floor(
      (distance % (1000 * 60)) /
      1000
    );

    if (daysEl) {
      daysEl.textContent = String(days).padStart(2, "0");
    }

    if (hoursEl) {
      hoursEl.textContent = String(hours).padStart(2, "0");
    }

    if (minutesEl) {
      minutesEl.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsEl) {
      secondsEl.textContent = String(seconds).padStart(2, "0");
    }

  }

  updateCountdown();

  setInterval(updateCountdown, 1000);


/* =========================================================
   PREMIUM SCRATCH CARD
   ========================================================= */

const scratchCanvas = document.getElementById("scratchCanvas");
const scratchContainer = document.getElementById("scratchContainer");
const scratchPhotoArea = document.querySelector(".scratch-photo-area");

if (scratchCanvas && scratchContainer && scratchPhotoArea) {

    const ctx = scratchCanvas.getContext("2d", {
        willReadFrequently: true
    });

    let isScratching = false;
    let strokeCount = 0;
    let revealed = false;

    function resizeScratchCanvas() {

        const rect = scratchPhotoArea.getBoundingClientRect();

        scratchCanvas.width = Math.max(1, Math.floor(rect.width));
        scratchCanvas.height = Math.max(1, Math.floor(rect.height));

        ctx.globalCompositeOperation = "source-over";

        /* Elegant scratch surface */
        const gradient = ctx.createLinearGradient(
            0,
            0,
            scratchCanvas.width,
            scratchCanvas.height
        );

        gradient.addColorStop(0, "#bda98e");
        gradient.addColorStop(0.45, "#ded0bb");
        gradient.addColorStop(1, "#aa957c");

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            scratchCanvas.width,
            scratchCanvas.height
        );

        /* Very subtle texture */
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = "#ffffff";

        for (let i = 0; i < 180; i++) {

            const x = Math.random() * scratchCanvas.width;
            const y = Math.random() * scratchCanvas.height;

            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 1.2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    resizeScratchCanvas();

    window.addEventListener("resize", () => {
        if (!revealed) {
            resizeScratchCanvas();
        }
    });


    function getPosition(event) {

        const rect = scratchCanvas.getBoundingClientRect();

        let clientX;
        let clientY;

        if (event.touches && event.touches.length) {

            clientX = event.touches[0].clientX;
            clientY = event.touches[0].clientY;

        } else {

            clientX = event.clientX;
            clientY = event.clientY;
        }

        return {
            x: clientX - rect.left,
            y: clientY - rect.top
        };
    }


    function revealNikahDate() {

        if (revealed) return;

        revealed = true;

        scratchContainer.classList.add("revealed");

        /* Smoothly remove remaining scratch layer */
        setTimeout(() => {

            ctx.clearRect(
                0,
                0,
                scratchCanvas.width,
                scratchCanvas.height
            );

            scratchCanvas.style.pointerEvents = "none";

        }, 450);
    }


    function scratch(event) {

        if (!isScratching || revealed) return;

        event.preventDefault();

        const pos = getPosition(event);

        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();

        ctx.arc(
            pos.x,
            pos.y,
            30,
            0,
            Math.PI * 2
        );

        ctx.fill();

        strokeCount++;

        /*
           Reveal after enough scratching.
           Around 35 strokes gives a natural
           scratch-card experience.
        */
        if (strokeCount >= 35) {
            revealNikahDate();
        }
    }


    /* Desktop */

    scratchCanvas.addEventListener("mousedown", (event) => {

        if (revealed) return;

        isScratching = true;
        scratch(event);
    });


    window.addEventListener("mousemove", scratch);


    window.addEventListener("mouseup", () => {

        isScratching = false;
    });


    /* Mobile */

    scratchCanvas.addEventListener(
        "touchstart",
        (event) => {

            if (revealed) return;

            isScratching = true;
            scratch(event);

        },
        { passive: false }
    );


    scratchCanvas.addEventListener(
        "touchmove",
        scratch,
        { passive: false }
    );


    window.addEventListener("touchend", () => {

        isScratching = false;
    });
}


/* =========================================================
   RSVP FORM — GOOGLE SHEETS
   ========================================================= */

const RSVP_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbyX8-qWMSPFYSCRvAAjn-cV37BcIukz17d-HGYkE9BFH3-jIo7Dy0U44AauP4gZ6vPI/exec";

const rsvpForm = document.getElementById("rsvpForm");
const rsvpSuccess = document.getElementById("rsvpSuccess");

if (rsvpForm) {

  rsvpForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const guestName =
      document.getElementById("guestName")?.value.trim();

    const attendance =
      document.getElementById("attendance")?.value;

    const guestCount =
      document.getElementById("guestCount")?.value || "";

    const guestMessage =
      document.getElementById("guestMessage")?.value.trim() || "";

    if (!guestName || !attendance) {
      alert("Please enter your name and attendance.");
      return;
    }

    const data = {
      name: guestName,
      attendance: attendance,
      guests: guestCount,
      message: guestMessage
    };

    try {

      await fetch(RSVP_ENDPOINT, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
      });

      /* Success message */

      if (rsvpSuccess) {

        rsvpSuccess.classList.add("show");

        rsvpSuccess.innerHTML = `
          <div class="success-icon">✓</div>
          <h3>Thank You, ${guestName} ❤️</h3>
          <p>Your RSVP has been received successfully.</p>
        `;

      }

      rsvpForm.reset();

    } catch (error) {

      console.error("RSVP Error:", error);

      alert(
        "Something went wrong. Please try again."
      );

    }

  });

}


  /* =========================================================
     SMOOTH MAP BUTTON
     ========================================================= */

  const mapButtons = document.querySelectorAll(
    'a[href*="google.com/maps"]'
  );

  mapButtons.forEach((button) => {

    button.addEventListener("click", () => {

      button.classList.add("map-clicked");

    });

  });


  /* =========================================================
     SMALL PARALLAX EFFECT
     ========================================================= */

  const decorativeElements = document.querySelectorAll(
    ".floral-decoration, .floating-flower, .ornament"
  );

  window.addEventListener("scroll", () => {

    const scrollY = window.scrollY;

    decorativeElements.forEach((element, index) => {

      const speed = 0.02 + (index % 3) * 0.01;

      element.style.transform =
        `translateY(${scrollY * speed}px)`;

    });

  });


  /* =========================================================
     PREVENT BROKEN IMAGE LOOK
     ========================================================= */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {

    image.addEventListener("error", () => {

      image.classList.add("image-missing");

    });

  });


  /* =========================================================
     CONSOLE MESSAGE
     ========================================================= */

  console.log(
    "💍 Alisha & Ayan Wedding Invitation loaded successfully."
  );

});