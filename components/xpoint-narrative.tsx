'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { Locale } from '@/lib/content';
import { selectedProjects } from '@/lib/content';
import { MediaSlot } from './portfolio';
import { ZoomMedia } from './zoom-media';

// Editorial stages explain the completed system; they are not dated design iterations.
export function XPointNarrative({ locale }: { locale: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const controller = useRef<{ go: (index: number) => void; skip: () => void } | null>(null);
  useEffect(() => {
    if (!window.matchMedia('(min-width: 1000px) and (prefers-reduced-motion: no-preference)').matches) return;
    let cancelled = false, dispose: (() => void) | undefined;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        const viewport = root.current!.querySelector<HTMLElement>('.story-viewport')!;
        const chapters = [...viewport.querySelectorAll<HTMLElement>('.story-chapter')];
        viewport.dataset.interactive = 'true';
        chapters.forEach((chapter,i) => gsap.set(chapter,{zIndex:i+1}));
        gsap.set(chapters.slice(1), { clipPath: 'inset(0 0 100% 0)', visibility: 'hidden' });
        const timeline = gsap.timeline({ scrollTrigger: { trigger: viewport, start: 'top top+=100', end: '+=2800', pin: true, scrub: 0.12, anticipatePin: 1, onUpdate: self => { const active = Math.min(4,Math.floor(self.progress * 5)); viewport.dataset.stage = String(active); chapters.forEach((chapter,i) => { chapter.inert = i !== active; }); root.current?.querySelectorAll('.story-index a,.story-stage-nav a').forEach((a,i) => { if (i % 5 === active) a.setAttribute('aria-current','step'); else a.removeAttribute('aria-current'); }); } } });
        chapters.forEach((chapter, i) => {
          if (!i) { timeline.to(chapter.querySelector('.media-slot'), { scale: 1.04, duration: 1 }); return; }
          timeline.set(chapter, { visibility: 'visible' })
            .fromTo(chapter, { clipPath: i % 2 ? 'inset(0 100% 0 0)' : 'inset(100% 0 0 0)' }, { clipPath: 'inset(0 0 0 0)', duration: 0.8 })
            .fromTo(chapter.querySelector('.media-slot'), { scale: 1.18, xPercent: i % 2 ? 6 : -6 }, { scale: 1, xPercent: 0, duration: 1 }, '<')
            .fromTo(chapter.querySelector('.story-copy'), { y: 85 }, { y: 0, duration: 0.8 }, '<')
            .fromTo(chapter.querySelectorAll('.story-copy h3,.story-copy > p:not(.eyebrow)'), {xPercent:i%2?-12:12,opacity:.25}, {xPercent:0,opacity:1,stagger:.08,duration:.65}, '<')
            .fromTo(chapter.querySelectorAll('.system-components li,.branch-grid article'), {y:100,rotation:2,opacity:0}, {y:0,rotation:0,opacity:1,stagger:.12,duration:.65}, '<')
            .set(chapters[i-1], { visibility: 'hidden' });
        });
        controller.current = { go: index => { const st = timeline.scrollTrigger!; window.scrollTo({top:st.start + (st.end-st.start)*((index+.9)/5),behavior:'instant'}); }, skip: () => { timeline.scrollTrigger?.kill(true); timeline.kill(); chapters.forEach(chapter => {chapter.inert=false;}); gsap.set(chapters,{clearProps:'all'}); gsap.set(viewport.querySelectorAll('.story-copy,.media-slot,.story-copy h3,.story-copy > p,.system-components li,.branch-grid article'),{clearProps:'transform,opacity,visibility,clipPath'}); delete viewport.dataset.interactive; delete viewport.dataset.stage; controller.current=null; requestAnimationFrame(()=>document.getElementById('xpoint-story-end')?.scrollIntoView({block:'start',behavior:'instant'})); } };
        return () => { controller.current = null; chapters.forEach(chapter => { chapter.inert = false; }); delete viewport.dataset.interactive; delete viewport.dataset.stage; };
      }, root);
      dispose = () => mm.revert();
    });
    return () => { cancelled = true; dispose?.(); };
  }, []);
  const fa = locale === 'fa';
  const tabriz = selectedProjects.find(p => p.id === 'P020')!;
  const langarud = selectedProjects.find(p => p.id === 'P021')!;
  const exhibition = selectedProjects.find(p => p.id === 'P012')!;
  const kazerun = selectedProjects.find(p => p.id === 'P024')!;
  const stages = [
    { id: 'brand-identity', en: 'Brand Identity', fa: 'هویت برند',
      text: fa ? 'هویت بصری موجود ایکس‌پوینت، مبنای طراحی معماری بود. وظیفه من ترجمه این هویت به تجربه‌ای فضایی و کاربردی بود؛ هویت گرافیکی برند توسط تیم مربوط توسعه یافته است.' : 'XPoint’s established visual identity provided the foundation. My role was to translate it into a functional spatial experience; the graphic brand identity was developed by the respective team.',
      note: fa ? 'کاربرد هویت برند در رندر نهایی تبریز.' : 'Brand application in the final Tabriz render.', media: tabriz.media[0] },
    { id: 'architectural-language', en: 'Architectural Language', fa: 'زبان معماری',
      text: fa ? 'یک جهت‌گیری اصلی به‌تدریج به زبان معماری منسجم تبدیل شد. سازمان‌دهی فضا، متریال، نورپردازی و نحوه نمایش محصول در ارتباط با یکدیگر توسعه یافتند تا هویت برند در مقیاس فروشگاه خوانا شود.' : 'One main design direction developed progressively into a coherent architectural language. Spatial organization, materials, lighting and product presentation were developed together to make the brand legible at store scale.',
      note: fa ? 'رندر نهایی معماری · P020 تبریز' : 'Final architectural render · P020 Tabriz', media: tabriz.media[1] },
    { id: 'design-system', en: 'Design System', fa: 'سیستم طراحی',
      text: fa ? 'اجزای سیستم، از استند و نمایشگر محصول تا تابلو، نور و متریال، در یک چارچوب مشترک کنار هم قرار گرفتند. جانمایی و نقشه‌های فاز دو، این زبان را به ابعاد، ارتباطات فضایی و جزئیات قابل اجرا متصل می‌کنند.' : 'Displays, product fixtures, signage, lighting and materials work within a shared framework. Store layouts and Phase II documentation connect this language to dimensions, spatial relationships and buildable details.',
      note: fa ? 'P024 کازرون · عکس اجرای واقعی قاب نمایش و نور خطی؛ خوانش تحلیلی اجزای سیستم.' : 'P024 Kazerun · Built display frame and linear lighting; a retrospective reading of documented components.', media: kazerun.media.find(m => m.kind === 'built')! },
    { id: 'store-adaptation', en: 'Adaptation Across Stores', fa: 'تطبیق در شعب مختلف',
      text: fa ? 'تبریز مطالعه اصلی است؛ لنگرود نمونه تطبیق سیستم با هندسه‌ای متفاوت. مقایسه جانمایی‌ها نشان می‌دهد چگونه اجزای مشترک با تناسبات فضا، مسیر حرکت و نحوه استقرار محصولات هماهنگ می‌شوند.' : 'Tabriz is the primary study; Langarud shows the system adapting to a different footprint. Comparing their layouts explains how shared components respond to spatial proportions, circulation and product placement.',
      note: fa ? 'P020 تبریز / P021 لنگرود · دو شعبه، نه دو کانسپت رقیب' : 'P020 Tabriz / P021 Langarud · Two branches, not competing concepts', media: langarud.media[0] },
    { id: 'built-results', en: 'Built Results', fa: 'نتایج اجرا',
      text: fa ? 'این هویت معماری در ۱۲ فروشگاه و یک نمایشگاه اجرا شده است. تصاویر شعب اجراشده و مستندات نمایشگاه تهران، کاربرد سیستم در مقیاس‌ها و شرایط متفاوت را نشان می‌دهند.' : 'Implemented in 12 stores and one exhibition. Built-store imagery and Tehran exhibition documentation show the system working across different scales and conditions.',
      note: fa ? 'P021 لنگرود · عکس اجرای واقعی' : 'P021 Langarud · Built photograph', media: langarud.media.filter(m => m.kind === 'built')[4] },
  ];
  return <div ref={root} className="branch-study xpoint-narrative">
    <div className="branch-narrative"><p className="eyebrow">{fa ? 'تکامل یک جهت‌گیری اصلی' : 'One direction, progressively developed'}</p><h3>{fa ? 'از هویت برند تا اجرای یک سیستم معماری.' : 'From brand identity to an architectural system in practice.'}</h3><p>{fa ? 'خوانشی از یک سیستم معماری: از هویت برند و سازمان‌دهی فضا تا اجزای طراحی، تطبیق در شعب و نتیجه اجرا.' : 'An architectural reading of one system: from brand identity and spatial organization to design components, store adaptation and built results.'}</p></div>
    <nav className="story-index" aria-label={fa ? 'فصل‌های مطالعه ایکس‌پوینت' : 'XPoint case study chapters'}>{stages.map((s,i) => <a key={s.id} href={`#xpoint-${s.id}`} onClick={event => { if (controller.current) { event.preventDefault(); controller.current.go(i); } }}><span dir="ltr">0{i+1}</span> {fa ? s.fa : s.en}</a>)}</nav><button className="story-skip text-link" onClick={() => { if (controller.current) controller.current.skip(); else document.getElementById('xpoint-story-end')?.scrollIntoView(); }}>{fa ? 'عبور از روایت ↓' : 'Skip story ↓'}</button>
    <div className="story-viewport"><nav className="story-stage-nav" aria-label={fa ? 'انتخاب فصل روایت' : 'Choose story chapter'}>{stages.map((s,i)=><a key={s.id} href={`#xpoint-${s.id}`} onClick={event=>{if(controller.current){event.preventDefault();controller.current.go(i);}}}><span dir="ltr">0{i+1}</span> {fa?s.fa:s.en}</a>)}<button onClick={()=>controller.current?.skip()}>{fa?'عبور ↓':'Skip ↓'}</button></nav>{stages.map((s,i) => <section className="story-chapter" id={`xpoint-${s.id}`} key={s.id} aria-labelledby={`xpoint-title-${s.id}`}>
      <div className="story-copy" data-reveal><p className="eyebrow" dir="ltr">0{i+1} / XPOINT</p><h3 id={`xpoint-title-${s.id}`}>{fa ? s.fa : s.en}</h3><p>{s.text}</p></div>
      <div data-reveal><MediaSlot media={s.media} locale={locale}/><p className="credit">{s.note}</p></div>
      {s.id === 'design-system' && <ul className="system-components">{(fa ? ['جانمایی و حرکت','نمایش محصول و استند','متریال و نور','تابلو و جزئیات اجرایی'] : ['Planning & circulation','Product displays & fixtures','Materials & lighting','Signage & buildable details']).map(label => <li key={label}>{label}</li>)}</ul>}
      {s.id === 'store-adaptation' && <div className="branch-grid">{[tabriz,langarud].map(p => <article key={p.id}><Link prefetch={false} href={`/${locale}/projects/${p.slug}`}><h3><bdi>{p.id} / {p.shortTitle}</bdi> ↗</h3></Link><ZoomMedia media={p.media.find(m => m.kind === 'drawing')!} locale={locale}/><p className="credit">{p.statusNote?.[locale]}</p></article>)}</div>}
      {s.id === 'built-results' && <><Link prefetch={false} className="text-link" href={`/${locale}/projects/xpoint-noor`}>{fa ? 'اجرای نور' : 'Noor built store'} ↗</Link><Link prefetch={false} className="text-link" href={`/${locale}/projects/xpoint-isfahan`}>{fa ? 'اجرای اصفهان / P017' : 'Isfahan built store / P017'} ↗</Link></>}{s.id === 'built-results' && <Link prefetch={false} className="text-link" href={`/${locale}/projects/xpoint-kazerun`}>{fa ? 'عکس‌های اجرای کازرون / P024' : 'Kazerun built photographs / P024'} ↗</Link>}{s.id === 'built-results' && <Link prefetch={false} className="text-link" href={`/${locale}/projects/${exhibition.slug}`}>{fa ? 'مستندات نمایشگاه تهران' : 'Explore the Tehran exhibition'} ↗</Link>}
    </section>)}</div><span id="xpoint-story-end"/>
  </div>;
}
