'use client';
import { ZoomMedia } from './zoom-media';
import { Profile } from './profile';
import { ProjectVideos } from './project-videos';

import Link from 'next/link';
import { ResponsiveImage as Image } from './responsive-image';
import { useEffect, useRef, useState } from 'react';
import type { Locale, Media, Project } from '@/lib/content';
import { experience, projects, featuredProjects, tools, ui } from '@/lib/content';

import { CinematicHero } from './cinematic-hero';
import { BranchComparison } from './branch-comparison';

function useMotion() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let dispose: (() => void) | undefined; let cancelled = false;
    if (!window.matchMedia('(min-width: 1000px) and (prefers-reduced-motion: no-preference)').matches) return;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        // Essential content is visible in server HTML and remains visible if JS fails.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => {
          gsap.from(el, { y: 26, opacity: 0.3, duration: 0.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } });
        });
      }, ref);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('.project-card,.flagship-grid', ref.current!).forEach(card => {
          const media = card.querySelector('.media-slot');
          if (!media) return;
          gsap.fromTo(media, {clipPath:'inset(12% 5% 12% 5%)'}, {clipPath:'inset(0% 0% 0% 0%)',ease:'none',scrollTrigger:{trigger:card,start:'top 95%',end:'top 28%',scrub:1}});
          const caption=card.querySelector('.project-caption,.flagship-copy');
          if(caption) gsap.fromTo(caption,{y:55},{y:0,ease:'none',scrollTrigger:{trigger:card,start:'top 85%',end:'top 20%',scrub:.8}});
        });
        gsap.utils.toArray<HTMLElement>('.metric strong',ref.current!).forEach((el,i)=>gsap.from(el,{yPercent:70,rotation:i%2?4:-4,scale:.7,duration:1.1,ease:'expo.out',scrollTrigger:{trigger:el,start:'top 92%',once:true}}));
      }, ref);
      dispose = () => { mm.revert(); ctx.revert(); };
    }).catch(() => { /* Static reading remains available. */ });
    return () => { cancelled = true; dispose?.(); };
  }, []);
  return ref;
}

export function Navigation({ locale, slug }: { locale: Locale; slug?: string }) {
  const [open, setOpen] = useState(false);
  const other = locale === 'en' ? 'fa' : 'en';
  const base = `/${locale}`;
  return <>
    <a className="skip-link" href="#main">{locale === 'en' ? 'Skip to content' : 'رفتن به محتوا'}</a>
    <header className="header">
      <Link prefetch={false} className="wordmark" href={base} aria-label={ui.name[locale]}><span dir="ltr">NS<span className="wordmark-dot">.</span></span><span>{ui.name[locale]}</span></Link>
      <button className="menu-toggle" type="button" aria-controls="primary-navigation" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? (locale === 'en' ? 'Close' : 'بستن') : (locale === 'en' ? 'Menu' : 'فهرست')}</button>
      <nav id="primary-navigation" className={open ? 'nav is-open' : 'nav'} aria-label={locale === 'en' ? 'Main navigation' : 'فهرست اصلی'}>
        {(['work', 'experience', 'about', 'contact'] as const).map(id => <Link prefetch={false} key={id} href={`${base}#${id}`} onClick={() => setOpen(false)}>{ui[id][locale]}</Link>)}
      </nav>
      <Link prefetch={false} className="language" href={`/${other}${slug ? `/projects/${slug}` : ''}`} hrefLang={other} lang={other} aria-label={locale === 'en' ? 'Switch to Persian' : 'Switch to English'}>{locale === 'en' ? 'فا' : 'EN'}<span aria-hidden="true"> ↗</span></Link>
    </header>
  </>;
}

export function SpatialStudy({ variant = 'space' }: { variant?: 'space' | 'system' | 'facade' | 'objects' }) {
  if (variant === 'system') return <svg className="study-svg" viewBox="0 0 1000 560" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M80 390 500 510 920 390 500 270Z M80 390V230L500 110 920 230V390 M500 110V270 M80 230 500 350 920 230 M500 350V510" opacity=".25"/>{[0, 1, 2, 3].map(n => <g key={n} transform={`translate(${210 + n * 140} ${260 + n * 30})`}><path d="M0 0 65-18 100-5 35 13Z M0 0V-145L65-163V-18 M65-163 100-150V-5 M0-145 35-132 100-150 M35-132V13"/><path d="M0-70 35-57 100-75 M0-105 35-92 100-110" opacity=".45"/></g>)}</g><path d="M80 458 500 578 M80 450V466 M500 570V586" stroke="currentColor" opacity=".35"/><text x="260" y="535" fill="currentColor" fontSize="12" letterSpacing="5">ADAPT / REPEAT / REFINE</text></svg>;
  if (variant === 'facade') return <svg className="study-svg" viewBox="0 0 1000 560" fill="none" aria-hidden="true"><g stroke="currentColor"><path d="M120 440V120H880V440H120Z M155 405V220H845V405H155Z M120 185H880 M500 220V405 M515 220V405 M260 220V405 M740 220V405 M155 340H260 M740 340H845"/><path d="M80 470H920 M110 495H890 M80 460V480 M920 460V480 M120 95H880 M120 85V105 M880 85V105" opacity=".35"/><path d="M310 260H450V350H310Z M570 265H690V315H570Z M570 325H690V375H570Z" opacity=".5"/></g><text x="140" y="163" fontSize="23" letterSpacing="10" fill="currentColor">X.VISION</text></svg>;
  if (variant === 'objects') return <svg className="study-svg" viewBox="0 0 1000 560" fill="none" aria-hidden="true"><g stroke="currentColor"><path d="M130 420V165H330V420H130Z M130 235H330 M130 305H330 M130 375H330 M160 165V420 M300 165V420 M415 350H630V420H415Z M435 350V220H610V350 M450 260H595 M450 300H595 M720 420V120H860V420H720Z M740 140H840V315H740Z"/><path d="M80 450H920 M230 120V460 M510 180V460 M790 80V460" strokeDasharray="4 8" opacity=".25"/></g></svg>;
  return <svg className="study-svg hero-study" viewBox="0 0 1400 700" fill="none" aria-hidden="true"><g stroke="currentColor" strokeWidth="1"><path d="M150 540 700 690 1250 540 700 390Z" opacity=".25"/>{[0,1,2,3,4,5,6].map(n => <path key={n} d={`M${150+n*80} ${540+n*22} L${700+n*80} ${390+n*22}`} opacity=".12"/>)}<path d="M300 500V190L700 85 1110 200V510 M300 190 710 305 1110 200 M710 305V610 M300 500 710 610 1110 510" opacity=".4"/><path d="M380 520V260L500 292V550 M500 292 630 258V515 M550 563V305L680 340V597 M800 585V250L930 215V550 M960 540V295L1050 272V518"/><path d="M370 210 700 120 1040 215 710 300Z" opacity=".45"/><path d="M300 190 700 85 1110 200" strokeWidth="3"/><path d="M380 520 500 550 630 515 M800 585 930 550" opacity=".5"/><path d="M220 565 710 697 M220 555V575 M710 687V707 M1170 230V540 M1160 230H1180 M1160 540H1180" opacity=".25"/></g></svg>;
}

export function MediaSlot({ media, locale, variant = 'space', large = false }: { media?: Media; locale: Locale; variant?: 'space' | 'system' | 'facade' | 'objects'; large?: boolean }) {
  return <figure className={`media-slot ${large ? 'large' : ''}`}>
    {media?.src ? <Image src={media.src} width={media.width} height={media.height} alt={media.alt[locale]} sizes="(max-width: 760px) 100vw, 70vw" style={{ objectPosition: media.focalPoint || 'center', aspectRatio: `${media.width} / ${media.height}` }} /> : <><SpatialStudy variant={variant}/><span className="slot-note">{ui.pending[locale]}</span></>}
    <figcaption><span>{media ? ui.kinds[media.kind][locale] : (locale === 'en' ? 'Project media' : 'رسانه پروژه')}</span></figcaption>
  </figure>;
}

export function ProjectGallery({ locale }: { locale: Locale }) {
  const [filter, setFilter] = useState<keyof typeof ui.categories>('all');
  const visible = featuredProjects.filter(p => filter === 'all' || p.category === filter);
  return <section id="work" className="section work-section">
    <div className="section-intro" data-reveal><p className="eyebrow">{locale === 'en' ? 'Selected architecture' : 'گزیده معماری'}</p><div className="heading-row"><h2>{locale === 'en' ? 'Selected work' : 'پروژه‌های منتخب'}</h2><p>{locale === 'en' ? 'Retail spaces, exhibition environments and the elements that bring them together.' : 'فضاهای فروشگاهی و نمایشگاهی، و جزئیاتی که آن‌ها را به یکدیگر پیوند می‌دهد.'}</p></div></div>
    <nav className="project-index" aria-label={locale === 'en' ? 'Quick project navigation' : 'دسترسی سریع پروژه‌ها'}>{featuredProjects.map(p => <Link prefetch={false} key={p.id} href={`/${locale}/projects/${p.slug}`}><bdi>{p.id}</bdi> {p.shortTitle}</Link>)}</nav><div className="filters" role="group" aria-label={locale === 'en' ? 'Filter projects' : 'فیلتر پروژه‌ها'}>{(Object.keys(ui.categories) as Array<keyof typeof ui.categories>).filter(c => c !== 'elements').map(c => <button key={c} aria-pressed={filter === c} onClick={() => setFilter(c)}>{ui.categories[c][locale]}</button>)}</div>
    <p className="visually-hidden" role="status" aria-live="polite">{visible.length} {locale === 'en' ? 'project collections shown' : 'مجموعه نمایش داده می‌شود'}</p>
    <div className="project-grid">{visible.map(p => <article key={p.slug} className={`project-card card-${p.slug}`}><Link prefetch={false} className="project-link" href={`/${locale}/projects/${p.slug}`}><MediaSlot locale={locale} media={p.media[0]} variant={p.slug === 'xpoint' ? 'system' : p.slug === 'xvision-shop' ? 'facade' : p.category === 'elements' ? 'objects' : 'space'}/><div className="project-caption"><div><span className="eyebrow"><bdi>{p.id}</bdi> / {ui.categories[p.category][locale]}</span><h3><bdi>{p.shortTitle}</bdi><span aria-hidden="true"> ↗</span></h3><p>{p.title[locale]}</p></div><span className="project-year">{p.statusNote?.[locale]}</span></div></Link></article>)}</div>
  </section>;
}

function Flagship({ project: p, locale, dark = false }: { project: Project; locale: Locale; dark?: boolean }) {
  return <section id={p.slug} className={`section flagship ${dark ? 'dark-section' : ''}`}>
    <div className="flagship-top" data-reveal><p className="eyebrow">{locale === 'en' ? 'Featured practice / Retail architecture' : 'رویکرد شاخص / معماری فروشگاهی'}</p><h2 dir="ltr">{p.shortTitle}</h2><p className="flagship-subtitle">{p.title[locale]}</p></div>
    <div className="flagship-grid"><MediaSlot locale={locale} media={p.media[0]} variant={dark ? 'system' : 'facade'} large/><div className="flagship-copy" data-reveal><h3>{p.subtitle[locale]}</h3><p>{p.description[locale]}</p><p className="credit">{p.credit[locale]}</p><Link prefetch={false} className="text-link" href={`/${locale}/projects/${p.slug}`}>{ui.story[locale]} <span aria-hidden="true">↗</span></Link></div></div>
    <BranchComparison locale={locale} brand={p.slug}/><div className="scope-list">{p.roles.map(r => <span key={r.en}>{r[locale]}</span>)}</div>
  </section>;
}

export function Footer({ locale }: { locale: Locale }) {
  return <footer className="footer"><span>{ui.name[locale]} · {ui.title[locale]}</span><span>{locale === 'en' ? 'Concept → Space → Detail' : 'کانسپت ← فضا ← جزئیات'}</span><a href="#top">{locale === 'en' ? 'Back to top ↑' : 'بازگشت به بالا ↑'}</a></footer>;
}

export function Home({ locale }: { locale: Locale }) {
  const ref = useMotion(); const fa = locale === 'fa';
  return <div ref={ref} id="top">
    <Navigation locale={locale}/>
    <main id="main">
      <CinematicHero locale={locale}/>
      <Profile locale={locale}/><section id="snapshot" className="section snapshot">
        <div className="snapshot-heading" data-reveal><p className="eyebrow">{fa ? 'تجربه حرفه‌ای' : 'Professional snapshot'}</p><h2>{fa ? <>تفکر در مقیاس فضا.<br/>دقت در مقیاس جزئیات.</> : <>Thinking in spaces.<br/>Working in details.</>}</h2><p>{fa ? 'طراحی معماری در گروه مادیران، از ۱۴۰۱ تا اکنون.' : 'Architectural design at Madiran Group, since 1401 (Solar Hijri).'}</p></div>
        <div className="metrics" data-reveal>{[['~70','~۷۰', 'Retail store projects', 'پروژه فروشگاهی'],['~60','~۶۰','Implemented stores','فروشگاه اجراشده'],['5','۵','Exhibitions · 2 implemented','نمایشگاه · ۲ اجراشده']].map(n => <div className="metric" key={n[0]}><strong dir="ltr">{fa ? n[1] : n[0]}</strong><span>{fa ? n[3] : n[2]}</span></div>)}<p className="metric-note">{fa ? 'آمار تقریبی و تجمیعی پروژه‌های فروشگاهی مادیران، ایکس‌پوینت و ایکس‌ویژن.' : 'Approximate combined retail totals across Madiran, XPoint and X.Vision.'}</p></div>
        <div className="brands" aria-label={fa ? 'برندهای مرتبط با تجربه شغلی' : 'Brands associated with professional work'}><span>MADIRAN</span><span>X.VISION</span><span>XPOINT</span></div>
      </section>
      <Flagship project={projects[0]} locale={locale} dark/>
      <Flagship project={projects[1]} locale={locale}/>
      <ProjectGallery locale={locale}/>
      <section id="approach" className="section approach dark-section"><p className="eyebrow">{fa ? 'رویکرد طراحی' : 'A way of working'}</p><h2 data-reveal>{fa ? 'ابتدا عملکرد؛ سپس فرم، اتمسفر و جزئیات.' : 'Function first. Then form, atmosphere, and detail.'}</h2><div className="process">{[
        ['01','Understand','شناخت','Spatial needs, product zoning and site constraints.','نیازهای فضایی، جانمایی محصولات و محدودیت‌های پروژه.'],
        ['02','Shape','شکل‌دادن','Concept, architectural identity, materials and lighting.','کانسپت، هویت معماری، متریال و نورپردازی.'],
        ['03','Resolve','تکمیل','Visualization, construction drawings and design clarifications.','رندر، نقشه‌های اجرایی و پاسخ‌گویی به مسائل طراحی.'],
      ].map(n => <article key={n[0]} data-reveal><span className="eyebrow">{n[0]}</span><h3>{fa ? n[2] : n[1]}</h3><p>{fa ? n[4] : n[3]}</p></article>)}</div></section>
      <section id="experience" className="section experience"><div className="section-heading" data-reveal><p className="eyebrow">{fa ? 'تجربه و تخصص' : 'Experience & expertise'}</p><h2>{fa ? 'از کانسپت تا نقشه اجرایی.' : 'From the first idea to the working drawing.'}</h2></div><div className="experience-row"><div><p className="eyebrow">{fa ? '۱۴۰۱ تا اکنون' : '1401 (Solar Hijri) — Present'}</p><h3>{ui.title[locale]}</h3><p>{fa ? 'گروه مادیران' : 'Madiran Group'}</p></div><div data-reveal><p>{experience[locale]}</p><p className="credit">{fa ? 'همکاری با ناظران اجرایی برای حل مسائل طراحی؛ نه نظارت مستقیم کارگاه یا مدیریت اجرا. هویت بصری گرافیکی برندها توسط تیم‌های مربوط توسعه یافته است.' : 'Design coordination with site supervisors, rather than direct site supervision or construction management. Graphic brand identities were developed by the respective teams.'}</p></div></div><div className="tools">{tools.map(g => <div key={g.title.en}><h3>{g.title[locale]}</h3><ul>{g.items.map(i => <li key={i}><bdi>{fa && i === 'Higgsfield (familiarity)' ? 'Higgsfield (آشنایی)' : i}</bdi></li>)}</ul></div>)}</div></section>
      <section id="contact" className="section contact dark-section"><p className="eyebrow">{fa ? 'فرصت‌های شغلی و همکاری' : 'Opportunities & collaboration'}</p><h2 data-reveal>{fa ? <>گفت‌وگو درباره<br/><em>فضای بعدی.</em></> : <>Let’s talk about<br/><em>what comes next.</em></>}</h2><div className="contact-bottom"><p>{fa ? 'برای فرصت‌های شغلی معماری و همکاری در طراحی.' : 'For architecture opportunities and design collaborations.'}</p><address className="contact-channels"><a href="tel:+989920694573"><span>{fa ? 'تلفن' : 'Phone'}</span><bdi dir="ltr">09920694573</bdi> ↗</a><a href="mailto:Nimasadeghi23@gmail.com"><span>{fa ? 'ایمیل' : 'Email'}</span><bdi dir="ltr">Nimasadeghi23@gmail.com</bdi> ↗</a><a href="https://www.linkedin.com/in/nimasadeqi/" target="_blank" rel="noopener noreferrer"><span>{fa ? 'پروفایل حرفه‌ای' : 'Professional profile'}</span><bdi dir="ltr">LinkedIn / Nima Sadeqi</bdi> ↗</a></address></div></section>
    </main><Footer locale={locale}/>
  </div>;
}

export function ProjectDetail({ project: p, locale }: { project: Project; locale: Locale }) {
  const ref = useMotion(); const fa = locale === 'fa';
  return <div ref={ref} id="top"><Navigation locale={locale} slug={p.slug}/><main id="main" className="project-detail"><section className="section detail-intro"><Link prefetch={false} className="text-link" href={`/${locale}#work`}>{ui.back[locale]} <span aria-hidden="true">↗</span></Link><p className="eyebrow">{ui.categories[p.category][locale]}</p><h1><bdi>{p.shortTitle}</bdi></h1><h2>{p.title[locale]}</h2><p className="detail-lead">{p.subtitle[locale]}</p><p className="project-status"><bdi>{p.id}</bdi> {p.statusNote?.[locale]}</p></section><section className="detail-media"><MediaSlot media={p.media[0]} locale={locale} variant={p.slug === 'xpoint' ? 'system' : p.slug === 'xvision-shop' ? 'facade' : 'objects'} large/></section><section className="section detail-story"><div><p className="eyebrow">{fa ? 'مسئله طراحی' : 'The challenge'}</p><h2>{p.challenge[locale]}</h2></div><div><p className="bio">{p.description[locale]}</p><h3>{fa ? 'مسئولیت من' : 'My responsibilities'}</h3><ul className="detail-roles">{p.roles.map(r => <li key={r.en}>{r[locale]}</li>)}</ul><p className="outcome">{p.outcome[locale]}</p><p className="credit">{p.credit[locale]}</p></div></section>{(p.slug === 'xpoint' || p.slug === 'xvision-shop') && <section className="section"><BranchComparison locale={locale} brand={p.slug}/></section>}<section className="section documentation"><p className="eyebrow">{fa ? 'از طراحی تا اجرا' : 'From design to implementation'}</p><div className="documentation-grid">{p.media.slice(1).map(m => <ZoomMedia key={m.src || m.kind} media={m} locale={locale}/>)}</div></section><ProjectVideos slug={p.slug} locale={locale}/><section className="section next-project"><Link prefetch={false} href={`/${locale}/projects/${projects[(projects.findIndex(x => x.slug === p.slug) + 1) % projects.length].slug}`}><span className="eyebrow">{fa ? 'مطالعه بعدی' : 'Next collection'}</span><h2><bdi>{projects[(projects.findIndex(x => x.slug === p.slug) + 1) % projects.length].shortTitle}</bdi> ↗</h2></Link></section></main><Footer locale={locale}/></div>;
}
