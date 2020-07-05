<template>
  <div>
    <div class="tab-header tab-header--float">
      <el-button :disabled="!canEdit" v-if="!editing" @click="toogle"
        >Изменить</el-button
      >
      <el-button v-if="editing" @click="save">Сохранить</el-button>
      <el-button v-if="editing" @click="cancel">Отмена</el-button>
    </div>
    <div v-if="!editing">
      <TextField
        label="Семейное положение"
        :value="model.familyStatus | fmStatus"
      />
      <TextField label="Пол" :value="model.gender | gender" />
      <TextField label="Дети">
        <el-row
          class="text-group"
          v-if="model.children && model.children.length"
        >
          <el-col class="text-group__label" :span="4">ФИО</el-col>
          <el-col class="text-group__label" :span="4">Дата рождения</el-col>
          <el-col class="text-group__label" :span="6">Возраст</el-col>
        </el-row>
        <div v-else>Детей нет</div>
        <el-row
          class="text-group__row"
          v-for="children in model.children"
          :key="children.id"
        >
          <el-col class="text-group__value" :span="4">
            {{ children.childName }}
          </el-col>
          <el-col class="text-group__value" :span="4">
            {{ children.dob | date }}
          </el-col>
          <el-col class="text-group__value" :span="2">
            {{ dateDiff(children.dob) }}
          </el-col>
        </el-row>
      </TextField>
      <TextField label="Адрес" :value="model.address" />
      <TextField
        label="Контакт на экстренный случай"
        :value="model.emergencyContact"
      />
      <TextField>
        <el-row
          class="text-group"
          v-if="model.socialNetworks && model.socialNetworks.length"
        >
          <el-col class="text-group__label" :span="4">Соц.сеть</el-col>
          <el-col class="text-group__label" :span="4">Ссылка</el-col>
        </el-row>
        <div v-else>Социальные сети не указаны</div>
        <el-row
          v-for="socialNetwork in model.socialNetworks"
          :key="socialNetwork.id"
        >
          <el-col :span="4">
            {{ socialNetwork.label }}
          </el-col>
          <el-col :span="4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              :href="socialNetwork.link"
            >
              {{ socialNetwork.link }}
            </a>
          </el-col>
        </el-row>
      </TextField>
      <TextField label="Образование">
        <el-row v-if="model.educations && model.educations.length">
          <div v-for="education in model.educations" :key="education.id">
            <el-row>
              <el-col class="text-field__label" :span="3"
                >Учебное заведение</el-col
              >
              <el-col :span="8">{{ education.edInstitution }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3"
                >Период обучения</el-col
              >
              <el-col :span="8">{{ education.periodOfStudy }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3">Кафедра</el-col>
              <el-col :span="8">{{ education.department }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3">Специальность</el-col>
              <el-col :span="8">{{ education.specialty }}</el-col>
            </el-row>
          </div>
        </el-row>
      </TextField>
      <TextField label="Дополнительное образование">
        <el-row
          v-if="model.additionalEducations && model.additionalEducations.length"
        >
          <div
            v-for="additionalEducation in model.additionalEducations"
            :key="additionalEducation.id"
          >
            <el-row>
              <el-col class="text-field__label" :span="4"
                >Название курса</el-col
              >
              <el-col :span="10">{{
                additionalEducation.nameOfCourses
              }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="4"
                >Проводившая организация</el-col
              >
              <el-col :span="10">{{ additionalEducation.organizer }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="4"
                >Специализация/направление</el-col
              >
              <el-col :span="10">{{ additionalEducation.specialty }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="4">Год окончания</el-col>
              <el-col :span="10">{{ additionalEducation.edingYears }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="4"
                >Продолжительность</el-col
              >
              <el-col :span="10">{{ additionalEducation.duration }}</el-col>
            </el-row>
          </div>
        </el-row>
      </TextField>

      <TextField
        label="Предыдущий опыт работы"
        :value="model.totalExperience"
      />
      <TextField label="Предыдущие места работы">
        <el-row v-if="model.previousJobs && model.previousJobs.length">
          <div
            v-for="previousJobs in model.previousJobs"
            :key="previousJobs.id"
          >
            <el-row>
              <el-col class="text-field__label" :span="3">Организация</el-col>
              <el-col :span="8">{{ previousJobs.organization }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3">Период работы</el-col>
              <el-col :span="8">{{ previousJobs.workPeriod }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3">Должность</el-col>
              <el-col :span="8">{{ previousJobs.position }}</el-col>
            </el-row>
            <el-row>
              <el-col class="text-field__label" :span="3">Обязанности</el-col>
              <el-col :span="8">{{ previousJobs.duties }}</el-col>
            </el-row>
          </div>
        </el-row>
      </TextField>
      <TextField label="Прочее" :value="model.other" />
    </div>
    <el-form
      ref="form"
      label-position="top"
      label-width="100px"
      class="additional-tab__form"
      v-if="editing"
    >
      <el-form-item label="Семейное положение" label-width="50px">
        <el-radio v-model="model.familyStatus" :label="0"
          >Женат/Замужем</el-radio
        >
        <el-radio v-model="model.familyStatus" :label="1"
          >Разведен/Разведена</el-radio
        >
        <el-radio v-model="model.familyStatus" :label="2"
          >Холост/Не замужем</el-radio
        > </el-form-item
      ><el-form-item label="Пол" label-width="50px">
        <el-radio v-model="model.gender" :label="0">Мужской</el-radio>
        <el-radio v-model="model.gender" :label="1">Женский</el-radio>
      </el-form-item>
      <el-row></el-row>
      <FormArray v-model="model.children" title="Дети" @add="addChild">
        <template v-slot:default="{ model, remove, index }">
          <el-row :gutter="20" align="bottom" type="flex">
            <el-col :span="8">
              <el-form-item label="ФИО">
                <el-input v-model="model.childName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Дата рождения">
                <el-date-picker v-model="model.dob"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-delete-solid" @click="remove(index)"></i>
            </el-col>
          </el-row>
        </template>
      </FormArray>
      <el-form-item label="Адрес" label-width="50px">
        <el-input
          v-model="model.address"
          maxlength="300"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="Контакт на экстренный случай" label-width="50px">
        <el-input v-model="model.emergencyContact"></el-input>
      </el-form-item>
      <FormArray
        v-model="model.socialNetworks"
        title="Соц.сети"
        @add="addSocialNetwork"
      >
        <template v-slot:default="{ model, remove, index }">
          <el-row :gutter="20" align="bottom" type="flex">
            <el-col :span="4">
              <el-form-item label="Соц.сеть">
                <el-input v-model="model.label"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="Ссылка">
                <el-input v-model="model.link"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-delete-solid" @click="remove(index)"></i>
            </el-col>
          </el-row>
        </template>
      </FormArray>
      <FormArray
        v-model="model.educations"
        title="Образование"
        @add="addEducation"
      >
        <template v-slot:default="{ model, remove, index }">
          <el-row :gutter="20" align="bottom" type="flex">
            <el-col :span="12">
              <el-form-item label="Учебное заведение">
                <el-input v-model="model.edInstitution"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-delete-solid" @click="remove(index)"></i>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Период обучения">
                <el-input v-model="model.periodOfStudy"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item>
                <el-form-item label="Кафедра">
                  <el-input v-model="model.department"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item>
                <el-form-item label="Специальность">
                  <el-input v-model="model.specialty"></el-input>
                </el-form-item>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </FormArray>

      <FormArray
        v-model="model.additionalEducations"
        title="Дополнительное образование"
        @add="addAdditionalEducation"
      >
        <template v-slot:default="{ model, remove, index }">
          <el-row :gutter="20" align="bottom" type="flex">
            <el-col :span="12">
              <el-form-item label="Название курса">
                <el-input v-model="model.nameOfCourses"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-delete-solid" @click="remove(index)"></i>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Проводившая организация">
                <el-input v-model="model.organizer"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Специализация/направление">
                <el-input v-model="model.specialty"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="Год окончания">
                <el-input v-model="model.edingYears"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="Продолжительность">
                <el-input v-model="model.duration"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </FormArray>
      <el-form-item label="Предыдущий опыт работы" label-width="50px">
        <el-input v-model="model.totalExperience"></el-input>
      </el-form-item>
      <FormArray
        v-model="model.previousJobs"
        title="Предыдущие места работы"
        @add="addPreviousJobs"
      >
        <template v-slot:default="{ model, remove, index }">
          <el-row :gutter="20" align="bottom" type="flex">
            <el-col :span="12">
              <el-form-item label="Организация">
                <el-input v-model="model.organization"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="2">
              <i class="el-icon-delete-solid" @click="remove(index)"></i>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Период работы">
                <el-input v-model="model.workPeriod"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Должность">
                <el-input v-model="model.position"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item label="Обязанности">
                <el-input v-model="model.duties"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
      </FormArray>
      <el-form-item label="Прочее" label-width="50px">
        <el-input
          v-model="model.other"
          maxlength="200"
          show-word-limit
        ></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EditablePage } from "../../../mixin/EditablePage";
import diffInYerars from "date-fns/differenceInYears";
import parseIso from "date-fns/parseISO";

export default {
  mixins: [EditablePage],
  data() {
    return {
      domainId: 2,
      fields: [
        "totalExperience",
        "familyStatus",
        "gender",
        "children",
        "address",
        "emergencyContact",
        "socialNetworks",
        "educations",
        "additionalEducations",
        "previousJobs",
        "other"
      ],
      model: {}
    };
  },
  methods: {
    addChild() {
      this.model.children.push({
        childName: "",
        dob: null
      });
    },
    dateDiff(date) {
      if (!date) return date;
      return diffInYerars(new Date(), parseIso(date));
    },
    addSocialNetwork() {
      this.model.socialNetworks.push({
        label: "",
        link: ""
      });
    },
    addEducation() {
      this.model.educations.push({
        edInstitution: "",
        department: "",
        specialty: "",
        periodOfStudy: ""
      });
    },
    addPreviousJobs() {
      this.model.previousJobs.push({
        workPeriod: "",
        position: "",
        organization: "",
        duties: ""
      });
    },
    addAdditionalEducation() {
      this.model.additionalEducations.push({
        nameOfCourses: "",
        organizer: "",
        specialty: "",
        edingYears: "",
        duration: ""
      });
    }
  }
};
</script>

<style>
.additional-tab__form .el-date-editor.el-input {
  width: 100%;
}
.el-icon-delete-solid {
  cursor: pointer;
  font-size: 1.3em;
}
.el-icon-delete-solid:hover {
  color: crimson;
}
.text-group {
  font-size: 12px;
  margin-bottom: 8px;
}
.text-group__row {
  margin-bottom: 5px;
}
</style>