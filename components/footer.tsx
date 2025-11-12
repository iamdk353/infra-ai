"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { ModeToggle } from "./ThemeToggle";

export default function Footer() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  const links = [
    { label: "Documentation", href: "#" },
    { label: "Pricing", href: "#" },
    { label: "About", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4">Your AI Planning System</h3>
            <p className="text-muted-foreground text-sm">
              Transform your ideas into actionable plans with AI-powered
              personalization.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-2 items-center justify-center">
            <ModeToggle />
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Your AI Planning System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
