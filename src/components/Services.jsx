import { services } from "../data/services";

export default function Services() {
  return (
    <section className="py-space-3xl bg-background relative overflow-hidden" id="services">
      <div className="max-w-max-width-content mx-auto px-margin-desktop">
        <div className="text-center max-w-3xl mx-auto mb-space-3xl">
          <span className="font-caption text-caption text-primary uppercase tracking-widest block mb-space-2xs">
            Comprehensive Delivery
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-sm">
            Master Craftsmanship &amp; Precision Engineering
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            We bring structural rigor, computational precision, and aesthetic uncompromising standards to landmark
            real estate ventures worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-space-xl rounded-xl bg-surface-container-low transition-all duration-300 hover:bg-surface-container hover:-translate-y-1"
            >
              <div className="w-14 h-14 rounded-lg bg-surface-container-high flex items-center justify-center mb-space-lg text-primary">
                <span className="material-symbols-outlined text-[30px]">{service.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">{service.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">{service.description}</p>
              <ul className="space-y-space-2xs font-caption text-caption text-on-surface-variant">
                {service.points.map((point) => (
                  <li key={point} className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-[14px]">check_circle</span> {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
