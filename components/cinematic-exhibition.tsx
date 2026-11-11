'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Locale } from '@/lib/content';
import assets from '@/lib/media-assets.json';

export function CinematicExhibition({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null), canvas = useRef<HTMLCanvasElement>(null);
  const [enabled, setEnabled] = useState(true);
  const fa = locale === 'fa';
  useEffect(() => {
    const element = root.current, surface = canvas.current;
    if (!element || !surface || !enabled) return;
    const query = matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (connection?.saveData) return;
    let cancelled = false, dispose: (() => void) | undefined;
    const stop = () => { cancelled = true; dispose?.(); delete element.dataset.enhanced; };
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(e => e.isIntersecting) || !query.matches) return;
      observer.disconnect();
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
        if (cancelled || !query.matches) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = surface.getContext('2d'); if (!context) return;
        const cache = new Map<number, HTMLImageElement>(), pending = new Set<number>();
        let wanted = 1, raf = 0;
        const draw = () => {
          raf = 0; if (cancelled) return;
          const nearest = [...cache.keys()].sort((a,b) => Math.abs(a-wanted)-Math.abs(b-wanted))[0];
          if (nearest === undefined) return;
          context.drawImage(cache.get(nearest)!, 0, 0, 1280, 720);
          element.dataset.frame = String(nearest);
          element.style.setProperty('--progress', String((wanted-1)/101));
        };
        const requestDraw = () => { if (!raf) raf = requestAnimationFrame(draw); };
        const load = (n: number) => {
          if (n < 1 || n > 102 || cache.has(n) || pending.has(n) || pending.size >= 6) return;
          pending.add(n); const image = new window.Image();
          image.onload = () => {
            pending.delete(n); if (cancelled) return;
            cache.set(n, image);
            // Keep decoded memory bounded while supporting reverse scrubbing.
            if (cache.size > 20) {
              const farthest = [...cache.keys()].sort((a,b) => Math.abs(b-wanted)-Math.abs(a-wanted))[0]; cache.delete(farthest);
            }
            requestDraw(); load(wanted);
          };
          image.onerror = () => pending.delete(n);
          image.src = `${assets.sequence.base}${String(n).padStart(3,'0')}.webp`;
        };
        const playhead = { frame: 1 };
        element.dataset.enhanced = 'true';
        const tween = gsap.to(playhead, { frame: 102, ease: 'none', onUpdate: () => {
          wanted = Math.round(playhead.frame); load(wanted);
          for (const offset of [1,-1,2,-2,3]) load(wanted+offset);
          requestDraw();
        }, scrollTrigger: { trigger: element, start: 'top top', end: 'bottom bottom', scrub: 0.35, invalidateOnRefresh: true } });
        load(1); ScrollTrigger.refresh();
        dispose = () => { tween.scrollTrigger?.kill(); tween.kill(); cancelAnimationFrame(raf); cache.clear(); };
      }).catch(() => { delete element.dataset.enhanced; });
    }, { rootMargin: '400px' });
    observer.observe(element);
    const changed = () => { if (!query.matches) stop(); };
    query.addEventListener('change', changed);
    return () => { observer.disconnect(); query.removeEventListener('change', changed); stop(); };
  }, [enabled]);
  return <section ref={root} id="cinema" className="cinema dark-section" aria-label={fa ? 'روایت تصویری نمایشگاه تهران' : 'Tehran exhibition visual story'}>
    <div className="cinema-stage">
      <div className="cinema-image"><Image src={assets.P012[0].src} width={1600} height={900} alt={fa ? 'رندر معماری نمایشگاه ایکس‌پوینت تهران' : 'Architectural render of XPoint Tehran exhibition'} sizes="100vw"/><canvas ref={canvas} width={1280} height={720} aria-hidden="true"/></div>
      <div className="cinema-caption"><p className="eyebrow">P012 / {fa ? 'تهران، ۱۴۰۴' : 'Tehran, 1404'}</p><h2>{fa ? 'هویت فروشگاهی، در مقیاس نمایشگاه.' : 'Retail identity. Exhibition scale.'}</h2><p>{fa ? 'بخشی پیوسته از انیمیشن رندر اصلی؛ حرکت دوربین با اسکرول شما به جلو و عقب می‌رود.' : 'A continuous segment of the original rendered animation, scrubbed forward and backward with your scroll.'}</p><div className="cinema-links"><a href="#cinema-end">{fa ? 'عبور از روایت ↓' : 'Skip story ↓'}</a><button onClick={() => setEnabled(false)} hidden={!enabled}>{fa ? 'نمایش تصاویر ثابت' : 'Use still views'}</button><Link href={`/${locale}/projects/xpoint-tehran-exhibition`}>{fa ? 'مشاهده پروژه ↗' : 'View project ↗'}</Link></div></div>
      <div className="cinema-progress" aria-hidden="true"/>
    </div>
    <div className="cinema-stills">{assets.P012.slice(1,4).map((m,i) => <figure key={m.src}><Image src={m.src} width={m.width} height={m.height} sizes="(max-width:900px) 100vw, 33vw" alt={fa ? `رندر نمایشگاه تهران، نمای ${i+1}` : `Tehran exhibition render, view ${i+1}`}/><figcaption>{fa ? 'رندر معماری' : 'Architectural render'} / 0{i+1}</figcaption></figure>)}</div>
    <div id="cinema-end" className="cinema-end"><span>{fa ? 'کانسپت ← سازمان‌دهی فضا ← نمایش محصول' : 'Concept → Spatial organization → Product presentation'}</span><span>{fa ? 'رندر؛ عکس اجرای واقعی نیست' : 'Rendered imagery · Not built photography'}</span></div>
  </section>;
}
