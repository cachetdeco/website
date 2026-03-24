export interface Feature {
  name: string
  description: string
  imageSrc: string
  imageAlt: string
}

interface WithAlternatingSectionsProps {
  features: Feature[]
  title?: string
  subtitle?: string
}

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export default function WithAlternatingSections({
  features,
  title = 'Nos services',
  subtitle = 'Des solutions complètes en peinture et décoration pour transformer vos espaces.',
}: WithAlternatingSectionsProps) {
  return (
    <div className="bg-brand-light text-brand-600">
      <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-brand-600 sm:text-5xl">{title}</h2>
          <p className="mt-4 text-lg text-brand-500">{subtitle}</p>
        </div>

        <div className="mt-16 space-y-16">
          {features.map((feature, featureIdx) => (
            <div
              key={feature.name}
              className="flex flex-col-reverse lg:grid lg:grid-cols-12 lg:items-center lg:gap-x-8"
            >
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-1' : 'lg:col-start-8 xl:col-start-9',
                  'mt-6 lg:col-span-5 lg:row-start-1 lg:mt-0 xl:col-span-4',
                )}
              >
                <h3 className="text-4xl font-semibold tracking-tight text-brand-600">{feature.name}</h3>
                <p className="mt-2 text-base text-brand-800">{feature.description}</p>
              </div>
              <div
                className={classNames(
                  featureIdx % 2 === 0 ? 'lg:col-start-6 xl:col-start-5' : 'lg:col-start-1',
                  'flex-auto lg:col-span-7 lg:row-start-1 xl:col-span-8',
                )}
              >
                <img
                  alt={feature.imageAlt}
                  src={feature.imageSrc}
                  className="aspect-3/2 w-full rounded-lg bg-gray-100 object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
