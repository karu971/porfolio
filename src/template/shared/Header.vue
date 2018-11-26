<template>
    <div class="block-header bg-dark d-flex justify-content-between fixed-top justify-content-between">
        <div class="bh-containers align-items-center d-flex justify-content-between w-100">
            <div class="align-items-center d-flex header-logo">
                <p class="p-3 m-0 text-uppercase text-white">Brice Lainé</p>
            </div>
            <div>
                <div class="header-nav-button">
                    <div class="align-items-start d-flex hnb_containers">
                        <nav class="navbar navbar-dark">
                            <button @click="showMenu" class="border-0 hnb_button navbar-toggler" type="button">
                            <span class="navbar-toggler-icon"></span>
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <app-primary-menu></app-primary-menu>
    </div>
</template>
<script>
import PrimaryMenu from "../menu/PrimaryMenu.vue";
export default {
  components: {
    appPrimaryMenu: PrimaryMenu
  },
  methods: {
    showMenu() {
      var getBody = document.querySelector("body");
      getBody.classList.toggle("menu-on");
    }
  }
};
</script>
<style>
.navbar-dark .navbar-toggler-icon {
  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255,255,255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E");
  font-size: 2rem;
}
</style>
