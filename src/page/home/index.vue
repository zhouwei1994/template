<template>
  <div>
    <!-- 轮播图 -->
    <swiper class="mod-banner-scroll" :options="swiperOption">
      <swiper-slide v-for="(item,index) of colorList" :key="index">
        <div :style="`backgroundColor:${item}`">
          {{item}}{{index}}
        </div>
      </swiper-slide>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination" slot="pagination"></div>
      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      colorList: ['red', 'yellow', 'gray', 'pink'],
      swiperOption: {
        autoplay: 3200,
        setWrapperSize: true,
        observeParents: true,
        loop: true,
        speed: 1000,
        //设置分页
        pagination: '.swiper-pagination',
        //设置分页点击
        paginationClickable: true,
        //设置上一页，下一页
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
      }
    }
  },
  methods: {

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
@import '../../../node_modules/swiper/dist/css/swiper.min.css';
.swiper-container {
  width: 600;
  height: 300px;
  .swiper-slide div {
    height: 300px;
  }
}
</style>
