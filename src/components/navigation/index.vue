<template>
  <footer v-if="navShow">
    <div class="footer_view">
      <router-link tag="div" to="/">
        <i></i>
        <span>首页</span>
      </router-link>
      <router-link tag="div" to="/mall">
        <i></i>
        <span>商城</span>
      </router-link>
      <router-link tag="div" to="/order">
        <i></i>
        <span>消息</span>
      </router-link>
      <router-link tag="div" to="/my">
        <i></i>
        <span>我的</span>
      </router-link>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    navShow() {
      var path = this.$route.path;
      return path === "/" || /mall|order|my/.test(path);
    }
  },
  mounted() {},
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/mixin";
$footerHeight: vw(100);
footer {
  height: $footerHeight;
  .footer_view {
    height: $footerHeight;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    box-shadow: 0 vw(5) vw(16) vw(0) rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    > div {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      i {
        width: vw(40);
        height: vw(40);
        background-color: rgb(248, 0, 0);
      }
      span {
        font-size: vw(26);
        color: #666;
        margin-top: vw(6);
      }
      &.active {
        i {
          color: $mainColor;
        }
        span {
          color: $mainColor;
        }
      }
    }
  }
}
</style>
