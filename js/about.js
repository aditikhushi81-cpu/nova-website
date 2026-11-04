gsap.registerPlugin(ScrollTrigger);

/* ===== ABOUT HERO INTRO ===== */
gsap.from(".about-hero .line", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.12,
  ease: "power4.out"
});

gsap.from(".about-hero__bg", {
  scale: 1.15,
  duration: 2.4,
  ease: "power3.out"
});

gsap.from([".about-hero .label", ".about-hero__sub", ".about-hero__cta"], {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});
/* ===== INTRO REVEAL ===== */
gsap.from(".intro__media", {
  scrollTrigger: { trigger: ".intro", start: "top 75%" },
  y: 60,
  opacity: 0,
  duration: 1.1,
  ease: "power3.out"
});

gsap.from(".intro__text > *", {
  scrollTrigger: { trigger: ".intro", start: "top 70%" },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out"
});

/* ===== PRINCIPLES REVEAL ===== */
gsap.from(".principle", {
  scrollTrigger: { trigger: ".principles__grid", start: "top 80%" },
  y: 50,
  opacity: 0,
  duration: 0.9,
  stagger: 0.15,
  ease: "power3.out"
});

/* ===== SLIDING STATEMENT (scrub) ===== */
gsap.to(".statement__line--a", {
  xPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".statement",
    start: "top bottom",
    end: "bottom top",
    scrub: true
  }
});

gsap.fromTo(".statement__line--b",
  { xPercent: -30 },
  {
    xPercent: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".statement",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);
/* ===== PROCESS HOVER LIST ===== */
const processItems = document.querySelectorAll(".process__item");
const processImgs = document.querySelectorAll(".process__img");

function activateProcess(index) {
  processItems.forEach((el, i) => el.classList.toggle("is-active", i === index));
  processImgs.forEach((el, i) => el.classList.toggle("is-active", i === index));
}

processItems.forEach((item, i) => {
  item.addEventListener("mouseenter", () => activateProcess(i));
  item.addEventListener("focus", () => activateProcess(i));
  item.addEventListener("click", () => activateProcess(i)); // for touch screens
});

/* reveal on scroll */
gsap.from(".process__head > *", {
  scrollTrigger: { trigger: ".process__head", start: "top 80%" },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out"
});

gsap.from(".process__media, .process__item", {
  scrollTrigger: { trigger: ".process__body", start: "top 80%" },
  y: 50,
  opacity: 0,
  duration: 0.9,
  stagger: 0.1,
  ease: "power3.out"
});
/* ===== CONCEPT TO FORM ===== */
// the background drifts slower than the page (parallax)
gsap.fromTo(".concept__bg",
  { yPercent: -6 },
  {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".concept",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

// each line fades and slides in with your scroll
gsap.utils.toArray(".concept__title span").forEach((line) => {
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

/* ===== LESS NOISE ===== */
gsap.from(".noise__media", {
  clipPath: "inset(0% 100% 0% 0%)",
  duration: 1.3,
  ease: "power4.out",
  scrollTrigger: { trigger: ".noise", start: "top 70%" }
});

gsap.from(".noise__img", {
  scale: 1.25,
  duration: 1.6,
  ease: "power3.out",
  scrollTrigger: { trigger: ".noise", start: "top 70%" }
});

gsap.from(".noise__text > *", {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".noise", start: "top 70%" }
});

/* ===== WHAT WE CREATE ===== */
gsap.from([".create > .label", ".create__title"], {
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".create", start: "top 80%" }
});

gsap.from(".create .service", {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".create__list", start: "top 80%" }
});
/* ===== DISTINCTIVE CTA ===== */
gsap.fromTo(".distinct__bg",
  { yPercent: -6 },
  {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".distinct",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

gsap.utils.toArray(".distinct__title span").forEach((line) => {
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

gsap.from([".distinct__label", ".distinct__link"], {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: { trigger: ".distinct", start: "top 60%" }
});
/* ===== SCROLL MOTION ===== */
NOVA.heroDrift(".about-hero__title .line", ".about-hero__title", ".about-hero");
/* ===== SCROLL MOTION ===== */
NOVA.heroDrift(".c-hero__title .line", ".c-hero__title", ".c-hero");