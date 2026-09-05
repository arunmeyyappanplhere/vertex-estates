import { useEffect, useState } from "react";

export default function PropertyModal({ property, isOpen, onClose }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Reset image index when a new property opens
  useEffect(() => {
    if (isOpen) setCurrentImageIndex(0);
  }, [isOpen, property]);

  if (!isOpen || !property) return null;

  const gallery = property.gallery && property.gallery.length > 0 ? property.gallery : [property.image];

  function goPrev() {
    setCurrentImageIndex((i) => (i === 0 ? gallery.length - 1 : i - 1));
  }

  function goNext() {
    setCurrentImageIndex((i) => (i === gallery.length - 1 ? 0 : i + 1));
  }

  function StatRow({ icon, label, value }) {
    return (
      <div className="flex items-center gap-space-xs font-caption text-caption text-on-surface-variant">
        <span className="material-symbols-outlined text-secondary text-[16px]">{icon}</span>
        <span className="font-semibold text-on-surface">{value}</span>
        <span>{label}</span>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-surface-container-lowest border border-outline-variant/30 rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-surface-container-high/70 flex items-center justify-center text-on-surface hover:text-primary hover:bg-primary transition-all"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Image gallery */}
        <div className="relative h-80 sm:h-96 w-full">
          <div
            className="w-full h-full bg-cover bg-center transition-opacity duration-300"
            style={{ backgroundImage: `url('${gallery[currentImageIndex]}')` }}
          />

          {/* Navigation arrows */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container/70 backdrop-blur flex items-center justify-center text-on-surface hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_left</span>
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-surface-container/70 backdrop-blur flex items-center justify-center text-on-surface hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chevron_right</span>
              </button>
            </>
          )}

          {/* Image counter */}
          <div className="absolute bottom-3 right-3 bg-surface/80 backdrop-blur px-3 py-1 rounded-full font-caption text-caption text-on-surface-variant">
            {currentImageIndex + 1} / {gallery.length}
          </div>
        </div>
        {/* Content area */}
        <div className="overflow-y-auto p-space-lg flex flex-col flex-1">
          <div className="flex items-center justify-between gap-space-sm mb-space-sm">
            <h2 className="font-headline-lg text-headline-lg text-on-surface">{property.title}</h2>
            <div className="font-headline-sm text-headline-sm text-primary whitespace-nowrap">
              {property.price}
            </div>
          </div>

          <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-md">
            <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
            <span className="font-body-sm text-body-sm">{property.location}</span>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
            {property.detailedDescription}
          </p>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm py-space-sm border-t border-outline-variant/20 mb-space-md">
            <StatRow icon="bed" label="Beds" value={property.beds || "\u2014"} />
            <StatRow icon="bathtub" label="Baths" value={property.baths || "\u2014"} />
            <StatRow icon="square_foot" label="Area" value={property.sqft} />
            <StatRow icon="home_work" label="Year" value={property.yearBuilt || "\u2014"} />
          </div>

          {/* Two-column layout: Amenities + Features */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-xl mb-space-xl">
            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                Featured Amenities
              </h3>
              <ul className="flex flex-col gap-space-2xs">
                {property.featuredAmenities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 font-body-sm text-body-sm text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-primary text-[16px]">check_circle</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-xs">
                Key Features
              </h3>
              <ul className="flex flex-col gap-space-2xs">
                {property.keyFeatures.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-1.5 font-body-sm text-body-sm text-on-surface-variant"
                  >
                    <span className="material-symbols-outlined text-primary text-[16px]">star</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Additional specs */}
          {(property.lotSize || property.garage) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm py-space-sm border-t border-outline-variant/20 mb-space-xl">
              {property.lotSize && (
                <StatRow icon="yard" label="Lot Size" value={property.lotSize} />
              )}
              {property.garage && (
                <StatRow icon="garage" label="Garage" value={property.garage} />
              )}
            </div>
          )}

          {/* Agent contact + CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md pt-space-md border-t border-outline-variant/20">
            <div className="flex items-center gap-space-sm">
              <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[20px]">person</span>
              </div>
              <div>
                <span className="font-headline-sm text-[16px] text-on-surface block leading-tight">
                  {property.agent?.name || "Listing Agent"}
                </span>
                <span className="font-caption text-caption text-on-surface-variant">
                  {property.agent?.phone || "+1 (800) 837-8390"}
                </span>
              </div>
            </div>

            <a
              href="#contact-quote"
              onClick={onClose}
              className="inline-flex items-center justify-center px-space-md py-space-xs rounded-lg bg-primary-container text-on-primary-container font-button-text text-button-text uppercase tracking-wider hover:bg-primary transition-all"
            >
              Request Info
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}