import { motion } from "motion/react";

type NavLink = { name: string; href: string };

type Props = {
  siteName: string;
  serviceArea: string;
  phone: string;
  email: string;
  address: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  footer: {
    tagline: string;
    facebookLabel: string;
    serviceAreasTitle: string;
    serviceAreas: string[];
    navTitle: string;
    contactTitle: string;
    rbq: string;
    neq: string;
  };
  navLinks: NavLink[];
  legalNotice: string;
};

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { amount: 0.3, once: false },
  transition: {
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1] as const,
    delay,
  },
});

const hoverPop = {
  whileHover: { scale: 1.05, transition: { duration: 0.2 } },
  transition: { type: "spring" as const, stiffness: 500, damping: 30 },
};

export default function FooterAnimated({
  siteName,
  serviceArea,
  phone,
  email,
  address,
  facebook,
  instagram,
  linkedin,
  footer,
  navLinks,
  legalNotice,
}: Props) {
  return (
    <motion.footer
      className="bg-brand-600 pt-14 px-8 text-white/85"
      initial="initial"
      whileInView="whileInView"
      viewport={{ amount: 0.2, once: false }}
    >
      <div className="container-site grid grid-cols-1 gap-7 pb-12 min-[541px]:grid-cols-2 min-[541px]:gap-8 min-[901px]:grid-cols-[1.5fr_2fr_1fr_1fr] min-[901px]:gap-10">
        <motion.div {...fadeUp(0)}>
          <motion.a {...hoverPop} href="/" aria-label={siteName}>
            <img
              src="/images/logo-vignette.svg"
              alt={siteName}
              width={140}
              height={52}
              loading="lazy"
              className="mb-4 block h-11 w-auto brightness-75 invert"
            />
          </motion.a>
          <p className="mb-2 text-sm font-normal text-white/75">
            {footer.tagline}
          </p>
          <p className="mb-4 flex items-center gap-1.5 text-sm text-white/65">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {serviceArea}
          </p>

          {(facebook || instagram || linkedin) && (
            <div className="flex flex-wrap gap-2">
              {facebook && (
                <motion.a
                  {...hoverPop}
                  href={facebook}
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-3.5 py-1.5 text-sm font-bold text-white/80 transition-colors hover:bg-white/12 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={footer.facebookLabel}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  {footer.facebookLabel}
                </motion.a>
              )}
              {instagram && (
                <motion.a
                  {...hoverPop}
                  href={instagram}
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-3.5 py-1.5 text-sm font-bold text-white/80 transition-colors hover:bg-white/12 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                  Instagram
                </motion.a>
              )}
              {linkedin && (
                <motion.a
                  {...hoverPop}
                  href={linkedin}
                  className="inline-flex items-center gap-2 rounded border border-white/30 px-3.5 py-1.5 text-sm font-bold text-white/80 transition-colors hover:bg-white/12 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.778v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </motion.a>
              )}
            </div>
          )}
        </motion.div>

        <motion.div {...fadeUp(0.08)}>
          <h3 className="mb-[1.125rem] font-[family-name:var(--font-body)] text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white/50">
            {footer.serviceAreasTitle}
          </h3>
          <ul className="m-0 list-none columns-2 gap-x-6 p-0 [&>li]:mb-2">
            {footer.serviceAreas.map((area) => (
              <li
                key={area}
                className="text-[0.875rem] text-white/70 break-inside-avoid"
              >
                {area}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp(0.16)}>
          <h3 className="mb-[1.125rem] font-[family-name:var(--font-body)] text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white/50">
            {footer.navTitle}
          </h3>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {navLinks.map((link) => (
              <li key={link.href}>
                <motion.a
                  {...hoverPop}
                  href={link.href}
                  className="inline-flex text-[0.9375rem] text-white/80 transition-colors hover:text-white"
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div {...fadeUp(0.24)}>
          <h3 className="mb-[1.125rem] font-[family-name:var(--font-body)] text-[0.8125rem] font-bold uppercase tracking-[0.08em] text-white/50">
            {footer.contactTitle}
          </h3>
          <ul className="m-0 flex list-none flex-col gap-3 p-0">
            <li>
              <motion.a
                {...hoverPop}
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="flex items-start gap-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
              >
                <svg
                  className="mt-[3px] shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.94-.94a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {phone}
              </motion.a>
            </li>
            <li>
              <motion.a
                {...hoverPop}
                href={`mailto:${email}`}
                className="flex items-start gap-2 text-[0.9375rem] text-white/80 transition-colors hover:text-white"
              >
                <svg
                  className="mt-[3px] shrink-0"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                {email}
              </motion.a>
            </li>
            <li className="flex items-start gap-2 text-[0.9375rem] text-white/70">
              <svg
                className="mt-[3px] shrink-0"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {address}
            </li>
          </ul>
        </motion.div>
      </div>

      <motion.div {...fadeUp(0.1)} className="border-t border-white/15 py-[1.125rem]">
        <div className="container-site flex flex-wrap items-center justify-between gap-4 max-[540px]:flex-col max-[540px]:items-start max-[540px]:gap-2">
          <p className="text-[0.8125rem] text-white/50">{legalNotice}</p>
          <motion.p {...fadeUp(0.32)} className="text-[0.8125rem] text-white/50">
            Réalisation par{"  "}
            <motion.a
              {...hoverPop}
              href="https://www.linkedin.com/in/mouadbouras/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex text-white/70 hover:text-white"
            >
              MBCube Consulting
            </motion.a>
          </motion.p>
          <p className="flex items-center gap-2.5 text-xs tracking-[0.02em] text-white/40">
            <span>{footer.rbq}</span>
            <span aria-hidden="true">·</span>
            <span>{footer.neq}</span>
          </p>
        </div>
      </motion.div>
    </motion.footer>
  );
}

