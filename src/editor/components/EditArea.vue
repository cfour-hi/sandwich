<template>
  <div class="edit-area">
    <div class="first-screen-line">首屏位置</div>
  </div>
</template>

<script>
export default {
  name: 'EditArea',
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
