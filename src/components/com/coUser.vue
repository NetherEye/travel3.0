<template>
  <div class="public">
    <div class="box">
      <div class="title">创建账号</div>
      <div class="content">
        <p class="color ft20">账号管理-创建账号</p>
        <div class="line" style="background: #728bb4;height: 4px;margin-top: 6px;"></div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item1">
            <p class="color ft16 mar">账号类型:</p>
            <p>
              <el-select @change="selVa(userType)" v-model="userType" placeholder="账户类型" style="width: 100%">
                <el-option label="乡镇" value="1"></el-option>
                <el-option label="景区" value="2"></el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item1">
            <div v-if="userType == 1">
              <p class="color ft16 mar">管辖乡镇:</p>
              <div>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                  <el-checkbox v-for="city in cities" :label="city.id" :key="city">{{city.orgName}}</el-checkbox>
                </el-checkbox-group>
              </div>
            </div>
            <div v-else>
              <p class="color ft16 mar">管辖景区:</p>
              <p>
                <el-select v-model="userTyp111e" placeholder="管辖景区" style="width: 100%">
                  <el-option
                    v-for="item in fjqu"
                    :key="item.id"
                    :label="item.orgName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </p>
            </div>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">工作单位:</p>
            <p>
              <el-input v-model="input41" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">姓名:</p>
            <p>
              <el-input v-model="input42" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">手机号:</p>
            <p>
              <el-input v-model="input43" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">所在岗位:</p>
            <p>
              <el-input v-model="input4" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">职务:</p>
            <p>
              <el-input v-model="input5" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">QQ号:</p>
            <p>
              <el-input v-model="input6" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">邮箱:</p>
            <p>
              <el-input v-model="input7" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="setUpBtn">
            <button @click="setUp">
              创建
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from "../../assets/tools/fetch";
  import allApi from "@/assets/api/zhanghao"
  const cityOptions = ['上海', '北京', '广州', '深圳'];
  export default{
    data(){
      return{
        input4 :'',
        input5 :'',
        input6 :'',
        input7 :'',
        qqReg: /^[1-9][0-9]{4,11}$/,
        emailReg : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        reg : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/,
        phoneReg: /^(1[3456789][0-9]{9})$/,
        changetownId:'',
        singleChange: '',
        input41:'',
        input42:'',
        input43:'',
        userTyp111e : '',
        fjqu: '',
        townStatus: '',
        input :'',
        userType : '',
        checkAll: false,
        checkedCities: [],
        cities: [],
        isIndeterminate: true,
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
    methods :{
      setUp () {
        let a = {
          nickName : this.input42,
          workCompany : this.input41,
          phone : this.input43,
          userType : this.userType,
          manageTown : this.changetownId,
          manageScenic : this.userTyp111e,
          position : this.input4,
          duty : this.input5,
          qqNumber : this.input6,
          email : this.input7,
        }
        for (let i in a-1) {
          if (!a[i]) {
            this.$message({
              type: 'warning',
              message: '请输入完整信息'
            })
            return
          }
        }

        if (!(this.qqReg.test(this.input6))) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的QQ号码',
            type: "warning"
          });
        }
        else if (!(this.emailReg.test(this.input7))) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的邮箱',
            type: "warning"
          });
        }
        else {
          fetch.post(allApi.account,a,res=>{
            if (res.code == 200) {
              this.$loading({
                text: res.message+'密码为fp123456'
              })
              setTimeout(() => {
                window.close()
              }, 1500)
              window.opener.location.reload()
            }
          })
        }

      },
      selVa (val){
        if (val == 1) {
          this.getTown()
          this.userTyp111e = ''
        } else if (val == 2){
          this.getFj()
          this.changetownId = []
        }
      },
      getFj(){
        let a = {
          orgLevel : 6
        }
        fetch.get(allApi.organization,a,res=>{
          this.fjqu = res.data
        })
      },
      getTown(){
        let a ={
          orgLevel : 4,
          type : 1
        }
        fetch.get(allApi.organization,a,res=>{
          this.cities = res.data
        })
      },
      handleCheckAllChange(val) {
        if(val){
          this.cities.forEach(a => {
            this.checkedCities.push(a.id)
          })
          let newarr = []
          for (let a in this.cities) {
            newarr.push(this.cities[a].id)
          }
          this.changetownId = newarr.join(',')
        }else{
          this.checkedCities = []
        }
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value) {
        this.changetownId = value.join(',')
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
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
  .setUpBtn{
    text-align: center;
    margin-top: 40px;
  }

  .setUpBtn button{
    cursor: pointer;
    width: 130px;
    height: 44px;
    background-color: #45c3ad;
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

  .upload > input {
    display: inline-block;
    border: none;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
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
