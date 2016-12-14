<template>
  <div>
    <button v-bind:class="[btnCls, btnColor]" @click="toggle">{{ cityName }} &nbsp;&nbsp;&nbsp; {{ currentEmoji }} &nbsp;&nbsp;&nbsp;{{ currentAqi }}</button>

    <transition name="fade">
      <div v-show="show" class="ui segment raised">
        <div v-bind:id="cityID" style="width:100%; height:400px;"></div>
      </div>
    </transition>
    <br>
  </div>
</template>

<script type="text/babel">
  import Highcharts from 'highcharts'

  export default {
    data: function () {
      return {
        show: true,
        btnCls: 'ui button fluid',
        btnColor: '',
        currentAqi: 0,
        currentEmoji: ''
      }
    },

    props: ['cityName', 'cityID', 'showCity', 'apiUrl'],

    methods: {
      toggle: function () {
        this.show = this.show !== true
      },
      drawChart: function (cityID, cityName, data) {
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
        }, () => {
          this.show = false
        })
      },
      colorByAQI: function (con) {
        let aqi = parseFloat(con)

        if (aqi === 0) {
          this.btnColor = ''
          this.currentEmoji = '(￣.￣)'
        } else if (aqi <= 50) {
          this.btnColor = 'green'
          this.currentEmoji = 'o(*≧▽≦)ツ'
        } else if (aqi <= 100) {
          this.btnColor = 'yellow'
          this.currentEmoji = '╰(*°▽°*)╯'
        } else if (aqi <= 150) {
          this.btnColor = 'orange'
          this.currentEmoji = 'ಥ_ಥ '
        } else if (aqi <= 200) {
          this.btnColor = 'red'
          this.currentEmoji = ' (╯‵□′)╯︵┻━┻'
        } else if (aqi <= 300) {
          this.btnColor = 'violet'
          this.currentEmoji = '╮(╯▽╰)╭'
        } else {
          this.btnColor = 'black'
          this.currentEmoji = ' ( ・◇・)？'
        }
      }
    },

    beforeMount: function () {
      this.$http.get(this.apiUrl + this.cityID)
        .then((res) => {
          let rd = res.data.resp
          this.currentAqi = rd[2][0]
          this.colorByAQI(rd[2][0])
          this.drawChart(this.cityID, this.cityName, rd)
        })
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
