<template>
  <div>
    <div class="search">
      <el-input
        placeholder="Поиск"
        :value="searchText"
        @input="$store.commit('setSearchText', $event)"
      ></el-input>
    </div>
    <el-table
      :data="items"
      height="calc(100vh - 200px)"
      style="width: 100%"
      empty-text="Не найдено"
    >
      <el-table-column prop="fullName" label="Сотрудник" width="180">
      </el-table-column>
      <el-table-column
        prop="positions"
        :formatter="formatOptions"
        label="Должность"
        width="300"
      >
      </el-table-column>
      <el-table-column prop="dateOfDismissal" label="Дата увольнения">
        <template slot-scope="scope">
          {{ scope.row.dateOfDismissal | date }}
        </template>
      </el-table-column>
      <el-table-column label=""
        ><template slot-scope="scope">
          <el-button
            type="primary"
            @click="recover(scope.row.id)"
            :loading="recovering.includes(scope.row.id)"
            >Восстановить
          </el-button>
        </template></el-table-column
      >
    </el-table>
    <slot name="append">
      <div class="table-total">Всего: {{ items.length }}</div>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
import personService from "../../services/personService";
import { UserRole } from "../../constants/Enums";
export default {
  mounted() {
    this.search(this.searchText);
  },
  data() {
    return {
      recovering: []
    };
  },
  watch: {
    searchText(val) {
      this.search(val);
    }
  },
  computed: {
    ...mapState({
      items: state => state.persons.archive,
      searchText: state => state.persons.searchText,
      authUser: state => state.auth.user
    }),
    canRecover() {
      return (
        !!this.authUser &&
        this.authUser.roles.some(role => role.id === UserRole.recruitment)
      );
    }
  },
  methods: {
    search(text) {
      this.$store.dispatch("loadArchive", text);
    },
    async recover(id) {
      this.recovering.push(id);
      try {
        await personService.recover(id);
        this.$store.commit("deleteFromArchive", id);
      } catch (error) {
        console.log(error);
      } finally {
        this.recovering = this.recovering.filter(r => r !== id);
      }
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