<template>
    <div class="wrap">
      <div class="content">
        <div class="header">
          <div class="header_top">
            <div class="ht_left">
              账号操作日志
            </div>
            <div class="ht_right">
              <div class="block">
                <span class="demonstration">日期：</span>
                <el-date-picker
                  v-model="value1"
                  type="date"
                  :editable="false"
                  value-format="yyyy-MM-dd"
                  placeholder="选择日期">
                </el-date-picker>
              </div>
              <button class="find" @click="find">查询</button>
            </div>
          </div>
        </div>
        <div class="table istable">
          <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" header-cell-class-name="tableTou" cell-class-name="tableRow">
            <el-table-column type="index" label="序号" :index="indexMethod" align="center" width="100px">
            </el-table-column>
            <el-table-column label="日期" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.operateTime.split(' ')[0] }}</template>
            </el-table-column>
            <el-table-column  label="时间" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.operateTime.split(' ')[1] }}</template>
            </el-table-column>
            <el-table-column prop="description" align="center" label="操作类容" show-overflow-tooltip>
            </el-table-column>

          </el-table>
        </div>
        <div class="fenye">
          <div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据 共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
          <el-pagination :current-page.sync="currentPage" :page-size="pageSize"  @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>

    </div>
</template>

<script>
  import fetch from "@/assets/tools/fetch"
  import allApi from "@/assets/api/zhanghao"
    export default {
        name: "userDadly",
      data () {
          return  {
            currentPage : 1,
            username1:this.$route.query.username,
            pageNumber1 : this.$route.query.pageNumber,
            pageSize1 : this.$route.query.pageSize,
            value1 : '',
            total : 0,
            pageSize : 10,
            tableData: [
            ],
          }
      },
      created (){
        this.getData()
      },
      methods : {
        indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
        handleCurrentChange(){
          this.getData()
        },
        find() {
          this.currentPage = 1;
          this.getData()
        },
      getData(){
        let a = {
          date : this.value1,
          username : this.username1,
          pageNumber : this.currentPage,
          pageSize : 10
        }
        fetch.get(allApi.log,a,res=>{
          if (res.code == 200) {
            this.tableData = res.data
            this.total = res.total
          } else if(res.code == 201){
            this.total = 0
            this.tableData = res.data
          }
        })
      }
      }
    }
</script>

<style scoped>
  .block {
    float: left;
    position: relative;
    top: -5px;
  }

  .find {
    cursor: pointer;
    outline: none;
    border: none;
    width: 100px;
    height: 34px;
    background-color: #4a87c1;
    border-radius: 4px;
    color: #fff;
    float: left;
    margin-left: 30px;
  }

  .ht_right {
    float: right;
  }

  .ht_left {
    float: left;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: #0a1f33;
    padding-bottom: 15px;
  }

  .header_top {
    border-bottom: 4px solid rgb(114,139,180);
    padding-top: 40px;
    overflow: hidden;
  }

  .header {
    width: 98%;
    margin: 0 auto;
  }

  .content {
    border-radius: 5px;
    width: 96%;
    margin: 0 auto;
    height: 95%;
    position: relative;
    top: 20px;
    background-color: #fff;
  }

  .wrap {
    height: 100%;
    width: 100%;
    background-color: rgb(237,239,244);
  }
</style>
