import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex'

export const state = () => ({
  hoge: 0
})

export const getters = getterTree(state, {
  hoge (state) { // プロパティスタイル
    return state.hoge
  },
  fuga: (state) => (piyo: number) => { // メソッドスタイル
    return state.hoge + piyo
  }
})

export const mutations = mutationTree(state, {
  increment (state) {
    state.hoge++
  },
  add (state, payload) {
    state.hoge += payload.fuga
  }
})

export const actions = actionTree({ state, getters, mutations }, {
  actionIncrement (context) {
    context.commit('increment')
  },
  actionAdd (context, payload) {
    context.commit('add', payload)
  },
  actionIncrement2 ({ commit }) { // シンプルなコード
    commit('increment')
  },
  actionIncrementAsync (context) { // 非同期の操作
    setTimeout(() => {
      context.commit('increment')
      console.log('committed: ' + context.state.hoge)
    }, 1000)
  }
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})
