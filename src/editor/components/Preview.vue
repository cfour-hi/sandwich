<template>
  <div class="preview">
    <div class="mask"></div>
    <div class="mobile-phone" :style="mobilePhoneStyle">
      <iframe
        ref="iframe"
        :src="PREVIEW_ORIGIN"
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
  PREVIEW_ORIGIN,
} from '@/editor/constants';

export default {
  name: 'Preview',

  data() {
    this.PREVIEW_ORIGIN = PREVIEW_ORIGIN;
    return {
      mobilePhoneStyle: {
        width: `${MOBILE_PHONE_WIDTH}px`,
        height: `${MOBILE_PHONE_HEIGHT}px`,
      },
    };
  },

  created() {
    window.addEventListener('message', this.onmessage);
  },

  mounted() {
    document.body.appendChild(this.$el);
  },

  beforeDestroy() {
    window.removeEventListener('message', this.onmessage);
  },

  methods: {
    onmessage(e) {
      const { readyState } = e.data;
      if (readyState === 'loading') {
        this.$refs.iframe.contentWindow.postMessage(
          { components: this.$store.state.page.components },
          PREVIEW_ORIGIN
        );
      }
    },
  },
};
</script>

<style lang="less" scoped>
.preview {
  .position-full;
  z-index: 1;
}

.mask {
  .position-full;
  background-color: rgba(0, 0, 0, 0.5);
}

.mobile-phone {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
}
</style>
