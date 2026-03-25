import { BuildingOffice2Icon, CheckCircleIcon, EnvelopeIcon, ExclamationTriangleIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
  firstNamePlaceholder?: string
  lastNamePlaceholder?: string
  emailPlaceholder?: string
  phonePlaceholder?: string
  messagePlaceholder?: string
  submitLabel?: string
}

interface ContactFields {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
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
  firstNamePlaceholder = 'Jean',
  lastNamePlaceholder = 'Tremblay',
  emailPlaceholder = 'nom@exemple.com',
  phonePlaceholder = '(514) 555-1234',
  messagePlaceholder = 'Décrivez votre projet...',
  submitLabel = 'Envoyer',
}: Props) {
  const inputClass =
    'block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-dark outline-1 -outline-offset-1 outline-brand-200 placeholder:text-brand-400 focus:outline-2 focus:-outline-offset-2 focus:outline-brand-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-brand-400 dark:focus:outline-brand-500'
  const inputErrorClass =
    'block w-full rounded-md bg-white px-3.5 py-2 text-base text-brand-dark outline-1 -outline-offset-1 outline-red-400 placeholder:text-brand-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-500 dark:bg-white/5 dark:text-white dark:outline-red-500/50 dark:placeholder:text-brand-400'
  const labelClass = 'block text-sm/6 font-semibold text-brand-dark dark:text-white'

  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFields>({ mode: "onTouched" })

  async function onSubmit(data: ContactFields) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSubmitStatus(res.ok ? "success" : "error")
    } catch {
      setSubmitStatus("error")
    }
  }

  const fadeUp = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { amount: 0.35, once: false },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const, delay },
  })

  const slideIn = (direction: "left" | "right", delay: number) => ({
    initial: { opacity: 0, x: direction === "left" ? -44 : 44 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { amount: 0.25, once: false },
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const, delay },
  })

  return (
    <div className="relative isolate bg-brand-50/50 dark:bg-brand-900">
      <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2">
        <motion.div {...slideIn("left", 0.05)} className="relative px-6 pt-12 pb-20 lg:static">
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
            <motion.dl {...fadeUp(0.1)} className="mt-10 space-y-4 text-base/7 text-brand-700 dark:text-brand-100">
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
            </motion.dl>
          </div>
        </motion.div>
        <motion.div {...slideIn("right", 0.1)} className="px-6 pt-12 pb-20">
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
          {submitStatus === "success" ? (
            <motion.div {...fadeUp(0.05)} className="mt-8 flex flex-col items-center gap-4 rounded-2xl bg-green-50 p-10 text-center ring-1 ring-green-200 dark:bg-green-900/20 dark:ring-green-500/30">
              <CheckCircleIcon className="h-12 w-12 text-green-500" />
              <h3 className="text-xl font-semibold text-green-800 dark:text-green-300">Message envoyé !</h3>
              <p className="text-green-700 dark:text-green-400">Merci pour votre message. Nous vous répondrons dans les plus brefs délais.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-0">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className={labelClass}>{firstNameLabel}</label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    type="text"
                    autoComplete="given-name"
                    placeholder={firstNamePlaceholder}
                    className={errors.firstName ? inputErrorClass : inputClass}
                    {...register("firstName", { required: "Veuillez entrer votre prénom." })}
                  />
                  {errors.firstName && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.firstName.message}</p>}
                </div>
              </div>
              <div>
                <label htmlFor="last-name" className={labelClass}>{lastNameLabel}</label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    type="text"
                    autoComplete="family-name"
                    placeholder={lastNamePlaceholder}
                    className={errors.lastName ? inputErrorClass : inputClass}
                    {...register("lastName", { required: "Veuillez entrer votre nom." })}
                  />
                  {errors.lastName && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.lastName.message}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="email" className={labelClass}>{emailFieldLabel}</label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder={emailPlaceholder}
                    className={errors.email ? inputErrorClass : inputClass}
                    {...register("email", {
                      required: "Veuillez entrer votre courriel.",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Veuillez entrer un courriel valide." },
                    })}
                  />
                  {errors.email && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="phone-number" className={labelClass}>{phoneFieldLabel}</label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    type="tel"
                    autoComplete="tel"
                    placeholder={phonePlaceholder}
                    className={errors.phone ? inputErrorClass : inputClass}
                    {...register("phone", { required: "Veuillez entrer votre numéro de téléphone." })}
                  />
                  {errors.phone && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>}
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="message" className={labelClass}>{messageLabel}</label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    rows={4}
                    placeholder={messagePlaceholder}
                    className={errors.message ? inputErrorClass : inputClass}
                    defaultValue={''}
                    {...register("message", { required: "Veuillez écrire votre message." })}
                  />
                  {errors.message && <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">{errors.message.message}</p>}
                </div>
              </div>
            </div>
            {submitStatus === "error" && (
              <motion.div {...fadeUp(0)} className="mb-6 flex gap-x-3 rounded-lg bg-red-50 p-4 ring-1 ring-red-200 dark:bg-red-900/20 dark:ring-red-500/30 mt-4">
                <ExclamationTriangleIcon className="h-5 w-5 shrink-0 text-red-500" />
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-300">Une erreur est survenue</p>
                  <p className="text-sm text-red-700 dark:text-red-400">Veuillez réessayer ou nous contacter directement par téléphone.</p>
                </div>
              </motion.div>
            )}
            <div className="mt-8 flex justify-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
                transition={{ type: "spring" as const, stiffness: 400, damping: 25 }}
                disabled={isSubmitting}
                className="rounded-md bg-brand-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-brand-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:opacity-60 dark:bg-brand-500 dark:hover:bg-brand-400 dark:focus-visible:outline-brand-500"
              >
                {isSubmitting ? 'Envoi en cours...' : submitLabel}
              </motion.button>
            </div>
            </form>
          )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
