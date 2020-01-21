<template>
  <div class="placeholder-picture">
    <svg-icon filename="image" />
  </div>
</template>

<script>
export default {
  name: 'PlaceholderPicture',
};
</script>

<style lang="less" scoped>
.placeholder-picture {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f2f6fc;

  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }

  .svg-icon {
    width: 16%;
    height: auto;
    color: #ddd;
  }
}
</style>
