const cp1250ReverseMap = new Map<string, number>([
  ["€", 0x80],
  ["‚", 0x82],
  ["„", 0x84],
  ["…", 0x85],
  ["†", 0x86],
  ["‡", 0x87],
  ["‰", 0x89],
  ["Š", 0x8a],
  ["‹", 0x8b],
  ["Ś", 0x8c],
  ["Ť", 0x8d],
  ["Ž", 0x8e],
  ["Ź", 0x8f],
  ["‘", 0x91],
  ["’", 0x92],
  ["“", 0x93],
  ["”", 0x94],
  ["•", 0x95],
  ["–", 0x96],
  ["—", 0x97],
  ["™", 0x99],
  ["š", 0x9a],
  ["›", 0x9b],
  ["ś", 0x9c],
  ["ť", 0x9d],
  ["ž", 0x9e],
  ["ź", 0x9f],
  ["ˇ", 0xa1],
  ["˘", 0xa2],
  ["Ł", 0xa3],
  ["Ą", 0xa5],
  ["Ş", 0xaa],
  ["Ż", 0xaf],
  ["°", 0xb0],
  ["±", 0xb1],
  ["˛", 0xb2],
  ["ł", 0xb3],
  ["ą", 0xb9],
  ["ş", 0xba],
  ["Ľ", 0xbc],
  ["˝", 0xbd],
  ["ľ", 0xbe],
  ["ż", 0xbf],
  ["Ŕ", 0xc0],
  ["Á", 0xc1],
  ["Â", 0xc2],
  ["Ă", 0xc3],
  ["Ä", 0xc4],
  ["Ĺ", 0xc5],
  ["Ć", 0xc6],
  ["Ç", 0xc7],
  ["Č", 0xc8],
  ["É", 0xc9],
  ["Ę", 0xca],
  ["Ë", 0xcb],
  ["Ě", 0xcc],
  ["Í", 0xcd],
  ["Î", 0xce],
  ["Ď", 0xcf],
  ["Đ", 0xd0],
  ["Ń", 0xd1],
  ["Ň", 0xd2],
  ["Ó", 0xd3],
  ["Ô", 0xd4],
  ["Ő", 0xd5],
  ["Ö", 0xd6],
  ["Ř", 0xd8],
  ["Ů", 0xd9],
  ["Ú", 0xda],
  ["Ű", 0xdb],
  ["Ü", 0xdc],
  ["Ý", 0xdd],
  ["Ţ", 0xde],
  ["ß", 0xdf],
  ["ŕ", 0xe0],
  ["á", 0xe1],
  ["â", 0xe2],
  ["ă", 0xe3],
  ["ä", 0xe4],
  ["ĺ", 0xe5],
  ["ć", 0xe6],
  ["ç", 0xe7],
  ["č", 0xe8],
  ["é", 0xe9],
  ["ę", 0xea],
  ["ë", 0xeb],
  ["ě", 0xec],
  ["í", 0xed],
  ["î", 0xee],
  ["ď", 0xef],
  ["đ", 0xf0],
  ["ń", 0xf1],
  ["ň", 0xf2],
  ["ó", 0xf3],
  ["ô", 0xf4],
  ["ő", 0xf5],
  ["ö", 0xf6],
  ["ř", 0xf8],
  ["ů", 0xf9],
  ["ú", 0xfa],
  ["ű", 0xfb],
  ["ü", 0xfc],
  ["ý", 0xfd],
  ["ţ", 0xfe],
  ["˙", 0xff],
]);

const mojibakePattern =
  /(?:â€|â€“|â€”|â–|âŚ|PokaĹ|wiÄ|Đ|ŕ|ć|ç«|ĺ|Ă|Ä|Ĺ|č|ć|Â)/;

export function repairMojibake(value: string): string {
  if (!mojibakePattern.test(value)) {
    return value;
  }

  const bytes: number[] = [];

  for (const char of value) {
    const code = char.codePointAt(0) ?? 0;
    const mapped = cp1250ReverseMap.get(char);

    if (mapped !== undefined) {
      bytes.push(mapped);
    } else if (code <= 0xff) {
      bytes.push(code);
    } else {
      return value;
    }
  }

  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(
      Uint8Array.from(bytes),
    );
  } catch {
    return value;
  }
}

export function repairMojibakeList(values: string[]): string[] {
  return values.map((value) => repairMojibake(value));
}
