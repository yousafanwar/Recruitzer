<template>
  <div class="card-panel login blue darken-2 white-text center">
    <h2>Recruitzi Login</h2>
    <form action="/" @submit.prevent="login()">
      <div class="input-field">
        <i class="material-icons prefix">email</i>
        <input type="email" id="email" class="white-text" v-model="email" />
        <label for="email" class="white-text">Email</label>
      </div>
      <div class="input-field">
        <i class="material-icons prefix">lock</i>
        <input type="password" id="password" class="white-text" v-model="password" />
        <label for="password" class="white-text">Password</label>
      </div>
      <input
        type="submit"
        value="Login"
        class="btn btn-large btn-extended grey lighten-4 black-text"
      />
    </form>
  </div>
</template>

<script>
import router from '../router/index'
import * as utilities from '../utilities'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login(){
      
      try{
        utilities.httpReqPOST('http://localhost:3000/api/login', 'email', this.email, 'password', this.password);
      }
      catch(error){
        console.log('Login function in loginview error', error);
      }
    }
    
  }
}
</script>
