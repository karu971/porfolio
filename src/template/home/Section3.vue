<template>
 <div class="bg-dark p-9 containers d-flex flex-wrap">
      <div class="d-flex justify-content-between align-items-center w-100 container">
        <div>
          <h2 class="experience-title text-white w-100 section-title">Compétence Informatique</h2>
          <h3 class="experience-subtitle w-100 text-white mb-3 section-subtitle">Jetez un coup d'œil à aux projets auquels j'ai participé.</h3>
        </div>
        <div>
          <a href="/experiences" class="btn btn-button border border-nobel text-nobel">Voir plus</a>
        </div>
      </div>
        <div class="bl-bloc-responsive position-relative w-100 d-flex flex-wrap justify-content-center container">
            <div v-for="(listCompentecesArray, index) of listCompentecesArrays"
            :key="index"
            class="border border-dark p-3 position-relative"
            :style="[blockStyle, {'background-color':listCompentecesArray.bgColor}]"
                @mouseover="GetOpacityIn(listCompentecesArray)"
                @mouseout="GetOpacityOut(listCompentecesArray)">
                <div class="backgroundShadow" style="z-index:0"></div>
                <div
                :style="[backgroundStyle, {'backgroundImage':`url(/static/images/competences/${listCompentecesArray.image})`}]"
                class="h-100 w-100 d-flex justify-content-center align-items-center">
                </div>
                <div class="align-items-center bloc-text d-flex justify-content-center">
                    <p style="opacity:0" class="p-2 d-flex border border-white m-0 text-white text-capitalize justify-content-center align-items-center font-weight-bold">
                        {{ listCompentecesArray.name }}
                    </p>
                </div>
            </div>
            {{listLanguagesArrays}}
            <div v-for="(listLanguagesArray, index) of listLanguagesArrays"
            :key="index"
            class="border border-dark p-3 position-relative"
            :style="[blockStyle, {'background-color':listLanguagesArray.bgColor}]"
                @mouseover="GetOpacityIn(listLanguagesArray)"
                @mouseout="GetOpacityOut(listLanguagesArray)">
                <div class="backgroundShadow" style="z-index:0"></div>
                <div
                :style="[backgroundStyle, {'backgroundImage':`url(/static/images/languages/${listLanguagesArray.image})`}]"
                class="h-100 w-100 d-flex justify-content-center align-items-center">
                </div>
                <div class="align-items-center bloc-text d-flex justify-content-center">
                    <p style="opacity:0" class="p-2 d-flex border border-white m-0 text-white text-capitalize justify-content-center align-items-center font-weight-bold">
                        {{ listLanguagesArray.name }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import ResponsiveBloc from "../plugins/ResponsiveBloc";
import { eventBus } from "../../main.js";
import { get } from "http";
import { log } from "util";

export default {
  components: {
    appResponsiveBloc: ResponsiveBloc
  },
  data() {
    return {
      listCompentecesArrays: null,
      listLanguagesArrays: null,
      blockNumber: null,
      backgroundStyle: {
        "background-repeat": "no-repeat",
        "background-size": "contain",
        "background-position": "center"
      },
      blockStyle: {
        width: "260px",
        height: "200px",
        transition: "2s"
      }
    };
  },
  methods: {
    GetOpacityIn(listCompentecesArray) {
      event.currentTarget.querySelector(".bloc-text p").style.opacity = 1;
      event.currentTarget.querySelector(".backgroundShadow").style.opacity = 1;
    },
    GetOpacityOut(listCompentecesArray) {
      event.currentTarget.querySelector(".bloc-text p").style.opacity = 0;
      event.currentTarget.querySelector(".backgroundShadow").style.opacity = 0;
    }
  },
  mounted() {
    axios.get("/static/json/language.json").then(response => {
      this.listLanguagesArrays = response.data;
    });
    axios.get("/static/json/competence.json").then(response => {
      TODO
      // this.listCompentecesArrays = response.data;
    });
  }
};
</script>

<style lang="scss">
.bloc-text {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>