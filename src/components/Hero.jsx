import ThreeScene from "./ThreeScene";
import StatsStrip from "./StatsStrip";

const BG_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCgw1_2bc9v-cQzPjd3gRLi4FZzlmpsjMhbs5Uoq1so1x-MqKoLejkcuoUnJOgva0xw2miivuv5cR8sfhBaFccl11td8r5T6zcCcWKo1KI5_vSLqRCImDBJ7X5A4WaGulyTKpOfqo8pBgvUsbBjjOaefSVSITSNwYBSKeZsxcENiJBRekvxacze7A9CeH2oW6YthS52MGtiH9axD6FVOkDc3Z83bDU64mR1B3I8kXE99WlYntz1Fx_H";

export default function Hero() {
  return (
    <section className="relative w-full -mt-20 pt-28 pb-12 lg:pb-16 overflow-hidden bg-background">
      {/* Atmospheric Underlay */}
      <div
        className="absolute inset-0 bg-cover bg-center mix-blend-luminosity opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('${BG_IMAGE}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-secondary-container/30 to-background pointer-events-none" />
      {/* Ambient Subtle Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 w-[700px] h-[360px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-max-width-content mx-auto px-margin-desktop flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[620px]">
          {/* Left Column: Story, Title, Actions */}
          <div className="lg:col-span-6 flex flex-col items-start text-left pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-space-xs px-space-md py-space-2xs rounded-full bg-secondary-container/80 shadow-[0_0_20px_rgba(158,233,57,0.1)] mb-space-lg backdrop-blur-md">
              <span className="material-symbols-outlined text-primary text-[16px]">military_tech</span>
              <span className="font-badge-label text-badge-label text-primary uppercase tracking-widest">
                Award-Winning Real Estate &amp; Construction
              </span>
            </div>

            <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-surface tracking-tight mb-space-md">
              Foundations of Quality,
              <br />
              <span className="text-primary drop-shadow-[0_0_25px_rgba(158,233,57,0.35)]">Structures of Trust</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-space-xl">
              Discover exceptional homes and world-class construction services. From modern bungalows to luxury
              mansions, we build spaces where life happens.
            </p>

            <div className="flex flex-wrap items-center gap-space-md mb-space-xl">
              <a
                className="inline-flex items-center justify-center px-space-xl py-space-sm rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text uppercase tracking-wider hover:bg-primary transition-all duration-300 shadow-[0_0_30px_rgba(132,204,22,0.3)] hover:scale-[1.02]"
                href="#properties"
              >
                Explore Properties
              </a>
              <a
                className="inline-flex items-center justify-center px-space-xl py-space-sm rounded-lg bg-surface-container-high/60 backdrop-blur-md text-on-surface font-button-text text-button-text uppercase tracking-wider hover:bg-surface-container-highest transition-all duration-300 hover:text-primary"
                href="#contact-quote"
              >
                Get a Free Quote
              </a>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-outline-variant/30 text-on-surface-variant">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                <span className="font-caption text-caption uppercase tracking-wider">ISO 9001 Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">energy_savings_leaf</span>
                <span className="font-caption text-caption uppercase tracking-wider">LEED Platinum</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px]">lock</span>
                <span className="font-caption text-caption uppercase tracking-wider">Turnkey Escrow</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Building Model */}
          <div className="lg:col-span-6 relative w-full h-[520px] lg:h-[640px] flex items-center justify-center">
            <div className="w-full h-full relative rounded-2xl overflow-hidden bg-surface-container-lowest/60 border border-outline-variant/30 shadow-2xl backdrop-blur-sm">
              <ThreeScene />

              <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high/85 backdrop-blur-md border border-outline-variant/40 text-on-surface shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="font-caption text-caption uppercase tracking-widest text-primary font-semibold">
                    Vertex Signature Residence
                  </span>
                  <span className="text-on-surface-variant font-caption text-caption">• BIM 5D Model</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-max max-w-[90%]">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/85 backdrop-blur-md border border-outline-variant/40 text-on-surface shadow-xl">
                  <span className="material-symbols-outlined text-primary text-[18px]">3d_rotation</span>
                  <span className="font-caption text-caption tracking-wider text-on-surface">
                    ✦ Interactive 3D Model — Click &amp; Drag to Rotate
                  </span>
                </div>
              </div>

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(circle, transparent 0%, transparent 60%, rgba(10,15,20,0.4) 100%)",
                }}
              />
            </div>
          </div>
        </div>

        <StatsStrip />
      </div>
    </section>
  );
}
