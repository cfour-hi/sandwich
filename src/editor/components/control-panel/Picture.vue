<template>
  <div class="control-panel__picture">
    <div class="header">图片设置</div>
  </div>
</template>

<script>
export default {
  name: 'ControlPanelPicture',

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>
