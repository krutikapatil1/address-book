import * as englishLocale from '../shared-scripts/locale_en';
import * as spanishLocale from '../shared-scripts/locale_es';
import * as russianLocale from '../shared-scripts/locale_ru';
import * as frenchLocale from '../shared-scripts/locale_fa';
import * as polishLocale from '../shared-scripts/locale_pl';
import * as chineseLocale from '../shared-scripts/locale_cn';
import * as germanLocale from '../shared-scripts/locale_de';
import * as japaneseLocale from '../shared-scripts/locale_jp';
import * as portugeseLocale from '../shared-scripts/locale_pt';
import * as italianLocale from '../shared-scripts/locale_it';
import * as koreanLocale from '../shared-scripts/locale_kr';
import * as arabicLocale from '../shared-scripts/locale_ae';
import * as vietnameseLocale from '../shared-scripts/locale_vn';

export const addItems = (state, payload) => {
    state.items = state.items.filter(item => item.id !== '');
    let items = state.items.sort((a, b) => {
        if (a.id < b.id) {
            return -1;
        } else if (a.id > b.id) {
            return 1;
        } else {
            return 0;
        }
    })
    let lastId = items.length === 0 ? 0 : items[items.length - 1].id;
    for (let item of payload) {
        if (item.id === '') {
            item.id = ++lastId;
            state.items.push(item);
        } else {
            let itemToUpdate = state.items.find(i => i.id === item.id);
            itemToUpdate = item;
            state.items = state.items.map(obj => obj.id === itemToUpdate.id ? itemToUpdate : obj);
        }
    }


}

export const deleteItems = (state, payload) => {
    state.items = state.items.filter(item => !payload.find(p => p.id === item.id));
}

export const setLocale = (state, locale) => {
    state.selectedLocale = locale;
}

export const setLocaleLabels = (state, locale) => {
    switch (locale) {
        case 'gb':
            state.localeLabels = englishLocale;
            break;
        case 'es':
            state.localeLabels = spanishLocale;
            break;
        case 'ru':
            state.localeLabels = russianLocale;
            break;
        case 'fr':
            state.localeLabels = frenchLocale;
            break;
        case 'pl':
            state.localeLabels = polishLocale;
            break;
        case 'cn':
            state.localeLabels = chineseLocale;
            break;
        case 'de':
            state.localeLabels = germanLocale;
            break;
        case 'jp':
            state.localeLabels = japaneseLocale;
            break;
        case 'pt':
            state.localeLabels = portugeseLocale;
            break;
        case 'it':
            state.localeLabels = italianLocale;
            break;
        case 'kr':
            state.localeLabels = koreanLocale;
            break;
        case 'ae':
            state.localeLabels = arabicLocale;
            break;
        case 'vn':
            state.localeLabels = vietnameseLocale;
            break;
    }
}

export const deleteEmptyRows = state => {
    state.items = state.items.filter(i => {
        if (i.name !== '' || i.cell !== '') {
            return true;
        } else if (i.name === '' && i.cell === '') {
            return false;
        }
    });

}