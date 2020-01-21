<template>
  <el-header class="app-header" height="64px">
    <svg-icon filename="sandwich"></svg-icon>
    <div class="right">
      <svg-icon filename="save" @click.native="handleClickSave"></svg-icon>
      <svg-icon filename="eye"></svg-icon>
    </div>
  </el-header>
</template>

<script>
import { saveSandwichPage } from '@/editor/helper';

export default {
  name: 'AppHeader',

  methods: {
    handleClickSave() {
      saveSandwichPage();
      this.$message.success('保存成功');
    },
  },
};
</script>

<style lang="less" scoped>
.app-header {
  flex: 0 0 64px;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 8px 24px 0px #000a3805;
}

.svg-sandwich {
  font-size: 64px;
}

.right {
  display: inline-flex;
  align-items: center;

  .svg-icon {
    margin: 0 8px;
    font-size: 24px;
    cursor: pointer;

    &:hover {
      color: @color-brand;
    }
  }
}
</style>
