const featuredTestimonial = {
  body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
  author: {
    name: 'Brenna Goyette',
    handle: 'brennagoyette',
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=1024&h=1024&q=80',
    logoUrl: 'https://tailwindcss.com/plus-assets/img/logos/savvycal-logo-gray-900.svg',
  },
}
const testimonials = [
  [
    [
      {
        iframe: <iframe className="w-full h-full rounded-2xl " src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fjean.christophe.ali.2025%2Fposts%2Fpfbid02qsqq2Rn4vRx1gCG3q5e5M2ByPXH6zMux59fWvotfsQxpuWyUh46TZuwCND9iKpwnl&show_text=true&width=500" width="500" height="194" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>,
        key: 'jean-christophe-ali',
      }
    ],
    [{
      iframe: <iframe className="w-full h-full rounded-2xl " src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fcharlotte.lafrance.CL%2Fposts%2Fpfbid026Jw7aer2r84q27kgcZ1PKg8q2sqKgZc6nJspP42CTEAU6ac8FF4Ptj8ap8XGh6Wl&show_text=true&width=500" width="500" height="166" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>,
        key: 'charlotte-lafrance',
      }
    ],
  ],
  [
    [{
      iframe: <iframe className="w-full h-full rounded-2xl " src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fcolin.griffin.165%2Fposts%2Fpfbid0iCA6hoF5X32gUJSBcDUiXP2hxhxzMmEiC5Att3CDDwFckrHa7yxyGiLBmXQhQBUFl&show_text=true&width=500" width="500" height="222" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe> ,
        key: 'colin-griffin',
      }
    ],
    [ {
      iframe: <iframe className="w-full h-full rounded-2xl" src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fhollowman.la.rock%2Fposts%2Fpfbid0hPR3RpaSLZtZkgpaEzKsNKAF4hUeKbDzkicAZ9jsbCpXKRRsYD63C32rw78uvRoml&show_text=true&width=500" width="500" height="170" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>,
        key: 'hollowman-la-rock',
      }
      ],
  ],
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function Grid() {
  return (
    <div className="relative isolate bg-brand-50 pt-24 pb-32 sm:pt-32 dark:bg-gray-900">
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
          <h2 className="text-base/7 font-semibold text-brand-400 dark:text-brand-400">Témoignages</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-balance text-brand-600 sm:text-5xl dark:text-white">
           Ce que nos clients disent de nous
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm/6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4 dark:text-gray-100">
          <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10">
            <iframe className="w-full h-full rounded-2xl " src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsylvie.gauthier.73594%2Fposts%2Fpfbid0DHM1833TLKru4cbkTnZq3KLNHrSR8B8rQAgGosGzAbpGMccvLffoNmCLgEo8GUNPl&show_text=true&width=500" width="500" height="208" style={{ border: 'none', overflow: 'hidden' }} scrolling="no" frameBorder={0} allowFullScreen allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
          </figure>
          {testimonials.map((columnGroup, columnGroupIdx) => (
            <div key={columnGroupIdx} className="space-y-8 xl:contents xl:space-y-0">
              {columnGroup.map((column, columnIdx) => (
                <div
                  key={columnIdx}
                  className={classNames(
                    (columnGroupIdx === 0 && columnIdx === 0) ||
                      (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                      ? 'xl:row-span-2'
                      : 'xl:row-start-1',
                    'space-y-8',
                  )}
                >
                  {column.map((testimonial) => (
                    <figure
                      key={testimonial.key}
                      className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 dark:bg-gray-800/75 dark:shadow-none dark:ring-white/10"
                    >
                      {testimonial.iframe}
                      {/* <blockquote className="text-gray-900 dark:text-white">
                        <p>{`“${testimonial.body}”`}</p>
                      </blockquote>
                      <figcaption className="mt-6 flex items-center gap-x-4">
                        <img
                          alt=""
                          src={testimonial.author.imageUrl}
                          className="size-10 rounded-full bg-gray-50 dark:bg-gray-700"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">{testimonial.author.name}</div>
                          <div className="text-gray-600 dark:text-gray-400">{`@${testimonial.author.handle}`}</div>
                        </div>
                      </figcaption> */}
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
