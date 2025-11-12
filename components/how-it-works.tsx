import { Zap, Brain, Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Zap,
      title: "Input Details",
      description:
        "Share your information and preferences in a simple, intuitive form.",
    },
    {
      icon: Brain,
      title: "AI Analyzes",
      description:
        "Our intelligent system processes your data and identifies patterns and opportunities.",
    },
    {
      icon: Sparkles,
      title: "Get Action Plan",
      description:
        "Receive a personalized, step-by-step action plan optimized for your success.",
    },
  ];

  return (
    <section className="py-24 px-4 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to transform your ideas into a structured action
            plan.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="group relative p-8 rounded-xl border border-border bg-card/50 hover:bg-card/80 transition-all duration-300 hover:border-primary/50"
              >
                {/* Ripple effect on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    animation: "cell-ripple 0.6s ease-out",
                  }}
                />

                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>

                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 transform -translate-y-1/2 text-primary/30">
                      →
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
