export default function Marquee() {
  const items = [
    "Smart Analysis",
    "AI Generated Plans",
    "Personalized Routes",
    "Real-time Optimization",
    "Smart Analysis",
    "AI Generated Plans",
    "Personalized Routes",
    "Real-time Optimization",
  ];

  return (
    <section className="relative py-16 overflow-hidden border-y border-border bg-card/50 backdrop-blur">
      <div className="relative flex overflow-hidden">
        <div
          className="flex gap-8 animate-scroll whitespace-nowrap"
          style={{ animation: "scroll 20s linear infinite" }}
        >
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8 px-4 py-2">
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-base font-medium text-foreground/60 hover:text-foreground transition-colors">
                {item}
              </span>
            </div>
          ))}
        </div>

        <div
          className="flex gap-8 animate-scroll whitespace-nowrap absolute"
          style={{ animation: "scroll 20s linear infinite" }}
        >
          {items.map((item, idx) => (
            <div
              key={`dup-${idx}`}
              className="flex items-center gap-8 px-4 py-2"
            >
              <div className="w-1 h-1 rounded-full bg-primary" />
              <span className="text-base font-medium text-foreground/60">
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
