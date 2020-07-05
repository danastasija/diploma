<template>
  <div class="aside-menu">
    <div class="aside-menu__logo-container" @click="onClick">
      <img class="aside-menu__logo" src="../../assets/prm.svg" alt="logo" />
    </div>
    <div class="aside-menu__items">
      <ul>
        <li class="aside-menu__item">
          <router-link
            to="/persons"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div
              class="aside-menu__item-inner"
              @click="navigate"
              :class="{ 'is-active': isActive }"
            >
              <i class="el-icon-notebook-2"></i>
              <a :href="href">Сотрудники</a>
            </div>
          </router-link>
        </li>
        <!-- <li class="aside-menu__item">
          <router-link
            to="/statistic"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div class="aside-menu__item-inner">
              <i class="el-icon-user-solid"></i>
              <a
                :href="href"
                @click="navigate"
                :class="{ 'is-active': isActive }"
                >Статистика</a
              >
            </div>
          </router-link>
        </li> -->

        <li class="aside-menu__item" v-if="user && user.isAdmin">
          <router-link to="/users" v-slot="{ href, route, navigate, isActive }">
            <div
              class="aside-menu__item-inner"
              @click="navigate"
              :class="{ 'is-active': isActive }"
            >
              <i class="el-icon-notebook-2"></i>
              <a :href="href">Пользователи</a>
            </div>
          </router-link>
        </li>
        <li class="aside-menu__item">
          <router-link
            to="/archive"
            v-slot="{ href, route, navigate, isActive }"
          >
            <div
              class="aside-menu__item-inner"
              :class="{ 'is-active': isActive }"
              @click="navigate"
            >
              <i class="el-icon-takeaway-box"></i>
              <a :href="href">Архив</a>
            </div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  methods: {
    onClick() {
      this.$router.push({ path: "/" });
    }
  },
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
};
</script>

<style>
.aside-menu {
  border-right: 1px solid #dcdfe6;
  width: 400px;
}
.aside-menu__logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #dcdfe6;
}
.aside-menu__logo {
  max-height: 100%;
  width: auto;
}
.aside-menu__items ul {
  list-style: none;
  list-style-position: inside;
  padding: 0;
  margin: 0;
}
.aside-menu__item-inner {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 15px 20px;
  transition: all 0.5s;
  outline: none;
}
.aside-menu__item a {
  text-decoration: none;
  color: inherit;
  font-size: 20px;
  width: 100%;
  display: block;
  height: 100%;
  padding-left: 15px;
  outline: none;
}
.aside-menu__item i {
  font-size: 20px;
  color: inherit;
}
.aside-menu__item-inner:not(.is-active) a:hover {
  color: #409eff;
}
.aside-menu .is-active {
  color: white;
  background: #409eff;
}
</style>