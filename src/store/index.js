import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cityInfo: {}
    },
    mutations: {
        addCity(state, info) {
            state.cityInfo = info
        }
    },
    actions: {},
    modules: {}
})