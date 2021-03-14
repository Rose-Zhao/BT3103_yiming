import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{
                label: "Orders",
                data: [],
                backgroundColor: "#3e95cd"
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total number of each dish'
            },
            scales: {
              yAxes: [{
                  ticks: {
                      suggestedMin: 0
                  }
              }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            this.datacollection.labels.push(doc.data().name)
            this.datacollection.datasets[0].data.push(doc.data().count)
        })
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}