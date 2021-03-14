<template>
  <div>
    <ul>
      <li v-for="(item,index) in datapacket" :key="index">
        <p>{{item[1].name}}:{{item[1].count}}</p><br>
        <input id=index v-model=item[1].count placeholder=0 type="number" min=0>
      </li>
      <button v-on:click="updateOrder">Update Order</button>
    </ul>
  </div>
</template>

<script>
    import database from "./firebase.js"
    export default {
        data(){
            return{
                datapacket:[],
                message:[],
                updateID: this.$route.params.id
            }
        },
        methods:{
            fetchItems: function(){
                    database.collection('orders').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        if (this.updateID==doc.id){
                            this.datapacket.push([doc.id, doc.data()]);
                        }
                        console.log([doc.id, doc.data()]);
                    })
                })

            },
            updateOrder: function(){
                for(let i=0; i<this.datapacket.length;i++){
                    database.collection('orders').doc(this.updateID).update({count: this.datapacket[i].count}).then(()=>this.$router.push({name:"orders"}));
                }
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