const state = {}
const mutations = {}
const actions = {
  getTodayWeather(store, payload) {
    console.log('store--->', store)
    console.log('payload--->', payload)
  },
  home(store, params) {
    console.log('home - store - ', store)
    console.log('home - params - ', params)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
