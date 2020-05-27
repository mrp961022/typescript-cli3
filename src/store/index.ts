import Vue from 'vue'
import Vuex from 'vuex'
import { ajax } from '@/assets/js/ajaxUrl'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    jsonArray: []
  },
  mutations: {
    getCount(state, value) {
      state.count = value;
    },
    getJsonArray(state, value) {
      ajax({ type: 'get', url: "http://localhost:8888/county.json", data: value })
        .then(reponse => {
          state.jsonArray = JSON.parse(reponse).data;
        })
        .catch(reject => {
          console.error(reject)
        })
    }
  },
  actions: {
  },
  modules: {
  }
})
