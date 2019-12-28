<template>
  <div class="edit-area">
    <Renderer
      :components="$store.state.page.components"
      :active-component-id="$store.state.page.activeComponentId"
      @changeActiveComponent="handleChangeActiveComponent"
    />
    <div class="first-screen-line">首屏位置</div>
  </div>
</template>

<script>
import { SET_ACTIVE_COMPONENT_ID } from '../store/mutation-types';

export default {
  name: 'EditArea',

  methods: {
    handleChangeActiveComponent(component) {
      this.$store.commit(SET_ACTIVE_COMPONENT_ID, component.id);
    },
  },
};
</script>

<style lang="less" scoped>
.edit-area {
  position: relative;
  min-height: 585px;
  width: 375px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #000a3814;
  user-select: none;
}

.first-screen-line {
  position: absolute;
  top: 585px;
  left: -57px;
  width: 57px;
  padding-top: 6px;
  border-top: 1px dashed #ccced7;
  font-size: 12px;
  color: #999daf;
}
</style>
