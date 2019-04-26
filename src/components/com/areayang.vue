<template>
    <div class="public fupinxq">
        <div class="box">
            <div class="title">{{type == '2' ? '申请详情' : '填报申请' }}</div>
            <div class="content">
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        申请区县
                    </div>
                    <div class="wu_right">
                        <el-input v-model="tableData.country" clearable disabled></el-input>
                    </div>
                </div>
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        申请类型
                    </div>
                    <div class="wu_right">
                        <el-select v-model="tableData.applyType" @change="handleApplytype" style="width: 100%;" :disabled="type=='2'&&area !='c'">
                            <el-option v-for="item in optionsone" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <template v-if="type=='2'&&tableData.applyType =='更名'">
                    <div class="item" style="margin-bottom: 34px;margin-top:34px">
                        <div class="wu_left">
                            更名对象
                        </div>
                        <div class="wu_right">
                            <el-input v-model="tableData.originZoningName" clearable disabled></el-input>
                        </div>
                    </div>
                </template>

                <template v-if="tableData.applyType === 0||type=='2'">
                    <div class="item" style="margin-bottom: 34px;margin-top:34px">
                        <div class="wu_left">
                            区划类别
                        </div>
                        <div class="wu_right">
                            <el-select v-model="tableData.zoningLevel" clearable style="width: 100%;" :disabled="type=='2'&&area !='c'">
                                <el-option v-for="item in options" :key="item.value" @change="hed" :label="item.label" :value="item.value">
                                </el-option>
                            </el-select>

                        </div>
                    </div>
                    <template v-if="tableData.applyType =='添加'||type=='1'">
                        <div class="item" style="margin-bottom: 34px;margin-top:34px">
                            <div class="wu_left">
                                区划名称
                            </div>
                            <div class="wu_right">
                                <el-input v-model="tableData.zoningName" :maxlength="20" clearable :disabled="type == '2'&&area !='c'"></el-input>
                            </div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="item" style="margin-bottom: 34px;margin-top:34px">
                            <div class="wu_left">
                                新名称
                            </div>
                            <div class="wu_right">
                                <el-input v-model="tableData.zoningName" :maxlength="20" clearable :disabled="type == '2'&&area !='c'"></el-input>
                            </div>
                        </div>
                    </template>

                </template>
                <template v-else>
                    <div class="item" style="margin-bottom: 34px;margin-top:34px">
                        <div class="wu_left">
                            更名对象
                        </div>
                        <el-select v-model="tableData.zoningId" clearable style="width: 100%;" :disabled="type=='2'&&area !='c'">
                            <el-option v-for="item in signDatacun" :key="item.id" :label="item.orgName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="item" style="margin-bottom: 34px;margin-top:34px">
                        <div class="wu_left">
                            新名称
                        </div>
                        <div class="wu_right">
                            <el-input v-model="tableData.zoningName" :maxlength="20" clearable :disabled="type == '2'&&area !='c'"></el-input>
                        </div>
                    </div>
                </template>
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        申请理由
                    </div>
                    <div class="wu_right">
                        <el-input type="textarea" :rows="7" resize="none" :autosize="{minRows:7,maxRows:7}" v-model="tableData.applyReason" :disabled="type == '2'&&area !='c'">
                        </el-input>
                    </div>
                </div>

                <div class="item1">
                    <p class="color ft18 mar">证明材料</p>
                    <div class="fuj">
                        <div class="img filesLook" v-for="(item, i) in fileList" :class="type == '1' ? 'filesDel' : ''" :key="i">
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

                        <div class="files" v-if="thisID==''">
                            <div class="upload" v-show="!uploading">
                                <input ref="file" type="file" multiple name="" id="" value="" @change="upload" />
                            </div>

                            <el-progress type="circle" :percentage="percentage" v-if="uploading"></el-progress>
                        </div>

                    </div>
                </div>
                <div class="wu_xl">
                    <template v-if="type =='1'">
                        <div class="xl" @click="onSubmit">提交</div>
                    </template>
                    <template v-if="yuyu === 0&&shi=='市'">
                        <div class="wu_xl_content">
                            <div class="xl" @click=" Agree">同意</div>
                            <div class="xl xv" @click="dismiss">驳回</div>
                        </div>
                    </template>
                    <template v-if="yuyu=='2'">
                        <div class="wu_xl_content mimi">
                            <div class="wu_cpmtemt">
                                <img class="imgid" src="../../../static/img/provincial/gou.png" alt="">
                                <div class="wu_xl-i wu_xl-i1">该审核未通过</div>
                            </div>
                        </div>
                    </template>
                    <template v-if="yuyu=='1'">
                        <div class="wu_xl_content mimi">
                            <div class="wu_cpmtemt">
                                <img class="imgid" src="../../../static/img/provincial/gou.png" alt="">
                                <div class="wu_xl-i ">该审核已通过</div>
                            </div>
                        </div>
                    </template>
                </div>
                <!-- 弹框 -->
                <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
                    <div class="item1">
                        <p class="color ft18 mar">标记备注：</p>
                        <el-input type="textarea" :rows="7" resize="none" :autosize="{minRows:7,maxRows:7}" v-model="textarea">
                        </el-input>
                    </div>
                    <div slot="footer" class="dialog-footer">
                        <p class="dibu" @click="adddismiss">驳回</p>
                        <p class="dibu yey" @click="dialogFormVisible=false">取消</p>
                    </div>
                </el-dialog>
            </div>
        </div>
        <my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
    </div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import area from "@/assets/api/area"
import fullScreenView from '@/components/com/fullScreenView'
import publics from "@/assets/tools/publics"
import allApi from "@/assets/api/user"
export default {
    components: { 'my-view': fullScreenView },
    data() {
        return {
            percentage: 0,
            uploading: false,
            yuyu: '',
            thisID: '',
            saa: true,
            dialogFormVisible: false,
            input10: '',
            type: '查看',
            shi: '',
            area: '',
            fileInfo: '',
            lookTitle: "XX村",
            leibie: '全部',
            textarea: '',
            duixiang: '',
            fileList: [],
            viewIndex: 0,
            viewFileList: [],
            seeMedia: false,
            zubie: '',
            tableData: {
                applyType: 0,
                zoningLevel: 4,
                zoningName: '',
                applyReason: '',
            },
            signDatacun: {
                zoningLevel: '',
            },
            optionsone: [
                { value: 0, label: '添加' },
                { value: 1, label: '更名' }
            ],
            options: [
                { value: 4, label: '乡镇' },
                { value: 6, label: '景区' }
            ],
            userInfo: '',
            imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image']
        }
    },
    created() {
        this.getFileSign();
        // 获取页面类型 发布 查看
        if (this.$route.query.type != undefined) {
            this.type = this.$route.query.type;
            if (this.type == '1') {
                let userInfo = JSON.parse(localStorage.getItem('userInfo'));
                this.tableData.country = userInfo.nickName;
            }
        } else {
            // gg
        }
        if (this.$route.query.area != undefined) {
            this.area = this.$route.query.area;
        } else {
            // gg
        }
        if (this.$route.query.id != undefined) {
            this.thisID = this.$route.query.id;
            this.getData();
        } else {
            // gg
        }
        if (this.$route.query.shi != undefined) {
            this.shi = this.$route.query.shi;
            this.getData();
        } else {
            // gg
        }
    },
    methods: {
        hed() {
            if (this.tableData.applyType == 更名) {
                this.saa = true
            }
        },
        //同意
        Agree() {
            let par = {
                applyId: this.thisID,
                checkStatus: 1,
                rejectContent: ''
            }
            fetch.put(area.citycheck, par, res => {
                
                if (res.code === 200) {
                    var _loading = this.$loading({
                        text: '已同意该申请'
                    })
                    setTimeout(() => {
                        _loading.close();
                        window.close();
                    }, 3000);
                }
            });
            window.opener.location.reload()
        },
        //驳回
        adddismiss() {
            let par = {
                applyId: this.thisID,
                checkStatus: 2,
                rejectContent: this.textarea,
            }
            fetch.put(area.citycheck, par, res => {
                if (res.code === 200) {
                    var _loading = this.$loading({
                        text: '已驳回该申请'
                    })
                    setTimeout(() => {
                        _loading.close();
                        window.close();
                    }, 3000);
                }
            });
            window.opener.location.reload()
        },
        dismiss() {
            this.dialogFormVisible = true
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
        getData() {
            fetch.get(area.xzdistrict + '/' + this.thisID, '', res => {
            
                if (res.code === 200) {
                    res.data.applyType = (res.data.applyType == 1 ? '更名' : '添加')
                    res.data.zoningLevel = (res.data.zoningLevel == 4 ? '乡镇' : '景区')
                    this.tableData = res.data;
                    let { filesList } = res.data;
                    this.fileList = filesList;
                    this.yuyu = res.data.checkStatus;

                } else {
                }

            });
        },
        //提交
        onSubmit() {
            var str = /[\u4e00-\u9fa5]$/;
            var reg = /^[\u4e00-\u9fa5]{1,10}$/;
            var flag = false;
            for (var item in this.tableData) {
                if (item == 'applyType') {
                    continue
                }
                if (this.tableData[item] === '') {
                    flag = true;
                }
            }
            if (flag) {
                this.$message({
                    type: 'warning',
                    message: '请填写完整填报申请!'
                })
                return;
            }
            if (!str.test(this.tableData.zoningName) && this.tableData.applyType == '0') {
                this.$message({
                    type: 'warning',
                    message: '区划名称只能是中文!'
                })
                return
            } else {
            }
            if (!str.test(this.tableData.zoningName) && this.tableData.applyType == '1') {
                this.$message({
                    type: 'warning',
                    message: '新名称只能是中文!'
                })
                return
            }
            let par = this.tableData;
            if (this.fileList.length == 0) {
                this.$message({
                    type: 'warning',
                    message: '缺少佐证材料'
                })
                delete par.fileInfo
                return
            } else {
                par.fileInfo = JSON.stringify(this.fileList);
            }
            fetch.post(area.reportshegnqing, par, res => {
                if (res.code === 200) {
                    var _loading = this.$loading({
                        text: '添加成功'
                    })
                    setTimeout(() => {
                        _loading.close();
                        window.close();
                    }, 3000);

                } else {
                }
            });
            window.opener.location.reload()
        },
        // 获取上传签名
        getFileSign() {
            fetch.get(allApi.getFileSign, '', res => {
                if (res.code === 200) {
                    this.signData = res.data
                }
            })
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
            this.uploading = true;
            let par = this.signData;
            par.key = par.dir + '/' + publics.getGUID() + '.' + _type;
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
        handleApplytype(v) {
            if (v === 1) {
                fetch.get(allApi.getDivsion, '', res => {
                    if (res.code === 200) {
                        this.signDatacun = res.data
                    }
                })
            }
        },
        delItem(i) {
            this.fileList.splice(i, 1);
        },

    }
}
</script>

<style scoped>
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
.box {
  height: 100%;
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
  position: absolute;
  top: 65px;
  bottom: 0;
  width: 100%;
  padding: 21px;
}
.dibu {
  width: 130px;
  height: 40px;
  background-color: #ff4b1b;
  border-radius: 4px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #f8f8f8;
  cursor: pointer;
}
.yey {
  width: 130px;
  height: 40px;
  background-color: #a4a8b3;
  border-radius: 4px;
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
.ft18 {
  font-size: 14px;
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
  width: 100%;
  margin-right: 66px;
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
.wu_left {
  width: 6%;
  min-width: 75px;
  display: flex;
  align-items: center;
  font-family: MicrosoftYaHei;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #0a1f33;
}
.wu_right {
  width: 94%;
}
.wu_xl {
  display: flex;
  justify-content: space-around;
}
.xl {
  width: 130px;
  height: 44px;
  background-color: #45c3ad;
  border-radius: 4px;
  font-size: 18px;
  letter-spacing: 0px;
  color: #f8f8f8;
  display: flex;
  cursor: pointer;
  justify-content: space-around;
  align-items: center;
}
.xv {
  background-color: #e65845;
  display: flex;
}
.wu_xl_content {
  width: 20%;
  display: flex;
  justify-content: space-around;
}
.mimi {
  width: 222px;
  height: 44px;
  background-color: #f0f9eb;
  border-radius: 4px;
  border: solid 1px #e1f3d8;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.imgid {
  /* display: inline; */
  width: 19px;
  height: 19px;
}
.wu_xl-i {
  font-size: 18px;
  color: #67c23a;
}
.wu_xl-i1 {
  font-size: 18px;
  color: red;
}
.wu_cpmtemt {
  width: 70%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>