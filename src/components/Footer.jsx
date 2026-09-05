import { useState } from "react";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida/AEtjO1WzlEKi8jiOp65CFfKcw77_c1qou09kankAuPue_QyB3TNZ6Qq8cYb2cnbEhLfQ2PkaTv860RsUpzp8348H0bpBBCqD3hS6mioaSLFwFsQsJcO_0_0zpNvlJOlawfAMcI49RUPOd97itaSq7zvfsLw3veH8rOHHYaB7m72KnNnrNU0mfXVlYfR5jRG4uGIdN2-VoV_h129NFTp5rqFTJ4yP1_xY9aBO5pLqaRPxZHvLLcQBvwEFFiDt518";

const navigation = ["About Us", "Engineering Works", "Estate Portfolio", "Client Testimonials", "Careers"];
const legal = [
  { label: "Privacy Policy", href: "/privacy.html" },
  { label: "Terms of Engagement", href: "/terms.html" },
  { label: "Compliance & Safety", href: "/safety.html" },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    alert(`Thanks — ${email} has been added to the Architectural Brief list.`);
    setEmail("");
  }

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-max-width-content mx-auto px-margin-desktop py-space-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-xl">
          <div className="lg:col-span-4 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm">
              <a className="flex items-center" href="#">
                <img alt="VERTEX Estates & Build" className="h-8 w-auto" src={LOGO_URL} />
              </a>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Setting the global standard for high-stakes architectural luxury, institutional-grade commercial
              spaces, and custom engineering masterworks.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs">
              <div className="w-8 h-8 rounded bg-surface-container border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[16px]">corporate_fare</span>
              </div>
              <div className="w-8 h-8 rounded bg-surface-container border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[16px]">domain</span>
              </div>
              <div className="w-8 h-8 rounded bg-surface-container border border-outline-variant/30 flex items-center justify-center">
                <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex flex-col gap-space-sm">
            <span className="font-badge-label text-badge-label text-primary uppercase tracking-widest">
              Navigation
            </span>
            <div className="flex flex-col gap-space-xs">
              {navigation.map((item) => (
                <a
                  key={item}
                  className="font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors"
                  href="#"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="font-badge-label text-badge-label text-primary uppercase tracking-widest">
              Headquarters
            </span>
            <div className="flex flex-col gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <p>One Tower Plaza, Suite 8400</p>
              <p>New York, NY 10001</p>
              <p className="pt-space-xs text-on-surface">contact@vertexestates.build</p>
              <p className="text-on-surface">+1 (800) 837-8390</p>
            </div>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-space-sm">
            <span className="font-badge-label text-badge-label text-primary uppercase tracking-widest">
              Architectural Brief
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Subscribe to our quarterly monograph profiling prime estate releases and engineering feats.
            </p>
            <form className="flex flex-col gap-space-xs pt-space-xs" onSubmit={handleSubscribe}>
              <div className="flex items-center rounded bg-surface-container-high border border-outline-variant/40 px-space-sm py-space-xs focus-within:border-primary transition-colors">
                <input
                  className="bg-transparent w-full text-on-surface placeholder:text-on-surface-variant/50 font-body-sm text-body-sm focus:outline-none"
                  placeholder="Enter institutional email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="text-primary hover:text-primary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>
              </div>
              <span className="font-caption text-caption text-on-surface-variant/60">
                Strict privacy strictly held under NDA protocol.
              </span>
            </form>
          </div>
        </div>

        <div className="mt-space-2xl pt-space-lg border-t border-outline-variant/20 flex flex-col sm:flex-row items-center justify-between gap-space-md text-on-surface-variant">
          <span className="font-caption text-caption uppercase tracking-wider">
            © 2025 VERTEX Estates &amp; Build. All rights reserved.
          </span>
          <div className="flex items-center gap-space-lg">
            {legal.map((item) => (
              <a
                key={item.label}
                className="font-caption text-caption hover:text-on-surface uppercase tracking-wider transition-colors"
                href={item.href}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}