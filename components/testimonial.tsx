import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Startup Founder",
      content:
        "This AI transformed how I approach my business strategy. The personalized action plans are spot-on.",
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Product Manager",
      content:
        "Finally, an AI system that truly understands context and delivers actionable insights.",
      rating: 5,
    },
    {
      name: "Elena Rodriguez",
      role: "Growth Strategist",
      content:
        "The level of personalization is incredible. It feels like having a strategic advisor on demand.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Loved by Teams
          </h2>
          <p className="text-lg text-muted-foreground">
            Join thousands of users creating success with our AI planning
            system.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl border border-border bg-card/50 hover:bg-card/70 transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              <div>
                <p className="font-semibold text-foreground">
                  {testimonial.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
