<template>
  <div>
    <div class="tab-header tab-header--float">
      <div class="tab-header__actions">
        <el-button v-if="!editing" :disabled="!canEdit" @click="toogle"
          >Изменить</el-button
        >
        <el-button v-if="editing" @click="saveWithFiles">Сохранить</el-button>
        <el-button v-if="editing" @click="cancel">Отмена</el-button>
      </div>
    </div>
    <div v-if="!editing">
      <TextField label="Дата приема" :value="model.employmentDate | date" />
      <TextField
        label="Окончание испытательного срока"
        :value="model.probation | date"
      />
      <TextField label="Программа адаптации">
        <a
          class="adaptation-file-link"
          :href="file.path | serverPath"
          :download="file.path | filename"
          v-for="file in adaptationFiles"
          :key="file.id"
          >{{ file.path | filename }}<span class="el-icon-download"></span
        ></a>
      </TextField>
      <TextField label="Куратор" :value="model.mentor | label" />
      <TextField
        label="Консультант по холакратии"
        :value="model.holaСonsultant | label"
      />
      <TextField label="Дата собеседование по холакратии">
        <el-row>
          <el-col
            v-for="(holaDateObject, index) in model.holaDates"
            :key="index"
          >
            {{ holaDateObject.date | date }}
          </el-col>
        </el-row>
      </TextField>
      <TextField label="Комментарии" :value="model.adaptationSummary" />
      <a
        class="adaptation-file-link"
        :href="file.path | serverPath"
        :download="file.path | filename"
        v-for="file in summaryFiles"
        :key="file.id"
        >{{ file.path | filename }}<span class="el-icon-download"></span
      ></a>
    </div>
    <el-form
      label-position="top"
      label-width="100px"
      class="adaptation-tab__form"
      v-if="editing"
    >
      <TextField label="Дата приема" :value="model.employmentDate | date" />
      <el-form-item label="Окончание испытательного срока" label-width="50px">
        <el-date-picker
          v-model="model.probation"
          type="date"
          placeholder="Выберите дату"
        >
        </el-date-picker> </el-form-item
      ><el-form-item label="Программа адаптации" label-width="50px">
        <file-upload :multiple="true" v-model="files" ref="upload"
          ><el-button size="small" type="primary"
            >Прикрепить</el-button
          ></file-upload
        >
        <div class="adaptation-files">
          <transition-group name="file-fade" tag="div">
            <div
              class="adaptation-file"
              v-for="file of adaptationFiles"
              :key="file.id"
            >
              {{ file.path | filename }}
              <span
                class="el-icon-close"
                @click="removeAdaptationFile(file.id)"
              ></span>
            </div>
            <div class="adaptation-file" v-for="file of files" :key="file.id">
              {{ file.name }}
              <span
                class="el-icon-close"
                @click="$refs.upload.remove(file.id)"
              ></span>
            </div>
          </transition-group>
        </div>
      </el-form-item>

      <el-form-item label="Куратор" label-width="50px">
        <el-select
          v-model="model.mentor"
          placeholder="Выберите куратора"
          filterable
          remote
          :remote-method="searchMentors"
          :loading="loadingMentors"
          value-key="id"
        >
          <el-option
            v-for="item in mentors"
            :key="item.id"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select> </el-form-item
      ><el-form-item label="Консультант по холакратии" label-width="50px">
        <el-select
          v-model="model.holaСonsultant"
          placeholder="Выберите куратора"
          filterable
          remote
          :remote-method="searchHolaConsultants"
          :loading="loadingHolaConsultants"
          value-key="id"
        >
          <el-option
            v-for="item in holaConsultants"
            :key="item.id"
            :label="item.label"
            :value="item"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="interview-dates">
        <template>
          <span class="form-title"> Дата собеседования по холакратии</span
          ><i class="el-icon-circle-plus-outline" @click="addHola"></i>
        </template>
        <el-row
          class="interview-dates__row"
          v-for="(date, index) in model.holaDates"
          :key="index"
        >
          <el-col :span="4">
            <el-date-picker
              v-model="model.holaDates[index].date"
              type="date"
              placeholder="Выберите дату"
              :disabled="index !== model.holaDates.length - 1"
            >
            </el-date-picker>
          </el-col>
          <el-col
            class="interview-dates-result"
            :span="5"
            v-if="index !== model.holaDates.length - 1"
          >
            Собеседование не пройдено
          </el-col>
        </el-row>
      </el-form-item>

      <el-form-item label="Коментарии" label-width="50px">
        <div class="with-attach">
          <el-input
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            placeholder="Комментарий..."
            v-model="model.adaptationSummary"
          ></el-input>
          <file-upload
            class="with-attach__button"
            name="summary"
            :multiple="false"
            :drop="true"
            :drop-directory="false"
            ref="commentUpload"
            v-model="commentFiles"
          >
            <span class=" el-icon-paperclip"></span
            >{{
              commentFiles[0]
                ? commentFiles[0].name
                : summaryFiles[0] && summaryFiles[0].path | filename
            }}
          </file-upload>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EditablePage } from "../../../mixin/EditablePage";
import optionsService from "../../../services/optionsService";
import { getFileNameFromPath } from "../../../shared/utils";
export default {
  mixins: [EditablePage],
  data() {
    return {
      domainId: 5,
      fields: [
        "adaptationSummary",
        "holaСonsultant",
        "mentor",
        "adaptation",
        "probation",
        "employmentDate",
        "holaDates",
        "adaptationFiles"
      ],
      mentors: [],
      holaConsultants: [],
      loadingMentors: false,
      loadingHolaConsultants: false,
      model: {},
      files: [],
      commentFiles: []
    };
  },
  watch: {
    model(newVal) {
      if (newVal.mentor) {
        this.mentors = [newVal.mentor];
      }
      if (newVal.holaСonsultant) {
        this.holaConsultants = [newVal.holaСonsultant];
      }
    }
  },
  methods: {
    async saveWithFiles() {
      if (
        (this.files && this.files.length) ||
        (this.commentFiles && this.commentFiles.length)
      ) {
        this.saving = true;
        try {
          const newFiles = await this.$store.dispatch("saveAdaptationFiles", {
            id: this.personId,
            files: this.files.map(f => f.file),
            summary: this.commentFiles.map(f => f.file)[0]
          });
          this.$refs.upload.clear();
          this.$refs.commentUpload.clear();
          // удаляем старые файлы итога если новый сохранен
          if (newFiles.some(f => f.type === 1)) {
            this.model.adaptationFiles = this.model.adaptationFiles.filter(
              f => f.type !== 1
            );
          }
          this.model.adaptationFiles.push(...newFiles);
        } catch (error) {
          console.log(error);
        } finally {
          await this.save();
        }
      } else {
        await this.save();
      }
    },
    fileChange(file, fileList) {
      this.model.adaptation = fileList;
    },
    addHola() {
      this.model.holaDates.push({ date: new Date() });
    },
    getFilename(path) {
      return getFileNameFromPath(path);
    },
    removeAdaptationFile(id) {
      this.model.adaptationFiles = this.model.adaptationFiles.filter(
        f => f.id != id
      );
    },
    async searchMentors(searchText) {
      if (searchText !== "") {
        this.loadingMentors = true;
        const res = await optionsService.getMentors(searchText);
        if (this.model.mentor) {
          this.mentors = [this.model.mentor].concat(
            res.filter(m => m.id !== this.model.mentor.id)
          );
        } else {
          this.mentors = res;
        }
        this.loadingMentors = false;
      }
    },
    async searchHolaConsultants(searchText) {
      if (searchText !== "") {
        this.loadingHolaConsultants = true;
        const res = await optionsService.getMentors(searchText);
        if (this.model.holaConsultants) {
          this.holaConsultants = [this.model.holaConsultants].concat(
            res.filter(m => m.id !== this.model.holaConsultants.id)
          );
        } else {
          this.holaConsultants = res;
        }
        this.loadingHolaConsultants = false;
      }
    }
  },
  computed: {
    adaptation() {
      return (this.model.adaptation || []).map(f => ({
        name: f.name,
        url: URL.createObjectURL(f.raw)
      }));
    },
    adaptationFiles() {
      return (this.model.adaptationFiles || []).filter(f => f.type === 0);
    },
    summaryFiles() {
      return (this.model.adaptationFiles || []).filter(f => f.type === 1);
    }
  }
};
</script>

<style>
.adaptation-file-link {
  display: block;
}
.tab-header--float {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 2000;
}
.el-icon-circle-plus-outline {
  margin-left: 5px;

  cursor: pointer;
}

.interview-dates-result {
  margin-left: 5px;
  color: red;
}
.interview-dates__row {
  padding-bottom: 20px;
}
.adaptation-file-link {
  padding: 2px 0;
  text-decoration: none;
  line-height: 1.3em;
  color: inherit;
}
.adaptation-file-link:hover {
  color: #409eff;
  transition: color 0.25s;
}
.adaptation-file-link [class^="el-icon"] {
  padding-left: 10px;
  font-size: 1.3em;
}
.with-attach {
  display: flex;
  position: relative;
}
.with-attach .file-uploads {
  display: inline;
}
.with-attach .with-attach__button {
  position: absolute;
  left: 10px;
  bottom: -7px;
  cursor: pointer;
}
.with-attach .with-attach__button span {
  padding-right: 5px;
}
.with-attach .file-uploads.file-uploads-html5 label {
  cursor: pointer;
}
.with-attach__control,
.with-attach .el-textarea__inner {
  padding-bottom: 22px;
}
</style>