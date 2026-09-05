import { testimonials } from "../data/testimonials";

function StarRow({ size = 18, className = "flex text-primary mb-space-md" }) {
  return (
    <div className={className}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className="material-symbols-outlined" style={{ fontSize: size, fontVariationSettings: "'FILL' 1" }}>
          star
        </span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-space-3xl bg-background relative" id="testimonials">
      <div className="max-w-max-width-content mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-caption text-caption text-primary uppercase tracking-widest block mb-space-2xs">
              Client Testimonials
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Validated by Industry Leaders</h2>
          </div>
          <div className="flex items-center gap-1 text-primary">
            <StarRow size={20} className="flex" />
            <span className="font-body-sm text-body-sm font-semibold text-on-surface ml-space-xs">
              4.98 / 5 Across 250+ Verified Reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-xl">
          {testimonials.map((t) => (
            <div key={t.id} className="p-space-xl rounded-xl bg-surface-container flex flex-col justify-between">
              <div>
                <StarRow />
                <p className="font-body-md text-body-md text-on-surface italic mb-space-lg">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-space-sm pt-space-md">
                <div className="w-11 h-11 rounded-full bg-surface-container-high overflow-hidden">
                  <img className="w-full h-full object-cover" src={t.avatar} alt={t.name} />
                </div>
                <div>
                  <span className="font-headline-sm text-[16px] text-on-surface block leading-tight">{t.name}</span>
                  <span className="font-caption text-caption text-on-surface-variant">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
