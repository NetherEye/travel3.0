<template>
  <div class="public">
    <div class="box">
      <div class="title">修改账号</div>
      <div class="content">
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item1">
            <p class="color ft16 mar">所属区县:</p>
            <p>
              <el-select v-model="selValue" disabled placeholder="请输入内容" clearable style="width: 100%;">
                <el-option v-for="item in city" :key="item.id"   :label="item.orgName"  :value="item.id">
                </el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">工作单位:</p>
            <p>
              <el-input v-model="input1" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar">姓名:</p>
            <p>
              <el-input v-model="input2" placeholder="请输入内容"></el-input>
            </p>
          </div>
          <div class="item_item1">
            <p class="color ft16 mar" >手机号:</p>
            <p>
              <el-input v-model="input3" disabled placeholder="请输入内容"></el-input>
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
              修改
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import fetch from "@/assets/tools/fetch"
  import allApi from "@/assets/api/zhanghao"
  export default{
    data(){
      return{
        reg : /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/,
        qqReg: /^[1-9][0-9]{4,11}$/,
        emailReg : /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        input1 :'',
        input2 :'',
        input3 :'',
        input4 :'',
        input5 :'',
        input6 :'',
        input7 :'',
        city : '',
        selValue : '',
        input10 : '乡村旅游从业人员培训',
        type: '查看',
        lookTitle: "培训",
        username : this.$route.query.username,
        belongDistrict: '',
        duty : '',
        email : '',
        nickName :'',
        phone :'',
        position : '',
        qqNumber : '',
        username1 : '',
        workCompany :'',
      }
    },
    methods : {
      setUp () {
        let a = {
          nickName : this.input2,
          workCompany : this.input1,
          username : this.input3,
          position : this.input4,
          duty : this.input5,
          qqNumber : this.input6,
          email : this.input7,
        }
        if (!this.selValue) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请选择归属州市',
            type: "error"
          });
        }
        else if (!this.input1) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请正确的输入工作单位',
            type: "error"
          });
        }
        else if (!this.input2) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入姓名',
            type: "error"
          });
        }
        else if (!this.reg.test(this.input2)) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的姓名格式',
            type: "error"
          });
        }
        else if(!(/^(1[3456789][0-9]{9})$/.test(this.input3))){
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的电话号码',
            type: "error"
          });
        }
        else if (!this.input4) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入所在岗位',
            type: "error"
          });
        }
        else if (!this.input5) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入职务',
            type: "error"
          });
        }
        else if (!(this.qqReg.test(this.input6))) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的QQ号码',
            type: "error"
          });
        }
        else if (!(this.emailReg.test(this.input7))) {
          this.$message({
            duration: "2000",
            showClose: true,
            message: '请输入正确的邮箱',
            type: "error"
          });
        }
        else {
          fetch.put(allApi.user,a,res=>{
            if (res.code == 200) {
              this.$loading({
                text: res.message
              })
              setTimeout(() => {
                window.close()
              }, 1500)
              window.opener.location.reload()
            }
          })
        }

      },
      orgCity () {
        fetch.get(allApi.org,'',res=>{
          this.city = res.data
        })
      },
      getuserdata () {
        let a ={
          username : this.username
        }
        fetch.get(allApi.user+this.username,a,res=>{
          this.selValue = res.data.belongDistrict
          this.input5 = res.data.duty
          this.input7 = res.data.email
          this.input2 = res.data.nickName
          this.input3 = res.data.phone
          this.input4 = res.data.position
          this.input6 = res.data.qqNumber
          this.input1 = res.data.workCompany
        })
      },
    },
    created(){
      this.getuserdata()
      this.orgCity()
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
