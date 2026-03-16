import imgInterieure from '@/assets/photos/empty-room-blue-wall-with-moulding-and-parquet-fl-2023-11-27-04-52-31-utc.webp'
import imgExterieure from '@/assets/Website Content/Photos/wooden-deck-with-sky-2023-11-27-05-29-44-utc.webp'
import imgDecoration from '@/assets/Website Content/Photos/Mural_Jerkspot_02.jpg'
import imgCommerciale from '@/assets/Website Content/Photos/minimalist-bright-office-room-interior-design-mee-2023-11-27-05-17-04-utc.webp'
import imgRenovation from '@/assets/Website Content/Photos/amazing-design-of-a-room-with-doors-and-parquet-fl-2023-11-27-05-33-04-utc.webp'

export default function TwoRowBentoGridWithThreeColumnSecondRow() {
  return (
    <div className="bg-[var(--color-brand-600)] py-24 sm:py-32">
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">
        <h2
          className="text-base/7 font-semibold text-white"
          style={{ fontFamily: 'var(--font-body)' }}
        >
          Nos Services
        </h2>
        <p
          className="mt-2 max-w-lg text-4xl font-semibold tracking-tight text-pretty text-white sm:text-5xl"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          Des solutions complètes en peinture et décoration
        </p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">

          {/* Peinture intérieure — top left */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-xl bg-white max-lg:rounded-t-xl lg:rounded-tl-xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl max-lg:rounded-t-xl lg:rounded-tl-xl">
              <img
                alt="Peinture intérieure résidentielle"
                src={imgInterieure.src}
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-[var(--color-brand-500)]">Résidentiel</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Peinture intérieure
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Transformation complète de vos espaces intérieurs. Préparation des surfaces, application soignée et finitions impeccables pour tous types de pièces.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-sm outline outline-black/5 max-lg:rounded-t-xl lg:rounded-tl-xl" />
          </div>

          {/* Peinture extérieure — top right */}
          <div className="relative lg:col-span-3">
            <div className="absolute inset-0 rounded-xl bg-white lg:rounded-tr-xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl lg:rounded-tr-xl">
              <img
                alt="Peinture extérieure résidentielle"
                src={imgExterieure.src}
                className="h-80 object-cover object-left lg:object-right"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-[var(--color-brand-500)]">Résidentiel</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Peinture extérieure
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Protection et embellissement de la façade de votre maison. Travaux résistants aux conditions climatiques du Québec pour une durabilité maximale.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-sm outline outline-black/5 lg:rounded-tr-xl" />
          </div>

          {/* Décoration intérieure — bottom left */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-xl bg-white lg:rounded-bl-xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl lg:rounded-bl-xl">
              <img
                alt="Décoration intérieure"
                src={imgDecoration.src}
                className="h-80 object-cover object-left"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-[var(--color-brand-500)]">Résidentiel</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Décoration intérieure
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Conseils personnalisés en couleur et décoration. Effets décoratifs, murales, textures et finitions spécialisées.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-sm outline outline-black/5 lg:rounded-bl-xl" />
          </div>

          {/* Peinture commerciale — bottom center */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-xl bg-white" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl">
              <img
                alt="Peinture commerciale"
                src={imgCommerciale.src}
                className="h-80 object-cover"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-[var(--color-brand-500)]">Commercial</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Peinture commerciale
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Bureaux, commerces et espaces institutionnels. Travaux planifiés selon votre calendrier pour minimiser les perturbations.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-sm outline outline-black/5" />
          </div>

          {/* Rénovation complète — bottom right */}
          <div className="relative lg:col-span-2">
            <div className="absolute inset-0 rounded-xl bg-white max-lg:rounded-b-xl lg:rounded-br-xl" />
            <div className="relative flex h-full flex-col overflow-hidden rounded-xl max-lg:rounded-b-xl lg:rounded-br-xl">
              <img
                alt="Rénovation complète"
                src={imgRenovation.src}
                className="h-80 object-cover"
              />
              <div className="p-10 pt-4">
                <h3 className="text-sm/4 font-semibold text-[var(--color-brand-500)]">Résidentiel</h3>
                <p className="mt-2 text-lg font-medium tracking-tight text-gray-950">
                  Rénovation complète
                </p>
                <p className="mt-2 max-w-lg text-sm/6 text-gray-600">
                  Coordination complète de vos travaux de finition. De la peinture aux moulures, un seul entrepreneur pour tous vos projets.
                </p>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 rounded-xl shadow-sm outline outline-black/5 max-lg:rounded-b-xl lg:rounded-br-xl" />
          </div>

        </div>
      </div>
    </div>
  )
}
