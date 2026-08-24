# Carnet Data

Site de contenu (blog) en français pour praticiens en Machine Learning, MLOps, Big Data et
modélisation du risque, monétisé par publicité (AdSense/Ezoic).

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez http://localhost:4321

## Ajouter un article

Créez un fichier `.mdx` dans `src/content/blog/`, avec ce frontmatter :

```yaml
---
title: "Titre de l'article"
description: "Une phrase de résumé (utilisée en SEO et en aperçu)"
pillar: "mlops" # mlops | ml-fondamentaux | big-data-cloud | risk-modeling
entryNumber: 4  # numéro d'entrée suivant, séquentiel
publishDate: 2026-08-25
---
```

## Avant la mise en ligne

1. Remplacez `site: 'https://example.com'` dans `astro.config.mjs` par votre vrai domaine.
2. Remplacez le lien LinkedIn placeholder dans `src/components/Footer.astro` et `a-propos.astro`.
3. Une fois approuvé sur AdSense/Ezoic, collez votre unité publicitaire dans
   `src/components/AdSlot.astro` (un seul fichier à modifier pour tout le site).
4. `npm run build` puis déployez le dossier `dist/` sur Vercel, Netlify, ou votre hébergeur.

## Stack

- [Astro](https://astro.build) — génération statique, très rapide, idéal SEO
- MDX pour les articles (Markdown + composants si besoin)
- RSS + sitemap générés automatiquement
