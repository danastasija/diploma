<template>
  <div>
    <div class="tab-header tab-header--float">
      <el-button :disabled="!canEdit" v-if="!editing" @click="toogle"
        >Изменить</el-button
      >
      <el-button v-if="editing" @click="save">Сохранить</el-button>
      <el-button v-if="editing" @click="toogle">Отмена</el-button>
    </div>
    <div v-if="!editing">
      <TextField label="Кабинет" :value="model.cabinet" />
      <TextField label="Рабочее место" :value="model.workplace" />
      <TextField label="Ящик в гардеробе" :value="model.shoebox" />
      <TextField label="Наличие машины" :value="model.car | bool" />
    </div>
    <el-form
      label-position="top"
      label-width="100px"
      class="office-tab__form form-with-float-header"
      v-if="editing"
    >
      <el-form-item
        class="form-input--short"
        label="Кабинет"
        label-width="50px"
      >
        <el-input v-model="model.cabinet"></el-input> </el-form-item
      ><el-form-item
        class="form-input--short"
        label="Рабочее место"
        label-width="50px"
      >
        <el-input v-model="model.workplace"></el-input> </el-form-item
      ><el-form-item
        class="form-input--short"
        label="Ящик в гардеробе"
        label-width="50px"
      >
        <el-input v-model="model.shoebox"></el-input> </el-form-item
      ><el-form-item
        class="form-input--short"
        label="Наличие машины"
        label-width="50px"
      >
        <el-radio v-model="model.car" :label="true">Да</el-radio>
        <el-radio v-model="model.car" :label="false">Нет</el-radio>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { EditablePage } from "../../../mixin/EditablePage";
export default {
  mixins: [EditablePage],
  data() {
    return {
      domainId: 3,
      fields: ["cabinet", "workplace", "shoebox", "car"],
      model: {}
    };
  }
};
</script>

<style>
</style>