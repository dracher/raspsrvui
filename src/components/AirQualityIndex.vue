<template>
  <div>
    <single-city v-for="(value, key, index) in cityNameMapper"
                 v-bind:showCity="index"
                 v-bind:cityName="value"
                 v-bind:cityID="key"
                 v-bind:apiUrl="apiUrl">
    </single-city>
  </div>
</template>

<script type="text/babel">
  import cons from './constants'
  import SingleCity from './AirQualityIndexCity'

  export default{

    data: function () {
      return {
        cityNameMapper: {
          'beijing': '北京',
          'chengdu': '成都',
          'guangzhou': '广州',
          'shanghai': '上海',
          'shenyang': '沈阳'
        },
        apiUrl: cons.apiUrl + 'airindex/'
      }
    },

    components: {
      SingleCity
    }
  }
</script>
