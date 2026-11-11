import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectDetail } from '@/components/portfolio';
import { isLocale, locales, projects } from '@/lib/content';
export function generateStaticParams() { return locales.flatMap(locale => projects.map(p => ({ locale, slug: p.slug }))); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> { const { locale, slug } = await params; const p = projects.find(x => x.slug === slug); if (!p || !isLocale(locale)) notFound(); return { title: `${p.shortTitle} — ${p.title[locale]}`, description: p.subtitle[locale], alternates: { languages: { en: `/en/projects/${slug}`, fa: `/fa/projects/${slug}` } } }; }
export default async function Page({ params }: { params: Promise<{ locale: string; slug: string }> }) { const { locale, slug } = await params; const p = projects.find(x => x.slug === slug); if (!p || !isLocale(locale)) notFound(); return <ProjectDetail project={p} locale={locale}/>; }
