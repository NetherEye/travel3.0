<template>
    <div class="public trainimg">
        <div class="box">
            <div class="top">
                <p class="wu_top">下载导入模板：</p>
                <div class="wu_bottom">
                    <div class="dianji" @click="down">
                    </div>
                </div>
            </div>
            <div class="bottom">
                <p>
                    选择文件：
                </p>
                <div class="footer">
                    <div class="zly">
                        <input ref="file" style="position: absolute;cursor: pointer;z-index: 99;" class="file" type="file" name="" id="" value="" @change="handleFile" />
                        <div class="ellipsis" style="position: absolute;top: 10px;z-index: 1;cursor: pointer;width: 328px;">{{fileName}}</div>
                    </div>
                </div>
            </div>
            <div class="wu_footer">
                <div class="sc" @click="uploading">
                    上传
                </div>
                <div class="qx">
                    取消
                </div>
            </div>
            <!-- 弹框 -->
            <el-dialog :visible.sync="dialogFormVisible" width="30%" @open="opendialog" :show-close="true">
                <div class="ll"> <i v-if="percentage != 100" class="el-icon-loading"></i>{{percentage == 100 ? '' : '正在上传...请稍等'}}</div>
                <div style="margin-top: 20px;color: red;font-size: 14px;text-align: center;" v-show="failure.show">
                	{{failure.title}}
                </div>

            </el-dialog>

        </div>
        <div class="box1" v-if="type == 1">
            <div class="wu_top">
                <div class="left">
                    本次导入{{total}}条数据
                </div>
            </div>
            <div class="line" style="background: #728bb4;height: 4px;margin-top: 6px;"></div>
            <div class="table">
                <el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 100%;"  height="760px" header-cell-class-name="tableTou" cell-class-name="tableRow">
                    <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="100px" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="projectName" label="项目名称" align="center" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="belongType" align="center" label="所属九项工程" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="assistType" align="center" label="带动类型" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="incomeType" align="center" label="带动贫困人口增收方式" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="incomeTime" align="center" label="收入时间" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column prop="income" align="center" label="收入金额" show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column align="center" label="操作" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <div class="btns">
                                <div class="textBtnLook" @click="goModify(scope.row.id, scope.row.poorName)">修改</div>
                            </div>
                        </template>
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
</template>
<script>
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/user"
import fupin from "@/assets/api/fupin"
import cun from "@/assets/api/cun"

export default {
    data() {
        return {
            dialogFormVisible: false,
            percentage: 0,
            fileName: '点击此处选择文件',
            type: 1,
            pageSize: 10,
            total: 0,
            currentPage: 1,
            resData: [],
            failure: {
            	show: false,
            	title: '',
            },
        }
    },
    created() {
        if (this.$route.query.type != undefined) {
            this.type = this.$route.query.type;
        } else {
            // gg
        }
    },
    computed: {
    	res(){
    		return this.resData;
    	},
    	tableData(){
    		let start = (this.currentPage - 1) * this.pageSize;
    		let end = this.currentPage * this.pageSize;
    		return this.resData.slice(start, end)
    	},
    },
    methods: {
    	indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
        opendialog() {
            this.percentage = 0;
            this.failure = {
            	show: false,
            	title: '',
            }
        },
        handleFile() {
            var file = this.$refs['file'].files[0];
            if (file == undefined) {
                this.fileName = '点击此处选择文件'
                return
            }
            if(file.type != "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" && file.type != 'application/vnd.ms-excel'){
            	this.$message({
            		type: 'warning',
            		message: '文件格式错误！'
            	})
            	this.$refs['file'].value = '';
            	this.fileName = '点击此处选择文件';
            	return
            }
            
            
            
            this.fileName = file.name
        },
        uploading() {
            var url = '';
            var file = this.$refs['file'].files[0];
            if (file == undefined) {
            	this.$message({
            		type: 'warning',
            		message: '请选择导入文件！'
            	})
                return
            }
            if(this.type == '1'){
                url = fupin.importTravelAssist;
            }else{
                url = cun.cunvillage;
            }
            this.dialogFormVisible = true
            this.failure.show = true;
            fetch.importE(url, file, a => {
//              let loaded = a.loaded,
//                  total = a.total;
//              this.$nextTick(() => {
//                  this.percentage = Math.ceil((loaded / total) * 100);
//              })

        }, res => {
        	console.log(res)
         		if(res.code === 504){
         			this.failure = {
		            	show: true,
		            	title: '失败提示：' + res.data.message,
		            }
            		return
         		}
            	this.percentage = 100
            	if(res.data.code == 201){
            		this.failure = {
		            	show: true,
		            	title: '失败提示：' + res.data.message,
		            }
            		return
            	}
            	if(this.type == '1'){
            		this.resData = res.data.data;
            		this.total = res.data.total;
            	}
            	this.failure = {
	            	show: true,
	            	title: '导入成功',
	            }
            	
                this.$refs['file'].value = '';
                this.fileName = '点击此处选择文件'
                
//              this.dialogFormVisible = false;
            })
        },
        //下载扶贫模板
        down() {
            var url = '';
            if(this.type == '2'){
                url = allApi.downoneTemplate;
            }else{
                url = allApi.downTemplate;
            }
            fetch.get(url, '', res => {
                if (res.code === 200) {
                    window.location.href = res.data.url;
                }
            })
        },
        goModify(id, poorName){
             const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                    type: '修改',
                    id: id,
                    poorName: poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");

        }
    }
}
</script>

<style scoped >
.public {
  height: auto;
  padding: 40px;
}
.box {
  width: 520px;
  height: 431px;
  background-color: #f0f3f8;
  box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.top {
  width: 330px;
  height: 168px;
  box-sizing: border-box;
}
.wu_top {
  font-size: 18px;
  color: #0a1f33;
}
.wu_bottom {
  width: 330px;
  height: 140px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  margin-top: 4px;
}
.ll {
  margin-top: 100px;
  text-align: center;
  margin-bottom: 20px;
}
.bottom {
  margin-top: 30px;
}
.footer {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}
.zly {
  width: 330px;
  height: 45px;
  background-color: #ffffff;
  border-radius: 4px;
  border: solid 1px #eeeeee;
  position: relative;
  cursor: pointer;
}
.file {
  width: 100%;
  height: 100%;
  border: none;
  /* outline: none; */
  opacity: 0;
  cursor: pointer;
}
.btn {
  width: 100px;
  height: 44px;
  background-color: #4a87c1;
  border-radius: 4px;
  font-size: 18px;
  color: #f8f8f8;
  text-align: center;
  cursor: pointer;
}
.wu_footer {
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
}
.sc {
  width: 130px;
  height: 44px;
  background-color: #45c3ad;
  border-radius: 4px;
  font-size: 18px;
  color: #f8f8f8;
  text-align: center;
  line-height: 44px;
  cursor: pointer;
}
.qx {
  width: 130px;
  height: 44px;
  background-color: #a4a8b3;
  border-radius: 4px;
  color: #f8f8f8;
  font-size: 18px;
  text-align: center;
  cursor: pointer;
  line-height: 44px;
}
.dianji {
  margin-top: 30px;
  margin-left: 20px;
  width: 75px;
  height: 80px;
  background-image: url(../../../static/img/provincial/moban.png);
  cursor: pointer;
}

.box1 {
  margin-top: 40px;
  width: 100%;
  background-color: #f0f3f8;
  box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
  border-radius: 10px;
  padding: 30px;
  box-sizing: border-box;
}
.wu_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  width: 380px;
  display: flex;
  justify-content: space-between;
}
.right {
  width: 20%;
  display: flex;
  justify-content: space-between;
}
.mi {
  width: 140px;
  height: 44px;
  background-color: #4a87c1;
  border-radius: 4px;
  font-size: 16px;
  text-align: center;
  color: #eaefff;
  line-height: 44px;
  cursor: pointer;
}
.wxy {
  background: none;
  border: solid 1px #ff4b1b;
  color: #ff4b1b;
}
.textBtnLook {
  width: 100px;
  height: 44px;
  background-color: #45c3ad;
  border-radius: 4px;
  font-size: 16px;
  line-height: 44px;
  letter-spacing: 0px;
  color: #eaefff;
  cursor: pointer;
}
.fenye{
    background-color: #ffffff;
}
</style>

