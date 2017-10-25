<template>
  <popup v-model="currentValue">
  	<div class="addresTitle">
  		<span></span>
  		<p>所在地区</p>
  		<span @click="currentValue = false">×</span>
  	</div>
  	<div class="addresSelectVal">
  		<ul>
  			<li v-for="(item,index) of addressVal" :class="{'select':addressIndex == index}" @click="selectType(index)">{{item}}</li>
  			<li :class="{'select':selectState == addressIndex}" v-show="selectState < 3" @click="selectType(selectState)">请选择</li>
  		</ul>
  	</div>
  	<div class="addresBox" ref="scroll">
  		<ul>
  			<li v-for="(item,index) of addressSelect" :class="{'select':item.name == addressVal[addressIndex]}" @click="selectClick(item.value,item.name)">{{item.name}}</li>
  		</ul>
  	</div>
  </popup>
</template>
<script>
import Popup from './popup.vue'
import { async } from '@/config/fetch';
export default {
	components: {
    Popup
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
	  value: {
      type: Boolean,
      default: false
    },
  },
  created () {
    if (typeof this.value !== 'undefined') {
      this.currentValue = this.value
    }
    if (this.data instanceof Array) {
      this.addressVal = this.value;
    }
  },
  watch: {
    value (val) {
      this.currentValue = val;
      if(val){
      	if(this.addressVal.length == 3){
	      	this.addressIndex = this.addressVal.length - 1;
	      	this.selectState = 3;
	      }else{
	      	this.addressIndex = 0;
	      	this.selectState = 0;
	      }
      	this.selectType(this.addressIndex);
      }
    },
    currentValue (val) {
      this.$emit(val ? 'on-show' : 'on-hide')
      this.$emit('input', val)
    },
    data(val){
    	this.addressVal = val;
    }
  },
  data () {
    return {
      currentValue: false,
      //选出的值
      addressVal:[],
      //当前选择
      addressIndex:0,
      //所有地址
      addressData:{},
      //选择的值
      addressSelect:[],
      //请选择的显示
      selectState:0
    }
  },
  methods: {
		//获取表情数据
		getAddress(){
			const _this = this;
    	const addressVal = localStorage.getItem('address');
    	if(addressVal){
    		_this.addressData = JSON.parse(addressVal);
    	}else{
				async('china_address.json',{},'GET','','/static/other/').then((data) => {
					_this.addressData = data;
					localStorage.setItem('address',JSON.stringify(data));
				},(err) => {
					console.log(err);
				})
    	}
		},
		//查找对应值所对应的value
		lookupVal(val){
			for(var item of this.addressData){
				if(item.name == val){
					this.corresponding(item.value);
				}
			}
		},
		//获取对应的地址列表
		corresponding(value){
			var arr = new Array();
			for(var item of this.addressData){
				if(item.parent == value){
					arr.push(item);
				}
			}
			this.addressSelect = arr;
			this.$refs.scroll.scrollTop  = '0px';
		},
		//切换对应的类型
		selectType(index){
			this.addressIndex = index;
			var len = this.addressVal.length;
			if(index == 0){
				this.corresponding();
			}else{
				this.lookupVal(this.addressVal[index-1]);
			}
			if(len == 3){
      	this.selectState = 3;
      }else if(len == 2 && index == 2){
      	this.selectState = index;
      }else{
      	this.selectState = index + 1;
      }
		},
		//选择
		selectClick(value,name){
			if(this.addressIndex == 0){
				this.addressVal = [];
			}else{
				this.addressVal.splice(this.addressIndex,this.addressVal.length -1);
			}
			this.addressVal.push(name);
			if(this.addressVal.length == 3){
				this.currentValue = false;
				this.$emit('change',this.addressVal);
			}else{
				this.corresponding(value);
				this.addressIndex++;
			}
			this.selectState = this.addressVal.length;
		}
  },
  mounted(){
  	this.getAddress();
	}
}
</script>
<style lang="scss" scoped>
@import 'src/style/mixin';
.addresTitle {
	display: flex;
	justify-content: space-between;
	height: rem(88);
	line-height: rem(88);
	border-bottom: 1px solid #ebebeb;
}
.addresTitle p {
	font-size: rem(32);
}
.addresTitle 	span {
	width: rem(80);
	flex-shrink: 0;
	text-align: center;
}
.addresTitle 	span:last-child {
	font-size: rem(52);
	color: #999;
}
.addresSelectVal {
	padding: 0px rem(10);
	border-bottom: 1px solid #EBEBEB;
	box-sizing: border-box;
}
.addresSelectVal ul {
	display: flex;
	flex-wrap: wrap;
}
.addresSelectVal ul li {
	margin-left: rem(20);
	padding: 0px rem(10);
	height: rem(72);
	line-height:rem(72);
	border-bottom: 2px solid #FFF;
	box-sizing: border-box;
	font-size: rem(28);
}
.addresSelectVal ul li:first-child {
	margin-left: 0px;
}
.addresSelectVal ul li.select {
	border-bottom: 2px solid #F00;
	color: #F00;
}
.addresBox {
	padding: 0px rem(20);
	height: rem(500);
	overflow-y: auto;
}
.addresBox ul li {
	height: rem(72);
	line-height: rem(72);
	font-size: rem(28);
}
.addresBox ul li.select {
	color: #F00;
}
</style>