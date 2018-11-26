
<template>
    <div class="home" style="">
      <div :style="{'backgroundImage':'url(' + bacgkroundImage + ')'}" class="backgroundImage fixed-top h-100"></div>
      <section class="align-items-center d-flex flex-column justify-content-center section-top w-100 height-max">
        <h1 class="home-title text-white text-uppercase">À la recherche d'un expert Front-end?</h1>
        <h2 class="home-subtitle text-white">Developer since 6 years.</h2>
      </section>
      <app-section1></app-section1>
      <app-section2></app-section2>
      <app-section3></app-section3>
    </div>
</template>

<script>
import Section1 from "./Section1.vue";
import Section2 from "./Section2.vue";
import Section3 from "./Section3.vue";
import { eventBus } from '../../main'


export default {
  data () {
    return {
      bacgkroundImage: '/static/images/home-background.jpg'
    }
  },
  components: {
    appSection1: Section1,
    appSection2: Section2,
    appSection3: Section3,
  },
  mounted() {
    // var getBody = document.querySelector('')
    window.addEventListener('scroll', (evt) => {
      var imageOffset = document.querySelector('.backgroundImage');
      eventBus.getParallax(imageOffset);
    });
  }
}
</script>

<style lang="scss">
@import "../../assets/scss/components/home.scss";
.home-title,
.home-subtitle{
    text-shadow: 1px 1px 15px #000;
}
</style>
