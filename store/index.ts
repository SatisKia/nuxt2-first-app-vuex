import { getterTree, mutationTree, actionTree, getAccessorType } from 'typed-vuex'
import { Todo } from '@/types/todo'

export const state = () => ({
  todoList: [] as Todo[]
})

export const getters = getterTree(state, {
  todoList (state) {
    return state.todoList
  }
})

export const mutations = mutationTree(state, {
  initialize (state) {
    state.todoList = [] as Todo[]
  },
  push (state, payload: { todo: Todo }) {
    state.todoList.push(payload.todo)
  },
  add (state, payload: { todo: Todo }) {
    state.todoList = [...state.todoList, payload.todo]
  },
  remove (state, payload: { id: string }) {
    state.todoList = state.todoList.filter(todo => todo.id !== payload.id)
  },
  done (state, payload: { id: string }) {
    const todoList = state.todoList.slice()
    const todo = todoList.find(todo => todo.id === payload.id)
    if (todo) {
      todo.done = !todo.done
      state.todoList = todoList
    }
}
})

export const actions = actionTree({ state, getters, mutations }, {
  actionInitialize (context) {
    context.commit('initialize')
  },
  actionPush (context, payload: { todo: Todo }) {
    context.commit('push', payload)
  },
  actionAdd (context, payload: { todo: Todo }) {
    context.commit('add', payload)
  },
  actionRemove (context, payload: { id: string }) {
    context.commit('remove', payload)
  },
  actionDone (context, payload: { id: string }) {
    context.commit('done', payload)
  }
})

export const accessorType = getAccessorType({
  state,
  getters,
  mutations,
  actions
})
