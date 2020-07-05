<template>
  <div class="with-attach">
    <slot></slot>
    <file-upload
      class="with-attach__button"
      name="summary"
      :multiple="false"
      :drop="true"
      :drop-directory="false"
      ref="commentUpload"
      :value="nfiles"
      @input="$emit('input', $event)"
    >
      <span class=" el-icon-paperclip"></span
      >{{ nfiles[0] ? nfiles[0].name : files[0] && files[0].path | filename }}
    </file-upload>
  </div>
</template>

<script>
export default {
  model: {
    prop: "nfiles",
    event: "input"
  },
  props: {
    nfiles: {
      default: () => [],
      type: Array
    },
    files: {
      default: () => [],
      type: Array
    }
  }
};
</script>

<style>
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
.with-attach .with-attach__button {
  position: absolute;
  left: 10px;
  bottom: 4px;
  cursor: pointer;
}
.el-form-item .with-attach .with-attach__button {
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