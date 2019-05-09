<template>
  <input type="file" @change="uploadFile($event)" :multiple="length > 1">
</template>
<script>
import qiniuUpload from "./qiniu.js";
export default {
  data() {
    return {
      fileUrl: []
    };
  },
  props: {
    //当前值
    value: {
      default: ""
    },
    //上传数量
    length: {
      default: 1
    },
    //是否获取图片高宽
    wh: {
      type: Boolean,
      default: false
    }
  },
  created() {
    if (this.value) {
      this.fileUrl = this.value;
    }
  },
  watch: {
    value(val) {
      if (val) {
        this.fileUrl = val;
      }
    }
  },
  methods: {
    uploadFile(event) {
      const _this = this;
      //文件数据体
      var files = event.target.files;
      qiniuUpload(files, this.wh, this.length).then(res => {
        if (_this.length > 1) {
          _this.fileUrl = _this.fileUrl.concat(res);
        } else {
          _this.fileUrl = res[0];
        }
        _this.$emit("input", _this.fileUrl);
        console.log(_this.fileUrl);
      });
    }
  },
  mounted() {
    const _this = this;
  }
};
</script>
