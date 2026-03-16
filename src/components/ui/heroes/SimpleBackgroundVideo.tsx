import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import heroVideoMp4 from '@/assets/videos/cachet-deco.mp4'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { defaultLocale } from '../../../i18n/config'
import { t } from '../../../i18n/utils'
import general from '../../../content/settings/general.json'

const navigation = [
  { name: 'Landing 1', href: '/landing-1' },
  { name: 'Landing 2', href: '/landing-2' },
  { name: 'Landing 3', href: '/landing-3' },
]

export default function SimpleCenteredWithBackgroundImage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-white dark:bg-gray-900">
      <header className="absolute inset-x-0 top-0 z-50 bg-[var(--color-brand-600)]">
        <nav aria-label="Global" className="flex items-center justify-between p-2 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1 m-1 bg-[white] rounded-full">
              <span className="sr-only">Cachet Peintres Décorateurs</span>
              <img
                alt="Cachet Peintres Décorateurs"
                src="/images/logo.png"
                className="h-10 w-auto"
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white hover:underline underline-offset-4 decoration-2">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="/soumission"
              className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-[var(--color-brand-600)] shadow-sm ring-1 ring-inset ring-white/30 hover:bg-white/90 transition-colors"
            >
              Soumission gratuite
            </a>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 dark:bg-gray-900 dark:sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="/" className="-m-1.5 p-1.5 block sm:hidden">
                <span className="sr-only">Cachet Peintres Décorateurs</span>
                <img
                  alt="Cachet Peintres Décorateurs"
                  src="/images/logo.png"
                  className="h-10 w-auto"
                />
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

      <div className="relative isolate min-h-screen overflow-hidden pt-14">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 -z-10 size-full object-cover"
        >
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 -z-10 bg-black/50" />
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 items-center gap-12 py-20 lg:grid-cols-[1fr_auto] lg:gap-12 lg:py-24">
            <div>
              <p className="mb-4 inline-block text-sm font-bold uppercase tracking-wider text-white/65">
                {general.tagline}
              </p>
              <h1 className="mb-5 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-[2.5rem]" style={{ fontFamily: 'var(--font-display)' }}>
                {t(defaultLocale, 'hero.title')}
              </h1>
              <p className="mb-9 max-w-[540px] text-xl leading-relaxed text-white/82">
                {t(defaultLocale, 'hero.subtitle')}
              </p>
              <div className="mb-8 flex flex-wrap gap-4">
                <a
                  href="/soumission"
                  className="inline-flex items-center gap-2 rounded-md bg-white px-8 py-3.5 text-lg font-semibold text-[var(--color-brand-600)] transition-colors hover:bg-[var(--color-brand-50)]"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>
                  {t(defaultLocale, 'hero.cta')}
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center gap-2 rounded-md border-2 border-white px-6 py-3 text-base font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {t(defaultLocale, 'cta.learn_more')}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12,5 19,12 12,19" />
                  </svg>
                </a>
              </div>
              <div className="flex flex-wrap items-center gap-2 gap-x-3.5 text-sm text-white/65">
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                  <span>RBQ {general.rbq}</span>
                </div>
                <span className="text-white/30" aria-hidden>·</span>
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  <span>{general.serviceArea}</span>
                </div>
                <span className="text-white/30" aria-hidden>·</span>
                <div className="flex items-center gap-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span>Soumission gratuite</span>
                </div>
              </div>
            </div>
            <div className="hidden items-center justify-center lg:flex" aria-hidden>
              <img
                src="/images/logo.png"
                alt=""
                width={320}
                height={320}
                loading="eager"
                className="h-[280px] w-[280px] object-contain opacity-[0.18] brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
