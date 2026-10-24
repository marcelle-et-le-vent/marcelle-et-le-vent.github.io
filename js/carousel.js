/* Carrousels de la page d'accueil (estampes, photos de l'atelier).
   Le défilement lui-même est géré par le CSS (défilement horizontal, cartes
   « aimantées ») : on peut faire glisser au doigt ou au trackpad même sans ce
   script. Celui-ci ajoute les flèches précédent / suivant et, s'il est prévu,
   le compteur « 1 / 3 ».
   Chaque carrousel ([data-carousel]) cherche ses flèches dans son bloc
   parent marqué [data-carousel-root]. */
(function () {
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll("[data-carousel]").forEach(function (track) {
    var root = track.closest("[data-carousel-root]") || track.parentElement;
    var controls = root.querySelector(".carousel__controls");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var count = root.querySelector("[data-carousel-count]");
    if (!controls || !prev || !next) return;

    // Largeur d'une carte + l'espace entre deux cartes
    function cardStep() {
      var cards = track.children;
      return cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    }

    // Avance d'une carte (puis remet à jour flèches et compteur une fois arrivé)
    function step(direction) {
      track.scrollBy({
        left: direction * cardStep(),
        behavior: reduceMotion ? "auto" : "smooth"
      });
      setTimeout(update, reduceMotion ? 50 : 500);
    }

    // Grise la flèche au début ou à la fin, et met à jour le compteur
    function update() {
      var max = track.scrollWidth - track.clientWidth - 1;
      prev.disabled = track.scrollLeft <= 1;
      next.disabled = track.scrollLeft >= max;
      controls.hidden = max <= 0; // tout tient à l'écran : pas besoin de flèches
      if (count) {
        var current = Math.round(track.scrollLeft / cardStep()) + 1;
        count.textContent = current + " / " + track.children.length;
      }
    }

    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    track.addEventListener("scroll", update, { passive: true });
    track.addEventListener("scrollend", update); // fin du défilement (navigateurs récents)
    window.addEventListener("resize", update);

    track.classList.add("carousel--enhanced");
    update();
  });
})();
