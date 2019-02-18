<template>
  <div>
    <z-header>首页</z-header>
    <!-- 轮播图 -->
    <swiper class="mod-banner-scroll" :options="swiperOption">
      <swiper-slide v-for="(item,index) of colorList" :key="index">
        <div :style="`backgroundColor:${item}`">{{item}}{{index}}</div>
      </swiper-slide>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <img src="https://mmbiz.qpic.cn/mmbiz_jpg/zEqq1Ww9bticF0akmjlprTv6QQ7qnKuib8N6oROZVtBgkLb7q2s9rpmia7ptUnv1G8p1zK6wYqFIIj04dbictiaFNfQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1" alt="">
  </div>
</template>
<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
export default {
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
  methods: {},
  mounted() {
    
  }
};
</script>
<style lang="scss" scoped>
@import "src/style/mixin";
@import "../../../node_modules/swiper/dist/css/swiper.min.css";
.swiper-container {
  width: 100%;
  height: rem(300);
  .swiper-slide div {
    height: rem(300);
  }
}
</style>
