<template>
  <div class="login-page">
    <div class="login-page__logo">
      <img src="@/assets/prm.svg" alt="" />
    </div>
    <el-form
      :model="model"
      :rules="rules"
      class="login-form"
      ref="loginForm"
      v-loading="loading"
      element-loading-text="Проверка логина и пароля..."
    >
      <h3 class="login-form__title">Вход в систему</h3>
      <el-form-item prop="login"
        ><el-input
          prefix-icon="el-icon-user"
          v-model="model.login"
          name="username"
        ></el-input
      ></el-form-item>
      <el-form-item prop="password"
        ><el-input
          name="password"
          type="password"
          prefix-icon="el-icon-unlock"
          v-model="model.password"
        ></el-input
      ></el-form-item>
      <el-button @click="submit" type="primary">Войти</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        login: "",
        password: ""
      },
      loading: false,
      rules: {
        login: [{ required: true, message: "Введите логин" }],
        password: [{ required: true, message: "Введите пароль" }]
      }
    };
  },
  methods: {
    async submit() {
      if (await this.$refs.loginForm.validate()) {
        this.loading = true;
        if (
          await this.$store.dispatch("login", {
            login: this.model.login,
            password: this.model.password
          })
        ) {
          this.loading = false;
          this.$router.push("/persons");
        }
        this.loading = false;
      } else {
        return false;
      }
    }
  }
};
</script>

<style>
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 122px);
  padding-bottom: 122px;
}
.login-page__logo {
  height: 122px;
}
.login-form {
  min-width: 400px;
  padding: 20px 20px 40px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
  text-align: center;
}
.login-form__title {
  color: #909399;
  font-size: 1.5rem;
  padding: 10px 0;
}
.login-form .el-form-item:last-child {
  margin-bottom: 0px;
}
</style>