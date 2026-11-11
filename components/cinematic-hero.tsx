'use client';
import { useEffect, useRef, useState } from 'react';
import type { Locale } from '@/lib/content';
import { ui } from '@/lib/content';
import assets from '@/lib/media-assets.json';
import { ResponsiveImage, responsiveSource } from './responsive-image';

export function CinematicHero({ locale }: { locale: Locale }) {
  const root = useRef<HTMLElement>(null), video = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<'poster'|'loading'|'scrub'|'manual'|'error'>('poster');
  const [still, setStill] = useState(false);
  const fa = locale === 'fa';
  const poster=responsiveSource(assets.P012[0].src);
  useEffect(() => {
    const el = root.current, film = video.current;
    if (!el || !film || still) return;
    let cancelled = false, frame = 0, dispose: (()=>void) | undefined;
    const saveData = (navigator as Navigator & {connection?:{saveData?:boolean}}).connection?.saveData;
    if (saveData || !window.matchMedia('(min-width: 1000px) and (prefers-reduced-motion: no-preference)').matches) return;
    Promise.all([import('gsap'),import('gsap/ScrollTrigger')]).then(([{gsap},{ScrollTrigger}])=>{
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1000px) and (prefers-reduced-motion: no-preference)',()=>{
        if (cancelled) return;
        setMode('loading');
        const playhead={time:0};
        let timeline: ReturnType<typeof gsap.timeline> | undefined;
        const seek=()=>{frame=0;if(cancelled||film.seeking||film.readyState<2)return;const target=Math.min(playhead.time,Math.max(0,film.duration-.05));if(Math.abs(film.currentTime-target)>.025)film.currentTime=target;};
        const queue=()=>{if(!frame)frame=requestAnimationFrame(seek);};
        const ready=()=>{
          if(cancelled||timeline||!Number.isFinite(film.duration))return;
          if(el.getBoundingClientRect().bottom < 100){setMode('poster');return;}
          film.pause();setMode('scrub');el.dataset.motion='scrub';
          timeline=gsap.timeline({scrollTrigger:{trigger:el,start:'top top+=88',end:'+=1400',pin:true,scrub:true,invalidateOnRefresh:true,onUpdate:self=>{el.dataset.progress=self.progress.toFixed(3);el.style.setProperty('--film-progress',String(self.progress));}}});
          timeline.to(playhead,{time:film.duration-.05,duration:1,ease:'none',onUpdate:queue},0)
            .to(el.querySelector('.film-title'),{yPercent:-35,xPercent:fa?8:-8,scale:.88,clipPath:'inset(0 0 100% 0)',opacity:0,duration:.36},.06)
            .fromTo(el.querySelector('.film-aperture'),{opacity:0,scale:1.02},{opacity:1,scale:1,duration:.24,ease:'none'},.72)
            .fromTo(el.querySelector('.film-coordinate'),{y:65,opacity:0,rotate:-5},{y:0,opacity:1,rotate:0,duration:.22},.25)
            .to(el.querySelector('.film-coordinate'),{y:-55,opacity:0,duration:.18},.78)
            .fromTo(el.querySelector('.film-annotation'),{y:45,opacity:0},{y:0,opacity:1,duration:.2},.42)
            .to(el.querySelector('.film-annotation'),{y:-30,opacity:0,duration:.15},.83)
            .to(el.querySelector('.film-shade'),{opacity:.2,duration:.4},.25)
            .to(el.querySelector('.film-bottom'),{y:-16,duration:1,ease:'none'},0);
          ScrollTrigger.refresh();queue();
        };
        film.addEventListener('loadeddata',ready);film.addEventListener('seeked',queue);
        film.src='/media/videos/p012-scrub-web.mp4';film.preload='auto';film.load();
        return ()=>{timeline?.scrollTrigger?.kill();timeline?.kill();film.removeEventListener('loadeddata',ready);film.removeEventListener('seeked',queue);cancelAnimationFrame(frame);film.pause();delete el.dataset.motion;delete el.dataset.progress;el.style.removeProperty('--film-progress');gsap.set([el.querySelector('.film-title'),el.querySelector('.film-annotation'),el.querySelector('.film-shade'),el.querySelector('.film-bottom'),el.querySelector('.film-coordinate'),el.querySelector('.film-aperture')],{clearProps:'all'});film.removeAttribute('src');film.load();setMode('poster');};
      });
      dispose=()=>mm.revert();
    }).catch(()=>setMode('error'));
    const hide=()=>{if(document.hidden)film.pause();};document.addEventListener('visibilitychange',hide);
    return()=>{cancelled=true;dispose?.();cancelAnimationFrame(frame);document.removeEventListener('visibilitychange',hide);};
  },[still,fa]);
  const play=()=>{const film=video.current!;setMode('manual');film.src='/media/videos/p012-scrub-web.mp4';film.controls=true;void film.play().catch(()=>setMode('error'));};
  return <section id="intro" ref={root} className="film-hero" data-playing={mode==='manual'} aria-label={fa?'افتتاحیه سینمایی پورتفولیو':'Cinematic portfolio introduction'}>
    <link rel="preload" as="image" href={poster.src} imageSrcSet={poster.srcSet} imageSizes="100vw" fetchPriority="high"/>
    <video ref={video} className="film-video" playsInline muted preload="none"  aria-label={fa?'سکانس رندر نمایشگاه تهران، کنترل با اسکرول':'Tehran exhibition rendered camera segment, controlled by scrolling'} onError={()=>setMode('error')}/>
    <ResponsiveImage className="film-poster" src={assets.P012[0].src} width={1600} height={900} sizes="100vw" eager alt=""/>
    <div className="film-shade"/><div className="film-aperture" aria-hidden="true"/><div className="film-coordinate" aria-hidden="true"><span>01 — P012</span><strong>XPOINT</strong><span>TEHRAN / 1404</span></div><div className="film-progress" aria-hidden="true"><i/></div>
    <div className="film-top"><span>{ui.title[locale]}</span><span dir="ltr">P012 / TEHRAN / 1404</span></div>
    <div className="film-title"><p>{ui.name[locale]}</p><h1>{fa?<>از کانسپت<br/>تا طراحی<br/><em>قابل اجرا.</em></>:<>From concept<br/>to <em>buildable</em><br/>design.</>}</h1></div>
    <div className="film-annotation"><p className="eyebrow">P012 / {fa?'نمایشگاه ریتیل تهران':'Tehran Retail Exhibition'}</p><h2>{fa?'هویت معماری، در مقیاس فضا.':'Architectural identity. At spatial scale.'}</h2><p>{fa?'بازه‌ای پیوسته از فیلم رندر معماری نمایشگاه.':'A continuous shot from the original architectural render film.'}</p></div>
    <div className="film-bottom"><div className="film-actions" onClick={event => { const anchor = (event.target as HTMLElement).closest('a[href^="#"]'); if (!anchor) return; const target = document.querySelector<HTMLElement>(anchor.getAttribute('href')!); if (!target) return; event.preventDefault(); window.scrollTo({top: target.getBoundingClientRect().top + window.scrollY - 90, behavior: 'instant'}); target.setAttribute('tabindex', '-1'); target.focus({preventScroll: true}); }}><a href="#about">{fa?'عبور از مقدمه / معرفی من ↓':'Skip intro / About me ↓'}</a><a href="#work">{ui.view[locale]} ↗</a><button onClick={()=>setStill(true)} hidden={still||mode!=='scrub'}>{fa?'حالت بدون حرکت':'Use still view'}</button><button onClick={play} hidden={mode==='scrub'||mode==='loading'||mode==='manual'}>{fa?'پخش ویدئو':'Play film'}</button></div><p role="status">{mode==='loading'?(fa?'در حال آماده‌سازی فیلم؛ می‌توانید از مقدمه عبور کنید.':'Preparing film; you can skip the introduction.'):mode==='scrub'?(fa?'اسکرول جلو و عقب، حرکت فیلم را کنترل می‌کند.':'Scroll forward or backward to control the film.'):mode==='error'?(fa?'بارگذاری فیلم ناموفق بود؛ تصویر اصلی نمایش داده می‌شود.':'Film could not load; original poster remains available.'):(fa?'رندر معماری · P012':'Architectural render · P012')}</p></div>
  </section>;
}
