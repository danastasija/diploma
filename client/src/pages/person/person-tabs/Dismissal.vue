<template>
  <div>
    <div class="tab-header tab-header--float">
      <el-button v-if="hasDismissRole" @click="archive">Уволить</el-button>
      <el-button :disabled="!canEdit" v-if="!editing" @click="toogle"
        >Изменить</el-button
      >
      <el-button v-if="editing" @click="saveWithAttach">Сохранить</el-button>
      <el-button v-if="editing" @click="cancel">Отмена</el-button>
    </div>
    <div v-if="!editing">
      <TextField label="Дата ухода" :value="model.dateOfDismissal | date" />
      <TextField label="Стаж">
        {{ dateDist(model.employmentDate) }}
      </TextField>
      <TextField label="Должность" :value="model.positions | label" />
      <!-- <TextField label="Зарплата" :value="model.newalary" /> -->
      <el-row>
        <el-col :span="4">
          <TextField label="Причина" :value="model.cause | label" />
        </el-col>
        <el-col :span="6">
          <TextField label="Будущий работодатель" :v-model="model.employer" />
        </el-col>
      </el-row>
      <TextField label="Exit-интервью" :value="model.commentExit" />
      <a
        class="adaptation-file-link"
        :href="file.path | serverPath"
        :download="file.path | filename"
        v-for="file in model.dismissalFile"
        :key="file.id"
        >{{ file.path | filename }}<span class="el-icon-download"></span
      ></a>
    </div>
    <el-form
      label-position="top"
      label-width="100px"
      class="dismissal-tab__form"
      v-if="editing"
    >
      <el-form-item label="Дата ухода" label-width="50px">
        <el-date-picker
          v-model="model.dateOfDismissal"
          type="date"
          placeholder="Выберите дату"
        >
        </el-date-picker> </el-form-item
      ><TextField label="Стаж">
        {{ dateDist(model.employmentDate) }}
      </TextField>
      <TextField label="Должность" :value="model.positions | label" />
      <!-- <TextField label="Зарплата" :value="model.rate" /> -->
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="Причина" label-width="50px">
            <el-select v-model="model.cause" placeholder="Выберите причину">
              <el-option
                v-for="item in causes"
                value-key="id"
                :key="item.id"
                :label="item.label"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Будущий работодатель" label-width="50px">
            <el-input v-model="model.employer"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="Exit-интервью" label-width="50px">
        <CommentWithAttach v-model="files" :files="model.dismissalFile">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="Комментарий..."
            v-model="model.commentExit"
            maxlength="500"
            show-word-limit
          ></el-input>
        </CommentWithAttach>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EditablePage } from "../../../mixin/EditablePage";
import optionsService from "../../../services/optionsService";
import personService from "../../../services/personService";
import differenceInMonths from "date-fns/differenceInMonths";
import distanceInWordsToNow from "date-fns/formatDistanceToNowStrict";
import addYears from "date-fns/addYears";
import ru from "date-fns/locale/ru";
import { UserRole } from "../../../constants/Enums";

export default {
  mixins: [EditablePage],
  mounted() {
    optionsService.getCauses().then(causes => {
      this.causes = causes;
    });
  },
  methods: {
    async archive() {
      await personService.archive(this.$route.params.personId);
      this.$router.push("/archive");
    },
    ateDiff(date) {
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
    async saveWithAttach() {
      debugger;
      if (this.files && this.files.length) {
        this.saving = true;
        try {
          const newFile = await personService.saveDismissalFile(
            this.personId,
            this.files[0].file
          );
          this.files = [];
          // удаляем старые файлы итога если новый сохранен
          this.model.dismissalFile = [newFile];
        } catch (error) {
          console.log(error);
        } finally {
          await this.save();
        }
      } else {
        await this.save();
      }
    }
  },
  computed: {
    hasDismissRole() {
      return this.hasRole(UserRole.dismissal);
    }
  },
  data() {
    return {
      domainId: 6,
      fields: [
        "dateOfDismissal",
        "dismissalFile",
        "totalExperience",
        "positions",
        "rate",
        "cause",
        "commentExit",
        "employer",
        "employmentDate"
      ],
      excludeFields: ["positions", "rate"],
      causes: [],
      model: {},
      files: []
    };
  }
};
</script>

<style>
</style>