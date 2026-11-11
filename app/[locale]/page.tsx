import { notFound } from 'next/navigation';
import { Home } from '@/components/portfolio';
import { isLocale } from '@/lib/content';
export default async function Page({ params }: { params: Promise<{ locale: string }> }) { const { locale } = await params; if (!isLocale(locale)) notFound(); return <Home locale={locale}/>; }
