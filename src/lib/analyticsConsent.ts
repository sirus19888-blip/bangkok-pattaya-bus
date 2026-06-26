import { isSupportedLocale, type LocaleCode } from "@/data/routes";

export const ANALYTICS_CONSENT_STORAGE_KEY = "bpb:analytics-consent";
export const ANALYTICS_CONSENT_GRANTED = "granted";
export const ANALYTICS_CONSENT_DENIED = "denied";
export const ANALYTICS_CONSENT_OPEN_EVENT = "bpb:open-analytics-consent";

export type AnalyticsConsentState =
  | typeof ANALYTICS_CONSENT_GRANTED
  | typeof ANALYTICS_CONSENT_DENIED;

type AnalyticsConsentCopy = {
  accept: string;
  body: string;
  privacy: string;
  reject: string;
  settings: string;
  title: string;
};

const consentCopy: Record<LocaleCode, AnalyticsConsentCopy> = {
  en: {
    accept: "Allow analytics",
    body: "We load Google Analytics only after you agree. It helps us understand page usage and booking-link clicks so we can improve the guide.",
    privacy: "Privacy policy",
    reject: "Reject",
    settings: "Cookie settings",
    title: "Analytics privacy",
  },
  pl: {
    accept: "Zgadzam się",
    body: "Google Analytics ładujemy dopiero po Twojej zgodzie. Pomaga nam mierzyć użycie strony i kliknięcia w linki rezerwacji, żeby ulepszać przewodnik.",
    privacy: "Polityka prywatności",
    reject: "Odrzuć",
    settings: "Ustawienia cookies",
    title: "Prywatność analityki",
  },
  de: {
    accept: "Analytics erlauben",
    body: "Google Analytics wird erst nach Ihrer Zustimmung geladen. So messen wir Seitennutzung und Klicks auf Buchungslinks, um den Guide zu verbessern.",
    privacy: "Datenschutz",
    reject: "Ablehnen",
    settings: "Cookie-Einstellungen",
    title: "Analytics-Datenschutz",
  },
  fr: {
    accept: "Autoriser",
    body: "Google Analytics ne se charge qu'après votre accord. Cela nous aide à mesurer l'utilisation du site et les clics de réservation pour améliorer le guide.",
    privacy: "Confidentialité",
    reject: "Refuser",
    settings: "Paramètres cookies",
    title: "Confidentialité analytique",
  },
  ru: {
    accept: "Разрешить",
    body: "Google Analytics загружается только после вашего согласия. Это помогает измерять использование сайта и клики по ссылкам бронирования.",
    privacy: "Политика конфиденциальности",
    reject: "Отклонить",
    settings: "Настройки cookies",
    title: "Конфиденциальность аналитики",
  },
  th: {
    accept: "ยอมรับ",
    body: "เราจะโหลด Google Analytics หลังจากคุณยินยอมเท่านั้น เพื่อช่วยวัดการใช้งานหน้าเว็บและการคลิกลิงก์จอง.",
    privacy: "นโยบายความเป็นส่วนตัว",
    reject: "ปฏิเสธ",
    settings: "ตั้งค่า cookies",
    title: "ความเป็นส่วนตัวของ Analytics",
  },
  zh: {
    accept: "允许",
    body: "只有在您同意后，我们才会加载 Google Analytics，用于了解页面使用情况和订票链接点击，以改进指南。",
    privacy: "隐私政策",
    reject: "拒绝",
    settings: "Cookie 设置",
    title: "Analytics 隐私",
  },
};

export function getAnalyticsConsentCopy(locale: string): AnalyticsConsentCopy {
  return isSupportedLocale(locale) ? consentCopy[locale] : consentCopy.en;
}

export function readAnalyticsConsent(): AnalyticsConsentState | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const value = window.localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY);

    return value === ANALYTICS_CONSENT_GRANTED ||
      value === ANALYTICS_CONSENT_DENIED
      ? value
      : null;
  } catch {
    return null;
  }
}

export function writeAnalyticsConsent(state: AnalyticsConsentState) {
  try {
    window.localStorage.setItem(ANALYTICS_CONSENT_STORAGE_KEY, state);
  } catch {
    // If storage is unavailable, keep the choice for the current page only.
  }
}
