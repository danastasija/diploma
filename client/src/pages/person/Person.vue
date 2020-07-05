<template>
  <div style="position: relative">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <component v-if="tab.component" :is="tab.component"></component>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script>
import Common from "./person-tabs/Common.vue";
import Adaptation from "./person-tabs/Adaptation.vue";
import Dismissal from "./person-tabs/Dismissal.vue";
import Office from "./person-tabs/Office";
import Salary from "./person-tabs/Salary";
import Additional from "./person-tabs/Additional";
import authService from "../../services/authService";
import { mapState } from "vuex";
export default {
  beforeRouteEnter: async (to, from, next) => {
    if (to.params.personId) {
      const permissions = await authService.getPermissions();
      next(vm => (vm.permissions = permissions));
    } else {
      next();
    }
  },
  beforeMount() {
    if (this.$route.query.tab) {
      this.activeName = this.$route.query.tab || "common";
    }
  },
  components: {
    Common,
    Adaptation,
    Dismissal,
    Office,
    Additional,
    Salary
  },
  data() {
    return {
      permissions: [],
      personId: 0,
      activeName: "common"
    };
  },
  watch: {
    activeName(newVal) {
      if (newVal && newVal !== this.$route.query.tab) {
        this.$router.replace({
          query: { tab: newVal }
        });
      }
    }
  },
  computed: {
    tabs() {
      return this.$route.params.personId
        ? [
            {
              label: "Общие данные",
              name: "common",
              domain: 1,
              component: Common
            },
            {
              label: "Дополнительные данные",
              name: "additional",
              domain: 2,
              component: Additional
            },
            { label: "Офис", name: "office", domain: 3, component: Office },
            { label: "Зарплата", name: "salary", domain: 4, component: Salary },
            {
              label: "Адаптация",
              name: "adaptation",
              domain: 5,
              component: Adaptation
            },
            {
              label: "Увольнение",
              name: "dismissal",
              domain: 6,
              component: Dismissal
            }
          ].filter(tab =>
            this.userPermissions.map(p => p.id).includes(tab.domain)
          )
        : [
            {
              label: "Общие данные",
              name: "common",
              domain: 1,
              component: Common
            }
          ];
    },
    userPermissions() {
      if (this.authUser && this.permissions && this.permissions.length) {
        const roles = this.authUser.roles.map(r => r.id);
        return this.permissions
          .filter(pr => roles.includes(pr.id))
          .reduce((acc, role) => acc.concat(role.domains), []);
      }
      return [];
    },
    ...mapState({
      authUser: state => state.auth.user
    })
  },
  methods: {
    handleClick(tab) {
      this.activeName = tab.name;
    }
  },
  async mounted() {
    this.personId = this.$route.params.personId;
    if (this.personId) {
      await this.$store.dispatch("loadPerson", this.personId);
    } else {
      this.$store.commit("setPerson", {});
    }
  }
};
</script>

<style>
</style>