<template>
  <div class="loading_box" v-show="show">
    <div class="loading_mask"></div>
    <div class="loading_toast">
      <spinner type="android"></spinner>
      <p class="loading_content">{{ text || '加载中' }}</p>
    </div>
  </div>
</template>
<script>
import Spinner from './spinner/index.vue'
export default {
	components: {
    Spinner
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: String,
  },
  created () {
    this.show = this.value
  },
  data () {
    return {
      show: false
    }
  },
  watch: {
    value (val) {
      this.show = val
    },
    show (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';
.loading_box .loading_mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	/*background: rgba(0,0,0,0.5);*/
}
.loading_box .loading_toast {
	position: fixed;
	top: 50%;
	left: 50%;
	width: rem(220);
	height: rem(220);
	transform: translateX(-50%) translateY(-50%);
	border-radius: 5px;
	background: rgba(0,0,0,0.8);
	text-align: center;
	padding-top: rem(50);
	box-sizing: border-box;
	font-size: 0.8rem;
}
.loading_box .loading_toast	.loading_content {
	color: #FFF;
	margin-top: rem(30);
  font-size: rem(30);
}
</style>
