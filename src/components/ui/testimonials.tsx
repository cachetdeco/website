interface TestimonialItem {
  key: string;
  src: string;
  height: number;
}

interface Props {
  sectionLabel: string;
  title: string;
  items: TestimonialItem[];
}

const iframeProps = {
  width: 500,
  scrolling: 'no',
  frameBorder: 0,
  allowFullScreen: true,
  allow: 'autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share',
  style: { border: 'none', overflow: 'hidden' } as React.CSSProperties,
  className: 'w-full rounded-2xl',
}

export default function Grid({ sectionLabel, title, items }: Props) {
  const [featured, ...rest] = items
  const groups = [rest.slice(0, 2), rest.slice(2)]

  return (
    <div className="relative isolate bg-brand-50 pt-24 pb-32 sm:pt-32 dark:bg-brand-50">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="ml-[max(50%,38rem)] aspect-1313/771 w-328.25 bg-linear-to-tr from-[var(--color-brand-50)] to-[var(--color-brand-200)]"
        />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="-ml-88 aspect-1313/771 w-328.25 flex-none origin-top-right rotate-30 bg-linear-to-tr from-[var(--color-brand-200)] to-[var(--color-brand-50)] xl:mr-[calc(50%-12rem)] xl:ml-0"
        />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base/7 font-semibold text-brand-400 dark:text-brand-400">{sectionLabel}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-brand-600 sm:text-5xl dark:text-white">
            {title}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4 dark:text-gray-100">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10">
            <iframe {...iframeProps} src={featured.src} height={featured.height} />
          </figure>
          {groups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-8 xl:contents xl:space-y-0">
              {group.map((t, colIdx) => {
                const isFirstCol = groupIdx === 0 && colIdx === 0
                const isLastCol = groupIdx === groups.length - 1 && colIdx === group.length - 1
                return (
                  <div
                    key={t.key}
                    className={(isFirstCol || isLastCol) ? 'xl:row-span-2 space-y-8' : 'xl:row-start-1 space-y-8'}
                  >
                    <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10">
                      <iframe {...iframeProps} src={t.src} height={t.height} />
                    </figure>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
