export const addItems = ({ commit }, payload) => {
    commit('addItems', payload);
}

export const deleteItems = ({ commit }, payload) => {
    commit('deleteItems', payload);
}

export const setLocale = ({ commit }, locale) => {
    commit('setLocale', locale);
    commit('setLocaleLabels', locale);
}

export const deleteEmptyRows = ({ commit }) => {
    commit('deleteEmptyRows');
}