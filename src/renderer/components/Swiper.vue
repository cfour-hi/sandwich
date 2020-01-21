<template>
  <div class="component__swiper">
    <ul
      v-if="component.pictures.length"
      class="picture-list"
      :style="pictureListStyle"
      @transitionend="handleTransitionend"
    >
      <li v-if="seamlessPictures.length" class="picture-item">
        <img :src="seamlessPictures[1].url" alt="" class="picture" />
      </li>

      <li
        v-for="(picture, index) in component.pictures"
        :key="index"
        class="picture-item"
      >
        <img :src="picture.url" alt="" class="picture" />
      </li>

      <li v-if="seamlessPictures.length" class="picture-item">
        <img :src="seamlessPictures[0].url" alt="" class="picture" />
      </li>
    </ul>

    <PlaceholderPicture v-else />
  </div>
</template>

<script>
import Hammer from 'hammerjs';
import PlaceholderPicture from '@/common/components/PlaceholderPicture.vue';

export default {
  name: 'ComponentSwiper',

  components: {
    PlaceholderPicture,
  },

  props: {
    component: {
      type: Object,
      required: true,
    },
  },

  data() {
    this.hammer = null;
    this.autoplayInterval = null;
    this.sliding = false;
    return {
      activeIndex: 0, // 0 其实是最后一张
      speed: this.component.speed,
    };
  },

  computed: {
    pictureListStyle() {
      return {
        transform: `translateX(-${this.activeIndex * 100}%)`,
        transition: `transform ${this.speed}s ease-out`,
      };
    },

    seamlessPictures() {
      const { pictures } = this.component;
      if (pictures.length > 1) {
        return [pictures[0], pictures[pictures.length - 1]];
      }
      return [];
    },
  },

  watch: {
    component: {
      deep: true,
      handler() {
        this.processAutoplay();
      },
    },
  },

  mounted() {
    this.processHammer();
    this.processAutoplay();
  },

  methods: {
    processHammer() {
      this.hammer = new Hammer(this.$el);
      this.hammer.on('swipeleft swiperight', e => {
        // 滑动中不允许进行手势滑动
        if (this.sliding) return;
        this.sliding = true;

        if (e.type === 'swipeleft') {
          this.activeIndex += 1;
        } else if (e.type === 'swiperight') {
          this.activeIndex -= 1;
        }
      });
    },

    processAutoplay() {
      clearInterval(this.autoplayInterval);
      if (this.component.autoplay && this.component.pictures.length > 1) {
        this.autoplayInterval = setInterval(() => {
          this.sliding = true;
          this.activeIndex += 1;
        }, this.component.delay * 1000);
      }
    },

    handleTransitionend() {
      if (this.activeIndex > this.component.pictures.length) {
        /**
         * 最后一张图其实就是第一张图
         * 过渡效果结束后立即切回到第一张图
         * 无过渡效果，内容一样，所以无感知
         */
        this.speed = 0;
        this.activeIndex = 1;
      } else if (this.activeIndex <= 0) {
        /**
         * 第 0 张图其实就是最后一张图
         * 同上
         */
        this.speed = 0;
        this.activeIndex = this.component.pictures.length;
      }

      /**
       * 此处不能使用 nextTick，会导致无缝轮播无效
       * nextTick 实现使用的 MutationObserver 属于 micro-task
       */
      setTimeout(() => {
        // 开启过渡效果
        this.speed = this.component.speed;
        this.sliding = false;
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.component__swiper {
  // 蒙层防止 PC 端鼠标滑动选中图片
  &::after {
    content: '';
    .position-full;
  }
}

.picture-list {
  display: flex;
}

.picture-item {
  display: inline-flex;
  flex: 0 0 100%;
  align-items: center;

  .picture {
    width: 100%;
  }
}
</style>
