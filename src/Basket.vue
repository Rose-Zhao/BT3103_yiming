<template>
  <div>
    <ul>
        <p>Menu:</p>
        <li v-for="(item,index) in itemsSelected" :key="index">
            <p>{{item[0]}} x {{item[1]}}</p>
        </li>
    </ul>
    <button v-on:click="findTotal();sendOrder();">Calculate Total</button>
    <p v-show="this.total">Subtotal:${{this.subTotal}}</p>
    <p v-show="this.total">Grandtotal:${{grandTotal}}</p>
  </div>
</template>

<script>
    import database from "./firebase.js"
    export default {
        props: ['itemsSelected'],
        data(){
            return{
                total:false,
                subTotal:0,
            }
        },
        methods:{
            findTotal:function(){
                for(let i = 0; i < this.itemsSelected.length; i++){
                    this.subTotal+=this.itemsSelected[i][2]
                }
                this.total=true
            },
            sendOrder:function(){
                for(let i=0; i<this.itemsSelected.length;i++){
                    database.collection('orders').add({
                        name: this.itemsSelected[i][0],
                        count: this.itemsSelected[i][1],
                        price: this.itemsSelected[i][2]
                        }).then(()=>{location.reload()});
                }
            }
        },
        computed:{
            grandTotal: function(){
                return this.subTotal*1.07.toFixed(2);
            }
        }
    }
</script>