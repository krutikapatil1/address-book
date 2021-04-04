export const addItems = ({ commit }) => {
    commit('addItems');
}

export const deleteItems = ({ commit }, payload) => {
    commit('deleteItems', payload);
}