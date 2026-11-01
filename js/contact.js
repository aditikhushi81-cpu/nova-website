gsap.registerPlugin(ScrollTrigger);

/* ===== HERO INTRO ===== */
gsap.from(".c-hero__bg", {
  scale: 1.15,
  duration: 2.4,
  ease: "power3.out"
});

gsap.from(".c-hero__title .line", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.12,
  ease: "power4.out"
});

gsap.from(".c-hero__top", {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

/* ===== START A PROJECT ===== */
gsap.from(".c-start__title span", {
  y: 60,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".c-start", start: "top 70%" }
});

gsap.from(".details__row", {
  y: 30,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".details", start: "top 85%" }
});

/* ===== VISUAL STUDY (parallax) ===== */
gsap.fromTo(".c-visual__img",
  { yPercent: -6 },
  {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".c-visual",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

/* ===== FORM REVEAL ===== */
gsap.from(".c-form__intro > *, .c-form__title span", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".c-form", start: "top 75%" }
});

gsap.from(".form__tag, .field, .form__submit, .form__note", {
  y: 40,
  opacity: 0,
  duration: 0.9,
  stagger: 0.08,
  ease: "power3.out",
  scrollTrigger: { trigger: ".form", start: "top 80%" }
});

/* ===== NEXT MOVE ===== */
gsap.utils.toArray(".c-next__title span").forEach((line) => {
  gsap.from(line, {
    opacity: 0.1,
    x: -60,
    scrollTrigger: {
      trigger: line,
      start: "top 90%",
      end: "top 60%",
      scrub: true
    }
  });
});

gsap.from([".c-next > .label", ".c-next__row"], {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: { trigger: ".c-next", start: "top 60%" }
});

/* ===== FORM SUBMIT (sends a real email to you) ===== */
const form = document.getElementById("contactForm");
const submitBtn = form.querySelector(".form__submit");
const submitText = form.querySelector(".form__submit-text");
const statusEl = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault(); // stop the page from reloading

  statusEl.textContent = "";
  statusEl.classList.remove("is-error");
  submitBtn.disabled = true;
  submitText.textContent = "Sending...";

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: new FormData(form)
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "Request failed");
    }

    // success: the button confirms, like in the video
    submitText.textContent = "Inquiry received";
    statusEl.textContent = "Thank you. We'll reply within 48 hours.";
    form.reset();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitText.textContent = "Send inquiry";
    }, 4000);
  } catch (err) {
    submitBtn.disabled = false;
    submitText.textContent = "Send inquiry";
    statusEl.textContent = "Sorry, your message didn't send. Please try again.";
    statusEl.classList.add("is-error");
  }
});
/* ===== PRE-SELECT THE PROJECT TYPE (from a service row) ===== */
const wantedType = new URLSearchParams(location.search).get("type");

if (wantedType) {
  const select = document.getElementById("direction");
  const match = [...select.options].find((o) => o.value === wantedType);

  if (match) {
    select.value = match.value;

    // after the loader has lifted, glide down to the form
    setTimeout(() => {
      document.getElementById("inquiry").scrollIntoView({ behavior: "smooth" });
    }, 2000);
  }
}