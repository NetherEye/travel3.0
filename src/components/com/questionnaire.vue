<template>
  <div class="public">
    <div class="box">
      <div class="title">设计问卷调查</div>
      <div class="content">
        <div class="item">
          <div class="item_item1">
            <p style="float: left;" class="color ft16 mar">请输入问卷调查名称:</p>
            <p class="flex_p" style="float: left;margin-left: 10px">
              <el-input v-model="name" placeholder="请输入内容" style="width: 100%;"></el-input>
            </p>
          </div>
          <div class="item_item1" style="margin-left: 40px;">
            <p class="color ft16 mar" style="float: left;">选择问题类型:</p>
            <p class="flex_p" style="float: left;margin-left: 10px">
	            <el-select  v-model="leibie" style="width: 100%;" >
	              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
	              </el-option>
	            </el-select>
            </p>
            
          </div>
          <button class="addBigBtn" @click="add">
              <span>
              	添加</span>
          </button>
        </div>
        <div class="qu_item" v-for="(item,i) in quArray" :key="i">
        	<div class="item_item1">
            <p style="float: left;" class="color ft16 mar">设置问题:</p>
            <p class="flex_p" style="float: left;margin-left: 10px">
              <el-input v-model="input" placeholder="请输入内容" style="width: 100%;"></el-input>
            </p>
            <button class="addBigBtn" @click="addList(item)">
              
              	<span>添加选项</span>
          	</button>
          	<div class="del" @click="del(i)"><img src="../../../static/img/provincial/xx.png" alt=""></div>
          </div>
         
          <div style="display: flex;align-items: center;height: 60px;" v-for="(item1,i) in item.list" :key="i">
          	<p class="flex_p" style="display: flex;">
              <el-input v-model="item1.content" placeholder="请输入内容" style="width: 100%;"></el-input>
	          </p>
	          <div class="del" @click="delList(i, item)"><img src="../../../static/img/provincial/xx.png" alt=""></div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        input10 : '乡村旅游从业人员培训',
        name: '',
        type: '查看',
        lookTitle: "培训",
        leibie: '全部',
        quArray: [],
        options: [
          {value: '全部', label: '全部'},
          {value: '单个', label: '单个'}
        ],
        tableData :[
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }
        ],
      }
    },
    created(){
      // 获取页面类型 发布 查看
      if(this.$route.query.type != undefined){
        this.type = this.$route.query.type;
      }else{
        // gg
      }
    },
    methods: {
    	add(){
    		let obj = {
    			type: this.leibie,
    			name: this.name,
    			list: [],
    		}
    		this.quArray.push(obj)
    	},
    	addList(item){
    		let obj = {
    			content: '',
    		}
    		item.list.push(obj);
    	},
    	delList(i, item){
    		item.list.splice(i, 1)
    	},
    	del(i){
    		this.quArray.splice(i, 1)
    	},
    }
  }
</script>

<style scoped>
  .addBigBtn span:before {
    content: url(../../../static/img/provincial/++.png);
   	margin-right: 5px; 
   	margin-top: 4px;
  }

	.addBigBtn span{
		display: inline-block;
		display: flex;
    align-items: center;
    justify-content: center;
	}
	.del{
		width: 60px;
		height: 100%;
		text-align: center;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
	}
  .addBigBtn {
    display: block;
    width: 126px;
    height: 40px;
    background-color: #4a87c1;
    border-radius: 4px;
    margin-left: 40px;
    cursor: pointer;
  }
  .addBtn {
    margin-top: 80px;
    text-align: center;
  }
  .addBtn button {
    width: 130px;
    height: 44px;
    background-color: #45c3ad;
    border-radius: 4px;
  }
  button{
    font-size: 16px;
    outline: none;
    list-style: none;
    border: none;
    color: #eaefff;
  }
  .upload {
    display: inline-block;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0px 0px 8px 0px rgba(31, 32, 41, 0.18);
    margin-right: 50px;
    background: url(../../../static/img/provincial/zz.png) no-repeat center center;
    cursor: pointer;
  }
  .upload > input {
    display: inline-block;
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }
  .files {
    display: flex;
    display: inline-block;
    position: relative;
  }
  .files:after {
    content: "可添加图片/视频/文档";
    position: absolute;
    bottom: -22px;
    left: 6px;
    right: 0;
    font-size: 14px;
    color: rgba(164, 168, 179, 1);
  }
  .img {
    display: inline-block;
    width: 150px;
    height: 150px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    box-shadow: 0px 0px 8px 0px rgba(31, 32, 41, 0.18);
    margin-right: 50px;
  }
  .img .img_tilte {
    height: 30px;
    text-align: center;
    line-height: 30px;
    color: rgba(70, 103, 157, 1);
  }
  .img > img {
    display: block;
    height: 120px;
    width: 100%;
    border-radius: 4px;
  }
  .fuj {
    display: flex;
    
  }
  .item_item1 {
  	flex: 1;
  	display: flex;
  	align-items: center;
  }

  .public {
    height: auto;
    padding: 40px;
  }
  .box {
    min-height: 800px;
    background: rgba(255, 255, 255, 1);
    border-radius: 10px;
    box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
    position: relative;
  }
  .title {
    height: 65px;
    text-align: center;
    line-height: 65px;
    font-size: 22px;
    color: rgba(255, 255, 255, 1);
    background: rgba(70, 103, 157, 1);
    border-radius: 10px 10px 0px 0px;
    box-shadow: 0px 0px 100px 0px rgba(11, 30, 51, 0.05);
  }
  .content {
    height: auto;
    padding: 21px;
    padding-bottom: 40px;
  }
  .color{
    color:rgba(10,31,51,1);
  }
  .ft12{
    font-size: 12px;
  }
  .ft16{
    font-size: 18px;
  }
  .ft20{
    font-size: 20px;
  }
  .mar{
    margin-top: 13px;
    margin-bottom: 10px;
  }
  .item{
 
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    height: 100px;
  }
  .item_item{
    width: 400px;
    margin-right: 66px;
  }
  .item_item:last-child{
    margin-right: 0;
  }
  .item2{
    display: flex;
    margin: 29px 0;

  }
  .item2_item1{
    width: 112px;
    margin-right: 12px;
  }
  .item2_item2{
    flex: 1;
  }

	.flex_p{
		flex: 1;
	}
	.qu_item{
		margin-top: 50px;
	}
</style>
