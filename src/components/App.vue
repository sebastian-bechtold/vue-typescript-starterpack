
<template>
  <div class="app">
    <p>The message: <input v-model="message"/></p>
    
    <p>TypeScript and Vue say:</p>
    <h1>{{message}}</h1>
  </div>
</template>

<script lang="ts">
import { Component, Inject, Model, Prop, Vue, Watch } from 'vue-property-decorator'

@Component({
  props: {

    // Define 'msg' as a prop (read below for details):
    msg: String
  }
})
export default class App extends Vue {

  // 'msg' holds the initial message that was passed as a component tag attribute, a so-called 'prop'.
  // In the '@Component' decorator above, 'msg' is defined as a prop.
  msg : string;

  // Members defined as a prop should not be modified by component code, 
  // so we need to create another member to store the modified message:
  message: string = "";

  // mounted() is automatically called when the component is added to the DOM. When this happens,
  // we copy the initial message from the prop to a "normal" class member so that we can modify it
  // through the input field:
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

