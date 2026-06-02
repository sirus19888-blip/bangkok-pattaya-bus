"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isSupportedLocale, type LocaleCode } from "@/data/routes";
import { getUiTranslations } from "@/lib/uiTranslations";

function getLocaleFromPath(pathname: string | null): LocaleCode {
  const segment = pathname?.split("/").filter(Boolean)[0];
  return segment && isSupportedLocale(segment) ? segment : "en";
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const text = getUiTranslations(locale).footer;

  return (
    <footer className="border-t border-[#eadcc7] bg-[#f7f0e3]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm font-semibold text-[#4f5d6c] sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>{text.title}</p>
        <nav aria-label={text.ariaLabel} className="flex flex-wrap gap-2 sm:gap-3">
          <Link
            href="/about"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.about}
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.contact}
          </Link>
          <Link
            href="/privacy"
            className="inline-flex min-h-11 items-center rounded-lg px-2 text-[#13233a] underline-offset-4 hover:underline"
          >
            {text.privacy}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
