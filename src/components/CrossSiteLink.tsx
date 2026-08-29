"use client";

import type { ReactNode } from "react";
import { trackEvent } from "@/lib/analytics";

type CrossSiteLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
  lang: string;
  routeId?: string;
  // Krotki identyfikator celu, zeby raport GA4 dalo sie czytac bez parsowania URL-i.
  to: string;
};

/**
 * Link wychodzacy poza serwis, z pomiarem.
 *
 * Istnieje osobno od MoreThailandRoutes celowo: onClick wymaga komponentu
 * klienckiego, a oznaczenie calej sekcji jako "use client" dolozyloby JS do
 * wszystkich 160 stron. Klienckie sa wylacznie same kotwice.
 *
 * rel bez `noreferrer`: docelowa domena ma widziec ten serwis jako zrodlo ruchu.
 * `noopener` zostaje, bo target="_blank" bez niego oddaje uchwyt do window.
 */
export function CrossSiteLink({
  children,
  className,
  href,
  lang,
  routeId,
  to,
}: CrossSiteLinkProps) {
  return (
    <a
      className={className}
      data-cross-site-link={to}
      href={href}
      onClick={() =>
        trackEvent("cross_site_click", {
          lang,
          route_id: routeId ?? "",
          to,
        })
      }
      rel="noopener"
      target="_blank"
    >
      {children}
    </a>
  );
}
