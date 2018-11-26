<template>
    <div class="bg-white p-9 containers d-flex flex-wrap">
      <div class="d-flex justify-content-between align-items-center w-100 container">
        <div>
          <h2 class="experience-title text-dark w-100 section-title">Expériences</h2>
          <h3 class="experience-subtitle w-100 mb-3 section-subtitle">Jetez un coup d'œil à aux projets auquels j'ai participé.</h3>
        </div>
        <div>
          <a href="/experiences" class="btn btn-button border border-nobel text-nobel">Voir plus</a>
        </div>
      </div>
        <div class="bl-bloc-responsive position-relative w-100">
          <app-tablist></app-tablist>
          <app-responsive-bloc></app-responsive-bloc>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../../main.js";
import axios from "axios";
import TabList from "../plugins/TabList";
import ResponsiveBloc from "../plugins/ResponsiveBloc";

export default {
  name: "Section2",
  components: {
    appResponsiveBloc: ResponsiveBloc,
    appTablist: TabList
  },
  data() {
    return {
      listCompanys: null,
      listProjectsArrays: [],
      blockNumber: null,
      newArrayJob: null,
      companyLogo: null
    };
  },
  mounted() {
    eventBus.getDataResponse("/static/json/company.json");
  }
};
</script>
<style lang="scss" scoped>
h2 {
  font-size: 5rem;
}
.block-experience {
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center;
  width: 240px;
  height: 240px;
}
.experience-title,
.experience-subtitle {
  flex: 100%;
}
</style>
