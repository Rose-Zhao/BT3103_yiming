<template>
  <div>
    <ul><router-link to="/" exact>Home</router-link></ul>
    <ul><router-link to="/orders" exact>Orders</router-link></ul>
    <ul><router-link to="/dashboard" exact>Dashboard</router-link></ul>
    <ul>
      <li v-for="(item,index) in orders" :key="index">
        <p>{{item[1].name}}:{{item[1].count}}</p><br>
        <button v-bind:id="item[0]" v-on:click="deleteItem($event)">Delete</button>
        <button v-bind:id="item[0]" v-on:click="route($event)">Modify</button>
      </li>
    </ul>
  </div>
</template>

<script>
    import database from "./firebase.js"
    export default {
        data(){
            return{
                orders:[]
            }
        },
        methods:{
            fetchItems: function(){
                    database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.orders.push([doc.id, doc.data()]);
                        console.log([doc.id, doc.data()]);
                    })
                })

            },
            deleteItem: function(event){
                let doc_id = event.target.getAttribute("id");
                //complete the rest
                database.collection('orders').doc(doc_id).delete()
            },
            route: function(event){
                let doc_id = event.target.getAttribute("id");
                this.$router.push({ name: 'modify', params: { id: doc_id } })
            }
        },
        created(){
            this.fetchItems()    
        }
    }
</script>


<style scoped>
    ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    }
    li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
    }

    button {
    width: 65px;
    height: 30px;
    background-color: #f7cac9;
    border-radius: 10px;
    border-width: 1px;
    }
</style>