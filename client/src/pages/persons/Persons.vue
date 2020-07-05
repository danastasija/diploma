<template>
  <div>
    <div class="search">
      <el-input
        placeholder="Поиск"
        :value="searchText"
        @input="$store.commit('setSearchText', $event)"
      ></el-input>
    </div>
    <el-button
      v-if="canCreate"
      @click.prevent.stop="createUser"
      class="add-user"
      type="primary"
      icon="el-icon-plus"
      circle
    ></el-button>
    <el-table
      :data="items"
      height="calc(100vh - 200px)"
      style="width: 100%"
      empty-text="Не найдено"
      @row-click="onRowClick"
    >
      <el-table-column prop="fullName" label="Сотрудник" width="300">
      </el-table-column>
      <el-table-column
        prop="positions"
        :formatter="formatOptions"
        label="Должность"
        width="300"
      >
      </el-table-column>

      <el-table-column prop="status" label="Статус" :formatter="formatOptions">
      </el-table-column>
      <el-table-column prop="skills" :formatter="formatOptions" label="Скилы">
      </el-table-column>
      <el-table-column prop="rate" label="Ставка"> </el-table-column>
    </el-table>
    <slot name="append">
      <div class="table-total">Всего: {{ items.length }}</div>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UserRole } from "../../constants/Enums";
export default {
  mounted() {
    this.search(this.searchText);
  },
  data() {
    return {};
  },
  watch: {
    searchText(val) {
      this.search(val);
    }
  },
  computed: {
    ...mapState({
      items: state => state.persons.items,
      searchText: state => state.persons.searchText,
      authUser: state => state.auth.user
    }),
    canCreate() {
      return (
        this.authUser &&
        this.authUser.roles.some(role => role.id === UserRole.recruitment)
      );
    }
  },
  methods: {
    createUser() {
      this.$router.push("/persons/new");
    },
    onRowClick(row) {
      this.$router.push({ name: "user", params: { personId: row.id } });
    },
    search(text) {
      this.$store.dispatch("loadPersons", text);
    },
    formatOptions(row, column, cellValue) {
      const values = cellValue
        ? Array.isArray(cellValue)
          ? cellValue
          : [cellValue]
        : [];
      return values.map(v => v.label).join(",");
    }
  }
};
</script>

<style>
.search {
  height: 50px;
}
.table-total {
  text-align: right;
  padding: 10px;
}
.add-user {
  position: fixed;
  bottom: 100px;
  right: 80px;
  z-index: 2000;
}
.add-user i {
  font-size: 26px;
}
.el-table__row:hover {
  cursor: pointer;
}
</style>