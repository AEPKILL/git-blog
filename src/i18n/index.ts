import langPack from './lang-pack';

// tslint:disable:no-any

const lang: string = ((navigator as any).systemLanguage
  ? (navigator as any).systemLanguage
  : navigator.language
).substr(0, 2);

const i18n: { [key in keyof typeof langPack]: string } = {} as any;

for (const key of Object.keys(langPack)) {
  Object.defineProperty(i18n, key, {
    get() {
      if (lang === 'zh') {
        return langPack[key as keyof typeof langPack].zh;
      } else {
        return langPack[key as keyof typeof langPack].en;
      }
    }
  });
}

export function coverI18n(name: string | { zh?: string; en?: string }) {
  if (typeof name === 'string') {
    return name;
  }
  if (lang == 'zh' && name.zh) {
    return name.zh;
  }
  if (name.en) {
    return name.en;
  }
  return '';
}

// tslint:enable:no-any

export default i18n;
