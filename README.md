# Cachet Peintres Décorateurs — Site Web

Site vitrine statique pour **Cachet Peintres Décorateurs** (CACHETDECO).
Construit avec **Astro v5 + Tailwind v4 + Decap CMS**, déployé sur **Cloudflare Pages**.

## Stack

| Technologie | Rôle |
|---|---|
| Astro v5 | Framework SSG (zéro JS par défaut) |
| Tailwind v4 | CSS utility-first (config par `@theme` dans global.css) |
| Decap CMS | Interface d'édition de contenu (via `/admin/`) |
| Cloudflare Pages | Hébergement statique + CDN global |
| Cloudflare Functions | Traitement du formulaire de soumission |
| Resend | Envoi de courriel via API |

## Prérequis

- Node.js ≥ 22
- npm ≥ 9

## Installation locale

```bash
cd cachetdeco
npm install
npm run dev
```

Ouvre [http://localhost:4321](http://localhost:4321) dans le navigateur.

## Structure du projet

```
cachetdeco/
├── public/
│   ├── admin/              # Decap CMS (index.html + config.yml)
│   ├── fonts/              # Polices Cocogoose & Geoform
│   ├── images/             # Images statiques (logo, uploads CMS)
│   ├── favicon.svg
│   └── robots.txt
├── functions/
│   └── api/
│       └── soumission.ts   # Cloudflare Pages Function → Resend API
├── src/
│   ├── i18n/               # Infrastructure i18n
│   │   ├── config.ts       # Locales et routes
│   │   ├── ui.ts           # Traductions FR
│   │   └── utils.ts        # Fonctions getLangFromUrl() et t()
│   ├── components/         # Composants Astro réutilisables
│   ├── content/            # Contenu géré par CMS
│   │   ├── services/fr/    # Services en markdown
│   │   └── settings/       # general.json et seo.json
│   ├── content.config.ts   # Définitions des collections (Astro v5)
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/              # Pages Astro (routes)
│   └── styles/
│       └── global.css      # Tailwind + @theme brand tokens
├── astro.config.mjs
├── tsconfig.json
├── .env.example
└── package.json
```

## Variables d'environnement

Copiez `.env.example` en `.env` pour le développement local :

```bash
cp .env.example .env
```

| Variable | Description | Où la configurer |
|---|---|---|
| `RESEND_API_KEY` | Clé API Resend (envoi de courriels) | Cloudflare Pages > Settings > Environment variables |
| `CONTACT_EMAIL` | Adresse de destination des soumissions | Cloudflare Pages > Settings > Environment variables |

> **Note :** Ces variables NE doivent PAS être dans le code source. Elles sont injectées au runtime par Cloudflare Pages Functions.

## Déploiement sur Cloudflare Pages

1. Créez un dépôt GitHub et poussez le code
2. Dans Cloudflare Pages, créez un nouveau projet connecté à ce dépôt
3. Configurez :
   - **Build command :** `npm run build`
   - **Build output directory :** `dist`
   - **Node.js version :** 18
4. Ajoutez les variables d'environnement (`RESEND_API_KEY`, `CONTACT_EMAIL`)
5. Déclenchez un déploiement

Les fonctions dans `functions/` sont automatiquement déployées comme Cloudflare Pages Functions.

## Gestion du contenu (Decap CMS)

### Configuration initiale

1. Créez un **GitHub OAuth App** :
   - GitHub > Settings > Developer settings > OAuth Apps > New OAuth App
   - Homepage URL : `https://cachetdeco.com`
   - Authorization callback URL : `https://cachetdeco.com/admin/`
   - Notez le **Client ID**

2. Modifiez `public/admin/config.yml` :
   ```yaml
   backend:
     name: github
     repo: your-org/cachetdeco   # Remplacez par votre dépôt
     branch: main
     auth_type: pkce
     app_id: YOUR_GITHUB_OAUTH_APP_CLIENT_ID   # Remplacez par votre Client ID
   ```

3. Accédez à `https://cachetdeco.com/admin/` et connectez-vous avec GitHub

### Flux de publication

```
Éditeur → Decap CMS (/admin/) → Commit GitHub → Webhook → Cloudflare Pages Build → Site mis à jour
```

Le délai de publication est d'environ **1–2 minutes** après une modification.

### Collections disponibles

| Collection | Chemin | Description |
|---|---|---|
| Services | `src/content/services/fr/*.md` | Pages de services (markdown) |
| Paramètres généraux | `src/content/settings/general.json` | Nom, téléphone, courriel, adresse |
| Paramètres SEO | `src/content/settings/seo.json` | Titre, description, mots-clés par défaut |

## Branding

### Palette de couleurs

| Token | Valeur | Usage |
|---|---|---|
| `--color-brand-600` | `#314732` | CTA, boutons principaux, titres |
| `--color-brand-700` | `#263a27` | Hover state |
| `--color-brand-400` | `#7a8876` | Accents, bordures |
| `--color-brand-50` | `#f0f4ef` | Fonds de section |
| `--color-gray-dark` | `#444445` | Texte courant |
| `--color-gray-light` | `#b7b6b6` | Texte secondaire, placeholders |

### Typographie

- **Cocogoose Medium** — titres et en-têtes (`font-family: var(--font-display)`)
- **Geoform Bold** — corps de texte et sous-titres (`font-family: var(--font-body)`)

## i18n — Ajouter l'anglais plus tard

Quand le client souhaite une version anglaise, voici les étapes :

1. Ajoutez `'en'` dans `src/i18n/config.ts` :
   ```ts
   export const locales = ['fr', 'en'] as const;
   export const routes = {
     services:   { fr: 'services',   en: 'services' },
     contact:    { fr: 'contact',    en: 'contact' },
     soumission: { fr: 'soumission', en: 'quote' },
   };
   ```

2. Ajoutez `'en'` dans `astro.config.mjs` :
   ```js
   i18n: { locales: ['fr', 'en'], ... }
   ```

3. Traduisez toutes les clés dans `src/i18n/ui.ts` (section `en: { ... }`)

4. Créez `src/pages/en/` avec les 4 fichiers de page (ils importent les mêmes composants)

5. Ajoutez `en` dans `public/admin/config.yml` sous `i18n.locales`

6. Décommentez le composant `LanguagePicker` dans `Header.astro`

Aucune refactorisation structurelle n'est nécessaire — l'infrastructure est déjà en place.

## Mentions légales obligatoires

Conformément aux exigences légales québécoises, les informations suivantes doivent apparaître visiblement sur le site :

- **Numéro RBQ :** 5839 8736 01 (obligatoire pour tout service nécessitant une modification d'un bâtiment)

Ces informations sont affichées dans le footer de chaque page.

## Commandes disponibles

```bash
npm run dev       # Serveur de développement local (http://localhost:4321)
npm run build     # Build de production (dans dist/)
npm run preview   # Prévisualisation du build de production
```
