export default function WithImageTiles() {
  return (
    <div className="overflow-hidden py-32" style={{ backgroundColor: 'var(--color-brand-600)' }}>
      <div className="mx-auto max-w-7xl px-6 lg:flex lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 lg:mx-0 lg:max-w-none lg:min-w-full lg:flex-none lg:gap-y-8">
          <div className="lg:col-end-1 lg:w-full lg:max-w-lg lg:pb-8">
            <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              Prêt à transformer votre espace?
            </h2>
            <p className="mt-6 text-xl/8 text-green-100">
              Obtenez une soumission gratuite et sans engagement dès aujourd'hui.
            </p>
            <p className="mt-6 text-base/7 text-green-200">
              Peintres décorateurs professionnels à Laval et sur la Rive-Nord. Peinture résidentielle et commerciale,
              décoration intérieure et extérieure.
            </p>
            <div className="mt-10 flex">
              <a
                href="/soumission"
                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2"
                style={{ color: 'var(--color-brand-600)' }}
              >
                Demandez votre soumission
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="flex flex-wrap items-start justify-end gap-6 sm:gap-8 lg:contents">
            <div className="w-0 flex-auto lg:ml-auto lg:w-auto lg:flex-none lg:self-end">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1670272502246-768d249768ca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&q=80"
                className="aspect-7/5 w-148 max-w-none rounded-2xl object-cover max-sm:w-120" style={{ backgroundColor: 'var(--color-brand-700)' }}
              />
            </div>
            <div className="contents lg:col-span-2 lg:col-end-2 lg:ml-auto lg:flex lg:w-148 lg:items-start lg:justify-end lg:gap-x-8">
              <div className="order-first flex w-64 flex-none justify-end self-end max-sm:w-40 lg:w-auto">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1605656816944-971cd5c1407f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                  className="aspect-4/3 w-[24rem] max-w-none flex-none rounded-2xl object-cover" style={{ backgroundColor: 'var(--color-brand-700)' }}
                />
              </div>
              <div className="flex w-96 flex-auto justify-end lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1568992687947-868a62a9f521?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1152&h=842&q=80"
                  className="aspect-7/5 w-148 max-w-none flex-none rounded-2xl object-cover max-sm:w-120" style={{ backgroundColor: 'var(--color-brand-700)' }}
                />
              </div>
              <div className="hidden sm:block sm:w-0 sm:flex-auto lg:w-auto lg:flex-none">
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&h=604&q=80"
                  className="aspect-4/3 w-[24rem] max-w-none rounded-2xl object-cover" style={{ backgroundColor: 'var(--color-brand-700)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
