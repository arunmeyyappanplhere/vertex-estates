const navLinks = [
  { label: "About", path: "about" },
  { label: "Services", path: "services" },
  { label: "Projects / Gallery", path: "properties" },
  { label: "Testimonials", path: "testimonials" },
  { label: "Contact", path: "contact-quote" },
];

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1WzlEKi8jiOp65CFfKcw77_c1qou09kankAuPue_QyB3TNZ6Qq8cYb2cnbEhLfQ2PkaTv860RsUpzp8348H0bpBBCqD3hS6mioaSLFwFsQsJcO_0_0zpNvlJOlawfAMcI49RUPOd97itaSq7zvfsLw3veH8rOHHYaB7m72KnNnrNU0mfXVlYfR5jRG4uGIdN2-VoV_h129NFTp5rqFTJ4yP1_xY9aBO5pLqaRPxZHvLLcQBvwEFFiDt518";

export default function Header() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
      <div className="h-20 max-w-max-width-content mx-auto px-margin-desktop flex items-center justify-between gap-space-lg">
        <div className="flex items-center gap-space-sm">
          <a className="flex items-center" href="#">
            <img alt="VERTEX Estates & Build" className="h-10 w-auto" src={LOGO_URL} />
          </a>
        </div>

        <nav className="hidden lg:flex items-center gap-space-xl">
          {navLinks.map((link) => (
            <a
              key={link.path}
              className="font-button-text text-button-text text-on-surface-variant hover:text-on-surface transition-colors"
              href={`#${link.path}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="hidden xl:flex flex-col text-right pr-space-sm">
            <span className="font-caption text-caption text-on-surface-variant uppercase">Direct Inquiry</span>
            <span className="font-body-sm text-body-sm font-semibold text-on-surface">+1 (800) 837-8390</span>
          </div>
          <a
            className="hidden sm:inline-flex items-center justify-center px-space-md py-space-xs rounded bg-primary-container text-on-primary-container font-button-text text-button-text uppercase tracking-wider hover:bg-primary transition-all shadow-[0_0_20px_rgba(132,204,22,0.25)] hover:shadow-[0_0_24px_rgba(132,204,22,0.45)]"
            href="#contact-quote"
          >
            Request Quote
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
            <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
}
