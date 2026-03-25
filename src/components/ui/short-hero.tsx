interface ContactHeroContent {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

import { motion } from "motion/react";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

  
  export default function ContactHero({ content }: { content: ContactHeroContent }) {
    const { imageSrc, imageAlt, title, subtitle } = content;
    return (
      <div className="relative flex items-center justify-center overflow-hidden bg-brand-600 min-h-[50vh]">
        {/* Decorative background image and gradient */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto overflow-hidden">
            <img
              alt={imageAlt}
              src={imageSrc}
              className="size-full object-cover"
            />
          </div>
          <div className="absolute inset-0" />
          <div className="absolute inset-0 bg-linear-to-t from-white via-white opacity-40" />
        </div>
  
        {/* Callout */}
        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col items-center justify-center text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <motion.h2
              {...fadeUp(0.15)}
              id="sale-heading"
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              {title}
            </motion.h2>
            <motion.p
              {...fadeUp(0.3)}
              className="mx-auto mt-4 max-w-xl text-xl text-white"
            >
              {subtitle}
            </motion.p>
          </div>
        </section>
 
      </div>
    )
  }
  