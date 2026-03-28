const iconPaths: Record<string, string> = {
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  clock: 'M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z M12 6v6l4 2',
  check: 'M20 6L9 17l-5-5',
  team:
    'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  star: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
  location: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z M15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0z',
}

import { motion } from "motion/react";

function getIconPath(icon: string): string {
  return iconPaths[icon] ?? iconPaths.check
}

export interface PourquoiCard {
  icon: string
  title: string
  description: string
}

export interface PourquoiImages {
  main: string
  mainAlt: string
  detail1: string
  detail1Alt: string
  detail2: string
  detail2Alt: string
}

interface WithTieredImagesProps {
  title: string
  subtitle: string
  cards: PourquoiCard[]
  images: PourquoiImages
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.35, once: false },
  transition: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
})

const slideIn = (direction: "left" | "right", delay: number) => ({
  initial: { opacity: 0, x: direction === "left" ? -44 : 44 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { amount: 0.3, once: false },
  transition: {
    duration: 0.7,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
})

export default function WithTieredImages({
  title,
  subtitle,
  cards,
  images,
}: WithTieredImagesProps) {
  return (
    <div className="bg-[var(--color-brand-600)]">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div>
            <div className="border-b border-white/30 pb-10">
              <motion.h2 {...fadeUp(0)} className="text-lg font-medium text-white">
                {title}
              </motion.h2>
              <motion.p
                {...fadeUp(0.1)}
                className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-4xl"
              >
                {subtitle}
              </motion.p>
            </div>

            <dl className="mt-10 space-y-10">
              {cards.map((card, idx) => (
                <motion.div
                  key={card.title}
                  {...fadeUp(0.12 + idx * 0.06)}
                  className="flex gap-4"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-white text-[var(--color-brand-600)]">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      {card.icon === 'clock' ? (
                        <>
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12,6 12,12 16,14" />
                        </>
                      ) : card.icon === 'team' ? (
                        <>
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="9" cy="7" r="4" />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </>
                      ) : card.icon === 'location' ? (
                        <>
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </>
                      ) : (
                        <path d={getIconPath(card.icon)} />
                      )}
                    </svg>
                  </div>
                  <div>
                    <dt className="text-base font-medium text-white lg:text-[0.9375rem]">{card.title}</dt>
                    <dd className="mt-3 text-base text-white/90 lg:text-[0.9375rem] lg:leading-relaxed font-[family-name:var(--font-body)]">{card.description}</dd>
                  </div>
                </motion.div>
              ))}
            </dl>
          </div>

          <div>
            <motion.img
              {...slideIn("right", 0.05)}
              alt={images.mainAlt}
              src={images.main}
              className="aspect-square w-full rounded-lg bg-[var(--color-brand-100)] object-cover"
            />
            <div className="mt-4 grid grid-cols-2 gap-4 sm:mt-6 sm:gap-6 lg:mt-8 lg:gap-8">
              <motion.img
                {...slideIn("right", 0.14)}
                alt={images.detail1Alt}
                src={images.detail1}
                className="aspect-square w-full rounded-lg bg-[var(--color-brand-100)] object-cover"
              />
              <motion.img
                {...slideIn("right", 0.22)}
                alt={images.detail2Alt}
                src={images.detail2}
                className="aspect-square w-full rounded-lg bg-[var(--color-brand-100)] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
