import { Lightbulb, Zap, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: Lightbulb,
      title: "Intelligent Analysis",
      description:
        "Advanced AI algorithms that understand your context and deliver precise insights.",
    },
    {
      icon: Zap,
      title: "Personalization",
      description:
        "Every plan is uniquely tailored to your specific goals and circumstances.",
    },
    {
      icon: Shield,
      title: "Automation",
      description:
        "Streamlined workflows that execute plans efficiently and track progress automatically.",
    },
  ];

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Features Built for Success
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to succeed, powered by cutting-edge AI
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border border-border bg-card/30 backdrop-blur hover:bg-card/60 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
