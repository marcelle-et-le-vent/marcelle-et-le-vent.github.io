/* Carrousel des estampes (page d'accueil).
   Le défilement lui-même est géré par le CSS (défilement horizontal, cartes
   « aimantées ») : on peut faire glisser au doigt ou au trackpad même sans ce
   script. Celui-ci ajoute seulement les flèches précédent / suivant. */
(function () {
  var track = document.querySelector("[data-carousel]");
  if (!track) return;

  var controls = document.querySelector(".carousel__controls");
  var prev = document.querySelector("[data-carousel-prev]");
  var next = document.querySelector("[data-carousel-next]");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Avance d'une estampe : largeur d'une carte + l'espace entre deux cartes
  function step(direction) {
    var cards = track.children;
    var cardStep = cards.length > 1 ? cards[1].offsetLeft - cards[0].offsetLeft : track.clientWidth;
    track.scrollBy({
      left: direction * cardStep,
      behavior: reduceMotion ? "auto" : "smooth"
    });
  }

  // Grise la flèche quand on est au début ou à la fin
  function update() {
    var max = track.scrollWidth - track.clientWidth - 1;
    prev.disabled = track.scrollLeft <= 1;
    next.disabled = track.scrollLeft >= max;
    controls.hidden = max <= 0; // tout tient à l'écran : pas besoin de flèches
  }

  prev.addEventListener("click", function () { step(-1); });
  next.addEventListener("click", function () { step(1); });
  track.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);

  track.classList.add("carousel--enhanced");
  update();
})();
