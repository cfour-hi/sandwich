<template>
  <svg :class="`svg-${filename}`" class="svg-icon" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',

  props: {
    filename: {
      type: String,
      required: true,
    },
  },

  computed: {
    iconName() {
      return `#icon-${this.filename}`;
    },
  },
};
</script>

<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
