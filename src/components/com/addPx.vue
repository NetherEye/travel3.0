<template>
  <div class="public">
    <div class="box">
      <div class="title">培训活动详情</div>
      <div class="content">
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">培训名称:</p>
            <p>
              <el-input v-model="input51" placeholder="培训名称">
              </el-input>

            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训类型:</p>
            <p>
              <el-select v-model="input52" style="width:100%" clearable>
                <el-option label="乡村旅游致富带头人培训" value="乡村旅游致富带头人培训"></el-option>
                <el-option label="培训旅游从业人员" value="培训旅游从业人员"></el-option>
                <el-option label="旅游扶贫重点村干部培训" value="旅游扶贫重点村干部培训"></el-option>
                <el-option label="培养乡村旅游骨干" value="培养乡村旅游骨干"></el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">承办单位:</p>
            <p>
              <el-input v-model="input53" placeholder="承办单位">
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训地点:</p>
            <p>
              <el-input v-model="input54" placeholder="培训地点">
              </el-input>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">培训开始时间：</p>
            <div>
              <div class="block">
                <el-date-picker v-model="input55" style="width: 100%" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训结束时间：</p>
            <div>
              <div class="block" style="width: 100%">
                <el-date-picker style="width: 100%" v-model="input56" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">旅游教育培训负责人：</p>
            <p>
              <el-input v-model="input57" placeholder="旅游教育培训负责人">
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">旅游教育培训负责人电话：</p>
            <p>
              <el-input v-model="input58" placeholder="旅游教育培训负责人电话">
              </el-input>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">咨询电话（座机）:</p>
            <p>
              <el-input v-model="input59" placeholder="咨询电话">
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训讲师：</p>
            <p>
              <el-input v-model="input60" placeholder="培训讲师">
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训方式:</p>
            <p>
              <el-input v-model="input61" placeholder="培训方式">
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">完成情况:</p>
            <p>
              <el-select v-model="input62" style="width:100%;">
                <el-option label="已完成" value="已完成">
                </el-option>
                <el-option label="未完成" value="未完成">
                </el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item1">
            <p class="color ft16 mar">旅游教育培训描述:</p>
            <p>
              <el-input width="80%" type="textarea" :rows="4" placeholder="请输入内容" v-model="textarea">
              </el-input>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="fuj">
            <div class="img filesLook filesDel" v-for="(item, i) in fileList" :key="i">
              <template v-if="imgs.indexOf(item.fileType) != -1">
                <img :src="item.url" />
                <div class="img_tilte ft12">照片描述</div>

                <template>
                  <i class="btnDel" @click="delItem(i)"></i>
                </template>
                <div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>

              </template>
              <template v-else>
                <img src="../../../static/img/provincial/wenjianmiaoshu.png" />
                <div class="img_tilte ft12 ellipsis" :title="item.originalName">{{item.originalName}}</div>
                <template>
                  <i class="btnDel" @click="delItem(i)"></i>
                </template>
                <div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
              </template>
            </div>

            <div class="files">
              <div class="upload" v-show="!uploading">
                <input ref="file" type="file" multiple name="" id="" value="" @change="upload" />
              </div>

              <el-progress type="circle" :percentage="percentage" v-if="uploading"></el-progress>
            </div>
          </div>
        </div>
      </div>
      <div style="text-align: center;position: relative;bottom: 10px">
        <div class="btn btn2" @click="addPx">保存</div>
      </div>
    </div>
    <my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
  </div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import publics from "@/assets/tools/publics"
import allApi from "@/assets/api/user"
import peixun from "@/assets/api/peixun"
import fullScreenView from '@/components/com/fullScreenView'
export default {
  components: { 'my-view': fullScreenView },
  data() {
    return {
      imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png','image'],
      reg: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,8}$/,

      viewIndex: 0,
      viewFileList: [],
      seeMedia: false,
      signData: '',
      input50: '',
      input51: '',
      uploading: false,
      input52: '',
      input53: '',
      input54: '',
      input55: '',
      input56: '',
      input57: '',
      input58: '',
      input59: '',
      input60: '',
      input61: '',
      input62: '',
      textarea: '',
      fileList: [],
      percentage: 0,
      value1: '',
      input10: '乡村旅游从业人员培训',
      type: '查看',
      lookTitle: "培训",
      options: [
        { value: '全部', label: '全部' },
        { value: '单个', label: '单个' }
      ],
      tableData: [
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
  created() {
    this.getFileSign();
    // 获取页面类型 发布 查看
    if (this.$route.query.type != undefined) {
      this.type = this.$route.query.type;
    } else {
      // gg
    }
  },
  methods: {
    delItem(i) {
      this.fileList.splice(i, 1);
    },
    // 关闭查看器
    closeView() {
      this.seeMedia = false;
    },
    view(item) {
      var AdvanceExit = false;
      this.viewFileList = [];
      var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
        videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg', 'm2v', 'mkv', 'video/mp4', 'video'];

      this.fileList.forEach(a => {
        if (imgs.indexOf(a.fileType) != -1) {
          a.ftp = 'pic'
          this.viewFileList.push(a)
          return
        } else if (videos.indexOf(a.fileType) != -1) {
          a.ftp = 'mov'
          this.viewFileList.push(a)
          return
        } else if (item.url === a.url) {
          window.location = a.url;
          AdvanceExit = true;
        }

      })
      if (AdvanceExit) {
        return
      }
      this.viewFileList.forEach((a, i) => {
        if (a.url === item.url) {
          this.viewIndex = i
        }
      })

      this.seeMedia = true;


    },
    // 获取上传签名
    getFileSign() {
      fetch.get(allApi.getFileSign, '', res => {
        if (res.code === 200) {
          this.signData = res.data
        }
      })
    },
    // 文件类型className返回
    handleLookType(type) {
      var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
        videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg', 'm2v', 'mkv', 'video/mp4', 'video'];
      if (imgs.indexOf(type) != -1) {
        return 'pic'
      } else if (videos.indexOf(type) != -1) {
        return 'mov'
      } else {
        return 'file'
      }
    },
    //上传图片
    upload() {
      var file = this.$refs['file'].files[0];
      if (file == undefined) {
        return
      }
      if (file.name.lastIndexOf('.') == -1) {    //如果不存在"."
        this.$message({
          type: 'error',
          message: '文件路径不正确！'
        })
        return
      }
      var _type = file.name.slice(file.name.lastIndexOf('.') + 1);
      var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
        videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg', 'm2v', 'mkv',],
        others = ['txt', 'xls', 'xlsx', 'doc', 'docx', 'pdf', 'ppt', 'zip'];
      if (imgs.indexOf(_type) === -1 && videos.indexOf(_type) === -1 && others.indexOf(_type) === -1) {
        this.$message({
          type: 'error',
          message: '文件格式暂不支持！'
        })
        return
      }
      let par = this.signData;
      par.key = par.dir + '/' + publics.getGUID();
      this.uploading = true;
      fetch.file(par, file, a => {
        let loaded = a.loaded,
          total = a.total;
        this.$nextTick(() => {
          this.percentage = Math.ceil((loaded / total) * 100);
        })

      }, res => {
        if (res.status === 200) {
          let obj = {
            fileName: par.key,
            fileType: _type,
            originalName: file.name,
            url: par.host + '/' + par.key,
          }

          this.fileList.push(obj);
        }
        this.$refs['file'].value = '';
        this.uploading = false;
        this.percentage = 0;
      })
    },
    addPx() {
      if (this.fileList.length === 0) {
        let par = {
          trainName: this.input51,
          trainType: this.input52,
          principal: this.input57,
          principalPhone: this.input58,
          address: this.input54,
          organizer: this.input53,
          completion: this.input62,
          supportHotline: this.input59,
          trainWay: this.input61,
          trainer: this.input60,
          startTime: this.input55,
          finishTime: this.input56,
          trainDesc: this.textarea,
        }
        for (var i in par) {
          if (!par[i]) {
            this.$message({
              type: 'warning',
              message: '请输入完整信息'
            })
            return
          }
        }
        if (this.input55 > this.input56) {
          this.$message({
            type: 'warning',
            message: '开始时间不能大于结束时间'
          })
          return
        }

        if (!this.reg.test(this.input57.replace(/\s*/g, ""))) {
          this.$message({
            type: 'warning',
            message: '请输入正确的姓名'
          })
          return
        }

        if (!this.reg.test(this.input60.replace(/\s*/g, ""))) {
          this.$message({
            type: 'warning',
            message: '请输入正确的姓名'
          })
          return
        }

        if (!/^(1[3456789][0-9]{9})$/.test(this.input58)) {
          this.$message({
            type: 'warning',
            message: '请输入正确的手机号码'
          })
          return
        }

        fetch.post(peixun.train, par, res => {
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
      else {
        let par = {
          trainName: this.input51,
          trainType: this.input52,
          principal: this.input57,
          principalPhone: this.input58,
          address: this.input54,
          organizer: this.input53,
          completion: this.input62,
          supportHotline: this.input59,
          trainWay: this.input61,
          trainer: this.input60,
          startTime: this.input55,
          finishTime: this.input56,
          trainDesc: this.textarea,
          fileInfo: JSON.stringify(this.fileList),

        }
        for (var i in par) {
          if (!par[i]) {
            this.$message({
              type: 'warning',
              message: '请输入完整信息'
            })
            return
          }
        }
        if (this.input55 > this.input56) {
          this.$message({
            type: 'warning',
            message: '开始时间不能大于结束时间'
          })
          return
        }

        if (!this.reg.test(this.input57.replace(/\s*/g, ""))) {
          this.$message({
            type: 'warning',
            message: '请输入正确的姓名'
          })
          return
        }

        if (!this.reg.test(this.input60.replace(/\s*/g, ""))) {
          this.$message({
            type: 'warning',
            message: '请输入正确的姓名'

          })
          return
        }
        if (!/^(1[3456789][0-9]{9})$/.test(this.input58)) {
          this.$message({
            type: 'warning',
            message: '请输入正确的手机号码'

          })
          return
        }

        fetch.post(peixun.train, par, res => {
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
button {
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
  position: relative;
  min-width: 150px;
  min-height: 150px;
  align-items: center;
  justify-content: center;
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
  flex-wrap: wrap;
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
.color {
  color: rgba(10, 31, 51, 1);
}
.ft12 {
  font-size: 12px;
}
.ft18 {
  font-size: 18px;
}
.ft20 {
  font-size: 20px;
}
.mar {
  margin-top: 13px;
  margin-bottom: 10px;
}
.item {
  display: flex;
}
.item_item {
  width: 400px;
  margin-right: 66px;
}
.item_item:last-child {
  margin-right: 0;
}
</style>
