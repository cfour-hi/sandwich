<template>
  <div class="upload-picture" @click="handleClick">
    <img v-if="value" :src="value" alt="" class="picture" />
    <svg-icon v-else filename="plus-circle" />

    <input
      ref="inputFile"
      type="file"
      style="display: none;"
      @change="$emit('change', $event)"
    />
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
  box-sizing: border-box;
  height: 100%;
  border: 1px dashed #ccc;
  border-radius: 4px;
  cursor: pointer;

  .picture {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .svg-icon {
    font-size: 24px;
    color: #ccc;
  }
}
</style>
