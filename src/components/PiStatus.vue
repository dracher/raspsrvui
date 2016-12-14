<template>
  <table class="ui inverted blue  table">
    <thead>
    <tr>
      <th colspan="3">
        Eric'Pi DashBoard
      </th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>CPU Temp</td>
      <td><a class="ui orange label">{{ cpu_t }}</a></td>
      <td></td>
    </tr>
    <tr>
      <td>GPU Temp</td>
      <td><a class="ui orange label">{{ gpu_t }}</a></td>
      <td></td>
    </tr>
    </tbody>
  </table>
</template>

<script type="text/babel">
  import cons from './constants'

  export default{
    data: function () {
      return {
        cpu_t: '',
        gpu_t: '',
        apiUrl: cons.apiUrl
      }
    },

    beforeMount: function () {
      this.$http.get(this.apiUrl + 'pistatus')
        .then((res) => {
          let r = res.data.resp
          this.cpu_t = r.cpu_t / 1000
          this.gpu_t = r.gpu_t
        })
    }
  }
</script>
