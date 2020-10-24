<template>
  <div class="control-panel__swiper">
    <div class="header">轮播图设置</div>

    <div class="form-item">
      <div class="form-item__label">添加素材</div>
      <div class="picture-list">
        <UploadPicture
          v-for="(picture, index) in props.pictures"
          :key="index"
          :value="picture.url"
          @change="handleChangeFile(index, $event)"
          @delete="handleDeletePicture(index)"
        />

        <UploadPicture disabled-delete @change="handleChangeFile(-1, $event)" />
      </div>
    </div>

    <FormItemSwitch v-model="props.autoplay" label="自动轮播" />

    <FormItemInputNumber
      v-if="props.autoplay"
      v-model="props.delay"
      label="轮播速度"
      :min="1"
      :step="0.5"
    />
  </div>
</template>

<script>
import {
  getImageNaturalWH,
  getImageHeightOfSpecifialWidth,
  convertPicture2Base64,
} from '@/common/tool';
import { MOBILE_PHONE_WIDTH } from '@/editor/constants';
import UploadPicture from '../UploadPicture.vue';
import FormItemSwitch from './form-item/Switch.vue';
import FormItemInputNumber from './form-item/InputNumber.vue';
import mixinPropsStyle from './mixins/props-style';

export default {
  name: 'ComponentPanelSwiper',

  components: {
    UploadPicture,
    FormItemSwitch,
    FormItemInputNumber,
  },

  mixins: [mixinPropsStyle],

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  methods: {
    async handleChangeFile(index, e) {
      const [file] = e.target.files;
      const url = window.URL.createObjectURL(file);
      const [{ naturalWidth, naturalHeight }, height] = await Promise.all([
        getImageNaturalWH(url),
        getImageHeightOfSpecifialWidth(url, MOBILE_PHONE_WIDTH),
      ]);
      const base64 = await convertPicture2Base64(
        url,
        MOBILE_PHONE_WIDTH,
        height
      );
      const picture = {
        url: base64,
        width: naturalWidth,
        height: naturalHeight,
      };

      if (index < 0) {
        this.props.pictures.push(picture);
      } else {
        this.props.pictures.splice(index, 1, picture);
      }
    },

    handleDeletePicture(index) {
      this.props.pictures.splice(index, 1);
    },
  },
};
</script>

<style lang="less" scoped>
.control-panel__swiper {
  &::before {
    .position-full__absolute;
  }
}

.picture-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .upload-picture {
    width: 80px;
    height: 80px;

    &:not(:nth-child(3n)) {
      margin-right: 8px;
    }
    &:nth-child(n + 4) {
      margin-top: 8px;
    }
  }
}
</style>
