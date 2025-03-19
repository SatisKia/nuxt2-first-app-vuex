<template>
  <div>
    <input type="text" class="input" v-model="text" />
    <div>
      <input type="radio" id="color1" name="color" value="#80ffff" checked />
      <label for="color1">シアン</label>
      <input type="radio" id="color2" name="color" value="#ff80ff" />
      <label for="color2">マゼンタ</label>
      <input type="radio" id="color3" name="color" value="#ffff80" />
      <label for="color3">イエロー</label>
    </div>
    <div v-if="!isError">
      <button style="width:100%" v-on:click="onAdd" v-bind:disabled="(text.length == 0) || isError">登録</button>
    </div>
    <div v-if="isError">
      <span class="error">入力できる文字は100文字までです</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      text: '',
      isError: false
    }
  },
  methods: {
    onAdd: function () {
      const input1 = document.getElementById('color1') as HTMLInputElement
      const input2 = document.getElementById('color2') as HTMLInputElement
      const input3 = document.getElementById('color3') as HTMLInputElement
      let color = input1.value
      if (input2.checked) {
        color = input2.value
      } else if (input3.checked) {
        color = input3.value
      }
      this.$emit('add', this.text, color)
      this.text = ''
    }
  },
  watch: {
    text (newVal) {
      if (newVal.length > 100) {
        this.isError = true
      } else {
        this.isError = false
      }
    }
  },
  beforeCreate: function () {
    console.log('TodoInput beforeCreate')
  },
  created: function () {
    console.log('TodoInput created')
  },
  beforeMount: function () {
    console.log('TodoInput beforeMount')
  },
  mounted: async function () {
    console.log('TodoInput mounted')
  },
  beforeUpdate: function () {
    console.log('TodoInput beforeUpdate')
  },
  updated: function () {
    console.log('TodoInput updated')
  },
  beforeDestroy: function () {
    console.log('TodoInput beforeDestroy')
  },
  destroyed: function () {
    console.log('TodoInput destroyed')
  }
})
</script>

<style scoped>
.input {
  width: 100%;
  border: 0;
  border-bottom: 1px solid #808080;
  padding: 4px;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.input:focus {
  outline: none;
}
.error {
  color: #ff0000;
}
</style>
