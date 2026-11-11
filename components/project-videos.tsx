'use client';
import { useState, useEffect, useRef } from 'react';
import { thumbnailSource } from './responsive-image';
import type { Locale } from '@/lib/content';
import { selectedProjects } from '@/lib/content';
import builtVideos from '@/lib/built-video-assets.json';

function ArchitecturalVideo({ id, locale, clip }: { id: string; locale: Locale; clip?: typeof builtVideos[number] }) {
  const [loaded, setLoaded] = useState(false), [near,setNear]=useState(false);
  const frame=useRef<HTMLElement>(null);
  useEffect(()=>{const observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){setNear(true);observer.disconnect();}},{rootMargin:'400px'});if(frame.current)observer.observe(frame.current);return()=>observer.disconnect();},[]);
  const project = selectedProjects.find(p => p.id === id)!;
  const fa = locale === 'fa'; const source = clip?.src || `/media/videos/${id.toLowerCase()}.mp4`;
  return <figure ref={frame} className="architectural-video"><video controls playsInline preload="none" poster={near ? thumbnailSource(clip?.poster || project.media[0].src!) : undefined} style={clip ? {aspectRatio: `${clip.width} / ${clip.height}`, maxHeight: '75vh'} : undefined} data-source={source} aria-label={`${project.shortTitle} — ${clip ? (clip.kind === 'built' ? (fa ? 'فیلم واقعی نمایشگاه اجراشده' : 'actual completed exhibition footage') : (fa ? 'مستندات واقعی حین اجرا و تکمیل' : 'real site and fit-out documentation')) : (fa ? 'انیمیشن رندر معماری' : 'architectural render animation')}`} onPlay={() => setLoaded(true)}/>{!loaded && <button className="video-load" onClick={e => { setLoaded(true); const video = e.currentTarget.parentElement!.querySelector('video')!; video.src = source; void video.play().catch(() => { /* Native controls remain available to retry. */ }); }}>{fa ? 'پخش فیلم معماری' : 'Play architectural film'} <span aria-hidden="true">↗</span></button>}<figcaption><bdi>{id} / {project.shortTitle}</bdi><span>{clip ? (clip.kind === 'built' ? (fa ? 'فیلم واقعی نمایشگاه اجراشده' : 'Actual executed exhibition footage') : (fa ? 'مستندات حین اجرا و تکمیل · فیلم واقعی' : 'Fit-out and site documentation · Real footage')) : (fa ? 'انیمیشن رندر؛ عکس یا فیلم اجرا نیست' : 'Rendered animation · Not built footage')}</span></figcaption></figure>;
}
export function ProjectVideos({ slug, locale }: { slug: string; locale: Locale }) {
  const ids = slug === 'xpoint' ? ['P020','P021','P012'] : slug === 'xvision-shop' ? ['P037','P038'] : selectedProjects.filter(p => p.slug === slug && ['P012','P020','P021','P037','P038'].includes(p.id!)).map(p=>p.id!);
  const siteIds = slug === 'madiran-poonak-office' ? ['P066'] : ids;
  if (!ids.length && !siteIds.length) return null;
  return <section className="section project-films"><p className="eyebrow">{locale === 'fa' ? 'معماری در حرکت' : 'Architecture in motion'}</p><h2>{locale === 'fa' ? 'فیلم‌های پروژه' : 'Project films'}</h2>{ids.map(id => <ArchitecturalVideo key={id} id={id} locale={locale}/>)}{builtVideos.filter(v => siteIds.includes(v.id)).map(v => <ArchitecturalVideo key={v.src} id={v.id} locale={locale} clip={v}/>)}</section>;
}
