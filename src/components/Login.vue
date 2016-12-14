<template>
  <form class="ui form">
    <div class="field">
      <label>UserName</label>
      <input type="text" name="username" placeholder="username" v-model="credentials.username">
    </div>
    <div class="field">
      <label>Password</label>
      <input type="password" name="password" placeholder="password" v-model="credentials.password">
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" id="checkbox" v-model="credentials.checked">
        <label for="checkbox">Keep Login</label>
      </div>
    </div>
    <button class="ui button" @click.prevent="submit()">Submit</button>
  </form>
</template>

<script type="text/babel">
  import Crypto from 'crypto'

  export default {
    data () {
      return {
        // We need to initialize the component with any
        // properties that will be used in it
        credentials: {
          username: '',
          password: '',
          checked: false
        },
        error: ''
      }
    },
    methods: {
      submit () {
        let params = new window.URLSearchParams()
        let hmac = Crypto.createHmac('sha256', this.credentials.username)
          .update(this.credentials.password)
          .digest('hex')

        params.append('username', this.credentials.username)
        params.append('password', hmac)

        this.$http.get('http://0.0.0.0:8090/session?' + params).then((resp) => {
          console.log(resp.data.jwt_token)
        }, (err) => {
          console.log(err)
        })
      }
    }
  }
</script>
