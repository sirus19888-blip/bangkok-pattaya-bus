export const SITE_URL = "https://www.bangkokpattayabus.com";
export const SITE_NAME = "Bangkok Pattaya Bus Guide";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
