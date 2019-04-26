<template>
  <div class="public">
    <div class="box">
      <div class="title">培训活动详情</div>
      <div class="content">
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">培训名称:</p>
            <p>
              <el-input v-model="tableData.trainName" clearable disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训类型:</p>
            <p>
              <el-select v-model="tableData.trainType" disabled style="width:100%">
                <el-option label="培训旅游扶贫重点村干部" value="shanghai"></el-option>
                <el-option label="培训乡村旅游致富带头人" value="beijing"></el-option>
                <el-option label="旅游扶贫重点村旅游从业人员培训" value="beijing"></el-option>
                <el-option label="培训贫困人口为乡村旅游骨干" value="beijing"></el-option>
              </el-select>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">承办单位:</p>
            <p>
              <el-input v-model="tableData.organizer" clearable disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训地点:</p>
            <p>
              <el-input v-model="tableData.address" disabled>
              </el-input>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">培训开始时间：</p>
            <div>
              <div class="block">
                <el-date-picker disabled v-model="tableData.startTime" style="width: 100%" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训开始时间：</p>
            <div>
              <div class="block">
                <el-date-picker disabled v-model="tableData.finishTime" style="width: 100%" type="date" placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">旅游教育培训负责人：</p>
            <p>
              <el-input v-model="tableData.principal" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">旅游教育培训负责人电话：</p>
            <p>
              <el-input v-model="tableData.principalPhone" disabled>
              </el-input>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item">
            <p class="color ft16 mar">咨询电话（座机）:</p>
            <p>
              <el-input v-model="tableData.supportHotline" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训讲师：</p>
            <p>
              <el-input v-model="tableData.trainer" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">培训方式:</p>
            <p>
              <el-input v-model="tableData.trainWay" disabled>
              </el-input>
            </p>
          </div>
          <div class="item_item">
            <p class="color ft16 mar">完成情况:</p>
            <p>
              <el-select v-model="tableData.completion" style="width:100%" disabled="type == '查看'" clearable>
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </p>
          </div>
        </div>
        <div class="item" style="margin-bottom: 34px;">
          <div class="item_item1">
            <p class="color ft16 mar">旅游教育培训描述:</p>
            <p>
              <el-input width="80%" type="textarea" :rows="4" disabled placeholder="请输入内容" v-model="tableData.trainDesc">
              </el-input>
            </p>
          </div>
        </div>
        <div class="item">
          <div class="fuj">
            <div class="img filesLook" v-for="(item, i) in fileList" :key='i'>
              <template v-if="item.fileType =='image/jpeg' || item.fileType == 'image/png'">
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
          </div>
        </div>
      </div>
    </div>
    <my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
  </div>
</template>

<script>
import fullScreenView from '@/components/com/fullScreenView'
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/peixun"
export default {
  components: { 'my-view': fullScreenView },
  data() {
    return {
      xqID: this.$route.query.id,
      value1: '',
      leibie: '',
      fileList: [],
      viewFileList: [],
      viewIndex: 0,
      input10: '乡村旅游从业人员培训',
      type: '查看',
      seeMedia: false,
      uploading: false,
      percentage: 0,
      lookTitle: "培训",
      options: [
        { value: '全部', label: '全部' },
        { value: '单个', label: '单个' }
      ],
      tableData: [

      ],
    }
  },
  components: { 'my-view': fullScreenView },
  created() {
    this.getData()
    // 获取页面类型 发布 查看
    if (this.$route.query.type != undefined) {
      this.type = this.$route.query.type;
    } else {
      // gg
    }
  },
  methods: {
    // 文件类型className返回
    handleLookType(type) {
      var imgs = ['image/jpeg', 'image/png'],
        videos = ['video/mp4'];
      if (imgs.indexOf(type) != -1) {
        return 'pic'
      } else if (videos.indexOf(type) != -1) {
        return 'mov'
      } else {
        return 'file'
      }
    },
    // 关闭查看器
    closeView() {
      this.seeMedia = false;
    },
    view(item) {
      var AdvanceExit = false;
      this.viewFileList = [];
      var imgs = ['image/jpeg', 'image/png'],
        videos = ['video/mp4'];

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
          window.location.href = a.url;
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
    getData() {
      let a = {
        id: this.xqID
      }
      fetch.get(allApi.train + '/' +this.xqID, a, res => {
        this.tableData = res.data;
        let { filesList } = res.data;
        this.fileList = filesList;
      })
    },
    // 关闭查看器
    closeView() {
      this.seeMedia = false;
    },
    upload() {
      this.uploading = true;

      var file = this.$refs['file'].files[0];
      fetch.file('sss', file, a => {
        let loaded = a.loaded,
          total = a.total;
        this.$nextTick(() => {
          this.percentage = Math.ceil((loaded / total) * 100);
        })
      }, res => {
        this.uploading = false;
        this.percentage = 0;
      })
    },
  },
}
</script>

<style scoped>
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
.color {
  color: rgba(10, 31, 51, 1);
}
.ft12 {
  font-size: 12px;
}
.ft16 {
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
.item2 {
  display: flex;
  margin: 29px 0;
}
.item2_item1 {
  width: 112px;
  margin-right: 12px;
}
.item2_item2 {
  flex: 1;
}
</style>
