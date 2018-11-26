
<template>
<div>
    <app-header></app-header>
   <div id="app">
    <router-view/>
  </div>
</div>
</template>

<script>
import Header from './template/shared/Header.vue'
import Home from './template/home/Home.vue'
import Experiences from './template/components/Experiences.vue'

export default {
  name: 'app',
  components: {
    appHeader: Header,
    appHome: Home,
    appExperiences: Experiences
  },
  mounted() {
    window.scroll({
      behavior: 'smooth'
    })
  }
}
</script>

<style lang="scss">
@import './assets/scss/globals.scss';
@import './assets/scss/bootstrap/bootstrap.scss';

@import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>
