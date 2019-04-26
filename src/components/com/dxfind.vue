<template>
  <div class="public">
    <div class="box">
      <div class="title">培训活动详情</div>
      <div class="content">
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft18 mar">归属市州:</p>
            <p>
              <el-select v-model="leibie" style="width: 100%" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft18 mar">归属区县:</p>
            <p>
              <el-select v-model="leibie" style="width: 100%" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft18 mar">归属乡镇:</p>
            <p>
              <el-select v-model="leibie" style="width: 100%" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft18 mar">归属村:</p>
            <p>
              <el-select v-model="leibie" style="width: 100%" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft18 mar">身份证号：</p>
            <p>
              <el-input v-model="input10" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft18 mar">手机号码：</p>
            <p>
              <el-input v-model="input10" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft18 mar">发送状态：</p>
            <p>
              <el-input v-model="input10" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <div class="btn btn1">查询</div>
          </div>
        </div>
        <div class="table">
          <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" align="center" width="100px">
            </el-table-column>
            <el-table-column label="姓名" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="身份证号" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="address" align="center" label="手机号码" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="市州" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="textState1">未审批</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="区县" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="textState2">通过</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="乡镇" show-overflow-tooltip>

            </el-table-column>
            <el-table-column align="center" label="村" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="textState" @click="dxfind" style="cursor: pointer">查看</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="发送状态" show-overflow-tooltip>
            </el-table-column>
          </el-table>
        </div>
        <div class="fenye">
          <div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据 共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
          <el-pagination :current-page.sync="currentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return{
        total :'300',
        pageSize : '10',
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
  .item_item .btn1 {
    margin-top: 40px;
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

  .img > img {
    display: block;
    height: 120px;
    width: 100%;
    border-radius: 4px;
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
  .ft18{
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


</style>
