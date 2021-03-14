<template>
  <div>
    <button v-on:click="qCounter(-1)">-</button>
    <a style="font-size:25px">{{counter}}</a>
    <button v-on:click="qCounter(1)">+</button>
  </div>
</template>

<script>
  export default {
    name:'QuantityCounter',
    props: ['item'],
    data() {
      return {
        counter: 0
      }
    },
    methods: {
      qCounter: function(val){
        if(val==1) {
          if(this.counter<10){
          this.counter += 1
          this.$emit('counter', this.item, this.counter)
          }else{
            alert("You cannot buy more than 10 items.")
          }
        }else{
          if(this.counter>0){
            this.counter -= 1
            this.$emit('counter', this.item, this.counter)
          }
        }
      }
    },
  }
</script>

<style scoped> 
button{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center; 
  color: #bb0d38a8; 
  }
</style>
