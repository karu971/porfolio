<template>
    <div class="bg-alabaster p-9">
        <div class="container">
            <div class="p-0 m-0 text-center d-flex flex-wrap">
                <div v-for="(profile, index) of profiles" :key="index" :class="[index % 3 == 2 ? 'w-100 p-3' : 'w-50 px-3 smallBLock']">
                        <p class="m-auto">{{ profile }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "Section1",
  data() {
    return {
      profiles: [
        "Proactif et responsable",
        "Sens du relationnel et du service client",
        "Esprit analytique",
        "Autonome et apprend rapidement",
        "Forte capacité d’adaptation au sein d’une équipe"
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.container {
  font-weight: 500;
}
.smallBLock p{
    max-width: 400px
}
</style>