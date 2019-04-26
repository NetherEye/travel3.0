<template>
  <div class="public"  @click.stop='isFilter=false'>
    <div class="main">
      <div class="main_content">

        <div class="filter lhrXg">
          <!--<div class="isFilter" @click="handleFilter"><img :class="isFilter ? 'rotate' : ''" src="../../../static/img/provincial/select_icon.png" /><span>{{isFilter ? '收起筛选' : '展开筛选'}}</span></div>-->
          <!--<transition name="el-zoom-in-top">-->
            <!--<div class="filterBox" v-show="isFilter" style="padding: 36px 50px 46px 50px;">-->
              <el-form :inline="true" :model="filter" class="demo-form-inline">
                <el-form-item label="所属区县" >
                  <el-select v-model="filter.region" clearable placeholder="全部" style="width: 161px;">
                    <el-option v-for="item in city" :key="item.id"  :label="item.orgName" :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="账号状态">
                  <el-select v-model="filter.status" clearable placeholder="全部" style="width: 161px;">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="冻结" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机号码">
                  <el-input v-model="filter.phone" placeholder="请输入号码"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                  <el-input v-model="filter.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="工作单位">
                  <el-input v-model="filter.work" placeholder="请输入工作单位"></el-input>
                </el-form-item>
              </el-form>
              <div class="filter_btn">
                <div class="btn btn1" @click.stop="find">查询</div>
                <div class="btn btn2" @click="username">创建账号</div>
              </div>
            </div>
          <!--</transition>-->
        <!--</div>-->
        <div class="table">
          <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
            <el-table-column type="index"  :index="indexMethod" label="序号" align="center" width="100px">
            </el-table-column>
            <el-table-column label="账号" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.username }}</template>
            </el-table-column>
            <el-table-column prop="belongDistrict" label="所属区县" align="center" show-overflow-tooltip>
            </el-table-column>
            <el-table-column prop="workCompany" align="center" label="工作单位" show-overflow-tooltip>
            </el-table-column>
            <el-table-column align="center" label="姓名" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.nickName}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="手机号码" show-overflow-tooltip>
              <template slot-scope="scope">
                <div>{{scope.row.phone}}</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号状态" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="btns">
                  <div v-if="scope.row.status == 1">正常</div>
                  <div v-else>已冻结</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="账号操作日志" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="btns">
                  <div class="textBtnLook" @click="clickFind(scope.$index)">点击查看</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作" show-overflow-tooltip>
              <template slot-scope="scope">
                <div class="btns">
                  <div class="textBtnLook" @click="xgUser(scope.$index)">修改</div>
                  <div class="textBtnLook m">|</div>
                  <div class="textBtnLook" @click="clickUser(scope.$index)" v-if="scope.row.status == 1">冻结账号</div>
                  <div class="textBtnLook" @click="clickUser1(scope.$index)" v-else>解冻账号</div>
                  <div class="textBtnLook m">|</div>
                  <div class="textBtnLook" @click="resetPwd(scope.$index)">重置密码</div>
                </div>
              </template>
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
    <div class="footer">
      <my-footer></my-footer>
    </div>
  </div>
</template>

<script>
  import footer from '@/components/com/footer'
  import fetch from "@/assets/tools/fetch"
  import allApi from "@/assets/api/zhanghao"
  export default {
    data() {
      return {
        reg : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{0,8}$/,
        regPhone: /^(1[3456789][0-9]{9})$/,
        options:'',
        isStutas: true,
        isFilter: false, // 是否展开筛选
        filter: {
          region :'',
          status :'',
          phone : '',
          work:'',
          name :""
        },
        value1: '',
        pageSize: 10,
        total: 0,
        currentPage: 1,
        city : '',
        tableData : [],
        multipleSelection: [],
      }
    },
    components: {
      'my-footer': footer
    },
    created(){
      this.getData()
      this.orgCity()
    },
    methods: {
      find() {
        this.currentPage = 1;
        this.getData();
        this.isFilter = false;
      },
      xgUser (index) {
        const {
          href
        } = this.$router.resolve({
          name: '修改账号',
          query: {
            username: this.tableData[index].username,
          }
        })
        window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
      },
      indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
      findData () {
        if (this.filter.name && this.filter.phone) {
          if (!this.reg.test(this.filter.name)) {
            this.$message({
              type: 'error',
              message: '请输入正确的姓名格式'
            });
          }
          else if (!this.regPhone.test(this.filter.phone)){
            this.$message({
              type: 'error',
              message: '请输入正确的手机号'
            });
          }
          else {
            let a = {
              orgId : this.filter.region,
              status : this.filter.status,
              phone : this.filter.phone,
              nickName :this.filter.name,
              workCompany : this.filter.work,
              pageNumber : this.pageNumber,
              pageSize :this.pageSize
            }
            fetch.get(allApi.account,a,res=>{
              if (res.code == 200) {
                this.$message({
                  type: 'success',
                  message: res.message
                });
                this.tableData = res.data
                this.filter.orgId = ''
                this.filter.status = ''
                this.filter.phone = ''
                this.filter.nickName = ''
                this.filter.workCompany = ''
              }else if (res.code == 201) {
                this.filter.orgId = ''
                this.filter.status = ''
                this.filter.phone = ''
                this.filter.nickName = ''
                this.filter.workCompany = ''
                this.tableData = ''
              }
            })
          }
        }
        else {
          let a = {
            orgId : this.filter.region,
            status : this.filter.status,
            phone : this.filter.phone,
            nickName :this.filter.name,
            workCompany : this.filter.work,
            pageNumber : this.pageNumber,
            pageSize :this.pageSize
          }
          fetch.get(allApi.account,a,res=>{
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: res.message
              });
              this.tableData = res.data
              this.filter.orgId = ''
              this.filter.status = ''
              this.filter.phone = ''
              this.filter.nickName = ''
              this.filter.workCompany = ''
            }else if (res.code == 201) {
              this.filter.orgId = ''
              this.filter.status = ''
              this.filter.phone = ''
              this.filter.nickName = ''
              this.filter.workCompany = ''
              this.tableData = ''
            }
          })
        }
      },
      orgCity () {
        fetch.get(allApi.org,'',res=>{
          this.city = res.data
        })
      },
      resetPwd(index) {
        this.$confirm('此操作将重置密码, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            username : this.tableData[index].username
          }
          fetch.put(allApi.reset,a,res=>{
          })
          this.$message({
            duration: "4000",
            type: 'success',
            message: '重置成功!密码为fp123456'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      },
      clickUser(index) {
        this.$confirm('此操作将冻结账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            username : this.tableData[index].username
          }
          fetch.put(allApi.freezeAccount,a,res=>{
            if (res.code == 200) {
              this.$message({
                duration: "2000",
                showClose: true,
                message: "冻结成功",
                type: "success"
              });
              this.tableData[index].status = !this.tableData[index].status
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消冻结'
          });
        });
      },
      clickUser1 (index) {
        this.$confirm('此操作将解冻账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let a = {
            username : this.tableData[index].username
          }
          fetch.put(allApi.unfreezeAccount,a,res=>{
            if (res.code == 200) {
              this.$message({
                type: 'success',
                message: '解冻成功!'
              });
            }
          })
          this.tableData[index].status = !this.tableData[index].status
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消解冻'
          });
        });
      },
      handleCurrentChange () {
        this.getData();
      },
      getData (){
        let a = {
          orgId : this.filter.region,
          status : this.filter.status,
          phone : this.filter.phone,
          nickName :this.filter.name,
          workCompany : this.filter.work,
          pageNumber : this.currentPage,
          pageSize :this.pageSize
        }
        fetch.get(allApi.account,a,res=>{
          if (res.code == 200) {
            this.tableData = res.data
            this.total = res.total
          } else {
            this.tableData = []
            this.total = 0
          }

        },{target: '.el-table__body-wrapper'})
      },
      username () {
        const {
          href
        } = this.$router.resolve({
          name: '创建账号',
          query: {
            a: '区县',
            b: 2
          }
        })
        window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
      },
      clickFind (index) {
        const {
          href
        } = this.$router.resolve({
          name: '账号操作日志',
          query: {
            username: this.tableData[index].username,
            pageNumber: 1,
            pageSize : 10,
          }
        })
        window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
      },
      isList() {
        const {
          href
        } = this.$router.resolve({
          name: '调查问卷列表',
          query: {
            a: 1,
            b: 2
          }
        })
        window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
      },
      isXq() {

      },
      handleFilter() {
        this.isFilter = !this.isFilter;
      },
      toggleSelection(rows) {
        if(rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      isFind() {

      },
    }
  }
</script>

<style scoped>
  .public {
    height: 100%;
    position: relative;
  }

  .main {
    position: absolute;
    top: 0;
    bottom: 60px;
    left: 0;
    right: 0;
    background: #eff2f7;
    padding: 20px 40px 0px 20px;
  }

  .main_content {
    height: 100%;
    background: rgba(255, 255, 255, 1);
    display: flex;
    flex-direction: column;
    border-radius: 3px;
    box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
    overflow: auto;
  }

  .footer {
    height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .filter {
    height: 74px;
    display: flex;
    justify-content: start;
    padding-left: 20px;
    align-items: center;
    position: relative;
  }

  .isFilter {
    width: 190px;
    height: 50px;
    background: rgba(244, 244, 244, 1);
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 18px;
    font-weight: 400;
    color: rgba(61, 97, 150, 1);
  }

  .rotate {
    transform: rotate(180deg);
  }

  .isFilter>img {
    margin-right: 10px;
    transition: all .3s;
  }

  .filterBox {
    position: absolute;
    border-top: 1px solid rgba(238, 238, 238, 1);
    padding: 36px 50px 46px 50px;
    height: auto;
    z-index: 999;
    background-color: #fff;
    top: 74px;
    left: 0;
    right: 0;
    opacity: 0.99;
    box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.14);
  }

  .filter_btn {
    display: flex;
    justify-content: flex-end;
    padding-left: 52px;

  }

  .filter_btn>div {
    margin-left: 30px;
  }

  .table {
    flex: 1;
  }
</style>
