<template>
  <div id="counter">
    <ul id="nav"><router-link to="/" exact>Home</router-link></ul>
    <ul id="nav"><router-link to="/orders" exact>Orders</router-link></ul>
    <ul id="nav"><router-link to="/dashboard" exact>Dashboard</router-link></ul>
    <ul style="width:70%;float:left" id="itemsList">
      <li v-for="(item,index) in itemsList" :key="index">
        <p id="itemName">{{item.name}}</p><br>
        <img v-bind:src="item.imageURL"><br>
        <p id="price">Price: ${{item.price}}</p>
        <qtCounter v-bind:item="item" v-on:counter="onCounter"></qtCounter>
      </li>
      <bask v-bind:itemsSelected="itemsSelected" style="width:30%;float:left" id="ShoppingBasket"></bask>
    </ul>
  </div>
</template>

<script>
    import QuantityCounter from './QuantityCounter.vue'
    import Basket from './Basket.vue'
    import database from "./firebase.js"
    export default {
        name:"PageContent",
        components:{
            qtCounter:QuantityCounter,
            bask: Basket
        },
        data() {
            return{
                itemsList: [],
                itemsSelected:[]
            }
        },
        //wait to be removed
        //props: ['itemsList'],
        methods:{
            onCounter: function (item, count) {
                if (this.itemsSelected.length === 0 && count > 0) {
                    //If there is nothing in items selected, push the ORDER in
                    this.itemsSelected.push([item.name, count, item.price]);
                } else {
                    // Loop through everything to check what is not in the basket
                    for (let i = 0; i < this.itemsSelected.length; i++) {
                        const curr_item = this.itemsSelected[i];
                        const item_name = curr_item[0];
                        var is_in = false;

                        // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                        if(item_name==item.name && count>0){
                            this.itemsSelected[i][1] = count
                            is_in=true
                        }else if(item_name==item.name && count==0){
                            this.itemsSelected.splice(i,i+1)
                            is_in=true
                        }
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.

                        // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                        
                    }
                    if(is_in==false && count>0){
                        this.itemsSelected.push([item.name, count, item.price]);
                    }
                }
            },
            fetchItems: function(){
                    database.collection('menu').get().then(snapshot => {
                    snapshot.docs.forEach(doc => {
                        this.itemsList.push(doc.data());
                        console.log(doc.data());
                    })
                })

            }
        },
        created(){
            this.fetchItems()    
        }
    }
</script>

<style scoped> 
    #nav {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
    }
    #itemsList {
    width: 100%;
    max-width: 70%;
    margin: 0px;
    padding: 0 5px;
    box-sizing: border-box;
    }
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
    img {
    width: 135px;
    height: 135px;
    }

    #price {
    font-size: 30px;
    }

    #itemName {
    font-size: 30px;
    }

    #shoppingBasket {
    position: absolute;
    top: 23%;
    left: 78%;
    }
</style>