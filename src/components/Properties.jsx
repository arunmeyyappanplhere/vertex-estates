import { useState } from "react";
import { properties, filterCategories } from "../data/properties";
import PropertyModal from "./PropertyModal";

const tagStyles = {
  primary: "bg-surface-container-highest/80 text-primary",
  secondary: "bg-secondary-container/80 text-secondary-fixed",
};

function PropertyCard({ property, onOpenModal }) {
  return (
    <div className="property-card group flex flex-col rounded-xl overflow-hidden bg-surface-container-low transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50">
      <div className="relative h-72 w-full overflow-hidden">
        <div
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
          style={{ backgroundImage: `url('${property.image}')` }}
        />
        <div
          className={`absolute top-space-md left-space-md backdrop-blur-md px-space-sm py-space-2xs rounded font-badge-label text-badge-label uppercase tracking-widest ${tagStyles[property.tagStyle]}`}
        >
          {property.tag}
        </div>
        <div className="absolute bottom-space-md right-space-md bg-surface/90 backdrop-blur-md px-space-md py-space-2xs rounded-lg font-headline-sm text-headline-sm text-primary">
          {property.price}
        </div>
      </div>
      <div className="p-space-lg flex flex-col flex-1">
        <div className="flex items-center gap-space-xs text-on-surface-variant mb-space-2xs">
          <span className="material-symbols-outlined text-secondary text-[18px]">location_on</span>
          <span className="font-body-sm text-body-sm">{property.location}</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm group-hover:text-primary transition-colors">
          {property.title}
        </h3>
        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-space-md">
          {property.description}
        </p>
        <div className="mt-auto pt-space-md flex items-center justify-between">
          <div className="flex items-center gap-space-md text-on-surface-variant">
            <span className="flex items-center gap-1 font-caption text-caption">
              <span className="material-symbols-outlined text-[16px]">bed</span> {property.beds} Beds
            </span>
            <span className="flex items-center gap-1 font-caption text-caption">
              <span className="material-symbols-outlined text-[16px]">bathtub</span> {property.baths} Baths
            </span>
            <span className="flex items-center gap-1 font-caption text-caption">
              <span className="material-symbols-outlined text-[16px]">square_foot</span> {property.sqft}
            </span>
          </div>
          <button
            type="button"
            aria-label={`View details for ${property.title}`}
            onClick={() => onOpenModal(property)}
            className="w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Properties() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProperty, setSelectedProperty] = useState(null);

  const visibleProperties =
    activeFilter === "all" ? properties : properties.filter((p) => p.category === activeFilter);

  return (
    <section className="py-space-3xl bg-surface-container-lowest relative" id="properties">
      <div className="max-w-max-width-content mx-auto px-margin-desktop">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
          <div>
            <span className="font-caption text-caption text-primary uppercase tracking-widest block mb-space-2xs">
              Curated Living Spaces
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Prime Estates &amp; Developments</h2>
          </div>

          <div className="flex items-center gap-space-xs bg-surface-container p-1.5 rounded-lg overflow-x-auto">
            {filterCategories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveFilter(cat.value)}
                className={`px-space-md py-space-xs rounded font-caption text-caption uppercase tracking-wider transition-all ${
                  activeFilter === cat.value
                    ? "bg-primary text-on-primary font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-xl">
          {visibleProperties.length > 0 ? (
            visibleProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onOpenModal={setSelectedProperty}
              />
            ))
          ) : (
            <p className="font-body-md text-body-md text-on-surface-variant col-span-full text-center py-space-2xl">
              No properties currently listed in this category — check back soon.
            </p>
          )}
        </div>
      </div>

      <PropertyModal
        property={selectedProperty}
        isOpen={Boolean(selectedProperty)}
        onClose={() => setSelectedProperty(null)}
      />
    </section>
  );
}
