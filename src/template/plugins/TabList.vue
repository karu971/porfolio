<template>
    <div class="w-100">
        <div class="text-center my-5">
            <ul class="d-flex justify-content-center m-0 p-0 text-center">
                <li v-for="(tabNumber, index) of tabNumbers" :key="index" class="p-0 mx-1 border border-nobel text-nobel text-capitalize btn">
                    <p @click="showElement()" tabElement="all" v-if="index === 0" class="btn btn-primary px-2 py-1 tablList">Tout</p>
                    <p @click="showElement()" v-else :tabElement="tabClassNames[index - 1 ]" class="btn px-2 py-1 tablList">
                        {{tabNames[index - 1 ]}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { eventBus } from "../../main.js";

export default {
  data() {
    return {
      tabNumbers: null,
      tabClassNamess: null,
      tabNames: null,
      datas: null,
      tabListClass: "all",
      btnPrimary: null
    };
  },
  methods: {
    showElement() {
      Array.from(event.target.parentElement.parentElement.parentElement.querySelectorAll('.tablList')).map((items) => {
        items.classList.remove('btn-primary')
      })
      event.target.classList.add('btn-primary')
      eventBus.ClickOnTab(event.target);
    },
    showElementAll() {}
  },
  created() {
    eventBus.$on("getDataResponse", data => {
      var tabNumber = 0;
      var tabClassName = [];
      var tabName = [];
      Object.keys(data).map((items, key, value) => {
        tabNumber = items.length;
        tabClassName.push(data[items].name);
        tabName.push(items);
      });
      this.tabNumbers = tabNumber;
      this.tabClassNames = tabClassName;
      this.tabNames = tabName;
      this.datas = data;
    });
  }
};
</script>

<style lang="scss" scoped>
</style>

