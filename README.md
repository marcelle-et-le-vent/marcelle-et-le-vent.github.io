# marcelle-et-le-vent.github.io
Site vitrine de Marcelle et le Vent, atelier de linogravure.

Site statique (HTML + CSS, sans JavaScript ni outil de build), hébergé sur GitHub Pages :
https://marcelle-et-le-vent.fr

## Structure

```
index.html            Page principale : accueil, estampes, à propos, contact
mentions-legales.html Mentions légales (lien en bas de page)
CNAME                 Nom de domaine (marcelle-et-le-vent.fr), géré depuis GitHub
css/style.css         Styles — couleurs, polices et espacements en haut du fichier
fonts/                Polices hébergées dans le site (Barlow Condensed, DM Sans) et leurs licences
favicon.ico           Icône de l'onglet du navigateur
images/logo/          Logo et icônes (écrans haute définition, écran d'accueil iPhone)
images/display/       Visuels du site (bord de papier coton du header)
images/gallery/       Estampes
.nojekyll             Indique à GitHub Pages de servir les fichiers tels quels
```

Les fichiers sources (photos originales, scans) ne sont pas dans le dépôt :
seules les versions optimisées pour le web y sont.

## Travailler en local

Ouvrir `index.html` dans un navigateur, ou lancer un petit serveur :

```
python3 -m http.server
```

puis aller sur http://localhost:8000.

## Mettre en ligne

```
git add .
git commit -m "Description de la modification"
git push
```

Le site est mis à jour sur GitHub Pages une à deux minutes après le push.

## Reste à faire

- Lien vers la boutique Etsy : remplacer les `href="#"` marqués `<!-- Etsy -->` dans `index.html`.
- Lien Instagram.
- Photos des estampes (galerie) et photo de la section À propos.

## Images

- Format conseillé : WebP ou JPEG, environ 1600 px sur le grand côté, moins de 300 Ko.
- Noms de fichiers en minuscules, sans espaces ni accents (ex. `plongeoir.webp`).
- Toujours renseigner un texte `alt` qui décrit l'estampe.
