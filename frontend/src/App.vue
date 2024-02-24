<script setup>
import './assets/styles.css'
import './assets/scripts.js'
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<script>
import * as M from 'materialize-css/dist/js/materialize.min.js'

export default {
  mounted() {
    M.AutoInit()
  }
}
</script>

<style scoped></style>
