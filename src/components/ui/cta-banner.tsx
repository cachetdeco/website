interface FullWidthWithBackgroundImageAndLargeContentProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonHref: string;
  imageSrc: string;
  imageAlt?: string;
}

export default function FullWidthWithBackgroundImageAndLargeContent({
  title,
  subtitle,
  buttonText,
  buttonHref,
  imageSrc,
  imageAlt = '',
}: FullWidthWithBackgroundImageAndLargeContentProps) {
  return (
    <section className="bg-white" aria-labelledby="cta-heading">
      <div className="relative bg-gray-900 min-h-[40rem] flex items-center justify-center">
        {/* Decorative image and overlay */}
        <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
          <img
            alt={imageAlt}
            src={imageSrc}
            className="size-full object-cover"
          />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gray-900 opacity-50" />

        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32 lg:px-0">
          <h2 id="cta-heading" className="text-3xl font-bold tracking-tight text-brand-50 sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 text-lg text-brand-50/95 sm:text-xl">
            {subtitle}
          </p>
          <a
            href={buttonHref}
            className="mt-8 inline-block rounded-md border border-transparent bg-[var(--color-brand-600)] px-8 py-3 text-base font-medium text-white shadow-sm transition-colors hover:bg-[var(--color-brand-700)]"
          >
            {buttonText}
          </a>
        </div>
      </div>
    </section>
  );
}
