// 侧栏的“国内”“国际”两个入口：每篇资料都打了地区标签（industry/taxonomy.ts 的 TOPIC_TAGS），
// 两个入口打开按地区标签汇总的主题页（industry/topics.json 的 domestic、international）。
import { defineWebModule } from "@aihot/web/modules";

type P = { size?: number };

function Svg({ size = 18, children }: P & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

const IconHome = (p: P) => (<Svg {...p}><path d="M4 11.5L12 5l8 6.5" /><path d="M6.5 10v9.5h11V10" /></Svg>);
const IconGlobe = (p: P) => (<Svg {...p}><circle cx="12" cy="12" r="8.5" /><path d="M3.5 12h17M12 3.5c2.3 2.4 3.5 5.2 3.5 8.5s-1.2 6.1-3.5 8.5c-2.3-2.4-3.5-5.2-3.5-8.5S9.7 5.9 12 3.5z" /></Svg>);

export default defineWebModule({
  name: "region",
  sidebar: {
    section: "地区",
    items: [
      { to: "/topics/domestic", label: "国内", icon: IconHome },
      { to: "/topics/international", label: "国际", icon: IconGlobe },
    ],
  },
});
