"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics";

let lastTrackedPagePath: string | null = null;

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const pagePath = `${pathname}${search ? `?${search}` : ""}`;

  useEffect(() => {
    if (lastTrackedPagePath === pagePath) {
      return;
    }

    lastTrackedPagePath = pagePath;

    trackPageView({
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pagePath]);

  return null;
}
