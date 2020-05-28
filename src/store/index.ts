import Vue from 'vue'
import Vuex from 'vuex'
import { ajax } from '@/assets/js/ajaxUrl'
import { MrpIndexDB } from "@/assets/js/indexDB"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count: 0,
    jsonArray: [],
    INDEXEDDB_DB_RET: undefined
  },
  mutations: {
    getCount(state, value) {
      state.count = value;
    },
    getJsonArray(state, value) {
      ajax({ type: 'get', url: "http://localhost:8888/county.json", data: value })
        .then(reponse => {
          state.jsonArray = JSON.parse(reponse).data
          MrpIndexDB.addData("person", { key: "jsonArray", value: JSON.parse(reponse).data })
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
