import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { defaultLocale } from "../../../i18n/config";
import { t } from "../../../i18n/utils";
import general from "../../../content/settings/general.json";
import photo1 from "@/assets/photos/empty-room-blue-wall-with-moulding-and-parquet-fl-2023-11-27-04-52-31-utc.webp";
import photo2 from "@/assets/photos/the-attic-of-a-home-with-white-ceilings-and-white-2023-11-27-05-27-44-utc.webp";
import photo3 from "@/assets/photos/silver-and-white-apartment-interior-2023-11-27-05-32-03-utc.webp";
import photo4 from "@/assets/photos/a-bedroom-with-white-walls-and-a-bed-and-a-2023-11-27-05-25-30-utc.webp";
import photo5 from "@/assets/photos/empty-room-with-window-2023-11-27-05-08-12-utc.webp";

const navigation = [
    { name: "Landing 1", href: "/landing-1" },
    { name: "Landing 2", href: "/landing-2" },
    { name: "Landing 3", href: "/landing-3" },

];

const slides = [
  { src: photo1.src, alt: "Peinture intérieure" },
  { src: photo2.src, alt: "Décoration murale" },
  { src: photo3.src, alt: "Finition de qualité" },
  { src: photo4.src, alt: "Chambre" },
  { src: photo5.src, alt: "Pièce lumineuse" },
];

const autoplayPlugin = Autoplay({
  delay: 5000,
  stopOnInteraction: false,
  stopOnMouseEnter: false,
});

export default function SimpleCenteredWithImageSlider() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50">
        <nav
          aria-label="Global"
          className="flex items-center justify-between p-6 lg:px-8"
        >
          <div className="flex lg:flex-1">
            <a href="/" className="flex items-center bg-[white] rounded-3xl shadow-md 
            ps-0.5 pe-2 pt-1 pb-0.5
            md:ps-1 md:pe-3 md:pt-2 md:pb-1
            
            ">
              <div className="p-1 bg-[white] rounded-full ">
              <span className="sr-only">Cachet Peintres Décorateurs</span>
              <img
                alt="Cachet Peintres Décorateurs"
                src="/images/logo.png"
                className="h-10 w-auto"
              />
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-600 uppercase">{general.brandName}</p>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-[var(--color-brand-100)] hover:text-[var(--color-brand-300)]"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm/6 font-semibold text-white hover:underline underline-offset-4 decoration-2 drop-shadow"
              >
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/soumission"
              className="rounded-md bg-[var(--color-brand-600)] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] transition-colors"
            >
              Soumission gratuite
            </a>
          </div>
        </nav>
        <Dialog
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
          className="lg:hidden"
        >
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between sm:justify-end lg:justify-between">
              <a href="/" className="flex sm:hidden lg:flex  items-center bg-[white] rounded-3xl 
            ps-0.5 pe-2 pt-1 pb-0.5
            md:ps-1 md:pe-3 md:pt-2 md:pb-1
            
            ">
              <div className="p-1 bg-[white] rounded-full ">
              <span className="sr-only">Cachet Peintres Décorateurs</span>
              <img
                alt="Cachet Peintres Décorateurs"
                src="/images/logo.png"
                className="h-10 w-auto"
              />
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-600 uppercase">{general.brandName}</p>
            </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="size-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10 dark:divide-gray-500/25">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50 dark:text-white dark:hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="/soumission"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-center bg-[var(--color-brand-600)] text-white ring-1 ring-inset ring-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)]"
                  >
                    Soumission gratuite
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>

      {/* Full-screen hero with background carousel */}
      <div className="relative isolate overflow-hidden h-screen min-h-[600px]">
        {/* Background carousel */}
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
                {/* Dark overlay for text legibility */}
                <div className="absolute inset-0 bg-black/50" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Hero text content */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 h-full flex items-center justify-center pt-14">
          <div className="mx-auto max-w-2xl text-center">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="flex flex-wrap items-center justify-center gap-2 gap-x-3.5 rounded-full px-4 py-2 text-sm/6 text-gray-300 ring-1 ring-white/20">
                <span>RBQ {general.rbq}</span>
                <span className="text-white/30" aria-hidden>·</span>
                <span>{general.serviceArea}</span>
                <span className="text-white/30" aria-hidden>·</span>
                <span>Soumission gratuite</span>
              </div>
            </div>
            <h1
              className="text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {t(defaultLocale, "hero.title")}
            </h1>
            <p className="mt-8 text-lg font-medium text-pretty text-gray-300 sm:text-xl/8">
              {t(defaultLocale, "hero.subtitle")}
            </p>
            <div className="mt-10 flex items-center justify-center">
              <a
                href="/soumission"
                className="rounded-md bg-[var(--color-brand-600)] px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-[var(--color-brand-700)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand-600)]"
              >
                {t(defaultLocale, "hero.cta")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
