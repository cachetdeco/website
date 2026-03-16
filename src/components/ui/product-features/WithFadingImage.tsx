import imgBg from '@/assets/Website Content/Photos/choosing-wall-paints-2023-11-27-05-09-01-utc.webp'

const features = [
  {
    name: 'Certifié RBQ',
    description: 'Entrepreneur certifié par la Régie du Bâtiment du Québec (RBQ : 5839 8736 01). Travaux assurés et conformes aux normes.',
  },
  {
    name: 'Ponctualité et fiabilité',
    description: 'Nous respectons nos engagements. Les délais sont tenus et votre projet est livré à temps, selon les standards convenus.',
  },
  {
    name: 'Matériaux de qualité',
    description: 'Nous utilisons exclusivement des peintures et produits de première qualité pour un résultat durable et esthétique.',
  },
  {
    name: 'Équipe professionnelle',
    description: 'Nos peintres décorateurs sont formés et expérimentés. Chaque détail compte pour nous, de la préparation à la finition.',
  },
]

export default function WithFadingImage() {
  return (
    <div className="bg-[linear-gradient(to_bottom,white_0%,white_75%,var(--color-brand-50)_100%)]">
      <div aria-hidden="true" className="relative">
        <img
          alt="Peintres décorateurs au travail"
          src={imgBg.src}
          className="h-96 w-full object-cover object-center "
        />
        <div className="absolute inset-0 bg-linear-to-t from-white" />
      </div>

      <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-16 sm:px-6 sm:pb-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
          <h2
            className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Pourquoi choisir Cachet?
          </h2>
          <p className="mt-4 text-gray-500" style={{ fontFamily: 'var(--font-body)' }}>
            Une expertise reconnue au service de votre satisfaction
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:max-w-none lg:grid-cols-4 lg:gap-x-8">
          {features.map((feature) => (
            <div key={feature.name} className="border-t-2 border-[var(--color-brand-500)] pt-4">
              <dt
                className="font-semibold text-[var(--color-gray-600)]"
                style={{ fontFamily: 'var(--font-body)' }}
              >
                {feature.name}
              </dt>
              <dd className="mt-2 text-sm text-gray-500 leading-relaxed">{feature.description}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}
