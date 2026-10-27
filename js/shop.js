/* Boutique Etsy pas encore ouverte : un clic sur un lien « Boutique » ([data-shop])
   ouvre une petite fenêtre qui renvoie vers Vinted.
   Dès que le lien contient l'adresse de la boutique (href différent de "#"),
   la fenêtre ne s'ouvre plus et le lien mène directement à Etsy. */
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-shop]"))
    .filter(function (link) { return link.getAttribute("href") === "#"; });
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  var dialog = document.createElement("dialog");
  dialog.className = "shop-dialog";
  dialog.setAttribute("aria-labelledby", "shop-dialog-title");
  dialog.tabIndex = -1; // peut recevoir le focus (voir l'ouverture plus bas)
  dialog.innerHTML =
    '<button class="shop-dialog__close" type="button" aria-label="Fermer">×</button>' +
    '<p id="shop-dialog-title" class="shop-dialog__title">La boutique Etsy arrive…</p>' +
    "<p>En attendant, retrouvez mes estampes sur Vinted&nbsp;!</p>" +
    '<a class="button" href="https://www.vinted.fr/member/15245684">Voir sur Vinted' +
    ' <span class="icon-external" aria-hidden="true"></span></a>' +
    '<p class="shop-dialog__contact">Une demande particulière&nbsp;? ' +
    '<a href="mailto:marcelleetlevent@gmail.com">Écrivez-moi</a></p>';
  document.body.appendChild(dialog);

  var opener = null;

  links.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      opener = link;
      dialog.showModal();
      // Le focus va sur la fenêtre (et non sur la croix) : pas de contour visible
      dialog.focus();
    });
  });

  dialog.querySelector(".shop-dialog__close").addEventListener("click", function () { dialog.close(); });

  // Clic à côté de la fenêtre (sur le fond) : fermer
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) dialog.close();
  });

  // Retour du focus sur le lien cliqué à la fermeture
  dialog.addEventListener("close", function () { if (opener) opener.focus(); });
})();
