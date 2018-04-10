import langPack from './lang-pack';

// tslint:disable-next-line:no-any
const lang: string = ((navigator as any).systemLanguage
  ? // tslint:disable-next-line:no-any
    (navigator as any).systemLanguage
  : navigator.language
).substr(0, 2);

// tslint:disable-next-line:no-any
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

export default i18n;
