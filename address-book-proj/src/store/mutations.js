export const addItems = (state) => {
    const unsavedItems = state.items.filter(item => item.id === '');
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
    for (let item of unsavedItems) {
        item.id = ++lastId;
        state.items.push(item);
    }
}

export const deleteItems = (state, payload) => {
    state.items = state.items.filter(item => !payload.find(p => p.id === item.id));
}