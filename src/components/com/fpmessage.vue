<template>
  <div class="public">
    <div class="box">
      <div class="title">旅游教育扶贫教育工程</div>
      <div class="content">
        <div class="content_header">
          <div class="table">
            <el-table
              ref="table"
              :data="tableData"
              tooltip-effect="dark"
              style="width: 99%;"
              header-cell-class-name="tableTou"
              cell-class-name="tableRow"
            >
              <el-table-column
                type="index"
                label="序号"
                align="center"
                width="100px"
                :index="indexMethod"
              >

              </el-table-column>
              <el-table-column
                label="参与培训人姓名"
                align="center"
                show-overflow-tooltip
              >
                <template slot-scope="scope">
                  <p>{{ scope.row.personName }}</p>
                </template>
              </el-table-column>
              <el-table-column
                prop="trainType"
                label="开展培训类别"
                align="center"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="trainContent"
                align="center"
                label="培训内容"
                show-overflow-tooltip>
              </el-table-column>

              <el-table-column
                v-if="thisjibie != '省级'"
                align="center"
                label="操作"
                show-overflow-tooltip>
                <template slot-scope="scope">
                  <div class="btns">
                    <button class="bj btnReset" @click="reWrite(scope.$index)">编辑</button>&nbsp;&nbsp;&nbsp;&nbsp;
                    <button class="sc btnReset" @click="reMove(scope.$index)">删除</button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="fenye">
              <div class="fenye_title">共 {{total}} 条数据 每页 {{thisjibie == '省级'?10:4}} 条数据 共 {{thisjibie == '省级'?Math.floor(total/10)+(total%10 !=0?1:0):Math.floor(total/4)+(total%4 !=0?1:0)}} 页</div>
              <el-pagination :current-page.sync="currentPage" :page-size="thisjibie == '省级'?10:4"  @current-change="handleCurrentChange" layout="prev, pager, next, jumper" :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
        <div v-if="thisjibie != '省级'">
          <p class="color ft18">添加参与培训人员</p>
          <div class="line" style="background: #728bb4;height: 4px;margin-top: 6px;"></div>
          <div class="item" style="margin-bottom: 34px;">
            <div class="item_item">
              <p class="color ft16 mar">姓名:</p>
              <p>
                <el-input v-model="input21" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">性别:</p>
              <p>
                <el-select v-model="input22"  style="width:100%">
                  <el-option label="男" value="男"></el-option>
                  <el-option label="女" value="女"></el-option>

                </el-select>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">从事行业:</p>
              <p>
                <el-input v-model="input23" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">身份证号码:</p>
              <p>
                <el-input v-model="input24">
                </el-input>
              </p>
            </div>
          </div>
          <div class="item" style="margin-bottom: 34px;">
            <div class="item_item">
              <p class="color ft16 mar">文化程度：</p>
              <p>
                <el-input v-model="input25" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">联系电话：</p>
              <p>
                <el-input v-model="input26" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">家庭地址：</p>
              <p>
                <el-input v-model="input27" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">培训内容：</p>
              <p>
                <el-input v-model="input28" >
                </el-input>
              </p>
            </div>
          </div>
          <div class="item" style="margin-bottom: 34px;">
            <div class="item_item">
              <p class="color ft16 mar">培训天数:</p>
              <p>
                <el-input v-model="input29" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">培训方式：</p>
              <p>
                <el-input v-model="input30" >
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">培训专业/工种:</p>
              <p>
                <el-input v-model="input31">
                </el-input>
              </p>
            </div>
            <div class="item_item">
              <p class="color ft16 mar">培训课时:</p>
              <p>
                <el-input v-model="input32" >
                </el-input>
              </p>
            </div>
          </div>
          <div class="addBtn">
            <button style="cursor: pointer" @click="addInfo" v-if="!isXg">添&nbsp;&nbsp;加</button>
            <button style="cursor: pointer;background-color: #4a87c1;" v-else @click="xgInfo">修&nbsp;&nbsp;改</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from "@/assets/tools/fetch"
  import allApi from "@/assets/api/peixun"
  export default{
    data(){
      return{
        reg : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/,
        phoneReg: /^(1[3456789][0-9]{9})$/,
        IDReg : /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
        dayReg : /^([1-9][0-9]*){1,3}$/,
        addID : '',
        reShowPhtone : '',
        pageSize: 4,
        pageSize1: 10,
        trainId : '',
        total: 0,
        currentPage: 1,
        input20:'',
        input21:'',
        input22:'',
        input23:'',
        input24:'',
        input25:'',
        input26:'',
        input27:'',
        input28:'',
        input29:'',
        input30:'',
        input31:'',
        input32:'',
        isXg : false,
        thisID : this.$route.query.id,
        thisPageSize : this.$route.query.pageSize,
        thisPageNumber : this.$route.query.pageNumber,
        thisjibie: this.$route.query.jibie,
        btnStatus1 : true,
        jibieStatus: true,
        btnStatus2 : false,
        type: '查看',
        lookTitle: "培训",
        options: [
          {value: '全部', label: '全部'},
          {value: '单个', label: '单个'}
        ],
        tableData : [],
      }
    },
    created(){
      this.getData()
      // 获取页面类型 发布 查看
      if(this.$route.query.type != undefined){
        this.type = this.$route.query.type;

      }else{
        // gg
      }
    },
    methods :{
      indexMethod(index) {
        if (this.thisjibie == '省级') {
          return index + 1 + (this.currentPage - 1) * this.pageSize1;
        } else{
          return index + 1 + (this.currentPage - 1) * this.pageSize;
        }
      },
      handleCurrentChange () {
        this.getData();
      },
      addInfo (){
        let a = {
          trainId : this.thisID,
          personName : this.input21,
          gender:this.input22,
          working:this.input23,
          idCard:this.input24,
          eduLevel:this.input25,
          phone:this.input26,
          homeAddress:this.input27,
          trainContent:this.input28,
          trainDays:this.input29,
          trainType:this.input30,
          profession:this.input31,
          lesson:this.input32,
        }
        for (let i in a) {
          if (!a[i]) {
            this.$message({
              duration: "2000",
              showClose: true,
              message: '请输入完整的信息',
              type: "warning"
            });
            return
          }
        }
        if (!this.reg.test(this.input21)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的姓名',
            type: "warning"
          });
          return
        }
        if (!this.IDReg.test(this.input24)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的身份证号码',
            type: "warning"
          });
          return
        }
        if (!this.phoneReg.test(this.input26)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的电话号码',
            type: "warning"
          });
          return
        }
        if (!this.dayReg.test(this.input29)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的培训天数，只能是0以上的数字',
            type: "warning"
          });
          return
        }
        if (!this.dayReg.test(this.input32)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的培训课时，只能是0以上的数字',
            type: "warning"
          });
          return
        }
        fetch.post(allApi.join,a,res=>{
          if (res.code == 200) {
            this.$message({
              duration: "2000",
              showClose: true,
              message: res.message,
              type: "success"
            });
            this.getData()
            this.input21 = ''
            this.input22 = ''
            this.input23 = ''
            this.input24 = ''
            this.input25 = ''
            this.input26 = ''
            this.input27 = ''
            this.input28 = ''
            this.input29 = ''
            this.input30 = ''
            this.input31 = ''
            this.input32 = ''
          }
        })
      },
      reMove (index) {
        let a ={
          id : this.tableData[index].trainJoinId
        }
        fetch.delete(allApi.join,a,res=>{
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: res.message
            });
            this.getData()
          }
        })
      },
      getData () {
        if (this.thisjibie != '省级'){
          let s = 4
          let a = {
            id : this.thisID,
            pageSize : s,
            pageNumber : this.currentPage
          }
          fetch.get(allApi.join,a,res=>{
            if (res.code == 200) {
              this.tableData = res.data
              this.total = res.total
            } else if (res.code == 201){
              this.tableData = ''
              this.total = 0
            }

          })
        } else {
          let s = 10
          let a = {
            id : this.thisID,
            pageSize : s,
            pageNumber : this.currentPage
          }
          fetch.get(allApi.join,a,res=>{
            if (res.code == 200) {
              this.tableData = res.data
              this.total = res.total
            } else {
              this.tableData = ''
              this.total = 0
            }

          })
        }

      },
      reWrite (index) {
        this.isXg = true
        this.addID = this.tableData[index].trainJoinId
        let a = {
          id : this.tableData[index].trainJoinId
        }
        fetch.get(allApi.reShow+this.tableData[index].trainJoinId,a,res=>{
          this.input21 = res.data.personName
          this.input22 = res.data.gender
          this.input23 = res.data.working
          this.input24 = res.data.idCard
          this.input25 = res.data.eduLevel
          this.input26 = res.data.phone
          this.input27 = res.data.homeAddress
          this.input28 = res.data.trainContent
          this.input29 = res.data.trainDays
          this.input30 = res.data.trainType
          this.input31 = res.data.profession
          this.input32 = res.data.lesson
          this.reShowPhtone = res.data.inputUser
          this.trainId = res.data.belongId
        })

      },
      xgInfo () {
        let b = {
          id :  this.addID,
          personName : this.input21,
          gender:this.input22,
          working:this.input23,
          idCard:this.input24,
          eduLevel:this.input25,
          phone:this.input26,
          homeAddress:this.input27,
          trainContent:this.input28,
          trainDays:this.input29,
          trainType:this.input30,
          profession:this.input31,
          lesson:this.input32,
          inputUser : this.reShowPhtone,
          belongId : this.trainId
        }
        for (let i in b) {
          if (!b[i]) {
            this.$message({
              duration: "2000",
              showClose: true,
              message: '请输入完整的信息',
              type: "warning"
            });
            return
          }
        }
        if (!this.reg.test(this.input21)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的姓名',
            type: "warning"
          });
          return
        }
        if (!this.IDReg.test(this.input24)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的身份证号码',
            type: "warning"
          });
          return
        }
        if (!this.phoneReg.test(this.input26)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的电话号码',
            type: "warning"
          });
          return
        }
        if (!this.dayReg.test(this.input29)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的培训天数，只能是0以上的数字',
            type: "warning"
          });
          return
        }
        if (!this.dayReg.test(this.input32)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的培训课时，只能是0以上的数字',
            type: "warning"
          });
          return
        }
        fetch.put(allApi.join,b,res=>{
          if (res.code == 200) {
            this.$message({
              type: 'success',
              message: res.message
            });
            this.getData()
            this.isXg = false
            this.input21 = ''
            this.input22 = ''
            this.input23 = ''
            this.input24 = ''
            this.input25 = ''
            this.input26 = ''
            this.input27 = ''
            this.input28 = ''
            this.input29 = ''
            this.input30 = ''
            this.input31 = ''
            this.input32 = ''
          } else {
            this.isXg = true
          }
        })

      }
    }
  }
</script>

<style scoped>
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
  .bj {
    width: 80px;
    height: 34px;
    background-color: #4a87c1;
    border-radius: 4px;
  }
  .sc {
    width: 80px;
    height: 34px;
    background-color: #ff4b1b;
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
