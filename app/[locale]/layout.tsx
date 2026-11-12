import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isLocale, locales, ui } from '@/lib/content';
import '../globals.css';

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return { title: { default: `${ui.name[locale]} — ${ui.title[locale]}`, template: `%s | ${ui.name[locale]}` }, description: locale === 'en' ? 'Architectural design, retail spatial identity, and buildable solutions. The professional portfolio of Nima Sadeqi.' : 'پورتفولیوی نیما صادقی، طراح معمار؛ هویت معماری فروشگاهی، طراحی فضا و جزئیات قابل اجرا.', metadataBase: new URL('https://nimasadeqi13.github.io'), robots: { index: true, follow: true }, alternates: { languages: { en: '/en', fa: '/fa' } }, openGraph: { title: `${ui.name[locale]} — ${ui.title[locale]}`, locale: locale === 'fa' ? 'fa_IR' : 'en_US', type: 'website' } };
}
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={locale === 'fa' ? 'rtl' : 'ltr'}><head><link rel="icon" href="/favicon.svg" type="image/svg+xml"/><link rel="preload" as="font" type="font/woff2" href={'/fonts/Kalameh-Medium.woff2'} crossOrigin="anonymous"/></head><body>{children}</body></html>;
}
