import type { CSSProperties } from 'react';
import variants from '@/lib/responsive-assets.json';

export function responsiveSource(src: string) {
  const entry = (variants as Record<string,{variants:{src:string;width:number}[]}>)[src];
  return entry ? {src:entry.variants.at(-1)!.src,srcSet:entry.variants.map(v=>`${v.src} ${v.width}w`).join(', ')} : {src,srcSet:undefined};
}

export function thumbnailSource(src:string,width=960) {
  const entry=(variants as Record<string,{variants:{src:string;width:number}[]}>)[src];
  return entry ? (entry.variants.find(v=>v.width>=width)||entry.variants.at(-1)!).src : src;
}

export function ResponsiveImage({src,alt,width,height,sizes='100vw',style,className,eager=false}:{src:string;alt:string;width?:number;height?:number;sizes?:string;style?:CSSProperties;className?:string;eager?:boolean}) {
  return <img {...responsiveSource(src)} width={width} height={height} alt={alt} sizes={sizes} style={style} className={className} loading={eager?'eager':'lazy'} decoding="async" fetchPriority={eager?'high':'auto'}/>;
}
