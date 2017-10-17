<template>
  <header id='headBox'>
    头部
  </header>
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {

    }
  },
  mounted() {
    //获取用户信息
  },
  props: [],
  computed: {

  },
  methods: {

  },
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
$headHeight:100px;
#headBox {
  height: $headHeight;
  text-align: center;
  background-color: #2080D0;
}
</style>
