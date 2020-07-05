<template>
  <div class="text-field">
    <span class="text-field__label">{{ label }}</span>
    <p v-if="!this.$slots.default" class="text-field__value">
      {{ value || "Нет данных" }}
    </p>
    <div v-else class="text-field__value">
      <slot> </slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    value: [String, Number]
  }
};
</script>

<style>
.text-field {
  text-align: left;
  margin-bottom: 10px;
}
.text-field__label {
  font-size: 12px;
  color: rgb(93, 91, 91);
  line-height: 20px;
  display: inline-block;
  margin-bottom: 10px;
}
</style>