<template>
  <div class="edit-area" :style="editAreaStyle">
    <Renderer :components="components">
      <template #before-component="{ component, index }">
        <OperateBar
          v-if="checkIsActive(component)"
          :disabled-up="index === 0"
          :disabled-down="index === components.length - 1"
          @move="handleMoveComponent(component.id, $event)"
          @delete="handleDeleteComponent"
        />

        <div
          :class="{ active: checkIsActive(component) }"
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
} from '@/editor/store/mutation-types';
import OperateBar from './OperateBar.vue';
import { MOBILE_PHONE_WIDTH, MOBILE_PHONE_HEIGHT } from '@/editor/constants';

export default {
  name: 'EditArea',

  components: {
    OperateBar,
  },

  data() {
    return {
      editAreaStyle: {
        width: `${MOBILE_PHONE_WIDTH}px`,
        minHeight: `${MOBILE_PHONE_HEIGHT}px`,
      },
    };
  },

  computed: mapState({
    components: state => state.page.components,
    activeComponentId: state => state.page.activeComponentId,
  }),

  methods: {
    checkIsActive(component) {
      return (
        component.id === this.activeComponentId ||
        component.children?.includes(this.activeComponentId)
      );
    },

    handleClickMask(id) {
      this.$store.commit(SET_ACTIVE_COMPONENT_ID, id);
    },

    handleMoveComponent(id, dir) {
      this.$store.commit(MOVE_COMPONENT, { id, dir });
    },

    handleDeleteComponent() {
      this.$store.dispatch('deleteComponent');
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
  margin: 0 auto;
  background: #fff;
  box-shadow: 0px 0px 8px 0px #000a3814;
  user-select: none;
}

.mask {
  .position-full__absolute;
  z-index: 1;
  box-sizing: border-box;
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

.sub-mask {
  .position-full__absolute;
  z-index: 1;
}

.sub-mask:hover {
  background-color: rgba(0, 0, 0, 0.05);
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
