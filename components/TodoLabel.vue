<template>
  <div class="label" v-bind:style="{ 'background-color': (todo.done ? '#808080' : todo.color) }">
    <div style="width:100%">
      <table class="table">
        <tbody>
          <tr>
            <td class="td" style="width:5%">
              <input type="checkbox" v-bind:checked="todo.done" v-on:change="done" />
            </td>
            <td class="td" style="width:20%">
              <span>{{ date }}</span>
            </td>
            <td class="td" style="width:65%">
              <span>{{ todo.text }}</span>
            </td>
            <td class="td" style="width:10%">
              <button v-if="todo.done" style="width:100%; border:0" v-bind:style="{ 'background-color': (todo.done ? '#808080' : todo.color) }" v-on:click="remove">消</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import { Todo } from '@/types/todo'

export default Vue.extend({
  props: {
    todo: {
      type: Object as PropType<Todo>,
      required: true
    }
  },
  methods: {
    done: function () {
      if (this.$props.todo) {
        this.$emit('done', this.$props.todo.id)
      }
    },
    remove: function () {
      if (this.$props.todo) {
        this.$emit('remove', this.$props.todo.id)
      }
    }
  },
  computed: {
    date: function (): string {
      if (!this.$props.todo) return ''
      const { date } = this.$props.todo
      return '' + date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
    }
  },
  beforeCreate: function () {
    console.log('TodoLabel beforeCreate')
  },
  created: function () {
    console.log('TodoLabel created')
  },
  beforeMount: function () {
    console.log('TodoLabel beforeMount')
  },
  mounted: async function () {
    console.log('TodoLabel mounted')
  },
  beforeUpdate: function () {
    console.log('TodoLabel beforeUpdate')
  },
  updated: function () {
    console.log('TodoLabel updated')
  },
  beforeDestroy: function () {
    console.log('TodoLabel beforeDestroy')
  },
  destroyed: function () {
    console.log('TodoLabel destroyed')
  }
})
</script>

<style scoped>
.label {
  margin: 4px 0 0 0;
}
.table {
  border: 0;
}
.td {
  text-align: left;
  vertical-align: middle;
  word-break: break-all;
}
</style>
