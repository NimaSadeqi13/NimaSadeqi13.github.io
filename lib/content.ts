import { selectedProjects } from './selected-projects';
export { selectedProjects, featuredProjects } from './selected-projects';
export const locales = ['en', 'fa'] as const;
export type Locale = typeof locales[number];
export type Localized = Record<Locale, string>;
export const tr = (en: string, fa: string): Localized => ({ en, fa });
export function isLocale(s: string): s is Locale { return s === 'en' || s === 'fa'; }
export type Media = { src: string | null; width: number; height: number; alt: Localized; kind: 'concept' | 'render' | 'built' | 'drawing' | 'site' | 'built-frame'; focalPoint?: string };
export type Project = { id?: string; status?: 'built' | 'designed' | 'concept' | 'unverified' | 'in-progress'; statusNote?: Localized; slug: string; category: 'retail' | 'exhibition' | 'elements' | 'office'; title: Localized; shortTitle: string; subtitle: Localized; description: Localized; challenge: Localized; outcome: Localized; roles: Localized[]; media: Media[]; credit: Localized; publication: 'pending' };
const credit = tr('Architectural design undertaken as part of my work at Madiran Group. Existing graphic brand identity by the respective branding teams.', 'طراحی معماری در چارچوب فعالیت من در گروه مادیران انجام شده است. هویت بصری گرافیکی موجود، حاصل کار تیم‌های برندینگ مربوط است.');
const media = (name: string): Media[] => [
  { src: null, width: 1920, height: 1080, kind: 'render', alt: tr(`${name}: architectural render, final image pending`, `${name}: رندر معماری، تصویر نهایی در انتظار انتخاب`) },
  { src: null, width: 1920, height: 1080, kind: 'built', alt: tr(`${name}: implementation photograph, verification pending`, `${name}: عکس اجرا، در انتظار بررسی و انتخاب`) },
  { src: null, width: 1600, height: 1100, kind: 'drawing', alt: tr(`${name}: construction drawing, publication approval pending`, `${name}: نقشه اجرایی، در انتظار تأیید انتشار`) },
];
const initialCollections: Project[] = [
  {
    slug: 'xpoint', category: 'retail', shortTitle: 'XPoint',
    title: tr('Retail Architectural Identity & Design System', 'هویت معماری و سیستم طراحی فروشگاهی'),
    subtitle: tr('One architectural language. Different spatial possibilities.', 'یک زبان معماری؛ امکان‌های متفاوت فضایی.'),
    description: tr('Developed XPoint’s retail architectural identity by translating the brand’s established visual language into a cohesive, functional, and buildable physical environment. The identity evolved progressively from one main design direction. I designed a scalable architectural system—from spatial planning and materials to lighting, product displays, signage, and construction documentation—adaptable to stores with different footprints and site constraints. The work was developed with input from the site supervision team and reviewed by executive and branding leadership. Implemented in 12 stores and one exhibition.', 'هویت معماری فروشگاه‌های ایکس‌پوینت را با تکیه بر هویت بصری موجود برند طراحی کردم؛ این هویت به‌تدریج از یک جهت‌گیری اصلی توسعه یافت و به سیستمی یکپارچه، کاربردی و قابل اجرا تبدیل شد که از جانمایی فضا و انتخاب متریال تا نورپردازی، استندها، تابلوها و جزئیات اجرایی را در بر می‌گیرد. این زبان طراحی متناسب با ابعاد و شرایط متفاوت هر شعبه تطبیق داده شد و با مشورت تیم نظارت و تأیید مدیران مربوط توسعه یافت. ۱۲ فروشگاه و یک نمایشگاه بر اساس این طراحی اجرا شده‌اند.'),
    challenge: tr('Translate an established graphic identity into a consistent physical environment that adapts to different store footprints and site constraints.', 'تبدیل هویت بصری موجود به محیطی فیزیکی و منسجم که با ابعاد و محدودیت‌های متفاوت شعب سازگار شود.'),
    outcome: tr('Implemented in 12 stores and one exhibition.', 'اجرا در ۱۲ فروشگاه و یک نمایشگاه.'),
    roles: [tr('Architectural identity & concept', 'هویت معماری و کانسپت'), tr('Spatial planning & modular fixtures', 'جانمایی و تجهیزات ماژولار'), tr('Materials, lighting & signage', 'متریال، نورپردازی و تابلوها'), tr('Construction documentation', 'نقشه‌ها و جزئیات اجرایی')], media: media('XPoint'), credit, publication: 'pending',
  },
  {
    slug: 'xvision-shop', category: 'retail', shortTitle: 'X.Vision Shop',
    title: tr('Retail Architectural Rebranding', 'بازطراحی هویت معماری فروشگاه‌ها'),
    subtitle: tr('An established brand. A renewed spatial experience.', 'برندی آشنا؛ تجربه فضایی تازه.'),
    description: tr('Reinterpreted X.Vision’s existing brand guidelines as a renewed architectural identity for its physical retail environment. The redesign addressed spatial organization, architectural elements, product presentation, materials, lighting, and buildable detailing, creating a distinct but brand-consistent retail experience. Two stores have been implemented.', 'با اتکا به دفترچه هویت بصری موجود ایکس‌ویژن و با هدف نوسازی فضای فروشگاهی، زبان معماری تازه‌ای برای فروشگاه‌های این برند طراحی کردم. این بازطراحی شامل سازمان‌دهی فضا، عناصر معماری، نحوه نمایش محصولات، متریال، نورپردازی و جزئیات قابل اجرا بود. دو فروشگاه با این رویکرد اجرا شده‌اند.'),
    challenge: tr('Renew the existing retail architectural language while remaining consistent with X.Vision’s established brand guidelines.', 'نوسازی زبان معماری فروشگاه‌ها با حفظ ارتباط با دفترچه هویت بصری موجود ایکس‌ویژن.'),
    outcome: tr('Two redesigned stores implemented.', 'اجرای دو فروشگاه با رویکرد بازطراحی.'),
    roles: [tr('Architectural rebranding', 'بازطراحی هویت معماری'), tr('Spatial organization & displays', 'سازمان‌دهی فضا و نمایش محصولات'), tr('Materials & lighting', 'متریال و نورپردازی'), tr('Buildable detailing', 'جزئیات قابل اجرا')], media: media('X.Vision Shop'), credit, publication: 'pending',
  },
  {
    slug: 'retail-environments', category: 'retail', shortTitle: 'Madiran',
    title: tr('Retail environments', 'فضاهای فروشگاهی'), subtitle: tr('Concept, spatial function and construction detail.', 'کانسپت، عملکرد فضا و جزئیات اجرایی.'),
    description: tr('Architectural design for retail environments associated with Madiran, X.Vision and XPoint: from concept and spatial planning to modeling, visualization and phase-II drawings. Individual stores and final media will be selected from the reviewed archive.', 'طراحی معماری فضاهای فروشگاهی مرتبط با مادیران، ایکس‌ویژن و ایکس‌پوینت، از کانسپت و جانمایی تا مدل‌سازی، رندر و نقشه‌های فاز دو. شعب و تصاویر نهایی از آرشیو بررسی‌شده انتخاب خواهند شد.'),
    challenge: tr('Organize products, circulation and display within each store’s spatial constraints.', 'سازمان‌دهی محصولات، حرکت و نمایش در محدودیت‌های فضایی هر فروشگاه.'), outcome: tr('Individual project details and implementation evidence pending selection.', 'جزئیات هر پروژه و مستندات اجرا در انتظار انتخاب و بررسی.'),
    roles: [tr('Concept & spatial planning', 'کانسپت و جانمایی'), tr('Modeling & visualization', 'مدل‌سازی و رندر'), tr('Phase-II drawings', 'نقشه‌های فاز دو')], media: media('Madiran retail'), credit, publication: 'pending',
  },
  {
    slug: 'exhibition-spaces', category: 'exhibition', shortTitle: 'Exhibitions',
    title: tr('Temporary spaces, architectural presence', 'فضاهای موقت، حضور معماری'), subtitle: tr('Brand experience at exhibition scale.', 'تجربه برند در مقیاس نمایشگاهی.'),
    description: tr('Exhibition design forms part of my professional work at Madiran Group. The XPoint exhibition was designed and implemented within the same architectural language as its stores. Additional exhibition case studies await project-level verification and final image selection.', 'طراحی فضاهای نمایشگاهی بخشی از فعالیت حرفه‌ای من در گروه مادیران است. نمایشگاه ایکس‌پوینت با همان زبان معماری فروشگاه‌های آن طراحی و اجرا شد. معرفی سایر نمایشگاه‌ها پس از بررسی اطلاعات هر پروژه و انتخاب تصاویر نهایی تکمیل می‌شود.'),
    challenge: tr('Translate a retail architectural identity into a temporary exhibition environment.', 'تطبیق هویت معماری فروشگاهی با فضای موقت نمایشگاه.'), outcome: tr('XPoint exhibition implemented; other case studies under verification.', 'نمایشگاه ایکس‌پوینت اجرا شده؛ سایر مطالعات در انتظار بررسی.'),
    roles: [tr('Exhibition concept & layout', 'کانسپت و جانمایی نمایشگاه'), tr('Display structures & lighting', 'سازه‌های نمایش و نورپردازی')], media: media('Exhibition'), credit, publication: 'pending',
  },
  {
    slug: 'retail-elements', category: 'elements', shortTitle: 'Elements',
    title: tr('Architecture at the scale of a detail', 'معماری در مقیاس جزئیات'), subtitle: tr('Stands, accessories, lightboxes and signage.', 'استند، اکسسوری، لایت‌باکس و تابلو.'),
    description: tr('Designed retail display structures, stands, accessories, charging stations, lightboxes, signage and pictograms as part of coherent physical environments. Final objects and corresponding drawings will be selected for publication.', 'طراحی تجهیزات نمایش محصول، استندها، اکسسوری، جایگاه شارژ، لایت‌باکس، تابلو و پیکتوگرام در چارچوب یک محیط فیزیکی یکپارچه. نمونه‌های نهایی و نقشه‌های مربوط برای انتشار انتخاب خواهند شد.'),
    challenge: tr('Connect product presentation and practical detailing with the wider spatial identity.', 'پیوند نمایش محصولات و جزئیات کاربردی با هویت کلی فضا.'), outcome: tr('Object-level case studies pending selection.', 'مطالعات هر تجهیز در انتظار انتخاب نهایی.'),
    roles: [tr('Display & fixture design', 'طراحی استند و تجهیزات'), tr('Signage & lightboxes', 'تابلو و لایت‌باکس'), tr('Execution-oriented details', 'جزئیات اجرایی')], media: media('Retail elements'), credit, publication: 'pending',
  },
];
export const caseStudies: Project[] = initialCollections.slice(0,2).map((p,i) => ({...p, media: selectedProjects.find(x => x.id === (i===0 ? 'P020' : 'P038'))!.media}));
export const projects: Project[] = [...caseStudies,...selectedProjects];
export const about = tr('I’m an Architectural Designer focused on concept development, spatial identity, and practical solutions. My design process starts with understanding how a space needs to work, then shaping its form, atmosphere, and details around that purpose. I’m interested in architecture that is visually considered, functional, and genuinely buildable. My professional work has primarily focused on retail environments, from early concepts and spatial planning to visualizations and construction documentation.', 'من طراح معمارم و بیشتر از هر چیز به شکل‌گیری کانسپت، تعریف عملکرد فضا و تبدیل ایده به یک طرح قابل اجرا علاقه دارم. برای من طراحی با شناخت نیازهای فضا شروع می‌شود و بعد به فرم، هویت و جزئیات آن می‌رسد. به نظرم یک طراحی خوب علاوه بر جذابیت بصری، باید کاربردی و در دنیای واقعی قابل اجرا باشد. بخش عمده تجربه حرفه‌ای من در طراحی فضاهای تجاری، از کانسپت اولیه و جانمایی تا رندر و نقشه‌های اجرایی شکل گرفته است.');
export const experience = tr('Responsible for end-to-end architectural design of retail environments associated with Madiran, X.Vision and XPoint, including concept development, spatial planning, modeling and visualization, materials, lighting, product-display layout, signage, and phase-II architectural drawings. Collaborated with on-site supervisors to resolve design-related issues arising during construction. Developed XPoint’s scalable architectural design system and led the architectural rebranding of X.Vision Shop environments.', 'طراحی معماری فضاهای فروشگاهی مرتبط با مادیران، ایکس‌ویژن و ایکس‌پوینت از توسعه کانسپت و جانمایی تا مدل‌سازی، رندر، انتخاب متریال و نورپردازی، چیدمان محصولات، تابلوها و تهیه نقشه‌های فاز دو. هماهنگی با ناظران اجرایی برای حل مسائل طراحی در حین اجرا. طراحی سیستم هویت معماری فروشگاه‌های ایکس‌پوینت و بازطراحی زبان معماری فروشگاه‌های ایکس‌ویژن شاپ.');
export const tools = [
  { title: tr('Professional', 'حرفه‌ای'), items: ['AutoCAD', 'SketchUp', 'Twinmotion'] },
  { title: tr('Intermediate', 'متوسط'), items: ['Adobe Photoshop', 'Unreal Engine', 'Illustrator', 'After Effects'] },
  { title: tr('Familiarity', 'آشنایی'), items: ['Revit', '3ds Max', 'Blender', 'SolidWorks'] },
  { title: tr('AI & digital workflows', 'هوش مصنوعی و جریان کار دیجیتال'), items: ['ChatGPT', 'Codex', 'Claude', 'Stable Diffusion', 'Higgsfield'] },
];
export const ui = {
  name: tr('Nima Sadeqi', 'نیما صادقی'), title: tr('Architectural Designer', 'طراح معمار'),
  work: tr('Work', 'پروژه‌ها'), approach: tr('Approach', 'رویکرد'), experience: tr('Experience', 'تجربه'), about: tr('About', 'درباره من'), contact: tr('Contact', 'ارتباط'),
  view: tr('View selected work', 'مشاهده پروژه‌ها'), story: tr('Explore the case study', 'مشاهده مطالعه پروژه'), back: tr('Back to work', 'بازگشت به پروژه‌ها'),
  pending: tr('Final project imagery to follow', 'تصاویر نهایی پروژه پس از انتخاب اضافه می‌شوند'),
  study: tr('Spatial study · illustration, not a project image', 'مطالعه فضایی · تصویرسازی، نه تصویر یک پروژه'),
  categories: { all: tr('All work', 'همه'), retail: tr('Retail', 'فروشگاهی'), exhibition: tr('Exhibition', 'نمایشگاهی'), office: tr('Office', 'اداری'), elements: tr('Elements', 'تجهیزات و جزئیات') },
  kinds: { 'built-frame': tr('Frame from built-exhibition footage', 'فریم فیلم اجرای واقعی'), site: tr('During construction', 'حین اجرا'), concept: tr('Concept', 'کانسپت'), render: tr('Render', 'رندر'), built: tr('Built photograph', 'عکس اجرا'), drawing: tr('Construction drawing', 'نقشه اجرایی') },
};
