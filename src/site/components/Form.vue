<template>
  <RenderForm v-bind="$attrs" @submit="handleSubmit">
    <slot />
  </RenderForm>
</template>

<script>
import RenderForm from '@/renderer/components/Form.vue';

export default {
  name: 'FormWrap',

  components: { RenderForm },

  methods: {
    handleSubmit(data) {
      // eslint-disable-next-line no-console
      console.log('handleSubmit -> data', data);
    },
  },
};
</script>
