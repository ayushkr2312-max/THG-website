import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView, useMotionValue, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

// --- Animated Counter Hook ---
export const useCounter = (end, duration = 2000, inView = false) => {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);
  useEffect(() => {
    if (!inView || hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = Date.now();
    const numericEnd = parseInt(String(end).replace(/[^0-9]/g, ''));
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * numericEnd));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, end, duration]);
  return count;
};

// --- Section Reveal ---
export const SectionReveal = ({ children, className = '', delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >{children}</motion.div>
  );
};

// --- Stagger Container ---
export const StaggerContainer = ({ children, className = '', staggerDelay = 0.1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: staggerDelay } } }}
      className={className}
    >{children}</motion.div>
  );
};

export const StaggerItem = ({ children, className = '' }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
    }}
    className={className}
  >{children}</motion.div>
);

// --- GSAP Split Text (subtle by default) ---
export const GsapSplitText = ({
  text,
  as: Tag = 'span',
  className = '',
  charClassName = '',
  delay = 0,
  duration = 0.55,
  stagger = 0.02,
  y = 14,
  triggerThreshold = 0.45,
}) => {
  const rootRef = useRef(null);
  const chars = useMemo(() => Array.from(text || ''), [text]);

  useGSAP(() => {
    const root = rootRef.current;
    if (!root) return;

    const splitChars = root.querySelectorAll('[data-gsap-char]');
    if (!splitChars.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(splitChars, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(splitChars, { opacity: 0, y });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        gsap.to(splitChars, {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          delay,
          ease: 'power2.out',
          overwrite: 'auto',
        });
        observer.disconnect();
      },
      { threshold: triggerThreshold }
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, { scope: rootRef });

  return (
    <Tag ref={rootRef} className={className} aria-label={text}>
      {chars.map((char, index) => (
        <span
          // eslint-disable-next-line react/no-array-index-key
          key={`${char}-${index}`}
          data-gsap-char
          className={`inline-block will-change-transform ${charClassName}`}
          style={char === ' ' ? { width: '0.345em' } : {}}
        >
          {char === ' ' ? '' : char}
        </span>
      ))}
    </Tag>
  );
};

// --- 3D Tilt Card ---
export const TiltCard = ({ children, className = '' }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });
  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => { x.set(0); y.set(0); };
  return (
    <div className="perspective-1000">
      <motion.div ref={ref} onMouseMove={handleMouse} onMouseLeave={handleLeave}
        style={{ rotateX, rotateY }} className={`preserve-3d ${className}`}
      >{children}</motion.div>
    </div>
  );
};

// --- Section Heading (diamond blue theme) ---
export const SectionHeading = ({ preText, accentText, accentColor = 'text-yellow-400', subtitle }) => {
  const ref = useRef(null);
  const lineRef = useRef(null);
  const subtitleRef = useRef(null);

  useGSAP(() => {
    if (!ref.current || !lineRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const runReveal = () => {
      gsap.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center', autoAlpha: 1 },
        {
          scaleX: 1,
          duration: prefersReducedMotion ? 0 : 0.7,
          ease: 'power2.out',
          overwrite: 'auto',
        }
      );

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { y: prefersReducedMotion ? 0 : 12, autoAlpha: prefersReducedMotion ? 1 : 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: prefersReducedMotion ? 0 : 0.65,
            delay: prefersReducedMotion ? 0 : 0.18,
            ease: 'power2.out',
            overwrite: 'auto',
          }
        );
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        runReveal();
        observer.disconnect();
      },
      { threshold: 0.2 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, { scope: ref });

  return (
    <div ref={ref} className="mb-16">
      <div
        ref={lineRef}
        className="h-1 w-16 bg-gradient-to-r from-yellow-400 to-amber-500 mb-6 origin-left"
      />
      <h2 className="text-5xl md:text-6xl font-black italic tracking-[0.085em] text-white">
        <GsapSplitText
          text={`${preText} `}
          as="span"
          className="inline"
          delay={0.06}
          duration={0.5}
          stagger={0.018}
          y={10}
        />
        <GsapSplitText
          text={accentText}
          as="span"
          className={`inline ${accentColor}`}
          delay={0.12}
          duration={0.56}
          stagger={0.02}
          y={12}
        />
      </h2>
      {subtitle && (
        <p
          ref={subtitleRef}
          className="text-zinc-400 font-medium text-lg md:text-xl mt-4 max-w-2xl"
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

// --- Floating Particles (blue/purple) ---
export const FloatingParticles = ({ count = 30 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 3 + 1, duration: Math.random() * 10 + 10,
    delay: Math.random() * 5, isBlue: Math.random() > 0.3,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div key={p.id}
          className={`absolute rounded-full ${p.isBlue ? 'bg-yellow-400/20' : 'bg-amber-400/20'}`}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
};
