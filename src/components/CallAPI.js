import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            datasets: [{ 
                data: [],
                fill: false,
                borderColor: "#3e95cd",
                label:"west"
            },{
                data: [],
                fill: false,
                borderColor: "#8e5ea2",
                label:"national"
            },{
                data: [],
                fill: false,
                borderColor: "#e8c3b9",
                label:"east"
            },{
                data: [],
                fill: false,
                borderColor: "#c45850",
                label:"central"
            },{
                data: [],
                fill: false,
                borderColor: "#2b5855",
                label:"south"
            },{
                data: [],
                fill: false,
                borderColor: "#E3B60C",
                label:"north"
            }]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: ''
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp)
                this.datacollection.datasets[0].data.push(data.readings.psi_twenty_four_hourly.west)
                this.datacollection.datasets[1].data.push(data.readings.psi_twenty_four_hourly.national)
                this.datacollection.datasets[2].data.push(data.readings.psi_twenty_four_hourly.east)
                this.datacollection.datasets[3].data.push(data.readings.psi_twenty_four_hourly.central)
                this.datacollection.datasets[4].data.push(data.readings.psi_twenty_four_hourly.south)
                this.datacollection.datasets[5].data.push(data.readings.psi_twenty_four_hourly.north)
            })
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}