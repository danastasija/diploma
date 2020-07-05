<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
#app > section {
  height: 100vh;
}
.container {
  display: flex;
  height: 100vh;
}
.header {
  height: 60px;
  display: flex;
  align-items: center;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.file-fade-enter-active,
.file-fade-leave-active {
  transition: all 0.25s;
}
.file-fade-enter,
.file-fade-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
