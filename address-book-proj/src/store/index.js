import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions';
import * as mutations from './mutations';
import * as getters from './getters';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        items: [
            { id: '1', name: 'John Smith', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3432', cell: '(408)-345-9067' },
            { id: '2', name: 'Tamara Landry', location: 'Palo Alto', building: 'CR-211', office: '(408)-345-3434', cell: '(408)-335-9067' }
        ]
    },
    mutations,
    actions,
    getters
})