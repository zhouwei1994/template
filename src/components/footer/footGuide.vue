<template>
  <footer id="foot_guide">
    尾部
  </footer>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {

  },
  computed: {
    ...mapState([
      'geohash'
    ]),
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path)
    }
  },
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';
$footerHeight:100px;
#foot_guide {
  height: $footerHeight;
  text-align: center;
  background-color: #FF0000;
}
</style>
