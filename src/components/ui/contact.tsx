import { BuildingOffice2Icon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

interface Props {
  phoneLabel: string
  phoneValue: string
  emailLabel: string
  emailValue: string
  addressLabel: string
  addressValue: string
  serviceAreaLabel: string
  serviceArea: string
  firstNameLabel?: string
  lastNameLabel?: string
  emailFieldLabel?: string
  phoneFieldLabel?: string
  messageLabel?: string
  submitLabel?: string
}

export default function Contact({
  phoneLabel,
  phoneValue,
  emailLabel,
  emailValue,
  addressLabel,
  addressValue,
  serviceAreaLabel,
  serviceArea,
  firstNameLabel = 'Prénom',
  lastNameLabel = 'Nom',
  emailFieldLabel = 'Courriel',
  phoneFieldLabel = 'Téléphone',
  messageLabel = 'Message',
  submitLabel = 'Envoyer',
}: Props) {
  const inputClass =
    'block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-dark outline-1 -outline-offset-1 outline-brand-200 placeholder:text-brand-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-brand-400 dark:focus:outline-brand-500'
  const labelClass = 'block text-sm/6 font-semibold text-brand-dark dark:text-white'

  return (
    <div className="relative isolate bg-white dark:bg-brand-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <div className="relative px-6 pt-12 pb-20 lg:static">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-brand-50 ring-1 ring-brand-900/10 lg:w-1/2 dark:bg-brand-900 dark:ring-white/10">
              <svg
                aria-hidden="true"
                className="absolute inset-0 size-full mask-[radial-gradient(100%_100%_at_top_right,white,transparent)] stroke-brand-200 dark:stroke-white/10"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" strokeWidth={0} className="fill-white dark:fill-brand-900" />
                <svg x="100%" y={-1} className="overflow-visible fill-brand-50 dark:fill-brand-800/20">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)" width="100%" height="100%" strokeWidth={0} />
              </svg>
              <div
                aria-hidden="true"
                className="absolute top-[calc(100%-13rem)] -left-56 hidden transform-gpu blur-3xl lg:top-[calc(50%-7rem)] lg:left-[max(-14rem,calc(100%-59rem))] dark:block"
              >
                <div
                  style={{
                    clipPath:
                      'polygon(74.1% 56.1%, 100% 38.6%, 97.5% 73.3%, 85.5% 100%, 80.7% 98.2%, 72.5% 67.7%, 60.2% 37.8%, 52.4% 32.2%, 47.5% 41.9%, 45.2% 65.8%, 27.5% 23.5%, 0.1% 35.4%, 17.9% 0.1%, 27.6% 23.5%, 76.1% 2.6%, 74.1% 56.1%)',
                  }}
                  className="aspect-1155/678 w-288.75 bg-linear-to-br from-brand-300 to-brand-600 opacity-10 dark:opacity-20"
                />
              </div>
            </div>
            <dl className="mt-10 space-y-4 text-base/7 text-brand-700 dark:text-brand-100">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{addressLabel}</span>
                  <BuildingOffice2Icon aria-hidden="true" className="h-7 w-6 text-brand-400" />
                </dt>
                <dd>
                  {addressValue}
                  <br />
                  <span className="text-sm text-brand-500">{serviceAreaLabel} {serviceArea}</span>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{phoneLabel}</span>
                  <PhoneIcon aria-hidden="true" className="h-7 w-6 text-brand-400" />
                </dt>
                <dd>
                  <a href={`tel:${phoneValue.replace(/\D/g, '')}`} className="hover:text-brand-dark dark:hover:text-white">
                    {phoneValue}
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{emailLabel}</span>
                  <EnvelopeIcon aria-hidden="true" className="h-7 w-6 text-brand-400" />
                </dt>
                <dd>
                  <a href={`mailto:${emailValue}`} className="hover:text-brand-dark dark:hover:text-white">
                    {emailValue}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form action="#" method="POST" className="px-6 pt-12 pb-20">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className={labelClass}>{firstNameLabel}</label>
                <div className="mt-2.5">
                  <input id="first-name" name="first-name" type="text" autoComplete="given-name" className={inputClass} />
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className={labelClass}>{lastNameLabel}</label>
                <div className="mt-2.5">
                  <input id="last-name" name="last-name" type="text" autoComplete="family-name" className={inputClass} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelClass}>{emailFieldLabel}</label>
                <div className="mt-2.5">
                  <input id="email" name="email" type="email" autoComplete="email" className={inputClass} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className={labelClass}>{phoneFieldLabel}</label>
                <div className="mt-2.5">
                  <input id="phone-number" name="phone-number" type="tel" autoComplete="tel" className={inputClass} />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>{messageLabel}</label>
                <div className="mt-2.5">
                  <textarea id="message" name="message" rows={4} className={inputClass} defaultValue={''} />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-brand-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:outline-brand-500"
              >
                {submitLabel}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
