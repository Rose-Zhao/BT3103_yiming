<template>
  <div class="chart">
    <ul><router-link to="/" exact>Home</router-link></ul>
    <ul><router-link to="/orders" exact>Orders</router-link></ul>
    <ul><router-link to="/dashboard" exact>Dashboard</router-link></ul>
    <barChart></barChart>
    <lineChart></lineChart>
  </div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import CallAPI from "./components/CallAPI.vue"

export default {
  components: {
    barChart: BarChart,
    lineChart: CallAPI
  }
};
</script>

<style>
</style>