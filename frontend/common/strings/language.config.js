import {
    getLocales
} from 'expo-localization';
import {languageTr} from "./language.tr";
import {languageEn} from "./language.en";

const translations = {
    tr: languageTr,
    en: languageEn,
};

 const getStrings = () => {
    const deviceLanguage = getLocales()[0].languageCode; // "tr" veya "en"
    return deviceLanguage === 'tr' ? translations['tr']: translations['en'];
};


export const strings = getStrings();
