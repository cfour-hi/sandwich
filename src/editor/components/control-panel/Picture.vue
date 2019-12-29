<template>
  <div class="control-panel__picture">
    <div class="header">图片设置</div>
    <UploadPicture :value="component.src.url" @change="handleChangeFile" />
  </div>
</template>

<script>
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import { getUploadImageWH } from '@/common/tool';
import UploadPicture from '../UploadPicture.vue';

export default {
  name: 'ControlPanelPicture',

  components: {
    UploadPicture,
  },

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async handleChangeFile(e) {
      const img = await getUploadImageWH(e.target.files[0], { width: '375px' });
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        height: img.height,
        src: {
          url: img.url,
          width: img.naturalWidth,
          height: img.naturalHeight,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.upload-picture {
  height: 120px;
}
</style>
