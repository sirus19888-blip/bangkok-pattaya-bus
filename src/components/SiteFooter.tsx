"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const footerText = {
  en: {
    title: "Bangkok Pattaya Bus Guide",
    ariaLabel: "Footer links",
    links: [
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
  th: {
    title: "คู่มือรถบัสกรุงเทพฯ พัทยา",
    ariaLabel: "ลิงก์ท้ายหน้า",
    links: [
      { href: "/about", label: "เกี่ยวกับเรา" },
      { href: "/contact", label: "ติดต่อ" },
      { href: "/privacy", label: "ความเป็นส่วนตัว" },
    ],
  },
  ru: {
    title: "Гид по автобусам Бангкок Паттайя",
    ariaLabel: "Ссылки внизу страницы",
    links: [
      { href: "/about", label: "О проекте" },
      { href: "/contact", label: "Контакты" },
      { href: "/privacy", label: "Конфиденциальность" },
    ],
  },
};

export function SiteFooter() {
  const pathname = usePathname();
  const text = pathname?.startsWith("/th/")
    ? footerText.th
    : pathname?.startsWith("/ru/")
      ? footerText.ru
      : footerText.en;

  return (
    <footer className="border-t border-[#eadcc7] bg-[#f7f0e3]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm font-semibold text-[#4f5d6c] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{text.title}</p>
        <nav aria-label={text.ariaLabel} className="flex flex-wrap gap-4">
          {text.links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#13233a] underline-offset-4 hover:underline"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
