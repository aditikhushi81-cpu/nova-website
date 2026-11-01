gsap.registerPlugin(ScrollTrigger);

/* ===== HERO INTRO ===== */
gsap.from(".work-hero__bg", {
  scale: 1.15,
  duration: 2.4,
  ease: "power3.out"
});

gsap.from(".work-hero .line", {
  y: 80,
  opacity: 0,
  duration: 1.2,
  stagger: 0.12,
  ease: "power4.out"
});

gsap.from([".page-top", ".work-hero__sub", ".work-hero__cta"], {
  y: 20,
  opacity: 0,
  duration: 1,
  delay: 0.6,
  ease: "power3.out"
});

/* ===== PROJECT SECTIONS ===== */
gsap.utils.toArray(".show").forEach((show, i) => {
  const media = show.querySelector(".show__media");
  const img = show.querySelector(".show__img");
  const texts = show.querySelectorAll(
    ".show__info .label, .show__title, .show__desc, .show__link"
  );

  // even projects have the image on the left, so the wipe starts from the left
  const fromLeft = i % 2 === 1;

  const tl = gsap.timeline({
    scrollTrigger: { trigger: show, start: "top 65%" }
  });

  tl.from(media, {
      clipPath: fromLeft ? "inset(0% 100% 0% 0%)" : "inset(0% 0% 0% 100%)",
      duration: 1.3,
      ease: "power4.out"
    })
    .from(img, {
      scale: 1.25,
      duration: 1.6,
      ease: "power3.out"
    }, 0)
    .from(texts, {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.08,
      ease: "power3.out"
    }, 0.2);

  // gentle parallax: the image drifts slower than the page
  gsap.fromTo(img,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: show,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

/* ===== WHAT WE BUILD ===== */
gsap.from(".build > .label, .build__title span", {
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".build", start: "top 75%" }
});

gsap.from(".build .service", {
  y: 60,
  opacity: 0,
  duration: 0.9,
  stagger: 0.12,
  ease: "power3.out",
  scrollTrigger: { trigger: ".build__list", start: "top 85%" }
});

/* ===== CLOSING ===== */
gsap.fromTo(".w-close__bg",
  { yPercent: -6 },
  {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".w-close",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

gsap.utils.toArray(".w-close__title span").forEach((line) => {
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

gsap.from([".w-close__label", ".w-close__link"], {
  y: 30,
  opacity: 0,
  duration: 1,
  stagger: 0.15,
  ease: "power3.out",
  scrollTrigger: { trigger: ".w-close", start: "top 60%" }
});