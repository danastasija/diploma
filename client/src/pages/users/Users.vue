<template>
  <div>
    <div class="search">
      <el-input
        placeholder="Поиск"
        :value="searchText"
        @input="$store.commit('users/setSearchText', $event)"
      ></el-input>
    </div>
    <el-dialog
      title="Создать пользователя"
      :visible="showCreate"
      @close="onUserModalClose"
    >
      <el-form :model="model" ref="form" :rules="rules">
        <el-form-item size="mini" label="Aдминистратор: " label-width="120px">
          <el-switch v-model="model.isAdmin"></el-switch>
        </el-form-item>
        <el-form-item label="ФИО" prop="fullName">
          <el-input name="fullName" v-model="model.fullName"></el-input>
        </el-form-item>
        <el-form-item label="Логин" prop="login">
          <el-input
            name="login"
            v-model="model.login"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item v-if="!model.id" label="Пароль" prop="password">
          <el-input
            name="password"
            v-model="model.password"
            prefix-icon="el-icon-unlock"
          ></el-input>
        </el-form-item>
        <el-form-item label="Роли" prop="roles">
          <el-select
            multiple
            style="width: 100%"
            v-model="model.roles"
            value-key="id"
            placeholder="Выберите роли"
          >
            <el-option
              v-for="item in roles"
              value-key="id"
              :key="item.id"
              :label="item.name"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showCreate = false">Отмена</el-button>
        <el-button
          @click.prevent="model.id ? updateUser() : createUser()"
          type="primary"
          >{{ model.id ? "Сохранить" : "Создать" }}</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="Изменить пароль"
      :visible="showChangePassword"
      @close="showChangePassword = false"
    >
      <el-form :model="passwordModel" ref="passwordForm">
        <el-form-item
          label="Новый пароль"
          prop="password"
          :rules="newPaswordRules"
        >
          <el-input name="password" v-model="passwordModel.password"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangePassword = false">Отмена</el-button>
        <el-button @click.prevent="changePassword" type="primary">
          Изменить
        </el-button>
      </span>
    </el-dialog>
    <el-button
      @click.prevent.stop="showCreate = true"
      class="add-person"
      type="primary"
      icon="el-icon-plus"
      circle
    ></el-button>
    <el-table
      :data="items"
      height="calc(100vh - 200px)"
      style="width: 100%"
      empty-text="Не найдено"
    >
      <el-table-column prop="login" label="Логин" />
      <el-table-column prop="fullName" label="Полное имя" />
      <el-table-column
        prop="roles"
        :formatter="formatRoles"
        label="Роли"
      ></el-table-column>
      <el-table-column prop="createdAt" label="Дата создания">
        <template slot-scope="scope">
          {{ scope.row.createdAt | date }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <div style="text-align: left">
            <el-button
              size="small"
              type="primary"
              icon="el-icon-edit"
              @click="openEdit(scope.row.id)"
            ></el-button>
            <el-button
              size="small"
              type="primary"
              icon="el-icon-unlock"
              @click="openChange(scope.row.id)"
            ></el-button>
            <el-button
              v-if="scope.row.login !== 'admin'"
              size="small"
              type="primary"
              icon="el-icon-delete"
              @click="remove(scope.row)"
            ></el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <slot name="append">
      <div class="table-total">Всего: {{ items.length }}</div>
    </slot>
  </div>
</template>

<script>
import { mapState } from "vuex";
import userService from "../../services/userService";
import optionsService from "../../services/optionsService";

function getDefaultFormValues() {
  return { isAdmin: false, fullName: "", login: "", password: "", roles: [] };
}
function validatePassword(rule, value, callback) {
  if (!value) {
    return callback(new Error("Введите пароль"));
  }
  if (value.length < 6) {
    return callback(new Error("Пароль должен содержать 6 символов или больше"));
  }
  if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(value)) {
    return callback(
      new Error(
        "Пароль должен содержать как минимум 1 число, 1 заглавный и 1 строчный символ"
      )
    );
  }
  callback();
}
export default {
  mounted() {
    this.search(this.searchText);
    optionsService.getUserRoles().then(data => (this.roles = data));
  },
  data() {
    return {
      roles: [],
      model: getDefaultFormValues(),
      passwordModel: {
        id: "",
        password: ""
      },
      showCreate: false,
      showChangePassword: false,
      newPaswordRules: [
        { required: true, message: "Укажите новый пароль" },
        {
          validator: validatePassword,
          trigger: "change"
        }
      ]
    };
  },
  watch: {
    searchText(val) {
      this.search(val);
    }
  },
  computed: {
    ...mapState({
      items: state => state.users.items,
      searchText: state => state.users.searchText
    }),
    rules() {
      const rules = {
        fullName: [
          {
            required: true,
            message: "Введите ФИО"
          }
        ],
        login: [
          {
            required: true,
            message: "Введите логин"
          }
        ],
        roles: [
          {
            required: true,
            message: "Выберите роли"
          }
        ]
      };
      if (!this.model.id) {
        rules.password = [
          {
            required: true,
            message: "Введите пароль"
          },
          {
            validator: validatePassword,
            trigger: "change"
          }
        ];
      }
      return rules;
    }
  },
  methods: {
    search(text) {
      this.$store.dispatch("users/loadUsers", text);
    },
    formatRoles(row, column, cellValue) {
      const values = cellValue
        ? Array.isArray(cellValue)
          ? cellValue
          : [cellValue]
        : [];
      return values.map(v => v.name).join(",");
    },
    async createUser() {
      if (await this.$refs.form.validate()) {
        try {
          const user = await userService.create(this.model);
          this.$notify({
            title: "Создание пользователя",
            message: "Пользователь " + user.login + " создан",
            type: "success"
          });
          this.showCreate = false;
          this.$refs.form.resetFields();
          this.search(this.searchText);
        } catch (error) {
          this.$notify.error({
            title: "Создание пользователя",
            message: "Ошибка создания пользователя"
          });
        }
      }
    },
    async updateUser() {
      if (await this.$refs.form.validate()) {
        try {
          await userService.update(this.model);
          this.$notify({
            title: "Сохранение",
            message: "Изменения сохранены",
            type: "success"
          });
          this.showCreate = false;
          this.$refs.form.resetFields();
          this.search(this.searchText);
        } catch (error) {
          this.$notify.error({
            title: "Сохранение",
            message:
              (error && error.message) || "Ошибка сохранения пользователя"
          });
        }
      }
    },
    openEdit(id) {
      this.showCreate = true;
      this.model = { ...this.items.find(i => i.id === id) };
    },
    remove(user) {
      this.$confirm(`Удалить пользователя ${user.login}?`, "Предупреждение", {
        confirmButtonText: "Да",
        cancelButtonText: "Отмена",
        type: "warning"
      })
        .then(() => {
          return userService.remove(user.id).catch(err => {
            this.$notify.error({
              title: "Удаление",
              message: "Ошибка удаления пользователя"
            });
            throw err;
          });
        })
        .then(() => {
          this.$notify({
            title: "Удаление",
            message: `Пользователь ${user.login} удален`,
            type: "success"
          });
          this.search(this.searchText);
        });

      // todo
    },
    openChange(id) {
      this.passwordModel.id = id;
      this.showChangePassword = true;
    },
    async changePassword() {
      if (this.$refs.passwordForm.validate()) {
        try {
          console.log(this.passwordModel.id);
          await userService.changePassword(this.passwordModel);
          this.$refs.passwordForm.resetFields();
          this.showChangePassword = false;
          this.$notify({
            title: "Изменение пароля",
            message: "Успешно",
            type: "success"
          });
        } catch (error) {
          this.$notify.error({
            title: "Изменение пароля",
            message: "Не удалось изменить пароль"
          });
        }
      }
    },
    onUserModalClose() {
      this.showCreate = false;
      this.$nextTick(() => {
        this.model = getDefaultFormValues();
        this.$refs.form.clearValidate();
      });
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
.add-person {
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