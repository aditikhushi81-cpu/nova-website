gsap.registerPlugin(ScrollTrigger);

/* ===== HERO INTRO ===== */
/* ===== HERO INTRO ===== */
gsap.from(".hero__title .line", {
    y: 80,
    opacity: 0,
    duration: 1.2,
    stagger: 0.12,
    ease: "power4.out"
});

gsap.from(".hero__bg", {
    scale: 1.15,
    duration: 2.4,
    ease: "power3.out"
});

gsap.from([".hero__label", ".hero__sub", ".hero__cta"], {
    y: 20,
    opacity: 0,
    duration: 1,
    delay: 0.6,
    ease: "power3.out"
});

/* ===== SERVICES REVEAL ===== */
gsap.from(".services__head > *", {
    scrollTrigger: { trigger: ".services__head", start: "top 80%" },
    y: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.15,
    ease: "power3.out"
});

gsap.from(".service", {
    scrollTrigger: { trigger: ".services__list", start: "top 80%" },
    y: 60,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out"
});

/* ===== MANIFESTO SCRUB ===== */
gsap.utils.toArray(".manifesto__text span").forEach((line) => {
    gsap.from(line, {
        opacity: 0.1,
        x: -60,
        scrollTrigger: {
            trigger: line,
            start: "top 85%",
            end: "top 50%",
            scrub: true
        }
    });
});
/* ===== CTA ===== */
gsap.fromTo(".cta__bg",
  { scale: 1.25 },
  {
    scale: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".cta",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);

gsap.from(".cta .label, .cta__title, .cta__btn", {
  scrollTrigger: { trigger: ".cta", start: "top 60%" },
  y: 50,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out"
});
/* ===== SELECTED WORK ===== */
gsap.utils.toArray(".work-card").forEach((card) => {
  const media = card.querySelector(".work-card__media");
  const img = card.querySelector(".work-card__img");
  const meta = card.querySelector(".work-card__meta");

  // image wipes in from the bottom, while zooming out slightly
  gsap.from(media, {
    clipPath: "inset(100% 0% 0% 0%)",
    duration: 1.3,
    ease: "power4.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });

  gsap.from(img, {
    scale: 1.25,
    duration: 1.6,
    ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });

  gsap.from(meta, {
    y: 30,
    opacity: 0,
    duration: 1,
    delay: 0.2,
    ease: "power3.out",
    scrollTrigger: { trigger: card, start: "top 85%" }
  });

  // gentle parallax: the image drifts slower than the page
  gsap.fromTo(img,
    { yPercent: -6 },
    {
      yPercent: 6,
      ease: "none",
      scrollTrigger: {
        trigger: card,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
});

gsap.from(".selected__head > *", {
  scrollTrigger: { trigger: ".selected__head", start: "top 85%" },
  y: 40,
  opacity: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out"
});
/* ===== THE STUDIO ===== */
gsap.from(".studio__head > *", {
  y: 20,
  opacity: 0,
  duration: 1,
  stagger: 0.1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".studio", start: "top 80%" }
});

gsap.from(".studio__statement", {
  y: 50,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: { trigger: ".studio", start: "top 70%" }
});

gsap.from(".studio__body", {
  y: 30,
  opacity: 0,
  duration: 1,
  ease: "power3.out",
  scrollTrigger: { trigger: ".studio__body", start: "top 90%" }
});

/* ===== VISUAL STUDY (parallax) ===== */
gsap.fromTo(".visual__img",
  { yPercent: -6 },
  {
    yPercent: 6,
    ease: "none",
    scrollTrigger: {
      trigger: ".visual",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  }
);
