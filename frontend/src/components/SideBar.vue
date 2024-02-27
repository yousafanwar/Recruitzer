<template>
  <ul ref="sidenav" id="slide-out" class="sidenav blue darken-2">
    <li>
      <div class="user-view">
        <div class="background">
          <img src="/images/ocean.jpg" />
        </div>
        <a href="#user"><img class="circle" src="/images/person1.jpg" /></a>
        <a href="#name"><span class="white-text name">John Doe</span></a>
        <a href="#email"><span class="white-text email">jdandturk@gmail.com</span></a>
      </div>
    </li>

    <ul class="collapsible">
      <li>
        <a class="white-text waves-effect collapsible-header" v-if="isAdmin">
          <i class="material-icons">supervisor_account</i>Admin</a>
        <div class="waves-effect collapsible-body" v-on:click="getUsers()">
          <i class="material-icons">whatshot</i>All users
        </div>
      </li>
    </ul>
    <li>
      <a href="/entities" class="white-text waves-effect">
        <i class="material-icons">widgets</i>Two</a>
    </li>
    <li>
      <div class="divider"></div>
    </li>
    <li>
      <a href="/settings" class="white-text waves-effect"><i class="material-icons">settings</i>Three</a>
    </li>
    <li>
      <a href="#" class="white-text waves-effect"><i class="material-icons">exit_to_app</i>Logout</a>
    </li>
  </ul>
</template>

<script>
import * as utilities from '../utilities'
import router from '@/router'
import * as M from 'materialize-css/dist/js/materialize.min.js'

export default {
  data() {
    return {
      isAdmin: false
    }
  },
  mounted() {
    this.checkAdmin()
    var elem = this.$refs.sidenav
    M.Sidenav.init(elem)
    this.accordianFunc()
  },
  methods: {
    checkAdmin() {
      const roleId = utilities.loginData.roleId == 1;
      this.isAdmin = roleId;
    },
    accordianFunc() {
      document.addEventListener('DOMContentLoaded', function () {
        var elems = document.querySelectorAll('.collapsible');
        var instances = M.Collapsible.init(elems);
      });
    },
    getUsers() {
      router.push('/users');
    }
  }
}
</script>
