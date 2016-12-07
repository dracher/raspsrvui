<template>
  <div>
    <button class="ui button primary" @click="toggle">{{ cityName }}</button>
    <br>
    <transition name="fade">
      <div v-show="show" class="ui segment raised">
        <div v-bind:id="cityID" style="width:100%; height:400px;"></div>
      </div>
    </transition>
    <br>
  </div>
</template>

<script type="text/babel">
  import axios from 'axios'
  import Highcharts from 'highcharts'

  let drawChart = function (cityID, cityName, data) {
    let t = data[0].reverse()
    let p = data[2].map(parseFloat).reverse()
    let c = data[1].map(parseFloat).reverse()

    Highcharts.chart(cityID, {
      credits: {
        enabled: false
      },
      title: {
        text: data[0][23] + ' ' + cityName + ' AQI is  ' + data[2][0]
      },
      subtitle: {
        text: 'Current Conc is ' + data[1][0]
      },
      xAxis: {
        categories: t
      },
      yAxis: {
        title: {
          text: 'Air Index'
        }
      },
      series: [{
        name: 'PM2.5',
        color: '#FF0000',
        data: p,
        type: 'line'
      }, {
        name: 'Conc',
        color: '#000000',
        data: c,
        type: 'column'
      }]
    })
  }

  export default {

    data: function () {
      return {
        show: true
      }
    },

    props: ['cityName', 'cityID', 'showCity', 'apiUrl'],

    methods: {
      toggle: function () {
        this.show = this.show !== true
      }
    },

    beforeMount: function () {
      axios.get(this.apiUrl + this.cityID)
        .then((res) => {
          drawChart(this.cityID, this.cityName, res.data.resp)
        })
    },

    mounted: function () {
      if (this.cityID !== 'beijing') {
        setTimeout(() => {
          this.show = false
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }

  .fade-leave-active {
    transition: all .2s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .fade-enter, .fade-leave-active {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
