import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
import * as englishLocale from '../shared-scripts/locale_en'
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
            { id: '1', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '2', name: 'Tamara Landry', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3434', cell: '(408)-335-9067' },
            { id: '3', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '4', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '5', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '6', name: 'Tamara Landry', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3434', cell: '(408)-335-9067' },
            { id: '7', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '8', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' }
        ],
        selectedLocale: 'gb',
        localeLabels: englishLocale
    },
    mutations,
    actions,
    getters,
    plugins: [createPersistedState()],
})