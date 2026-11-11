import type { Localized, Media, Project } from './content';
import assets from './media-assets.json';
import drawings from './drawing-assets.json';
import builtAssets from './built-assets.json';
const t = (en: string, fa: string): Localized => ({ en, fa });
const credit = t('Architectural work within Madiran Group. Existing graphic brand identities by the respective branding teams.', 'فعالیت معماری در چارچوب گروه مادیران؛ هویت بصری گرافیکی موجود توسط تیم‌های برندینگ مربوط توسعه یافته است.');
const officeCredit = t('Architectural design, visualization and working drawings: Nima Sadeqi. Site attendance and execution coordination supported alignment with the design.', 'طراحی معماری، رندر و نقشه‌های اجرایی: نیما صادقی. حضور و هماهنگی در محل اجرا برای انطباق کار با طرح.');
const definitions = [
  ['P012','xpoint-tehran-exhibition','exhibition','XPoint / Tehran','XPoint Tehran Retail Exhibition · 1404','نمایشگاه ریتیل تهران ایکس‌پوینت · ۱۴۰۴','A retail architectural language at exhibition scale.','زبان معماری فروشگاهی در مقیاس نمایشگاه.','built'],
  ['P038','xvision-yazd','retail','X.Vision / Yazd','X.Vision Shop Yazd','ایکس‌ویژن شاپ یزد','A renewed retail environment within an established brand.','محیط فروشگاهی تازه در چارچوب یک برند آشنا.','built'],
  ['P020','xpoint-tabriz','retail','XPoint / Tabriz','XPoint Tabriz','ایکس‌پوینت تبریز','Spatial organization and product presentation as one system.','سازمان‌دهی فضا و نمایش محصولات در قالب یک سیستم.','designed'],
  ['P066','madiran-poonak-office','office','Madiran / Poonak','Madiran Poonak Office','دفتر مادیران پونک','Workspaces, shared areas and a considered interior atmosphere.','فضاهای کاری، محیط‌های مشترک و اتمسفر داخلی سنجیده.','built'],
  ['P037','xvision-dezful','retail','X.Vision / Dezful','X.Vision Dezful','ایکس‌ویژن دزفول','Retail architectural rebranding through spatial detail.','بازطراحی هویت معماری فروشگاهی از طریق جزئیات فضا.','built'],
  ['P016','xpoint-bandar-anzali','retail','XPoint / Bandar Anzali','XPoint Bandar Anzali','ایکس‌پوینت بندر انزلی','Adapting the retail design language to a different footprint.','تطبیق زبان طراحی فروشگاهی با ابعاد متفاوت فضا.','designed'],
  ['P049','madiran-gorgan-exhibition','exhibition','Madiran / Gorgan','Madiran Gorgan Exhibition','نمایشگاه مادیران گرگان','A temporary environment for display and brand presence.','محیطی موقت برای نمایش محصولات و حضور برند.','designed'],
  ['A001','liyan-office','office','Liyan Group','Liyan Group Office','دفتر گروه لیان','A coordinated interior for work, meetings and reception.','فضای داخلی هماهنگ برای کار، جلسات و پذیرش.','designed'],
  ['A002','entekhab-office','office','Entekhab Group','Entekhab Group Office','دفتر گروه انتخاب','Open workspaces and quieter rooms within a unified interior.','فضای کار باز و اتاق‌های آرام‌تر در یک محیط یکپارچه.','designed'],
  ['P021','xpoint-langarud','retail','XPoint / Langarud','XPoint Langarud','ایکس‌پوینت لنگرود','A supporting example of a scalable retail architectural system.','نمونه‌ای تکمیلی از سیستم معماری فروشگاهی قابل تطبیق.','built'],
  ['P024','xpoint-kazerun','retail','XPoint / Kazerun','XPoint Kazerun','ایکس‌پوینت کازرون','Built implementation of the XPoint architectural identity.','اجرای هویت معماری ایکس‌پوینت در شعبه کازرون.','built'],
  ['P017','xpoint-isfahan','retail','XPoint / Isfahan','XPoint Isfahan','ایکس‌پوینت اصفهان','Built application of the XPoint retail architectural identity.','اجرای هویت معماری فروشگاهی ایکس‌پوینت.','built'],
  ['P034-NOOR','xpoint-noor','retail','XPoint / Noor','XPoint Noor','ایکس‌پوینت نور','A verified built branch documented in the shared photo collection.','شعبه اجراشده با مستندات مجموعه مشترک عکس‌ها.','built'],
] as const;
export const selectedProjects: Project[] = definitions.map(([rawId,slug,category,shortTitle,en,fa,subEn,subFa,rawStatus]) => {
  const id = String(rawId); const status = rawStatus as Project['status'];
  const office = category === 'office';
  const summaries: Record<string,Localized> = {
    A001:t('Office interior design, visualization and working drawings. Designed, not built.','طراحی فضای اداری، رندر و نقشه‌های اجرایی؛ طراحی‌شده و اجرا نشده.'),
    A002:t('Open workspaces and private rooms, developed through design, visualization and working drawings. Designed, not built.','طراحی فضای کار باز و اتاق‌های مستقل، رندر و نقشه‌های اجرایی؛ طراحی‌شده و اجرا نشده.'),
    P066:t('Built office interior. Site photographs and films document construction and fit-out.','فضای اداری اجراشده؛ عکس‌ها و فیلم‌ها مراحل اجرا و تجهیز را مستند می‌کنند.'),
    P012:t('A built exhibition translating the retail architectural language into a temporary display environment.','نمایشگاهی اجراشده که زبان معماری فروشگاهی را به محیطی موقت برای نمایش محصولات تبدیل می‌کند.'),
    P037:t('A built implementation of X.Vision’s renewed retail architectural language.','اجرای زبان معماری تازه فروشگاهی ایکس‌ویژن در شعبه دزفول.'),
    P038:t('A built implementation of X.Vision’s renewed retail architectural language in Yazd.','اجرای زبان معماری تازه فروشگاهی ایکس‌ویژن در شعبه یزد.'),
    P021:t('A built branch adapting the XPoint architectural system to its store footprint.','شعبه‌ای اجراشده با تطبیق سیستم معماری ایکس‌پوینت با هندسه فروشگاه.'),
    P024:t('Built retail interior with integrated product displays, lighting and signage.','فضای فروشگاهی اجراشده با نمایش محصول، نورپردازی و تابلوهای یکپارچه.'),
    P017:t('A built application of the XPoint retail architectural system in Isfahan.','اجرای سیستم معماری فروشگاهی ایکس‌پوینت در اصفهان.'),
    'P034-NOOR':t('A built application of the XPoint retail architectural system in Noor.','اجرای سیستم معماری فروشگاهی ایکس‌پوینت در نور.')
  };
  const notes = summaries[id] || t('Architectural design developed through spatial planning, materials, lighting and product presentation.','طراحی معماری با تمرکز بر جانمایی، متریال، نور و نحوه نمایش محصولات.');
  const images = (assets as unknown as Record<string,{src:string;width:number;height:number}[]>)[id];
  return { id,slug,category,shortTitle,title:t(en,fa),subtitle:t(subEn,subFa),description:t(notes.en,notes.fa),challenge:t(subEn,subFa),outcome:notes,status,
    statusNote:['A001','A002'].includes(id) ? t('Designed · not built','طراحی‌شده · اجرا نشده') : status === 'in-progress' ? t('During construction · user-confirmed','حین اجرا · تأیید کاربر') : status === 'built' ? t('Built','اجراشده') : status === 'concept' ? t('Concept · final option pending','کانسپت · گزینه نهایی در انتظار تأیید') : t('Designed','طراحی‌شده'),
    roles:office ? [t('Architectural concept and spatial design','کانسپت معماری و طراحی فضا'),t('Modeling and visualization','مدل‌سازی و رندر'),t('Working drawings','نقشه‌های اجرایی'),...(id === 'P066' ? [t('Site attendance and design coordination','حضور و هماهنگی در محل اجرا برای انطباق با طرح')] : [])] : [t('Architectural concept and spatial design','کانسپت معماری و طراحی فضا'),t('Modeling and architectural visualization','مدل‌سازی و تصویرسازی معماری')],
    media:[...(images || []).map((m,i):Media=>({...m,kind:'render',alt:t(`${en} — architectural render, view ${i+1}`,`${fa} — رندر معماری، نمای ${i+1}`)})),...drawings.filter(d=>d.id===id).map((d):Media=>({src:d.src,width:d.width,height:d.height,kind:'drawing',alt:t(`${en} — original architectural layout, PDF page 1`,`${fa} — نقشه جانمایی معماری از صفحه اول PDF اصلی`)})),...builtAssets.filter(b=>b.id===id).map((b):Media=>({src:b.src,width:b.width,height:b.height,kind:b.kind as Media['kind'],alt:t(`${en} — ${b.kind === 'site' ? 'construction-site photograph' : b.kind === 'built-frame' ? 'frame from actual executed exhibition footage' : 'completed-store photograph'} ${b.src.match(/(\d+)\.webp$/)?.[1] || ''}`,`${fa} — ${b.kind === 'site' ? 'عکس حین اجرا' : b.kind === 'built-frame' ? 'فریم فیلم اجرای واقعی' : 'عکس اجرای واقعی'}`)}))],credit:office ? (id === 'P066' ? officeCredit : t('Architectural design, visualization and working drawings: Nima Sadeqi. Designed, not built.', 'طراحی معماری، رندر و نقشه‌های اجرایی: نیما صادقی. طراحی‌شده و اجرا نشده.')) : credit,publication:'pending' };
});
export const featuredProjects = selectedProjects.filter(p => !['P021','P024','P017','P034-NOOR'].includes(p.id!));
export const excludedProjectIds = ['P029','P035','P080','P054','P073'];
