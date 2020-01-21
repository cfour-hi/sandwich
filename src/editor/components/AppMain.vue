<template>
  <el-main>
    <section class="top-blank"></section>

    <EditArea />

    <section class="bottom-blank"></section>
  </el-main>
</template>

<script>
import EditArea from './EditArea.vue';

export default {
  name: 'AppMain',

  components: {
    EditArea,
  },
};
</script>

<style lang="less" scoped>
.el-main {
  overflow: auto;
  height: 100%;
}

.top-blank,
.bottom-blank {
  height: 32px;
}
</style>
