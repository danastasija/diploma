<template>
  <el-container>
    <el-aside width="400px" style="display:flex"
      ><AsideMenu></AsideMenu
    ></el-aside>
    <el-container>
      <el-header><Header /></el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
</script>

<style>
</style>