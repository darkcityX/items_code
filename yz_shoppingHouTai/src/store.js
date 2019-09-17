import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        getUser: state => state.userInfo
    },
    mutations: {
        CHANGEUSERS(state, newUser) {
            state.userInfo = newUser
            console.log(state.userInfo);
        }
    },
    actions: {
        changeUser({ commit }, newUser) {
            commit("CHANGEUSERS", newUser)
        }
    }
})
