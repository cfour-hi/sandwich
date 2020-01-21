<template>
  <div class="upload-picture" @click="handleClick">
    <img v-if="value" :src="value" alt="" class="picture" />
    <svg-icon v-else filename="plus-circle" />

    <input ref="inputFile" type="file" style="display: none;" @change="$emit('change', $event)" />

    <!-- stop 修饰符防止删除时触发上传（打开系统文件选择窗口） -->
    <div v-if="value" class="delete-btn-wrap" @click.stop="$emit('delete')">
      <svg-icon filename="close"></svg-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadPicture',

  props: {
    value: {
      type: String,
      default: '',
    },
  },

  methods: {
    handleClick() {
      this.$refs.inputFile.dispatchEvent(new MouseEvent('click'));
    },
  },
};
</script>

<style lang="less" scoped>
.upload-picture {
  .flex-center();
  position: relative;
  box-sizing: border-box;
  height: 100%;
  border: 1px dashed #ccc;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;

  .picture {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .svg-plus-circle {
    width: 32%;
    height: auto;
    color: #ccc;
  }

  .delete-btn-wrap {
    display: none;
    position: absolute;
    top: -1px;
    right: -1px;
    width: 18px;
    height: 18px;
    border-bottom-left-radius: 100%;
    text-align: right;
    background-color: @color-danger;

    .svg-close {
      font-size: 12px;
      color: #fff;
    }
  }

  &:hover {
    border-color: @color-brand;

    .svg-plus-circle {
      color: @color-brand;
    }

    .delete-btn-wrap {
      display: block;
    }
  }
}
</style>
