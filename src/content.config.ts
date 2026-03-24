import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const linkItem = z.object({
  name: z.string(),
  href: z.string(),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    icon: z.string().optional(),
    image: z.string().optional(),
    order: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

const navigation = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/navigation' }),
  schema: z.object({
    links: z.array(linkItem),
    cta: z.object({ label: z.string(), href: z.string() }),
    servicesSection: z.object({
      title: z.string(),
      subtitle: z.string(),
      viewAll: z.string(),
      empty: z.string(),
    }),
    pageTitles: z.object({
      services: z.string(),
      soumission: z.string(),
    }),
  }),
});

const hero = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/hero' }),
  schema: z.object({
    pillCta: z.string(),
    title: z.string(),
    subtitle: z.string(),
    cta: z.string(),
    ctaHref: z.string(),
  }),
});

const cta = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/cta' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    button: z.string(),
    buttonHref: z.string(),
    imageAlt: z.string(),
  }),
});

const contact = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/contact' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    serviceAreaLabel: z.string(),
    hours: z.object({
      title: z.string(),
      weekdays: z.object({ day: z.string(), time: z.string() }),
      saturday: z.object({ day: z.string(), time: z.string() }),
      sunday: z.object({ day: z.string(), time: z.string() }),
    }),
    follow: z.string(),
    facebookCta: z.string(),
    map: z.object({
      title: z.string(),
      region: z.string(),
      mapsButton: z.string(),
    }),
    ctaCard: z.object({
      title: z.string(),
      description: z.string(),
      button: z.string(),
    }),
    breadcrumbHome: z.string(),
  }),
});

const soumission = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/soumission' }),
  schema: z.object({
    pageTitle: z.string(),
    title: z.string(),
    subtitle: z.string(),
    form: z.object({
      ariaLabel: z.string(),
      nom: z.string(),
      nomPlaceholder: z.string(),
      courriel: z.string(),
      courrielPlaceholder: z.string(),
      telephone: z.string(),
      telephonePlaceholder: z.string(),
      adresse: z.string(),
      adressePlaceholder: z.string(),
      typeService: z.string(),
      typeServicePlaceholder: z.string(),
      typeServiceOptions: z.object({
        interieur: z.string(),
        exterieur: z.string(),
        commercial: z.string(),
        decoration: z.string(),
        autre: z.string(),
      }),
      message: z.string(),
      messagePlaceholder: z.string(),
      envoyer: z.string(),
      sending: z.string(),
      successTitle: z.string(),
      successMessage: z.string(),
      errorTitle: z.string(),
      errorMessage: z.string(),
      validation: z.object({
        nom: z.string(),
        courriel: z.string(),
        telephone: z.string(),
        typeService: z.string(),
        message: z.string(),
      }),
    }),
    sidebar: z.object({
      processTitle: z.string(),
      steps: z.array(
        z.object({
          title: z.string(),
          description: z.string(),
        }),
      ),
      directContactTitle: z.string(),
      rbqLabel: z.string(),
    }),
    breadcrumbHome: z.string(),
  }),
});

const footer = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/footer' }),
  schema: z.object({
    tagline: z.string(),
    navTitle: z.string(),
    servicesTitle: z.string(),
    contactTitle: z.string(),
    legal: z.string(),
    rbq: z.string(),
    neq: z.string(),
    facebookLabel: z.string(),
    serviceLinks: z.array(
      z.object({
        label: z.string(),
        href: z.string(),
      }),
    ),
  }),
});

const notFound = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/not-found' }),
  schema: z.object({
    title: z.string(),
    message: z.string(),
    home: z.string(),
  }),
});

const pourquoiCard = z.object({
  icon: z.string(),
  title: z.string(),
  description: z.string(),
});

const pourquoi = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pourquoi' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    cards: z.array(pourquoiCard),
  }),
});

export const collections = {
  services,
  navigation,
  hero,
  cta,
  contact,
  soumission,
  footer,
  notFound,
  pourquoi,
};
