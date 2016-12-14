// import {router} from '../main'
import axios from 'axios'
import cons from './constants'

export default {
  // User object will let us check authentication status
  user: {
    authenticated: false
  },
  login: function (creds, redirect) {
    console.log(creds)
    axios.put(cons.apiHost + cons.loginUrl, creds)
      .then(function (response) {
        window.localStorage.setItem('jwt_token', response.data.token)
        this.authenticated = true
      })
      .catch((err) => {
        console.log(err)
      })
  }

  // signup(context, creds, redirect) {
  //   context.$http.post(SIGNUP_URL, creds, (data) => {
  //     localStorage.setItem('id_token', data.id_token)
  //
  //     this.user.authenticated = true
  //
  //     if (redirect) {
  //       router.go(redirect)
  //     }
  //
  //   }).error((err) => {
  //     context.error = err
  //   })
  // },

  // To log out, we just need to remove the token
  // logout() {
  //   window.localStorage.removeItem('id_token')
  //   this.user.authenticated = false
  // },
  //
  // checkAuth() {
  //   let jwt = window.localStorage.getItem('id_token')
  //   this.user.authenticated = !!jwt;
  // },
  //
  // // The object to be passed as a header for authenticated requests
  // getAuthHeader() {
  //   return {
  //     'Authorization': 'Bearer ' + window.localStorage.getItem('id_token')
  //   }
  // }
}
