<template>
  <div class="edit-area">
    <Renderer :components="components">
      <template #before-component="{ component, index }">
        <OperateBar
          v-if="activeComponentId === component.id"
          :disabled-up="index === 0"
          :disabled-down="index === components.length - 1"
          @move="handleMoveComponent"
          @delete="handleDeleteComponent"
        />

        <div
          :class="{ active: activeComponentId === component.id }"
          class="mask"
          @click="handleClickMask(component.id)"
        ></div>
      </template>
    </Renderer>

    <div class="first-screen-line">首屏位置</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  SET_ACTIVE_COMPONENT_ID,
  MOVE_COMPONENT,
  DELETE_ACTIVE_COMPONENT,
} from '@/editor/store/mutation-types';
import OperateBar from './OperateBar.vue';

export default {
  name: 'EditArea',

  components: {
    OperateBar,
  },

  computed: mapState({
    components: state => state.page.components,
    activeComponentId: state => state.page.activeComponentId,
  }),

  methods: {
    handleClickMask(id) {
      this.$store.commit(SET_ACTIVE_COMPONENT_ID, id);
    },

    handleMoveComponent(direction) {
      this.$store.commit(MOVE_COMPONENT, direction);
    },

    handleDeleteComponent() {
      this.$store.commit(DELETE_ACTIVE_COMPONENT);
    },
  },
};
</script>

<style lang="less" scoped>
.mask-position {
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
}

.edit-area {
  position: relative;
  min-height: 585px;
  width: 375px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #000a3814;
  user-select: none;
}

.mask {
  .position-full;
  box-sizing: border-box;
  z-index: 1;
  border: 2px solid transparent;

  &.active {
    border-color: @color-brand;
  }

  &:hover::before {
    content: '';
    .mask-position;
    border: 1px solid #999;
  }

  &:hover::after {
    content: '';
    .mask-position;
    border: 1px dashed #fff;
  }
}

.first-screen-line {
  position: absolute;
  top: 585px;
  left: -56px;
  width: 56px;
  padding-top: 6px;
  border-top: 1px dashed #ccced7;
  font-size: 12px;
  color: #999daf;
}
</style>
