const differentiators = [
  {
    icon: "verified_user",
    title: "Turnkey Management",
    description: "Single point of executive contact across permits, foundation, finish, and interior handover.",
  },
  {
    icon: "shield",
    title: "15-Year Warranty",
    description: "Comprehensive structural and waterproofing warranty backed by tier-one underwriting.",
  },
  {
    icon: "eco",
    title: "Eco-Smart Systems",
    description: "Sub-metered smart grids, high-efficiency geothermal loops, and solar-envelope integration.",
  },
  {
    icon: "payments",
    title: "Transparent Milestones",
    description: "Real-time client portal with daily site telemetry, drone footage, and open-book billing.",
  },
];

const BLUEPRINT_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB0FFA81FNcRv5nJhQTVXDc293gcaTCgOrQ_Sar_Wyz5bXUKp2D3SkuIT_1Or9l6EeRYiz6DLKu5Kl0fhGDOpsXy4p3tLua8YION48rcgmr72lN8EVn2KxNu92s0ImZSWVSFV-dtJMizOcQRU4RD0m__KX69DrLVZ9on-GsZPBl7TIGLkiHxXLXd9tXUsXmyFCQgK0JVbF1BndTcyRWha57BVuyo7lR4b1qYjWCJz0LsAh6NeMxCQ5X";

export default function WhyChooseUs() {
  return (
    <section className="py-space-3xl bg-surface-container-lowest relative overflow-hidden" id="about">
      <div className="max-w-max-width-content mx-auto px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center">
          {/* Visual & Blueprint Side */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div
                className="w-full h-[460px] bg-cover bg-center"
                style={{ backgroundImage: `url('${BLUEPRINT_IMAGE}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

              <div className="absolute bottom-space-lg left-space-lg right-space-lg p-space-md rounded-xl bg-surface-container/90 backdrop-blur-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-[22px]">verified</span>
                    </div>
                    <div>
                      <span className="font-headline-sm text-[16px] text-on-surface block">
                        100% On-Schedule Delivery
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        Backed by institutional completion guarantees
                      </span>
                    </div>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary">15-Yr</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Differentiators Side */}
          <div className="lg:col-span-6 flex flex-col">
            <span className="font-caption text-caption text-primary uppercase tracking-widest block mb-space-2xs">
              The Vertex Advantage
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-lg">
              Engineered for Permanence. Executed with Precision.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-space-xl">
              Over two decades, we have set a new benchmark for structural integrity and radical accountability in
              high-stakes construction and luxury real estate.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-lg">
              {differentiators.map((item) => (
                <div key={item.title} className="flex flex-col">
                  <div className="flex items-center gap-space-xs text-primary mb-space-xs">
                    <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    <span className="font-headline-sm text-[18px] text-on-surface">{item.title}</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
