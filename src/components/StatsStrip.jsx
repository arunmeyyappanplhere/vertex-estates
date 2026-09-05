const stats = [
  { value: "20+", label: "Years of Excellence" },
  { value: "700+", label: "Projects Delivered" },
  { value: "250+", label: "Industry Awards" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function StatsStrip() {
  return (
    <div className="w-full max-w-5xl mx-auto mt-12 rounded-xl bg-surface-container/70 backdrop-blur-xl p-space-xl shadow-2xl shadow-surface-container-lowest/80 border border-outline-variant/20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-lg divide-y md:divide-y-0 md:divide-x divide-outline-variant/20">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center p-space-xs">
            <span className="font-stat-metric text-stat-metric text-primary">{stat.value}</span>
            <span className="font-caption text-caption text-on-surface-variant tracking-widest uppercase mt-space-2xs">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
