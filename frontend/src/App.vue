<script setup>
import './assets/main.css';
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style scoped></style>

<script>
import * as M from 'materialize-css/dist/js/materialize.min.js';
export default {
  mounted() {
    M.AutoInit();
  }
}
</script>