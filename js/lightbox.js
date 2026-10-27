/* Visionneuse des estampes (page Estampes et carrousel de l'accueil) :
   un clic sur une estampe l'affiche en grand.
   - flèches (ou touches ← →) : estampe précédente / suivante
   - croix, touche Échap ou clic à côté de l'image : fermer
   - si le lien porte data-collection-href (carrousel), un lien « Voir la
     collection » mène à la collection sur la page Estampes
   Sans ce script, le lien de chaque estampe ouvre simplement l'image seule. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-zoom]"));
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  // Construction de la fenêtre (une seule pour toute la page)
  var dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Estampe agrandie");
  dialog.tabIndex = -1; // peut recevoir le focus (voir l'ouverture plus bas)
  dialog.innerHTML =
    '<button class="lightbox__close" type="button" aria-label="Fermer">×</button>' +
    '<button class="lightbox__nav lightbox__nav--prev" type="button" aria-label="Estampe précédente">←</button>' +
    '<figure class="lightbox__figure">' +
    '  <img class="lightbox__image" alt="">' +
    '  <figcaption class="lightbox__caption">' +
    '    <p class="lightbox__collection" translate="no"></p>' +
    '    <p class="lightbox__title" translate="no"></p>' +
    '    <p class="lightbox__meta"></p>' +
    '    <p class="lightbox__note"></p>' +
    '    <a class="lightbox__more" href="">Voir la collection <span aria-hidden="true">→</span></a>' +
    "  </figcaption>" +
    "</figure>" +
    '<button class="lightbox__nav lightbox__nav--next" type="button" aria-label="Estampe suivante">→</button>';
  document.body.appendChild(dialog);

  var image = dialog.querySelector(".lightbox__image");
  var collectionName = dialog.querySelector(".lightbox__collection");
  var title = dialog.querySelector(".lightbox__title");
  var meta = dialog.querySelector(".lightbox__meta");
  var note = dialog.querySelector(".lightbox__note");
  var more = dialog.querySelector(".lightbox__more");
  var current = 0;

  // Texte d'un élément de la carte (ou chaîne vide s'il n'existe pas)
  function text(root, selector) {
    var el = root && root.querySelector(selector);
    return el ? el.textContent : "";
  }

  // Les informations sont lues dans la carte : collection (surtitre de la carte,
  // ou titre de la section sur la page Estampes), titre, encre / papier, mention
  function show(index) {
    current = (index + links.length) % links.length;
    var link = links[current];
    var card = link.closest(".print-card");
    var cardImage = link.querySelector("img");

    image.src = link.href;
    image.alt = cardImage ? cardImage.alt : "";
    collectionName.textContent =
      text(card, ".print-card__collection") || text(link.closest(".collection"), "h2");
    title.textContent = text(card, ".print-card__title");
    meta.textContent = text(card, ".print-card__meta");
    note.textContent = text(card, ".print-card__note");
    note.hidden = !note.textContent;
    more.href = link.getAttribute("data-collection-href") || "";
    more.hidden = !more.getAttribute("href");
  }

  links.forEach(function (link, index) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      show(index);
      dialog.showModal();
      // Le focus va sur la visionneuse (et non sur la croix) : pas de contour
      // de focus visible, et les touches ← → fonctionnent tout de suite.
      dialog.focus();
    });
  });

  dialog.querySelector(".lightbox__close").addEventListener("click", function () { dialog.close(); });
  dialog.querySelector(".lightbox__nav--prev").addEventListener("click", function () { show(current - 1); });
  dialog.querySelector(".lightbox__nav--next").addEventListener("click", function () { show(current + 1); });

  // Clic à côté de l'image (sur le fond) : fermer
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog || event.target.classList.contains("lightbox__figure")) dialog.close();
  });

  dialog.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  // Retour du focus sur l'estampe ouverte à la fermeture
  dialog.addEventListener("close", function () { links[current].focus(); });
})();
