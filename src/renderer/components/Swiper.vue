<template>
  <div class="component__swiper">
    <template v-if="component.pictures.length">
      <div
        class="picture-list"
        :style="pictureListStyle"
        @transitionend="handleTransitionend"
      >
        <div v-if="seamlessPictures.length" class="picture-item">
          <img :src="seamlessPictures[1].url" alt class="picture" />
        </div>

        <div
          v-for="(picture, index) in component.pictures"
          :key="index"
          class="picture-item"
        >
          <img :src="picture.url" alt class="picture" />
        </div>

        <div v-if="seamlessPictures.length" class="picture-item">
          <img :src="seamlessPictures[0].url" alt class="picture" />
        </div>
      </div>

      <div class="pagination">
        <div
          v-for="(picture, index) in component.pictures"
          :key="index"
          :class="{ active: checkIsActiveBullet(index) }"
          class="bullet"
        ></div>
      </div>
    </template>

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
      // 多张图在初始化的时候索引 1 才是第一张图
      activeIndex: this.component.pictures.length > 1 ? 1 : 0,
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

    'component.autoplay': {
      handler(v) {
        if (!v && this.seamlessPictures.length) {
          // 关闭自动轮播并且有多张图的情况下切回首图
          this.activeIndex = 1;
        }
      },
    },
  },

  mounted() {
    this.processHammer();
    this.processAutoplay();
    document.addEventListener('visibilitychange', this.onvisibilitychange);
  },

  beforeDestroy() {
    document.removeEventListener('visibilitychange', this.onvisibilitychange);
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

    onvisibilitychange() {
      if (document.visibilityState === 'visible') {
        this.processAutoplay();
      } else {
        clearInterval(this.autoplayInterval);
      }
    },

    checkIsActiveBullet(index) {
      const { pictures } = this.component;
      return (
        (index === 0 && this.activeIndex === pictures.length + 1) ||
        (index === pictures.length - 1 && this.activeIndex === 0) ||
        this.activeIndex - 1 === index
      );
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
    .position-full__absolute;
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

.pagination {
  position: absolute;
  bottom: 16px;
  display: flex;
  justify-content: center;
  width: 100%;
}

.bullet {
  width: 8px;
  height: 8px;
  margin: 0 4px;
  border-radius: 50%;
  background-color: #ccc;

  &.active {
    background-color: @color-brand;
  }
}
</style>
