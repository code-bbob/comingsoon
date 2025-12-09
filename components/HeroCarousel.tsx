"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  eyebrow?: string;
  copy: string;
  imageSrc: string;
  imageAlt: string;
  reverse?: boolean;
};

const slides: Slide[] = [
  {
    eyebrow: "New Arrival • Winter '25",
    title: "Luxury layers. Effortless form.",
    copy: "Tailored silhouettes in soft-touch fabrics with mindful details. Crafted for comfort, built to last.",
    imageSrc: "/babyimage.avif",
    imageAlt: "Premium apparel hero look",
  },
  {
    eyebrow: "Handmade Atelier",
    title: "Designed in Nepal, worn worldwide.",
    copy: "A fusion of timeless minimalism and local craftsmanship—subtle textures, rich hues, precision finish.",
    imageSrc: "/babyimage.avif",
    imageAlt: "Craftsmanship detail shot",
    reverse: true,
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timerRef = useRef<number | null>(null);
  const touch = useRef<{ startX: number; dx: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const advance = () => setIndex((i) => (i + 1) % slides.length);
    if (!isHovering) {
      timerRef.current = window.setInterval(advance, 5500);
    }
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [isHovering]);

  useEffect(() => {
    const active = slideRefs.current[index];
    const track = trackRef.current;
    if (active && track) {
      track.style.height = `${active.offsetHeight}px`;
      track.style.transition = "height 400ms ease";
    }
  }, [index]);

  const go = (i: number) => {
    setIndex(i % slides.length);
    if (timerRef.current) { window.clearInterval(timerRef.current); timerRef.current = null; }
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  const onTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0].clientX;
    touch.current = { startX: x, dx: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return;
    touch.current.dx = e.touches[0].clientX - touch.current.startX;
  };
  const onTouchEnd = () => {
    if (!touch.current) return;
    const { dx } = touch.current;
    if (Math.abs(dx) > 50) {
      dx < 0 ? next() : prev();
    }
    touch.current = null;
  };

  return (
    <section className="relative overflow-hidden b">
      {/* Luxe background aura */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,164,107,0.22)] via-[rgba(201,164,107,0.08)] to-transparent" />
        <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-[96px] bg-[color:var(--foreground)/0.08]" />
        <div className="absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-[96px] bg-[color:var(--soft)/0.08]" />
      </div>
      <div className="mx-auto max-w-7xl relative h-[90vh] flex flex-col">
        <div
          className="carousel-track flex-1"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          onFocus={() => setIsHovering(true)}
          onBlur={() => setIsHovering(false)}
          role="region"
          aria-label="Product carousel"
          aria-roledescription="carousel"
        >
          {slides.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => { slideRefs.current[i] = el; }}
              className={`carousel-slide ${index === i ? "is-active" : "is-next"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 md:px-8 py-12 md:py-20">
                {s.reverse ? (
                  <>
                    <div className="group rounded-3xl border border-[color:var(--line-color)] mt-10 order-last md:order-first overflow-hidden bg-gradient-to-br from-[color:var(--foreground)/0.04] to-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-500">
                      <div className="relative">
                        <Image
                          src={s.imageSrc}
                          alt={s.imageAlt}
                          width={1200}
                          height={800}
                          className="w-full h-[280px] md:h-[420px] object-cover will-change-transform"
                        />
                        {/* Ken Burns subtle zoom when active */}
                        <div className={`absolute inset-0 transition-transform duration-[3000ms] ${index === i ? "scale-105" : "scale-100"}`} />
                        {/* Premium overlay with metallic sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/5 mix-blend-soft-light" />
                        {/* Glossy light reflection */}
                        <div className="absolute -inset-px bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                    <div>
                      {s.eyebrow && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.06] text-[color:var(--soft)] text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                          {s.eyebrow}
                        </span>
                      )}
                      <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] mt-4 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] via-[color:var(--foreground)] to-[rgba(201,164,107,1)]">
                          {s.title}
                        </span>
                      </h1>
                      <p className="text-[color:var(--soft)] text-lg md:text-xl max-w-[60ch]">
                        {s.copy}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() => go(i + 1)}
                          className="px-5 py-2.5 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm tracking-wide hover:opacity-95"
                        >
                          Shop New In
                        </button>
                        <button
                          className="px-5 py-2.5 rounded-full border border-[color:var(--line-color)] text-[color:var(--foreground)] text-sm tracking-wide hover:bg-[color:var(--foreground)/0.06]"
                        >
                          View Lookbook
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      {s.eyebrow && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.06] text-[color:var(--soft)] text-sm">
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                          {s.eyebrow}
                        </span>
                      )}
                      <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] mt-4 mb-4">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] via-[color:var(--foreground)] to-[rgba(201,164,107,1)]">
                          {s.title}
                        </span>
                      </h1>
                      <p className="text-[color:var(--soft)] text-lg md:text-xl max-w-[60ch]">
                        {s.copy}
                      </p>
                      <div className="mt-6 flex items-center gap-3">
                        <button
                          onClick={() => go(i + 1)}
                          className="px-5 py-2.5 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm tracking-wide hover:opacity-95"
                        >
                          Explore Collection
                        </button>
                        <button
                          className="px-5 py-2.5 rounded-full border border-[color:var(--line-color)] text-[color:var(--foreground)] text-sm tracking-wide hover:bg-[color:var(--foreground)/0.06]"
                        >
                          Sustainability
                        </button>
                      </div>
                    </div>
                    <div className="group rounded-3xl border border-[color:var(--line-color)] mt-10 overflow-hidden bg-gradient-to-br from-[color:var(--foreground)/0.04] to-transparent backdrop-blur-sm shadow-xl hover:shadow-2xl transition-shadow duration-500">
                      <div className="relative">
                        <Image
                          src={s.imageSrc}
                          alt={s.imageAlt}
                          width={1200}
                          height={800}
                          className="w-full h-[280px] md:h-[420px] object-cover will-change-transform"
                        />
                        {/* Ken Burns subtle zoom when active */}
                        <div className={`absolute inset-0 transition-transform duration-[3000ms] ${index === i ? "scale-105" : "scale-100"}`} />
                        {/* Premium overlay with metallic sheen */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/5 mix-blend-soft-light" />
                        {/* Glossy light reflection */}
                        <div className="absolute -inset-px bg-gradient-to-br from-white/30 via-transparent to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Controls + premium pager - Glassy */}
        <div className="absolute left-0 right-0 bottom-8 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex items-center gap-6 px-6 py-4 rounded-full border border-[color:var(--line-color)] bg-white/10 backdrop-blur shadow-2xl" role="toolbar" aria-label="Carousel controls" style={{pointerEvents: 'auto', WebkitBackdropFilter: 'blur(16px) saturate(120%)'}}>
            <button
              aria-label="Previous slide"
              onClick={prev}
              onKeyDown={onKeyDown}
            //   className="h-4 w-4 grid place-items-center rounded-full bg-gradient-to-br from-[color:var(--foreground)/0.15] to-[color:var(--foreground)/0.08] border border-[color:var(--line-color)] text-[color:var(--foreground)] hover:from-[color:var(--foreground)/0.25] hover:to-[color:var(--foreground)/0.15] transition-all cursor-pointer active:scale-95 shadow-lg hover:shadow-xl font-bold text-lg"
              tabIndex={1}
            >
              ‹
            </button>
        
            <button
              aria-label="Next slide"
              onClick={next}
              onKeyDown={onKeyDown}
            //   className="h-4 w-4 grid place-items-center rounded-full bg-gradient-to-br from-[color:var(--foreground)/0.15] to-[color:var(--foreground)/0.08] border border-[color:var(--line-color)] text-[color:var(--foreground)] hover:from-[color:var(--foreground)/0.25] hover:to-[color:var(--foreground)/0.15] transition-all cursor-pointer active:scale-95 shadow-lg hover:shadow-xl font-bold text-lg"
              tabIndex={0}
            >
              ›
            </button>
          </div>
        </div>

        {/* Brand marquee for premium feel */}
        <div className="px-6 py-8 flex items-center justify-center gap-8 opacity-70">
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">ORGANIC</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">SUSTAINABLE</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">HANDMADE</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">ETHICAL</span>
        </div>
      </div>
    </section>
  );
}
