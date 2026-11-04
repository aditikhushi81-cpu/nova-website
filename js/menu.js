/* ===== PAGE LOADER ===== */
(function () {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  const MIN_TIME = 1400; // milliseconds the progress bar takes to fill
  const startTime = performance.now();
  const status = loader.querySelector(".loader__status");
  let finished = false;

  // freeze all GSAP animations so each page's intro waits for the loader
  gsap.globalTimeline.pause();

  // counter: 00 / 100 climbing in step with the bar
  function count(now) {
    if (finished) return;
    const p = Math.max(0, Math.min(1, (now - startTime) / MIN_TIME));
    const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    if (status) {
      status.textContent = String(Math.round(eased * 100)).padStart(2, "0") + " / 100";
    }
    if (p < 1) requestAnimationFrame(count);
  }
  requestAnimationFrame(count);

  function finish() {
    if (finished) return;
    finished = true;

    if (status) status.textContent = "Ready";

    loader.classList.add("is-done");   // curtain lifts (CSS transition)
    gsap.globalTimeline.resume();      // page animations start as it lifts

    setTimeout(() => loader.remove(), 1200);
  }

  // finish when the page and its images have loaded, but never before MIN_TIME
  window.addEventListener("load", () => {
    const wait = Math.max(0, MIN_TIME - (performance.now() - startTime));
    setTimeout(finish, wait);
  });

  // safety net in case "load" never fires
  setTimeout(finish, 4000);
})();
/* ===== FULL-SCREEN MENU (shared by every page) ===== */
(function () {
    const nav = document.querySelector(".nav");
    const menuBtn = document.querySelector(".nav__menu");
    const menu = document.querySelector(".menu");
    const menuItems = document.querySelectorAll(".menu__list li");

    const menuTl = gsap.timeline({
        paused: true,
        onReverseComplete: () => gsap.set(menu, { visibility: "hidden" })
    });

    menuTl
        .set(menu, { visibility: "visible" })
        .to(menu, {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.8,
            ease: "power4.inOut"
        })
        .from(menuItems, {
            y: 80,
            opacity: 0,
            stagger: 0.08,
            duration: 0.6,
            ease: "power3.out"
        }, "-=0.3");

    let menuOpen = false;

    menuBtn.addEventListener("click", () => {
        menuOpen = !menuOpen;

        if (menuOpen) {
            menuTl.play();
        } else {
            menuTl.reverse();
        }

        nav.classList.toggle("is-open", menuOpen);
        menuBtn.querySelector(".nav__menu-text").textContent = menuOpen ? "Close" : "Menu";
        document.body.style.overflow = menuOpen ? "hidden" : "";
    });

    /* Close the menu if the clicked link points to the current page */
    document.querySelectorAll(".menu__list a").forEach((link) => {
        link.addEventListener("click", (e) => {
            const current = location.pathname.split("/").pop() || "index.html";
            if (link.getAttribute("href") === current) {
                e.preventDefault();
                menuBtn.click();
            }
        });
    });
})();
/* ===== FOOTER REVEAL (shared by every page) ===== */
if (document.querySelector(".footer")) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.from(".footer__logo", {
    scrollTrigger: { trigger: ".footer", start: "top 85%" },
    y: 80,
    opacity: 0,
    duration: 1.2,
    ease: "power4.out"
  });

  gsap.from(".footer__col, .footer__top-link", {
    scrollTrigger: { trigger: ".footer__cols", start: "top 90%" },
    y: 30,
    opacity: 0,
    duration: 0.9,
    stagger: 0.12,
    ease: "power3.out"
  });
}
/* ===== SERVICE ROWS: open the contact form with the project type chosen ===== */
(function () {
  // row name -> option in the contact form's "Project type" dropdown
  const typeFor = {
    "Digital Identity": "Digital Identity",
    "Web Experiences": "Digital Experience",
    "Interface Design": "Digital Experience",
    "Creative Development": "Development",
    "Motion & Interaction": "Interactive / Motion",
    "Strategy": "Something else",
    "Digital Design": "Digital Experience",
    "Development": "Development",
    "Motion": "Interactive / Motion",
    "Interaction": "Interactive / Motion"
  };

  document.querySelectorAll(".service").forEach((row) => {
    const name = row.querySelector(".service__name").textContent.trim();
    const arrow = row.querySelector(".service__arrow");
    if (!arrow) return;

    // swap the plain arrow for a real link
    const link = document.createElement("a");
    link.className = arrow.className;
    link.textContent = arrow.textContent;
    link.href = "contact.html?type=" + encodeURIComponent(typeFor[name] || "Something else");
    link.setAttribute("aria-label", "Start a " + name + " project");
    arrow.replaceWith(link);
  });
})();
/* ===== SCROLL MOTION HELPERS (shared by every page) ===== */
window.NOVA = (function () {
  const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // wraps every word in a <span class="word">, keeping nested spans like .dim
  function splitWords(el) {
    [...el.childNodes].forEach((node) => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
          } else {
            const w = document.createElement("span");
            w.className = "word";
            w.textContent = part;
            frag.appendChild(w);
          }
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        splitWords(node);
      }
    });
    return el.querySelectorAll(".word");
  }

  // hero headings: lines slide apart and fade while you scroll away
  function heroDrift(lineSelector, titleSelector, triggerSelector) {
    if (calm) return;
    const lines = gsap.utils.toArray(lineSelector);
    if (!lines.length) return;

    const trigger = () => ({
      trigger: triggerSelector,
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true
    });

    gsap.to(lines, {
      x: (i) => (i % 2 ? 1 : -1) * window.innerWidth * 0.1,
      ease: "none",
      scrollTrigger: trigger()
    });

    gsap.to(titleSelector, {
      opacity: 0.15,
      ease: "none",
      scrollTrigger: trigger()
    });
  }

  // each line slides in and fades up as you scroll (same as "Your next digital move")
  function scrubLines(selector) {
    if (calm) return;
    gsap.utils.toArray(selector).forEach((line) => {
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
  }

  // a sentence lights up word by word as you scroll
  function scrubWords(selector) {
    if (calm) return;
    const el = document.querySelector(selector);
    if (!el) return;
    const words = splitWords(el);

    gsap.fromTo(words,
      { opacity: 0.12, x: -24 },
      {
        opacity: 1,
        x: 0,
        ease: "none",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          end: "bottom 55%",
          scrub: true
        }
      }
    );
  }

  return { heroDrift, scrubLines, scrubWords };
})();