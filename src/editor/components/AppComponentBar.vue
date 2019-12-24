<template>
  <el-aside>
    <ul class="comp-list">
      <li
        v-for="(comp, type) in componentSetting"
        :key="type"
        class="comp-item"
        @click="handleClickComp(type)"
      >
        <svg-icon file-name="image"></svg-icon>
        {{ comp.label }}
      </li>
    </ul>
  </el-aside>
</template>

<script>
import componentSetting from '../component-setting';

export default {
  name: 'AppComponentBar',

  data() {
    this.componentSetting = componentSetting;
    return {};
  },

  methods: {
    handleClickComp(type) {
      this.$store.dispatch('addComponent', type);
    },
  },
};
</script>

<style lang="less" scoped>
.el-aside {
  background-color: #f7f9fc;
  height: 100%;
  padding: 16px;
  box-shadow: 0 12px 12px 0 rgba(0, 0, 0, 0.1);

  .comp-list {
    display: flex;

    .comp-item {
      display: flex;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;
      width: 80px;
      height: 80px;
      border: 1px dashed #e4e7ed;
      font-size: 14px;
      color: #5d6482;
      background-color: #fff;
      cursor: pointer;

      &:hover {
        color: #409eff;
        border-color: #409eff;
      }
    }
  }
}
</style>
