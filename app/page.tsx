"use client";
import Image from "next/image";

import { useEffect, useRef, useState } from "react";

// Countdown target (launch date). Adjust as needed.
const TARGET = new Date(Date.now() + 1000 * 60 * 60 * 24 * 42); // 42 days from now

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // // Soft ambient halo background (subtle, no counters)
  // useEffect(() => {
  // const canvas = canvasRef.current;
  // if (!canvas) return;
  // let ctx = canvas.getContext("2d");
  // if (!ctx) return;
  //   const DPR = window.devicePixelRatio || 1;
  //   function resize() {
  //     if (!canvas) return;
  //     canvas.width = window.innerWidth * DPR;
  //     canvas.height = window.innerHeight * DPR;
  //     canvas.style.width = window.innerWidth + "px";
  //     canvas.style.height = window.innerHeight + "px";
  //     ctx = canvas.getContext("2d");
  //     if (ctx) {
  //       ctx.scale(DPR, DPR);
  //     }
  //   }
  //   resize();
  //   window.addEventListener("resize", resize);
  //   const particles = Array.from({ length: 40 }, () => ({
  //     x: Math.random() * window.innerWidth,
  //     y: Math.random() * window.innerHeight,
  //     r: 0.6 + Math.random() * 2.2,
  //     dx: -0.3 + Math.random() * 0.6,
  //     dy: -0.3 + Math.random() * 0.6,
  //     hue: Math.random() > 0.5 ? 40 : 150,
  //   }));
  //   function draw() {
  //     if (!canvas || !ctx) return;
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  //     ctx.save();
  //     ctx.globalCompositeOperation = "lighter";
  //     particles.forEach(p => {
  //       if (!ctx) return;
  //       p.x += p.dx * 0.6;
  //       p.y += p.dy * 0.6;
  //       if (p.x < -50) p.x = window.innerWidth + 50; else if (p.x > window.innerWidth + 50) p.x = -50;
  //       if (p.y < -50) p.y = window.innerHeight + 50; else if (p.y > window.innerHeight + 50) p.y = -50;
  //       const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 18);
  //       g.addColorStop(0, `hsla(${p.hue} 55% 60% / 0.85)`);
  //       g.addColorStop(0.35, `hsla(${p.hue} 45% 60% / 0.32)`);
  //       g.addColorStop(1, `hsla(${p.hue} 45% 55% / 0)`);
  //       ctx.fillStyle = g;
  //       ctx.beginPath();
  //       ctx.arc(p.x, p.y, p.r * 18, 0, Math.PI * 2);
  //       ctx.fill();
  //     });
  //     ctx.restore();
  //     requestAnimationFrame(draw);
  //   }
  //   draw();
  //   return () => window.removeEventListener("resize", resize);
  // }, []);

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
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none z-[-1] bg-gradient-to-b from-[rgba(201,164,107,0.18)] via-[rgba(201,164,107,0.08)] to-transparent" />
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 pb-20 items-center px-6">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.04] text-[color:var(--soft)] text-sm">Winter Sale</span>
            <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-5xl leading-tight tracking-[-0.02em] mt-4 mb-3">Premium feel, Crafted to last</h1>
            <p className="text-[color:var(--soft)] text-lg max-w-[58ch]">Soft, breathable fabrics and thoughtful silhouettes—made for comfort, care, and everyday elegance. Sign up for first access. Lorem</p>
            <ul>
            </ul>
            <div className="flex gap-4 mt-6 flex-wrap">
              <a
                href="#newsletter"
                className="inline-flex items-center gap-2 rounded-[18px] px-5 py-3 font-semibold text-white border border-[color:var(--line-color)] shadow-[0_2px_10px_-2px_hsl(var(--accent-rgb)/0.55)] bg-[linear-gradient(92deg,var(--accent),var(--accent-2))] hover:shadow-[0_4px_20px_-4px_hsl(var(--accent-rgb)/0.7)] transition"
              >
                <span className="inline-block w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_0_6px_hsl(var(--accent-rgb)/0.18)]" />
                Get Early Access
              </a>
              <a
                href="#featured"
                className="inline-flex items-center gap-2 rounded-[18px] px-5 py-3 border border-[color:var(--line-color)] text-[color:var(--foreground)] bg-[linear-gradient(180deg,color-mix(in_oklab,var(--foreground)_6%,transparent),color-mix(in_oklab,var(--foreground)_3%,transparent))] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.35)] hover:-translate-y-0.5 transition transform"
              >
                Explore Preview
              </a>
            </div>
          </div>
          <div className="rounded-2xl border border-[color:var(--line-color)] backdrop-blur-xl mt-10 backdrop-saturate-150 ">
            {/* <canvas ref={canvasRef} className="pointer-events-none w-full h-[260px] md:h-[340px]" /> */}
            <Image src="/clothes1.jpg" alt="Aama Ko Nana clothing preview" width={800} height={800} className="w-full h-[260px] md:h-[340px] object-cover rounded-2xl shadow-[0_4px_16px_rgba(0,0,0,0.12)]" />
          </div>
        </div>
      </section>

      <section id="newsletter" className="mx-auto max-w-2xl px-6 space-y-7" aria-label="Newsletter">
        <form onSubmit={handleSubmit} className="flex gap-3 w-full" noValidate>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Email for first access"
            aria-label="Email address"
            value={email}
            onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
            className="flex-1 rounded-[28px] border border-[color:var(--line-color)] bg-[linear-gradient(160deg,color-mix(in_oklab,var(--foreground)_8%,transparent),color-mix(in_oklab,var(--foreground)_2%,transparent))] px-4 py-3 font-medium text-[color:var(--foreground)] outline-none backdrop-blur-lg backdrop-saturate-150 transition placeholder:text-[color:var(--muted)] placeholder:tracking-[0.5px] focus:border-[var(--accent)] focus:ring-2 focus:ring-[color:var(--accent)] shadow-[0_4px_18px_-6px_rgba(0,0,0,0.2)]"
          />
          <button
            type="submit"
            className="min-w-[140px] flex justify-center items-center rounded-[18px] px-5 py-3 font-semibold text-white border border-[color:var(--line-color)] shadow-[0_2px_10px_-2px_hsl(var(--accent-rgb)/0.55)] bg-[linear-gradient(92deg,var(--accent),var(--accent-2))] hover:shadow-[0_4px_20px_-4px_hsl(var(--accent-rgb)/0.7)] transition focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]"
            disabled={status === "loading" || status === "success"}
          >
            {status === "idle" && "Notify Me"}
            {status === "loading" && "Sending…"}
            {status === "success" && "On the list"}
            {status === "error" && "Try Again"}
          </button>
        </form>
        {status === "error" && (
          <p className="text-xs font-medium text-[color:var(--warn)]">Please enter a valid email.</p>
        )}
        {status === "success" && (
          <p className="text-xs font-medium text-[color:var(--accent)]">You&apos;re in. We&apos;ll share fabric stories &amp; first release dates soon.</p>
        )}
      </section>

        <section id="story" className="mx-auto max-w-3xl px-6 py-12" aria-label="Our Story">
          <div className="rounded-2xl p-6 border border-[color:var(--line-color)] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--foreground)_6%,transparent),color-mix(in_oklab,var(--foreground)_2%,transparent))] backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_-2px_color-mix(in_oklab,var(--foreground)_25%,transparent),0_2px_6px_-1px_color-mix(in_oklab,black_40%,transparent)] grid gap-4">
            <h3 className="text-2xl font-semibold">A gentle start</h3>
            <p className="text-[color:var(--muted)]">Born in Nepal, crafted in small batches. We design essentials for moms and newborns with care-first materials and timeless silhouettes.</p>
          </div>
        </section>

        <section id="materials" className="mx-auto max-w-3xl px-6 py-4" aria-label="Materials">
          <div className="rounded-2xl p-6 border border-[color:var(--line-color)] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--foreground)_6%,transparent),color-mix(in_oklab,var(--foreground)_2%,transparent))] backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_-2px_color-mix(in_oklab,var(--foreground)_25%,transparent),0_2px_6px_-1px_color-mix(in_oklab,black_40%,transparent)] grid gap-4">
            <h3 className="text-2xl font-semibold">Materials that breathe</h3>
            <p className="text-[color:var(--muted)]">Soft cottons, gentle blends, and washable comfort. Pre-washed for immediate softness and made to last through everyday care.</p>
          </div>
        </section>

        <section id="care" className="mx-auto max-w-3xl px-6 pt-4 pb-12" aria-label="Care">
          <div className="rounded-2xl p-6 border border-[color:var(--line-color)] bg-[linear-gradient(140deg,color-mix(in_oklab,var(--foreground)_6%,transparent),color-mix(in_oklab,var(--foreground)_2%,transparent))] backdrop-blur-xl backdrop-saturate-150 shadow-[0_4px_24px_-2px_color-mix(in_oklab,var(--foreground)_25%,transparent),0_2px_6px_-1px_color-mix(in_oklab,black_40%,transparent)] grid gap-4">
            <h3 className="text-2xl font-semibold">Care made simple</h3>
            <p className="text-[color:var(--muted)]">Machine-washable essentials designed to hold shape and softness. Your routine stays easy, your comfort stays premium.</p>
          </div>
        </section>
    </div>
  );
}
