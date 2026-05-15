(function () {
  "use strict";

  /* --- Scroll Spy (active nav indicator) --- */
  function initScrollSpy() {
    var links = document.querySelectorAll(".nav-link");
    var sections = [];
    links.forEach(function (link) {
      var id = link.getAttribute("data-target");
      var el = document.getElementById(id);
      if (el) sections.push({ id: id, el: el, link: link });
    });

    function update() {
      var scrollY = window.scrollY + 120;
      var active = sections[0];
      if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight - 2) {
        active = sections[sections.length - 1];
      } else {
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].el.offsetTop <= scrollY) active = sections[i];
        }
      }
      links.forEach(function (l) { l.classList.remove("active"); });
      if (active) active.link.classList.add("active");
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
  }

  /* --- Scroll Reveal --- */
  function initReveal() {
    var items = document.querySelectorAll(".exp-item, .about-text");
    items.forEach(function (el) { el.classList.add("reveal"); });

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    items.forEach(function (el) { observer.observe(el); });
  }

  /* --- Dark / Light Toggle --- */
  function initTheme() {
    var btn = document.querySelector(".theme-toggle");
    if (!btn) return;

    var saved = localStorage.getItem("theme");
    if (saved) {
      document.documentElement.setAttribute("data-theme", saved);
    } else if (window.matchMedia("(prefers-color-scheme: light)").matches) {
      document.documentElement.setAttribute("data-theme", "light");
    }

    function updateLabel() {
      var isDark = document.documentElement.getAttribute("data-theme") === "dark";
      btn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    }

    updateLabel();

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      updateLabel();
    });
  }

  /* --- Video Hover-to-Play --- */
  function initVideos() {
    var videos = document.querySelectorAll("video[data-hover-play]");
    var isMobile = window.matchMedia("(hover: none)").matches;

    videos.forEach(function (video) {
      if (isMobile) {
        video.addEventListener("click", function () {
          if (video.paused) video.play(); else video.pause();
        });
      } else {
        var container = video.closest(".exp-media-item") || video.closest(".exp-media-thumb");
        if (!container) return;
        container.addEventListener("mouseenter", function () { video.play(); });
        container.addEventListener("mouseleave", function () {
          video.pause();
          video.currentTime = 0;
        });
      }
    });
  }

  /* --- Mobile Nav Toggle --- */
  function initNavToggle() {
    var btn = document.querySelector(".nav-toggle");
    var menu = document.getElementById("nav-menu");
    if (!btn || !menu) return;

    btn.addEventListener("click", function () {
      var open = menu.classList.toggle("nav-open");
      btn.setAttribute("aria-expanded", open);
    });

    menu.addEventListener("click", function (e) {
      if (e.target.classList.contains("nav-link")) {
        menu.classList.remove("nav-open");
        btn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* --- Init --- */
  document.addEventListener("DOMContentLoaded", function () {
    initScrollSpy();
    initReveal();
    initTheme();
    initVideos();
    initNavToggle();
  });
})();
