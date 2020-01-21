<template>
  <div class="control-panel__picture">
    <div class="header">图片设置</div>
    <UploadPicture
      :value="component.src.url"
      @change="handleChangeFile"
      @delete="handleDeletePicture"
    />
  </div>
</template>

<script>
import { UPDATE_ACTIVE_COMPONENT } from '@/editor/store/mutation-types';
import {
  getImageNaturalWH,
  getImageHeightOfSpecifialWidth,
  convertPicture2Base64,
} from '@/common/tool';
import { PHONE_WIDTH } from '@/editor/constants';
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
      const [file] = e.target.files;
      const url = window.URL.createObjectURL(file);
      const [{ naturalWidth, naturalHeight }, height] = await Promise.all([
        getImageNaturalWH(url),
        getImageHeightOfSpecifialWidth(url, PHONE_WIDTH),
      ]);
      const base64 = await convertPicture2Base64(url, PHONE_WIDTH, height);
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        src: {
          url: base64,
          width: naturalWidth,
          height: naturalHeight,
        },
      });
    },

    handleDeletePicture() {
      this.$store.commit(UPDATE_ACTIVE_COMPONENT, {
        src: { url: '', width: 0, height: 0 },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.upload-picture {
  height: 120px;

  /deep/ .svg-plus-circle {
    width: 32px;
  }
}
</style>
