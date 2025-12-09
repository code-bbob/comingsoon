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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Soft ambient halo background (subtle, no counters)
  useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;
  let ctx = canvas.getContext("2d");
  if (!ctx) return;
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
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: 0.6 + Math.random() * 2.2,
      dx: -0.3 + Math.random() * 0.6,
      dy: -0.3 + Math.random() * 0.6,
      hue: Math.random() > 0.5 ? 40 : 150,
    }));
    function draw() {
      if (!canvas || !ctx) return;
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
        g.addColorStop(0, `hsla(${p.hue} 55% 60% / 0.85)`);
        g.addColorStop(0.35, `hsla(${p.hue} 45% 60% / 0.32)`);
        g.addColorStop(1, `hsla(${p.hue} 45% 55% / 0)`);
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

  return (
    <div>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div>
            <span className="eyebrow">For moms & newborns</span>
            <h1 className="headline text-foreground">Gentle essentials, crafted to last</h1>
            <p className="subhead text-soft">Soft, breathable fabrics and thoughtful silhouettes—made for comfort, care, and everyday elegance. Sign up for first access.</p>
            <div className="cta-row">
              <a href="#newsletter" className="btn btn-primary"><span className="dot" />Get Early Access</a>
              <a href="#featured" className="btn btn-secondary text-foreground">Explore Preview</a>
            </div>
          </div>
          <div className="glass rounded-2xl p-6 fade-in">
            <canvas ref={canvasRef} className="pointer-events-none w-full h-[260px] md:h-[340px]" />
          </div>
        </div>
      </section>

      <section id="newsletter" className="container stack-tight fade-in" aria-label="Newsletter">
        <form onSubmit={handleSubmit} className="subscribe-form" noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email for first access"
            aria-label="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            className="focus-ring text-foreground"
          />
          <button
            type="submit"
            className="btn-primary focus-ring min-w-[140px] flex justify-center"
            disabled={status === "loading" || status === "success"}
          >
            {status === "idle" && "Notify Me"}
            {status === "loading" && "Sending…"}
            {status === "success" && "On the list"}
            {status === "error" && "Try Again"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs text-warn/90 font-medium">Please enter a valid email.</p>
        )}
        {status === "success" && (
          <p className="text-xs text-accent font-medium">You&apos;re in. We&apos;ll share fabric stories &amp; first release dates soon.</p>
        )}
      </section>

        <section id="story" className="container fade-in" aria-label="Our Story" style={{padding:"3rem 0"}}>
          <div className="glass rounded-2xl p-6" style={{display:"grid", gap:"1rem"}}>
            <h3 className="card-title text-foreground">A gentle start</h3>
            <p className="card-desc text-muted">Born in Nepal, crafted in small batches. We design essentials for moms and newborns with care-first materials and timeless silhouettes.</p>
          </div>
        </section>

        <section id="materials" className="container fade-in" aria-label="Materials" style={{padding:"1rem 0"}}>
          <div className="glass rounded-2xl p-6" style={{display:"grid", gap:"1rem"}}>
            <h3 className="card-title text-foreground">Materials that breathe</h3>
            <p className="card-desc text-muted">Soft cottons, gentle blends, and washable comfort. Pre-washed for immediate softness and made to last through everyday care.</p>
          </div>
        </section>

        <section id="care" className="container fade-in" aria-label="Care" style={{padding:"1rem 0 3rem"}}>
          <div className="glass rounded-2xl p-6" style={{display:"grid", gap:"1rem"}}>
            <h3 className="card-title text-foreground">Care made simple</h3>
            <p className="card-desc text-muted">Machine-washable essentials designed to hold shape and softness. Your routine stays easy, your comfort stays premium.</p>
          </div>
        </section>
    </div>
  );
}
