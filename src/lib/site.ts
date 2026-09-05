export const SITE_URL = "https://www.bangkokpattayabus.com";
export const SITE_NAME = "Bangkok Pattaya Bus Guide";

// Tozsamosc wydawcy. Google ocenia tresc poradnikowa takze po tym, kto za nia
// stoi, a serwis do tej pory nie wskazywal nikogo z nazwiska. Ta sama wartosc
// zasila JSON-LD (Person/Organization) oraz strony /about i /contact, zeby
// dane strukturalne i tresc widoczna nie mogly sie rozjechac.
export const SITE_AUTHOR = "Paweł Giżyński";
export const SITE_EMAIL = "bangkokpattayabus@gmail.com";

export function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
