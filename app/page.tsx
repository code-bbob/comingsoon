"use client";

import { useEffect, useRef, useState } from "react";

// Countdown target (launch date). Adjust as needed.
const TARGET = new Date(Date.now() + 1000 * 60 * 60 * 24 * 42); // 42 days from now

interface TimeLeft {
  days: number; hours: number; minutes: number; seconds: number;
}

function getTimeLeft(): TimeLeft {
  const now = new Date().getTime();
  const diff = Math.max(0, TARGET.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
}

export default function ComingSoon() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Animated halo / particle background using canvas for subtle motion
  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  let ctx = canvas.getContext("2d");
  if (!ctx) return;
    let frame = 0;
    const DPR = window.devicePixelRatio || 1;
    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth * DPR;
      canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.scale(DPR, DPR);
      }
    }
    resize();
    window.addEventListener("resize", resize);
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.6 + Math.random() * 2.2,
      dx: -0.3 + Math.random() * 0.6,
      dy: -0.3 + Math.random() * 0.6,
      hue: Math.random() > 0.5 ? 270 : 200,
    }));
    function draw() {
      if (!canvas || !ctx) return;
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      particles.forEach(p => {
        if (!ctx) return;
        p.x += p.dx * 0.6;
        p.y += p.dy * 0.6;
        if (p.x < -50) p.x = window.innerWidth + 50; else if (p.x > window.innerWidth + 50) p.x = -50;
        if (p.y < -50) p.y = window.innerHeight + 50; else if (p.y > window.innerHeight + 50) p.y = -50;
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 18);
        g.addColorStop(0, `hsla(${p.hue} 90% 60% / 0.9)`);
        g.addColorStop(0.35, `hsla(${p.hue} 90% 60% / 0.35)`);
        g.addColorStop(1, `hsla(${p.hue} 90% 55% / 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 18, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();
      requestAnimationFrame(draw);
    }
    draw();
    return () => window.removeEventListener("resize", resize);
  }, []);

  // Countdown interval
  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    // Simulate async submit. Replace with real API / service.
    setTimeout(() => {
      setStatus("success");
    }, 1200);
  }

  const launchSoon = Object.values(time).every(v => v === 0);

  return (
    <main id="main" className="relative flex flex-col min-h-screen items-center justify-center px-6 py-10 md:py-20">
      <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 opacity-[0.55]" />
      <div className="noise" />
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center gap-12">
        <header className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto">
          <div className="flex flex-col items-center gap-4">
            <h1 className="gradient-text font-extrabold tracking-tight text-[clamp(2.8rem,6.5vw,5.8rem)] leading-[1.58] drop-shadow-sm text-center">
              आमाको नाना
            </h1>
            <h2 className="font-semibold pt-2 text-[clamp(1.35rem,3.2vw,2.35rem)] leading-tight text-center bg-gradient-to-r from-purple-600 via-fuchsia-500 to-sky-500 bg-clip-text text-transparent">
              आमाको न्यानोपनको अनुभूति
            </h2>
          </div>
          <p className="text-sm md:text-base leading-relaxed text-soft max-w-xl font-medium text-center md:text-left">
            A bold creative & commerce space blending narrative, motion, and refined interaction. Be first when we drop.
          </p>
        </header>

        <section aria-label="Countdown" className="stagger w-full flex flex-col items-center gap-8">
          <div className="count-grid">
            {([
              { label: "Days", value: time.days },
              { label: "Hours", value: time.hours },
              { label: "Minutes", value: time.minutes },
              { label: "Seconds", value: time.seconds },
            ] as const).map(block => (
              <div key={block.label} className="count-cell">
                <div className="count-value tabular-nums" aria-live="polite" aria-label={block.label}>
                  {String(block.value).padStart(2, "0")}
                </div>
                <div className="count-label">{block.label}</div>
              </div>
            ))}
          </div>
          {launchSoon && (
            <p className="text-xs uppercase tracking-[0.25em] text-warn/80">
              Launch Imminent
            </p>
          )}
        </section>

        <form onSubmit={handleSubmit} className="subscribe-form stagger" noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email for first access"
            aria-label="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            className="focus-ring"
          />
          <button
            type="submit"
            className="btn-primary focus-ring min-w-[120px] flex justify-center"
            disabled={status === "loading" || status === "success"}
          >
            {status === "idle" && "Notify Me"}
            {status === "loading" && "Sending…"}
            {status === "success" && "On the list"}
            {status === "error" && "Try Again"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-warn/90 font-medium">
            Please enter a valid email.
          </p>
        )}
        {status === "success" && (
          <p className="text-xs text-accent font-medium">
            You're in. We'll share fabric stories & first release dates soon.
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl mt-4">
          {[
            {
              title: "Natural Comfort",
              body: "Plush, breathable fabrics chosen for delicate skin & long cuddle days—engineered for durability, pre-washed softness.",
            },
            {
              title: "Responsible Craft",
              body: "Small-batch Nepali production supporting skilled artisans, transparent sourcing & mindful waste reduction.",
            },
            {
              title: "Elevated Essentials",
              body: "Modular silhouettes that layer, launder & last—quiet design language that grows with your rhythm.",
            },
          ].map(card => (
            <article
              key={card.title}
              className="glass rounded-2xl p-6 flex flex-col gap-3 relative overflow-hidden"
            >
              <h3 className="font-semibold text-base leading-tight text-foreground">
                {card.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {card.body}
              </p>
            </article>
          ))}
        </div>

        <footer className="pt-10 pb-4 text-xs text-foreground/50 flex flex-col items-center gap-2">
          <p>&copy; {new Date().getFullYear()} Aama Ko Nana. All rights reserved.</p>
          <p className="flex gap-3">
            <a href="#" className="hover:text-foreground/90 transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground/90 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-foreground/90 transition-colors">Dribbble</a>
          </p>
        </footer>
      </div>
    </main>
  );
}
