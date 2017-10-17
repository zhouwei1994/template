<template>
  <div class="clipView" v-if="viewState">
    <div class="head">
      <div class="goBack icon" @click="close">&#xe603;</div>
      上传图像
      <div class="right" @click="saves">上传</div>
    </div>
    <div class="clipBox" ref="clipBox">
      <div class="narrow">
        <span @click="enlarge"></span>
        <span @click="narrow"></span>
      </div>
    </div>
  </div>
</template>
<script>
import zHeader from './../header/head'
import clip from './clip'
export default {
  components: {
    zHeader,
  },
  props: {
    value: {
      default: ''
    },
  },
  watch: {
    value(val) {
      this.init(val);
    },
    viewState(val) {
      const _this = this;
      if (val) {
        setTimeout(() => {
          document.body.style.overflow = 'hidden';
          _this.$refs.clipBox.addEventListener('touchmove', function(evt) {
            evt.preventDefault();
          }, false);
        },10);
      } else {
        document.body.style.overflow = 'auto';
      }
    }
  },
  data() {
    return {
      viewState: false,
      //想要图片的比例
      proportion: 50 / 50,
      //挂载clip
      clip: {},
    }
  },
  methods: {
    enlarge() {
      this.clip.enlarge();
    },
    narrow() {
      this.clip.narrow();
    },
    saves() {
      const _this = this;
      this.clip.saves(function(data) {
        _this.viewState = false;
        _this.$emit('file', _this.dataURItoBlob(data));
      });
    },
    //转换为二进制数据图片
    dataURItoBlob(base64Data) {
      var byteString;
      if (base64Data.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(base64Data.split(',')[1]);
      } else {
        byteString = unescape(base64Data.split(',')[1]);
      }
      var mimeString = base64Data.split(',')[0].split(':')[1].split(';')[0];
      var ia = new Uint8Array(byteString.length);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ia], { type: mimeString });
    },
    //初始化打开
    init(data) {
      const _this = this;
      if (data) {
        _this.viewState = true;
        setTimeout(() => {
          _this.clip = new clip(_this, _this.$refs.clipBox);
          _this.clip.init(data);
        })
      } else {
        _this.viewState = false;
      }
    },
    // 关闭
    close() {
      this.viewState = false;
      this.$emit('close');
    }
  },
  mounted() {
    const _this = this;
    this.init(this.value);

  }
}
</script>
<style lang="scss">
@import 'src/style/mixin';
.clipView {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  z-index: 100;
}

.clipBox {
  position: absolute;
  top: rem(88);
  left: 0px;
  width: 100%;
  bottom: 0px;
  background: #000;
  overflow: hidden;
}

#image-box {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #000;
}

#cover-box {
  position: absolute;
  top: 50%;
  left: 50%;
  cursor: move;
  outline: rgba(0, 0, 0, 0.5) solid 10000px;
  border: 1px solid #FFF;
  transform: translateX(-50%) translateY(-50%);
}

.narrow {
  position: absolute;
  top: rem(20);
  right: rem(40);
  z-index: 10;
}

.narrow span {
  display: inline-block;
  width: rem(36);
  height: rem(36);
  background-position: center center;
  background-repeat: no-repeat;
  background-size: auto 100%;
  margin-left: rem(20);
}

.narrow span:first-child {
  background-image: url(../../images/fd@2x.png);
}

.narrow span:last-child {
  background-image: url(../../images/jx@2x.png);
}

.head {
  font-size: rem(36);
  text-align: center;
  background-color: #FFF;
  color: #333333;
  width: 100%;
  height: rem(88);
  line-height: rem(88);
  position: relative;
  .goBack {
    position: absolute;
    left: 0;
    width: rem(88);
    font-size: rem(44);
    color: #323136;
  }
  .right {
    position: absolute;
    top: 0;
    right: 0;
    padding: 0 rem(30);
    font-size: rem(30);
    color: #323136;
    height: rem(88);
    line-height: rem(88);
  }
}
</style>
