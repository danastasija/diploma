<template>
  <el-form-item>
    <template template="title">
      <span class="form-array-title">{{ title }}</span
      ><i class="el-icon-circle-plus-outline" @click="add"></i>
    </template>

    <div class="form-array__item" v-for="(item, index) in items" :key="index">
      <slot
        v-bind:model="item"
        v-bind:remove="remove"
        v-bind:index="index"
      ></slot>
    </div>
  </el-form-item>
</template>

<script>
export default {
  model: {
    prop: "items",
    event: "change"
  },
  props: {
    items: {
      required: true,
      default: () => [],
      type: Array
    },
    title: String
  },
  methods: {
    add() {
      this.$emit("add");
    },
    remove(index) {
      this.items.splice(index, 1);
      this.$emit("change", [...this.items]);
    }
  }
};
</script>

<style>
.form-array__item {
  padding-bottom: 20px;
}
.form-array__item:not(:last-child) {
  border-bottom: 1px solid #dcdfe6;
}
.el-icon-circle-plus-outline {
  margin-left: 5px;

  cursor: pointer;
}
.form-array-title {
  font-size: 12px;
  line-height: 20px;
}
</style>