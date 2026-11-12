'use client';
import { createContext, useContext, type ReactNode } from 'react';
import type { Media } from '@/lib/content';
import treatments from '@/lib/art-directed-assets.json';

const ArtDirection = createContext(false);
export function ArtDirectionProvider({children}:{children:ReactNode}) {return <ArtDirection.Provider value={true}>{children}</ArtDirection.Provider>;}
export function useArtDirectedMedia(media?:Media):Media|undefined {
  const active=useContext(ArtDirection);
  const treatment=active&&media?.src?(treatments as Record<string,{src:string;width:number;height:number}>)[media.src]:undefined;
  return treatment&&media?{...media,src:treatment.src,width:treatment.width,height:treatment.height}:media;
}
