const state = {
  name: 'qizhenshuai'
}

const mutations = {

}

const actions = {
  global (store, payload) {
    console.log('store--->', store)
    console.log('payload--->', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
