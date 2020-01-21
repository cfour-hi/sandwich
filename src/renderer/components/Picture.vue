<template>
  <div class="component__picture">
    <img v-if="component.src.url" :src="component.src.url" class="picture" />
    <PlaceholderPicture v-else />
  </div>
</template>

<script>
import PlaceholderPicture from '@/common/components/PlaceholderPicture.vue';

export default {
  name: 'ComponentPicture',

  components: {
    PlaceholderPicture,
  },

  props: {
    component: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="less" scoped>
.component__picture {
  .flex-center();

  .picture {
    display: block;
    width: 100%;
  }

  .svg-icon {
    font-size: 24px;
    color: #dcdfe6;
  }
}
</style>
