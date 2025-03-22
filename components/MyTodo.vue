<template>
  <div>
    <todo-input
      v-on:add="addTodo"
    />
    <todo-label
      v-for="todo in sortedTodo"
      v-bind:key="todo.id"
      v-bind:todo="todo"
      v-on:done="doneTodo"
      v-on:remove="removeTodo"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Todo } from '@/types/todo'
import TodoInput from '@/components/TodoInput.vue'
import TodoLabel from '@/components/TodoLabel.vue'
import MyCookie from '@/plugins/Cookie'

export default Vue.extend({
  components: {
    TodoInput,
    TodoLabel
  },
  methods: {
    loadData: async function () {
      console.log('loadData')

      // データの読み込み処理
      this.$accessor.actionInitialize()
      const cookie: MyCookie = new MyCookie()
      for (let i = 0; ; i++) {
        const id = cookie.getValue('id' + i, '')
        if (id.length === 0) {
          break
        }
        const done = cookie.getBool('done' + i, false)
        const date = new Date(cookie.getNumber('date' + i, 0))
        const text = cookie.getValue('text' + i, '')
        const color = cookie.getValue('color' + i, '')
        this.$accessor.actionPush({
          todo: {
            id: id,
            done: done,
            date: date,
            text: text,
            color: color
          }
        })
      }
    },
    saveData: function () {
      console.log('saveData')

      // データの書き込み処理
      const todoList = this.$accessor.todoList
      const cookie: MyCookie = new MyCookie()
      let i = 0
      for (; i < todoList.length; i++) {
        const todo = todoList[i]
        cookie.setValue('id' + i, todo.id)
        cookie.setBool('done' + i, todo.done)
        cookie.setNumber('date' + i, todo.date.getTime())
        cookie.setValue('text' + i, todo.text)
        cookie.setValue('color' + i, todo.color)
      }
      cookie.setValue('id' + i, '')
    },
    addTodo: function (text: string, color: string) {
      this.$accessor.actionAdd({
        todo: {
          id: (new Date()).getTime().toString(),
          done: false,
          date: new Date(),
          text: text,
          color: color
        }
      })
      this.saveData()
    },
    removeTodo: function (id: string) {
      this.$accessor.actionRemove({ id: id })
      this.saveData()
    },
    doneTodo: function (id: string) {
      this.$accessor.actionDone({ id: id })
      this.saveData()
    }
  },
  computed: {
    sortedTodo: function (): Todo[] {
      const todoList = this.$accessor.todoList.slice()
      return todoList.sort((a: Todo, b: Todo) => {
        return b.date.getTime() - a.date.getTime()
      })
    }
  },
  beforeCreate: function () {
    console.log('MyTodo beforeCreate')
  },
  created: function () {
    console.log('MyTodo created')
  },
  beforeMount: function () {
    console.log('MyTodo beforeMount')
  },
  mounted: async function () {
    console.log('MyTodo mounted')

    // データの読み込み
    await this.loadData()
  },
  beforeUpdate: function () {
    console.log('MyTodo beforeUpdate')
  },
  updated: function () {
    console.log('MyTodo updated')
  },
  beforeDestroy: function () {
    console.log('MyTodo beforeDestroy')
  },
  destroyed: function () {
    console.log('MyTodo destroyed')
  }
})
</script>
