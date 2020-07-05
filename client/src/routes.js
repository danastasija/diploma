import Vue from "vue";
import Persons from "./pages/persons/Persons.vue";
import Statistic from "./pages/statistic/Statistic.vue";
import Archive from "./pages/archive/Archive.vue";
import VueRouter from "vue-router";
import Person from "./pages/person/Person.vue";
import Login from "./pages/login/Login.vue";
import Users from "./pages/users/Users.vue";
import Layout from "./shared/Layout/Layout.vue";
import store from "./store";
import authService from "./services/authService";
import { Notification } from "element-ui";

Vue.use(VueRouter);

const routes = [
  {
    name: "login",
    path: "/login",
    component: Login,
  },
  {
    path: "",
    component: Layout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "/persons",
        component: Persons,
      },
      {
        name: "newUser",
        path: "/persons/new",
        component: Person,
      },
      {
        name: "user",
        path: "/persons/:personId",
        component: Person,
      },
      {
        name: "statistic",
        path: "/statistic",
        component: Statistic,
      },
      {
        path: "/archive",
        component: Archive,
      },
      {
        name: "users",
        path: "/users",
        component: Users,
        meta: { forAdmin: true },
      },
      {
        path: "*",
        redirect: "/persons",
      },
    ],
  },
];
export const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Если токен нет в Local storage редирект на login
    if (!authService.getToken()) {
      next("/login");
    }
    // Если аутентификация уже инициализирована проверить состояние loggedIn
    // иначе запустить процесс аутентификации
    if (store.state.auth.initialized) {
      store.state.auth.isLoggedIn ? next() : next("/login");
    } else {
      store.dispatch("getProfile").then((success) => {
        if (!success) {
          next("/login");
        } else {
          next();
        }
      });
    }
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.forAdmin)) {
    // Если токен нет в Local storage редирект на login
    if (!authService.getToken()) {
      next("/login");
    }
    // Если аутентификация уже инициализирована проверить состояние loggedIn
    // иначе запустить процесс аутентификации
    if (!store.state.auth.user.isAdmin) {
      Notification.error({
        title: "Ошибка доступа",
        message: "Недостаточно прав",
      });
      next("/persons");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
