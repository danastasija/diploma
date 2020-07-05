<template>
  <div class="common-tab">
    <Loader :show="$store.state.persons.loadingPerson" />
    <div class="common-tab__left">
      <div class="photo">
        <el-upload
          v-if="editing"
          class="avatar-uploader"
          action="1"
          :show-file-list="false"
          :multiple="false"
          :on-change="onChange"
          :auto-upload="false"
          accept="mage/png, image/jpeg"
        >
          <img :src="previewUrl" class="avatar" />
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <img v-if="!editing" :src="previewUrl" class="avatar" />
      </div>
    </div>
    <div class="common-tab__right">
      <el-form
        label-position="top"
        label-width="100px"
        :model="model"
        :rules="rules"
        ref="form"
      >
        <div class="tab-header">
          <h4 class="text-header" v-if="!editing" :value="model.fullName">
            {{ model.fullName || "ФИО" }}
          </h4>
          <el-form-item v-else prop="fullName">
            <el-input
              v-model="model.fullName"
              placeholder="Введите ФИО"
            ></el-input>
          </el-form-item>
          <el-button
            :disabled="saving || !canEdit"
            v-if="!editing"
            @click="toogle"
            >Изменить</el-button
          >
          <el-button :disabled="saving" v-if="editing" @click="saveWithAvatar"
            >Сохранить</el-button
          >
          <el-button :disabled="saving" v-if="editing" @click="cancel"
            >Отмена</el-button
          >
        </div>
        <div class="common-tab__form" v-if="editing">
          <TextField
            v-if="personId"
            label="Должность"
            :value="model.positions | label"
          />
          <el-form-item
            v-else
            label="Должность"
            label-width="50px"
            prop="positions"
          >
            <el-select
              multiple
              v-model="model.positions"
              value-key="id"
              placeholder="Выберите должность"
              style="width: 760px"
            >
              <el-option
                v-for="item in positions"
                value-key="id"
                :key="item.label"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Дата приема"
            label-width="50px"
            prop="employmentDate"
          >
            <el-date-picker
              v-model="model.employmentDate"
              type="date"
              placeholder="Выберите дату"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="Статус" label-width="50px" prop="status">
            <el-select
              v-model="model.status"
              value-key="id"
              placeholder="Выберите статус"
            >
              <el-option
                v-for="item in status"
                :key="item.label"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Скилы" label-width="50px" prop="skills">
            <el-select
              multiple
              value-key="id"
              v-model="model.skills"
              placeholder="Выберите скилы"
              filterable
              allow-create
              style="width: 500px"
            >
              <el-option
                v-for="item in skills"
                :key="item.label"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Ставка" label-width="50px" prop="rate">
            <el-input-number
              v-model="model.rate"
              :controls="false"
              :max="2"
              :min="0"
              :precision="2"
              :step="0.1"
            ></el-input-number>
          </el-form-item>
          <el-form-item label="Дата рождения" label-width="50px" prop="dob">
            <el-date-picker
              v-model="model.dob"
              type="date"
              placeholder="Выберите дату"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item
            label="Номер телефона"
            label-width="50px"
            prop="phoneNumber"
          >
            <el-input v-model="model.phoneNumber"></el-input>
          </el-form-item>
          <el-form-item
            label="Рабочая почта"
            label-width="50px"
            prop="workMail"
          >
            <el-input v-model="model.workMail"></el-input>
          </el-form-item>
          <el-form-item
            label="Личная почта"
            label-width="50px"
            prop="personalMail"
          >
            <el-input v-model="model.personalMail"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div class="common-tab__info" v-if="!editing">
        <TextField label="Должность" :value="model.positions | label">
        </TextField>
        <TextField label="Дата приема" :value="model.employmentDate | date">
        </TextField>
        <TextField label="Стаж">
          {{ dateDist(model.employmentDate) }}
        </TextField>
        <TextField label="Статус" :value="model.status | label"> </TextField>
        <TextField label="Скилы" :value="model.skills | label"> </TextField>
        <TextField label="Ставка" :value="model.rate"> </TextField>
        <TextField label="Дата рождения" :value="model.dob | date"> </TextField>
        <TextField label="Номер телефона" :value="model.phoneNumber">
        </TextField>
        <TextField label="Рабочая почта" :value="model.workMail"> </TextField>
        <TextField label="Личная почта" :value="model.personalMail">
        </TextField>
      </div>
    </div>
  </div>
</template>

<script>
import optionsService from "../../../services/optionsService";
import differenceInMonths from "date-fns/differenceInMonths";
import distanceInWordsToNow from "date-fns/formatDistanceToNowStrict";
import addYears from "date-fns/addYears";
import ru from "date-fns/locale/ru";
import { EditablePage } from "../../../mixin/EditablePage";

export default {
  mixins: [EditablePage],
  mounted() {
    optionsService.getStatus().then(status => {
      this.status = status;
    });
    optionsService.getSkills().then(skills => {
      this.skills = skills;
    });
    optionsService.getPositions().then(positions => {
      this.positions = positions;
    });
  },
  data() {
    return {
      domainId: 1,
      fields: [
        "avatar",
        "fullName",
        "positions",
        "employmentDate",
        "experience",
        "status",
        "skills",
        "dob",
        "rate",
        "phoneNumber",
        "workMail",
        "personalMail"
      ],
      positions: [],
      status: [],
      skills: [],
      imageUrl: null,
      model: {},
      avatar: null,
      preview: null,
      rules: {
        fullName: [{ required: true, message: "Введите полное имя" }],
        employmentDate: [{ required: true, message: "Укажите дату приема" }],
        status: [{ required: true, message: "Выберите статус" }],
        rate: [{ required: true, message: "Укажите ставку сотрудника" }],
        dob: [{ required: true, message: "Укажите дату рождения сотрудника" }]
      }
    };
  },
  methods: {
    onChange(file) {
      this.avatar = file.raw;
      this.preview = URL.createObjectURL(file.raw);
    },
    async saveWithAvatar() {
      this.saving = true;
      const person = await this.validateAndSave();
      if (this.avatar && person && person.id) {
        try {
          const path = await this.saveAvatar(person.id);
          this.$store.commit(
            "setPerson",
            Object.assign(person, { avatar: path })
          );
          this.avatar = null;
          URL.revokeObjectURL(this.preview);
          this.preview = null;
        } catch (error) {
          console.log(error);
        }
      }
      this.saving = false;
    },
    dateDiff(date) {
      if (!date) return date;
      return differenceInMonths(new Date(), date);
    },
    dateDist(date) {
      if (!date) return date;
      const monthsDiff = differenceInMonths(new Date(), date);
      const years = distanceInWordsToNow(date, { locale: ru, unit: "year" });
      const months = distanceInWordsToNow(
        addYears(date, Math.floor(monthsDiff / 12)),
        { locale: ru, unit: "month" }
      );
      return (years.split(" ")[0] !== "0" ? years : "") + " " + months;
    },
    async saveAvatar(id) {
      if (this.avatar) {
        return await this.$store.dispatch("saveAvatar", {
          id,
          file: this.avatar
        });
      }
    }
  },
  computed: {
    previewUrl() {
      return (
        this.preview ||
        (this.model.avatar &&
          `${process.env.VUE_APP_API_URL}${this.model.avatar}`) ||
        require("@/assets/img/avatar-default.jpg")
      );
    }
  }
};
</script>

<style>
.tab-header {
  display: flex;
  margin-bottom: 20px;
}
.tab-header .text-header {
  margin-right: auto;
}
.text-header {
  text-align: left;
  padding: 10px 0;
  font-weight: 500;
}
.common-tab {
  display: flex;
}
.common-tab__info {
}
.common-tab__left {
  flex: 1;
  width: 25%;
}
.common-tab__right {
  margin-left: 20px;
  flex: 3;
}
.common-tab__form {
}
.photo {
  padding: 0 20px;
  max-width: 100%;
  min-height: 300px;
}
.avatar {
  max-width: 100%;
  height: auto;
}
.el-form-item {
  text-align: left;
}
.el-form--label-top .el-form-item__label {
  padding: 0;
  font-size: 12px;
  line-height: 20px;
}
.tab-header .el-form-item {
  margin-bottom: 0;
  margin-right: 20px;
  flex-grow: 1;
}
.avatar-uploader {
  height: 100%;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  position: absolute;
  z-index: 100;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);

  align-items: center;
  justify-content: center;
}
.el-input-number .el-input__inner {
  text-align: left !important;
}
</style>