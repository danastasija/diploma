<template>
  <div class="salary-container">
    <Loader v-if="loading" />
    <div class="salary-textfield">
      <el-row :gutter="20">
        <el-col :span="12">
          <TextField
            label="Текущая зарплата"
            :value="first ? first.newSalary + ' рублей' : 'Нет данных'"
          />
        </el-col>
        <el-col :span="12">
          <TextField label="Должность" :value="first.positions | label" />
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <TextField label="Дата изменения" :value="first.salaryDate | date" />
        </el-col>
        <el-col :span="12">
          <TextField
            label="Дата изменения"
            :value="first.positionDate | date"
          />
        </el-col>
      </el-row>
    </div>
    <el-form class="salary-form" label-width="200px" v-if="canEdit">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Новая зарплата">
            <el-input style="width: 220px" v-model.trim="model.newSalary"
              ><template slot="append">рублей</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Новая должность">
            <el-select
              multiple
              v-model="model.positions"
              value-key="id"
              placeholder="Выберите должность"
            >
              <el-option
                v-for="item in positions"
                value-key="id"
                :key="item.id"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="Дата изменения зарплаты">
            <el-date-picker
              v-model="model.salaryDate"
              type="date"
              placeholder="Выберите дату"
              format="dd.MM.yyyy"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Дата изменения должности">
            <el-date-picker
              v-model="model.positionDate"
              type="date"
              placeholder="Выберите дату"
              format="dd.MM.yyyy"
            >
            </el-date-picker> </el-form-item
        ></el-col>
      </el-row>
      <CommentWithAttach v-model="files">
        <el-input
          type="textarea"
          :autosize="{ minRows: 4, maxRows: 8 }"
          placeholder="Комментарий..."
          v-model="model.comment"
          maxlength="500"
          show-word-limit
        />
      </CommentWithAttach>
      <div class="salary-form__actions">
        <el-button type="primary" @click="save">
          Сохранить
        </el-button>
        <el-button @click="reset">
          Отмена
        </el-button>
      </div>
    </el-form>
    <div class="salary-history">
      <h4 class="salary-history__header">
        История изменений
      </h4>
      <el-collapse>
        <el-collapse-item
          v-for="item in history"
          :key="item.id"
          :name="item.id"
        >
          <template slot="title">
            Изменения от {{ item.createdAt | date }}
          </template>
          <el-row :gutter="20">
            <el-col :span="12">
              <TextField label="Новая зарплата" :value="item.newSalary" />
            </el-col>
            <el-col :span="12">
              <TextField label="Должность" :value="item.positions | label" />
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <TextField
                label="Дата изменения зарплаты"
                :value="item.salaryDate | date"
              />
            </el-col>
            <el-col :span="12">
              <TextField
                label="Дата изменения должности"
                :value="item.positionDate | date"
              />
            </el-col>
          </el-row>
          <TextField label="Комментарии:" :value="item.comment" />
          <DownloadLink v-for="file of item.file" :file="file" :key="file.id" />
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import optionsService from "../../../services/optionsService";
import salaryService from "../../../services/salaryService";
import { mapState } from "vuex";
const getDefaultModel = () => ({
  newSalary: "",
  salaryDate: new Date(),
  positions: [],
  positionDate: new Date(),
  comment: "",
  file: []
});
export default {
  mounted() {
    optionsService.getPositions().then(positions => {
      this.positions = positions;
    });
    this.$store.dispatch("loadHistory", this.$route.params.personId);
  },
  data() {
    return {
      domainId: 4,
      positions: [],
      model: getDefaultModel(),
      files: []
    };
  },
  watch: {
    history(newValues) {
      const first = newValues[0];
      if (first) {
        this.model.newSalary = first.newSalary;
        this.model.salaryDate = new Date(first.salaryDate);
        this.model.positions = first.positions;
        this.model.positionDate = new Date(first.positionDate);
        this.model.comment = "";
      }
    }
  },
  computed: {
    history() {
      return this.$store.state.salary.history || [];
    },
    loading() {
      return this.$store.state.salary.loading;
    },
    first() {
      return this.history[0] || {};
    },
    ...mapState({
      authUser: state => state.auth.user
    }),
    canEdit() {
      return this.authUser && this.domainId
        ? this.authUser.permissions.some(
            p => p.domainId === this.domainId && p.access === "w"
          )
        : false;
    }
  },
  methods: {
    async save() {
      const data = { ...this.model };
      if (this.files.length) {
        try {
          const file = await salaryService.saveSalaryFile(
            this.$route.params.personId,
            this.files[0].file
          );
          data.file = [file];
          this.files = [];
        } catch (error) {
          console.error(error);
          return;
        }
      }
      try {
        await this.$store.dispatch("addHistoryItem", {
          id: this.$route.params.personId,
          model: data
        });
        this.$notify({
          title: "Пересмотр зарплаты",
          message: "Успешно",
          type: "success"
        });
      } catch (error) {
        this.$error({
          title: "Пересмотр зарплаты",
          message: "Ошибка"
        });
      }
    },
    reset() {
      this.model = getDefaultModel();
    }
  }
};
</script>

<style>
.salary-container {
  max-width: 80%;
}
.salary-form .el-form-item__label {
  text-align: left;
}
.salary-form {
  border: 1px #ccc solid;
  padding: 20px;
}
.salary-form__actions {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}
.salary-history {
  margin-top: 20px;
}
.salary-history__header {
  text-align: left;
  padding-bottom: 5px;
  font-weight: 500;
}
.salary-textfield {
  margin-bottom: 20px;
}
</style>