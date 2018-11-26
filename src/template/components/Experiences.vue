
<template>
    <div>
        <h1>Experiences</h1>
    </div>
</template>

<script>

export default {
  name: 'Experiences',
  data () {
      return {
        listJobs: []
      }
  },
  mounted() {
    const requestURLJobs = './company/company.json'
    const request = new XMLHttpRequest();
    request.open('GET', requestURLJobs);
    request.responseType = 'json';
    console.log('BLAINE' + request.send());
  }
}
</script>

<style scoped>
</style>
