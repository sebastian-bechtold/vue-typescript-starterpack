
<template>
  <div class="app">
    <p>The message: <input v-model="message"/></p>
    
    <p>TypeScript and Vue say:</p>
    <h1>{{message}}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
  props: {
    msg: String
  }
})
export default class App extends Vue {

  msg : string;
  message: string = "";

  mounted() {
    this.message = this.msg;
  }
}
</script>

<style>
div.app h1 {
    font-family:sans-serif;
}
</style>

