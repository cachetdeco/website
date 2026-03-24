import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import general from "../content/settings/general.json";

export default function Header({
  navigation,
  ctaLabel,
  ctaHref,
}: {
  navigation: { name: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <nav
        aria-label="Global"
        className="flex items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a
            href="/"
            className="flex items-center bg-[white] rounded-3xl shadow-md 
    ps-0.5 pe-2 pt-1 pb-0.5
    md:ps-1 md:pe-3 md:pt-2 md:pb-1
    
    "
          >
            <div className="p-1 bg-[white] rounded-full ">
              <span className="sr-only">{general.siteName}</span>
              <img
                alt={general.siteName}
                src="/images/logo.png"
                className="h-10 w-auto"
              />
            </div>

            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-600 uppercase">
              {general.brandName}
            </p>
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
            href={ctaHref}
            className="rounded-md bg-[var(--color-brand-600)] px-4 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)] transition-colors"
          >
            {ctaLabel}
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
            <a
              href="/"
              className="flex sm:hidden lg:flex  items-center bg-[white] rounded-3xl 
    ps-0.5 pe-2 pt-1 pb-0.5
    md:ps-1 md:pe-3 md:pt-2 md:pb-1
    
    "
            >
              <div className="p-1 bg-[white] rounded-full ">
                <span className="sr-only">{general.siteName}</span>
                <img
                  alt={general.siteName}
                  src="/images/logo.png"
                  className="h-10 w-auto"
                />
              </div>

              <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-brand-600 uppercase">
                {general.brandName}
              </p>
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
                  href={ctaHref}
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-center bg-[var(--color-brand-600)] text-white ring-1 ring-inset ring-[var(--color-brand-600)] hover:bg-[var(--color-brand-700)]"
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
