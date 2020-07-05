 <template>
  <a
    class="adaptation-file-link"
    :href="file.path | serverPath"
    :download="file.path | filename"
    :key="file.id"
    >{{ file.path | filename }}<span class="el-icon-download"></span
  ></a>
</template>

 <script>
export default {
  props: {
    file: Object
  }
};
</script>

 <style>
</style>