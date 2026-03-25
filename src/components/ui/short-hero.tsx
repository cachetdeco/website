interface ContactHeroContent {
  imageSrc: string;
  imageAlt: string;
  title: string;
  subtitle: string;
}

  
  export default function ContactHero({ content }: { content: ContactHeroContent }) {
    const { imageSrc, imageAlt, title, subtitle } = content;
    return (
      <div className="relative flex items-center justify-center overflow-hidden bg-brand-600 min-h-[50vh]">
        {/* Decorative background image and gradient */}
        <div aria-hidden="true" className="absolute inset-0">
          <div className="absolute inset-0 mx-auto overflow-hidden">
            <img
              alt={imageAlt}
              src={imageSrc}
              className="size-full object-cover"
            />
          </div>
          <div className="absolute inset-0" />
          <div className="absolute inset-0 bg-linear-to-t from-white via-white opacity-40" />
        </div>
  
        {/* Callout */}
        <section
          aria-labelledby="sale-heading"
          className="relative mx-auto flex max-w-7xl flex-col items-center justify-center text-center sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <h2 id="sale-heading" className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-white">
              {subtitle}
            </p>
          </div>
        </section>
 
      </div>
    )
  }
  