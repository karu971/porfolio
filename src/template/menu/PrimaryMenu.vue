<template>
  <div class="primary-menu">
    <div class="bg-dark primary-menu">
      <div class="">
        <div class="">
          <div class="list-group">
            <a href="/" class="list-group-item list-group-item-action bg-transparent active">Home</a>
            <a href="/experiences" class="list-group-item list-group-item-action bg-transparent">Experiences</a>
            <a href="/" class="list-group-item list-group-item-action bg-transparent">School</a>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" >
@import "../../assets/scss/bootstrap/bootstrap.scss";
@import "../../assets/scss/menu/primary-menu.scss";
.primary-menu {
    width: 250px;
    right: -250px;
    height: 100vh;
    position: absolute;
  a {
    color: $doveGray;
    &:hover{
      color: white;
    }
  }
}
</style>
