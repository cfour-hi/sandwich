<template>
  <div class="operate-bar">
    <div class="move-bar">
      <svg-icon filename="arrowup" :disabled="disabledUp" @click.native="handleClickMoveUp" />
      <svg-icon filename="arrowdown" :disabled="disabledDown" @click.native="handleClickMoveDown" />
    </div>
    <div class="delete-bar">
      <svg-icon filename="delete" @click.native="$emit('delete')"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperateBar',

  props: {
    disabledUp: {
      type: Boolean,
      default: false,
    },

    disabledDown: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    handleClickMoveUp() {
      if (this.disabledUp) return;
      this.$emit('move', -1);
    },

    handleClickMoveDown() {
      if (this.disabledDown) return;
      this.$emit('move', 1);
    },
  },
};
</script>

<style lang="less" scoped>
.operate-bar {
  position: absolute;
  right: -56px;
  width: 36px;
  color: #5d6482;
}

.move-bar {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 90px;
  border-radius: 18px;
  background-color: #fff;
  box-shadow: 0px 1px 9px 0px rgba(0, 10, 56, 0.06);

  &::before {
    content: '';
    position: absolute;
    width: 20px;
    border-top: 1px solid #ddd;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
  }

  .svg-icon {
    width: 100%;
    padding: 8px 0;
    cursor: pointer;

    &[disabled] {
      color: #ddd;
      cursor: not-allowed;
    }
  }
}

.delete-bar {
  .flex-center();
  overflow: hidden;
  height: 36px;
  margin-top: 8px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 1px 9px 0px rgba(0, 10, 56, 0.06);
  cursor: pointer;

  &:hover {
    color: #fff;
    background-color: @color-danger;
  }

  .svg-icon {
    padding: 8px;
    font-size: 20px;
  }
}
</style>
