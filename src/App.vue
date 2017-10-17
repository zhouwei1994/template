<template>
  <div id="app">
    <head-top></head-top>
    <!--页面容器-->
    <transition :name="'pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view class="router-view"></router-view>
    </transition>
    <foot-guide></foot-guide>
    <loading :value="pageLoading || dataLoading"></loading>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import headTop from '@/components/header/head'
import footGuide from '@/components/footer/footGuide'
import loading from '@/components/common/loading'
export default {
  components:{
    headTop,
    footGuide,
    loading
  },
  data () {
    return {

    }
  },
  computed:{
    ...mapState([
      'pageLoading',
      'dataLoading',
      'path',
      'direction'
    ])
  },
  created(){
    this.setCacheData();
  },
  methods:{
    ...mapMutations([
      'setCacheData'
    ])
  },
  mounted(){

  }
}
</script>
<style lang="scss">
@import 'src/style/common';
/**
* vue-router transition
*/

.router-view {
  width: 100%;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  backface-visibility: hidden;
}

.pop-out-enter-active,
.pop-out-leave-active,
.pop-in-enter-active,
.pop-in-leave-active {
  will-change: transform;
  height: 100%;
  position: fixed;
  left: 0;
}

.pop-out-enter-active {
  animation-name: popInLeft;
}

.pop-out-leave-active {
  animation-name: popOutRight;
}

.pop-in-enter-active {
  perspective: 1000;
  animation-name: popInRight;
}

.pop-in-leave-active {
  animation-name: popOutLeft;
}

@keyframes popInLeft {
  from {
    transform: translate3d(-100%, 0, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}

@keyframes popOutLeft {
  from {
    opacity: 1;
  }
  to {
    transform: translate3d(-100%, 0, 0);
  }
}

@keyframes popInRight {
  from {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@keyframes popOutRight {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
}
</style>

