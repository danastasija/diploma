<template>
  <div class="header">
    <div class="header__logo">INOSTUDIO</div>
    <el-dropdown @command="onCommand">
      <div class="header__user shadowed-light">
        <span class="el-icon-s-custom header-user-icon"></span>
        <span class="header__username">{{ user.fullName }}</span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">Выйти из системы</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  },
  methods: {
    onCommand(command) {
      if (command === "logout") {
        this.$store.dispatch("logout");
        this.$router.push("/login");
      }
    }
  }
};
</script>

<style>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 20px;
}
.header__user {
  display: flex;
  align-items: center;
  padding: 10px;
  cursor: pointer;
}
.header-user-icon {
  font-size: 20px;
  padding-right: 10px;
}
</style>