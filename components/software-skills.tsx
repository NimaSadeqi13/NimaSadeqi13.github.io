import type { Locale } from '@/lib/content';
import paths from '@/lib/software-icons.json';

const groups = [
  {id:'professional',en:'Professional',fa:'حرفه‌ای',items:['Twinmotion','AutoCAD','SketchUp']},
  {id:'intermediate',en:'Intermediate',fa:'متوسط',items:['Photoshop','Unreal Engine','Illustrator','After Effects']},
  {id:'familiar',en:'Familiarity',fa:'آشنایی',items:['Revit','3ds Max','Blender','SolidWorks']},
  {id:'digital',en:'AI & digital tools',fa:'هوش مصنوعی و ابزارهای دیجیتال',items:['ChatGPT','Codex','Claude','Stable Diffusion','Higgsfield']},
];
const marks:Record<string,string>={'Photoshop':'Ps','Illustrator':'Ai','After Effects':'Ae','Revit':'R','3ds Max':'3D','SolidWorks':'SW'};
function SoftwareIcon({name}:{name:string}){
  const d=(paths as Record<string,string>)[name];
  return <span className="software-icon" aria-hidden="true">{d?<img src={d} width={28} height={28} alt="" loading="lazy"/>:marks[name]?<svg viewBox="0 0 32 32"><rect x="2" y="2" width="28" height="28" rx="5" fill="none" stroke="currentColor" strokeWidth="1.4"/><text x="16" y="21" textAnchor="middle" fill="currentColor" fontFamily="Arial,sans-serif" fontSize={name==='SolidWorks'?12:15} fontWeight="600">{marks[name]}</text></svg>:name==='Codex'?<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m10 9-7 7 7 7m12-14 7 7-7 7m-4-18-4 22"/></svg>:name==='ChatGPT'?<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M26 21a11 11 0 1 0-18 4l-3 4 8-2a11 11 0 0 0 13-6Z"/><path d="m16 8 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z"/></svg>:name==='Stable Diffusion'?<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="8" y="8" width="16" height="16" rx="4"/><path d="M12 2v6m8-6v6M12 24v6m8-6v6M2 12h6m-6 8h6m16-8h6m-6 8h6m-12-8-4 8m-2-6 8 4"/></svg>:<svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6"><circle cx="16" cy="16" r="13"/><path d="m13 3 8 13-8 13M3 16h26M23 5 9 15l1 13"/></svg>}</span>;
}
export function SoftwareSkills({locale}:{locale:Locale}){
  const fa=locale==='fa';
  return <section id="skills" className="section software-skills" aria-labelledby="skills-title"><div className="section-heading"><p className="eyebrow">{fa?'مهارت‌ها و ابزارها':'Skills & tools'}</p><h2 id="skills-title">{fa?'ابزارها، در خدمت طراحی.':'Tools that serve the design.'}</h2><p className="section-lead">{fa?'تسلط حرفه‌ای، تجربه کاربردی و آشنایی، به‌تفکیک حوزه.':'Professional proficiency, working experience and familiarity, clearly distinguished.'}</p></div><div className="skill-groups">{groups.map(g=><section key={g.id} className={`skill-group skill-${g.id}`} aria-labelledby={`skill-${g.id}`}><div className="skill-group-heading"><h3 id={`skill-${g.id}`}>{fa?g.fa:g.en}</h3><span aria-hidden="true">{String(g.items.length).padStart(2,'0')}</span></div><ul>{g.items.map(name=><li key={name}><SoftwareIcon name={name}/><span className="software-name" dir="ltr">{name}</span></li>)}</ul></section>)}</div></section>;
}
