<template>
  <div>
    <z-header back>首页</z-header>
    <!-- 轮播图 -->
    <swiper class="mod-banner-scroll" :options="swiperOption">
      <swiper-slide v-for="(item,index) of colorList" :key="index">
        <div :style="`backgroundColor:${item}`">{{item}}{{index}}</div>
      </swiper-slide>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <input type="text">
    <router-link to="/list">跳转子页面</router-link>
    <button @click="onPrompt">弹出</button>
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
  name: "index",
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      colorList: ["red", "yellow", "gray", "pink"],
      swiperOption: {
        autoplay: 3200,
        setWrapperSize: true,
        observeParents: true,
        loop: true,
        speed: 1000,
        //设置分页
        pagination: ".swiper-pagination",
        //设置分页点击
        paginationClickable: true,
        autoplayDisableOnInteraction: false
      }
    };
  },
  watch: {},
  methods: {
    onPrompt() {
      this.prompt("你好");
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
.swiper-container {
  width: 100%;
  height: vw(300);
  .swiper-slide div {
    height: vw(300);
  }
}
</style>
