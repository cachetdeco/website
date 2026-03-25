import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "motion/react";
import Autoplay from "embla-carousel-autoplay";
import general from "@/content/settings/general.json";

export type HeroContent = {
  title: string;
  title2: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
};

const logo = {
  src: '/images/logo-text.svg',
  alt: 'Cachet Peintres Décorateurs',
}

const slides = [
  { src: '/images/carrousel-1.webp', alt: "Peinture intérieure" },
  { src: '/images/carrousel-2.webp', alt: "Décoration murale" },
  { src: '/images/carrousel-3.webp', alt: "Finition de qualité" },
  { src: '/images/carrousel-4.webp', alt: "Chambre" },
  { src: '/images/carrousel-5.webp', alt: "Pièce lumineuse" },
];

const autoplayPlugin = Autoplay({
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: false,
});

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

export default function Hero({ content }: { content: HeroContent }) {
  const { subtitle, cta, ctaHref } = content;

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="relative isolate overflow-hidden h-screen min-h-[600px]">
        <Carousel
          className="absolute inset-0 -z-10 size-full [&_[data-slot='carousel-content']]:h-full"
          opts={{ loop: true, dragFree: false }}
          plugins={[autoplayPlugin]}
        >
          <CarouselContent className="-ml-0 h-full">
            {slides.map((slide, index) => (
              <CarouselItem key={index} className="pl-0 h-full relative">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="size-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-center pt-14">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div {...fadeUp(0.2)}>
              <img
                src={logo.src}
                alt={general.siteName}
                className="w-full h-auto"
              />
            </motion.div>
            <motion.p
              {...fadeUp(0.45)}
              className="p-4 mt-8 text-lg font-medium text-pretty text-white sm:text-xl/8 lg:text-2xl/8"
            >
              {subtitle}
            </motion.p>

            <div
              {...fadeUp(0.65)}
              
              className="mt-10 flex items-center justify-center"
            >
              <motion.a
              whileHover={{ scale: 1.075, transition: { duration: 0.1 } }}
              transition={{ type: "spring", stiffness: 400, damping: 25, }}
                href={ctaHref}
                className="rounded-md bg-[var(--color-brand-600)] px-3.5 py-2.5 text-lg font-light text-white shadow-xs hover:bg-[var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-600)]"
              >
                {cta}
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
