<template>
  <div class="public">
    <div class="box">
      <div class="title">调查问卷列表</div>
      <div class="content">
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item1">
            <p class="color ft16 mar"></p>
            <div style="display: flex;align-items: center">
              <div style="flex: 1;display: flex;align-items: center">
                <div style="width: 100px">问卷名称</div><el-input v-model="input" placeholder="请输入内容"  disabled></el-input>
              </div>
              <div style="width: 100px;margin-left: 10px"><div class="btn btn1" >查询</div></div>
            </div>
          </div>
        </div>
        <div class="table">
          <el-table
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 99%;"
            height="100%"
            header-cell-class-name="tableTou"
            cell-class-name="tableRow"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="100px"
            >
            </el-table-column>
            <el-table-column
              label="调查问卷名称"
              align="center"
              show-overflow-tooltip
            >
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
              prop="name"
              label="创建日期"
              align="center"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              prop="address"
              align="center"
              label="发送次数"
              show-overflow-tooltip>
            </el-table-column>

          </el-table>
          <div class="fenye">
            <div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据  共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
            <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
            </el-pagination>
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
        input : '',
        input10 : '乡村旅游从业人员培训',
        type: '查看',
        lookTitle: "培训",
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
        total : 10,
        pageSize : 10,
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
  }
</script>

<style scoped>
  .btn11 {
    margin-top: 4px;
    float: right;
    width: 72px;
    height: 34px;
    background-color: #4a87c1;
    border-radius: 4px;
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
    width: 100%;
  }

  .public {
    height: auto;
    padding: 40px;
  }
  .box {
    height: auto;
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

</style>
