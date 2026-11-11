'use client';
import { useRef } from 'react';
import { ResponsiveImage as Image } from './responsive-image';
import type { Locale, Media } from '@/lib/content';
import { ui } from '@/lib/content';
export function ZoomMedia({ media, locale }: { media: Media; locale: Locale }) {
  const modal = useRef<HTMLDialogElement>(null);
  if (!media.src) return null;
  const fa = locale === 'fa';
  return <figure className="media-slot zoom-media"><button className="image-zoom" onClick={()=>modal.current?.showModal()} aria-label={`${fa?'بزرگ‌نمایی':'Enlarge'}: ${media.alt[locale]}`}><Image src={media.src} width={media.width} height={media.height} style={{aspectRatio:`${media.width} / ${media.height}`}} sizes="(max-width:760px) 100vw, 55vw" alt={media.alt[locale]}/><span aria-hidden="true">↗</span></button><figcaption><span>{ui.kinds[media.kind][locale]}</span><span>{fa?'برای بزرگ‌نمایی انتخاب کنید':'Select to enlarge'}</span></figcaption><dialog ref={modal} className="media-lightbox" onClick={e=>{if(e.target===e.currentTarget)modal.current?.close()}} aria-label={media.alt[locale]}><button className="lightbox-close" autoFocus onClick={()=>modal.current?.close()}>{fa?'بستن':'Close'} ×</button><img loading="lazy" src={media.src} width={media.width} height={media.height} alt={media.alt[locale]}/><p>{ui.kinds[media.kind][locale]} · {media.alt[locale]}</p></dialog></figure>;
}
