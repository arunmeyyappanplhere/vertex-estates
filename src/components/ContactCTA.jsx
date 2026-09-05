import { useState } from "react";

const projectScopes = [
  "Luxury Custom Estate ($2M - $10M+)",
  "Commercial Development",
  "High-Rise Penthouse Renovation",
  "Land Acquisition & Master Planning",
];

export default function ContactCTA() {
  const [form, setForm] = useState({ name: "", email: "", scope: projectScopes[0] });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Thank you. A Vertex Senior Engineering Partner will reach out shortly.");
    setForm({ name: "", email: "", scope: projectScopes[0] });
  }

  return (
    <section className="py-space-3xl bg-surface-container-lowest relative overflow-hidden" id="contact-quote">
      <div className="max-w-max-width-content mx-auto px-margin-desktop">
        <div className="relative rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-secondary-container/40 p-space-2xl md:p-space-3xl shadow-2xl overflow-hidden">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-center relative z-10">
            <div className="lg:col-span-7 flex flex-col">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-space-2xs rounded-full bg-primary-container/20 text-primary w-max mb-space-md">
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span className="font-caption text-caption tracking-wider uppercase font-semibold">
                  Priority Consultations
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mb-space-md">
                Ready to Build Your <span className="text-primary">Architectural Dream?</span>
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mb-space-xl">
                Connect with our master structural engineers and project directors to discuss blueprints,
                feasibility analysis, or high-yield estate acquisitions.
              </p>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg">
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">phone_in_talk</span>
                  </div>
                  <div>
                    <span className="font-caption text-caption text-on-surface-variant block uppercase">
                      Direct Project Desk
                    </span>
                    <span className="font-headline-sm text-[18px] text-on-surface">+1 (800) 837-8390</span>
                  </div>
                </div>
                <div className="flex items-center gap-space-sm">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[24px]">mark_email_read</span>
                  </div>
                  <div>
                    <span className="font-caption text-caption text-on-surface-variant block uppercase">
                      Institutional Inquiries
                    </span>
                    <span className="font-headline-sm text-[18px] text-on-surface">desk@vertexestates.build</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Interactive Intake Form */}
            <div className="lg:col-span-5 bg-surface-container-high/90 backdrop-blur-xl p-space-xl rounded-xl shadow-xl">
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                Request Project Feasibility
              </h3>
              <p className="font-caption text-caption text-on-surface-variant mb-space-lg">
                Confidential estimation within 24 business hours.
              </p>
              <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">Full Name</label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-xs rounded text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="e.g. Jonathan Sterling"
                    required
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-surface-container-low px-space-md py-space-xs rounded text-on-surface font-body-sm text-body-sm placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="name@company.com"
                    required
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="font-caption text-caption text-on-surface-variant block mb-1">
                    Project Scope
                  </label>
                  <select
                    className="w-full bg-surface-container-low px-space-md py-space-xs rounded text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    name="scope"
                    value={form.scope}
                    onChange={handleChange}
                  >
                    {projectScopes.map((scope) => (
                      <option key={scope}>{scope}</option>
                    ))}
                  </select>
                </div>
                <button
                  className="w-full mt-space-xs py-space-sm rounded-lg bg-primary text-on-primary font-button-text text-button-text uppercase tracking-wider hover:bg-primary-fixed transition-all shadow-[0_0_20px_rgba(158,233,57,0.25)]"
                  type="submit"
                >
                  Submit Consultation Request
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
