<template>
  <div v-mask="{ click: handleClickMask }" class="preview">
    <div class="mobile-phone" :style="mobilePhoneStyle">
      <iframe
        ref="iframe"
        :src="SITE_ADDRESS"
        frameborder="0"
        width="100%"
        height="100%"
      ></iframe>
    </div>
  </div>
</template>

<script>
import {
  MOBILE_PHONE_WIDTH,
  MOBILE_PHONE_HEIGHT,
  SITE_ADDRESS,
} from '@/editor/constants';
import mask from '@/editor/directives/mask';

const siteLocation = new URL(SITE_ADDRESS);

export default {
  name: 'Preview',

  directives: {
    mask,
  },

  data() {
    this.SITE_ADDRESS = SITE_ADDRESS;
    return {
      mobilePhoneStyle: {
        width: `${MOBILE_PHONE_WIDTH}px`,
        height: `${MOBILE_PHONE_HEIGHT}px`,
      },
    };
  },

  mounted() {
    document.body.appendChild(this.$el);
  },

  methods: {
    postMessage() {
      this.$refs.iframe.contentWindow.postMessage(
        { components: this.$store.state.page.components },
        siteLocation.origin
      );
    },

    handleClickMask() {
      this.$emit('clickMask');
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  .position-full__fixed;
  z-index: 1;
}

.mobile-phone {
  position: relative;
  top: 64px;
  margin: 0 auto;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
}
</style>
