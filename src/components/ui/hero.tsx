import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import general from "../../content/settings/general.json";
import photo1 from "@/assets/photos/empty-room-blue-wall-with-moulding-and-parquet-fl-2023-11-27-04-52-31-utc.webp";
import photo2 from "@/assets/photos/the-attic-of-a-home-with-white-ceilings-and-white-2023-11-27-05-27-44-utc.webp";
import photo3 from "@/assets/photos/silver-and-white-apartment-interior-2023-11-27-05-32-03-utc.webp";
import photo4 from "@/assets/photos/a-bedroom-with-white-walls-and-a-bed-and-a-2023-11-27-05-25-30-utc.webp";
import photo5 from "@/assets/photos/empty-room-with-window-2023-11-27-05-08-12-utc.webp";
import logo from "@/assets/cachet-hero-logo.svg";

export type HeroContent = {
  title: string;
  title2: string;
  subtitle: string;
  cta: string;
  ctaHref: string;
};

const slides = [
  { src: photo1.src, alt: "Peinture intérieure" },
  { src: photo2.src, alt: "Décoration murale" },
  { src: photo3.src, alt: "Finition de qualité" },
  { src: photo4.src, alt: "Chambre" },
  { src: photo5.src, alt: "Pièce lumineuse" },
];

const autoplayPlugin = Autoplay({
  delay: 4000,
  stopOnInteraction: false,
  stopOnMouseEnter: false,
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
            {/* <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex flex-wrap items-center justify-center gap-2 gap-x-3.5 rounded-full px-4 py-2 text-sm/6 text-gray-300 ring-1 ring-white/20">
                <span>RBQ {general.rbq}</span>
                <span className="text-white/30" aria-hidden>
                  ·
                </span>
                <span>{general.serviceArea}</span>
                <span className="text-white/30" aria-hidden>
                  ·
                </span>
                <span>{pillCta}</span>
              </div>
            </div> */}
            {/* <h1
              className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title}
            </h1>
            <h2
              className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-6xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {title2}
            </h2> */}
            <img src={logo.src} alt={general.siteName} className="w-full h-auto" />
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
              {subtitle}
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a
                href={ctaHref}
                className="rounded-md bg-[var(--color-brand-600)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-600)]"
              >
                {cta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
