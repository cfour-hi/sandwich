<template>
  <el-aside width="272px">
    <ul class="comp-list">
      <li
        v-for="(comp, type) in componentSetting"
        :key="type"
        class="comp-item"
        @click="handleClickComp(type)"
      >
        <svg-icon filename="image"></svg-icon>
        <span>{{ comp.label }}</span>
      </li>
    </ul>
  </el-aside>
</template>

<script>
import componentSetting from '../component-setting';

export default {
  name: 'AppComponentPanel',

  data() {
    this.componentSetting = componentSetting;
    return {};
  },

  methods: {
    handleClickComp(type) {
      this.$store.dispatch('addComponent', { type });
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
    flex-wrap: wrap;
    width: 240px;
    border-top: 1px solid #eee;
    border-left: 1px solid #eee;

    .comp-item {
      .flex-center();
      flex-direction: column;
      box-sizing: border-box;
      width: 80px;
      height: 80px;
      border-right: 1px solid #eee;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #5d6482;
      background-color: #fff;
      cursor: pointer;

      .svg-icon {
        font-size: 24px;
        margin-bottom: 4px;
      }

      &:hover {
        .svg-icon {
          transform: translateY(-2px);
          transition: transform ease-in-out 0.1s;
        }
      }
    }
  }
}
</style>
