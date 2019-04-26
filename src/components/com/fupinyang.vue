<template>
    <div class="public">
        <div class="box">
            <div class="title">贫困人口信息</div>
            <div class="content"></div>
                <div class="item" style="margin: 34px">
                    <el-form :inline="true" :model="formInline" class="demo-form-inline">
                        <div class="itemccc">
                            <el-form-item label="姓名">
                                <el-input v-model="formInline.poorName" placeholder="姓名" style="width:305px;" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="身份证号">
                                <el-input v-model="formInline.idCard" placeholder="身份证号" style="width:308px;" disabled></el-input>
                            </el-form-item>
                            <el-form-item label="性别">
                                <el-select v-model="formInline.sex" placeholder="性别" style="width:300px;" disabled>
                                    <el-option v-for="item in opsex" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="联系电话">
                                <el-input v-model="formInline.phone" placeholder="联系电话" style="width:275px;" disabled></el-input>
                            </el-form-item>
                        </div>
                        <div class="itemccc">
                            <el-form-item label="户籍地址">
                                <el-select v-model="formInline.province" style="width:130px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="formInline.city"  style="width:130px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="formInline.country" style="width:130px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="formInline.town" style="width:130px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                                <el-select v-model="formInline.village" style="width:130px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>

                            <el-form-item label="受教育程度">
                                <el-select v-model="formInline.educationLevel" placeholder='' style="width:260px;" disabled>
                                    <el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="脱贫状态">
                                <el-select v-model="formInline.outPoorMark" placeholder='' style="width:275px;" disabled>
                                    <el-option v-for="item in Category" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                        <div class="itemccc">
                            <el-form-item label="是否需要培训">
                                <el-select v-model="formInline.isNeedTrain" placeholder="" style="width:248px;" disabled>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="现在是否参与旅游" label-width="125px">
                                <el-select v-model="formInline.isJoinPoverty" placeholder='' style="width:250px;" disabled>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="近三年是否能参与旅游" label-width="160px">
                                <el-select v-model="formInline.isAbleJoin" placeholder="" style="width:185px;" disabled>
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="参与方式">
                                <el-select v-model="formInline.joinType" placeholder="" style="width:275px;" disabled>
                                    <el-option v-for="item in Manner" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="yami">
                    <p class="color ft18">旅游帮扶信息</p>
                </div>
                
                <div class="lcc">
                    <div class="line" style="background: #728bb4;height: 4px;margin-top: 6px;flex: 1;"></div>
                    <div class="bf" v-if="userInfo.role != '省'">
                        <button class="addBigBtn">
                            <span @click="goAdded">
                              	新增 </span>
                        </button>
                    </div>
                </div>

                <div class="table">
                    <el-table ref="table" :data="tableData"  header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
                        <el-table-column type="index" :index="indexMethod" label="序号" align="center" width="80px">
                        </el-table-column>
                        <el-table-column prop="projectName" label="项目名称" align="center" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="belongType" align="center" label="所属九项工程" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="assistType" align="center" label="带动类型" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="incomeType" align="center" label="带动贫困人口增收方式" width="200px" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="incomeTime" align="center" label="收入时间" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="income" align="center" label="收入金额" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="inputTime" align="center" label="填报时间" width="200px" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="nickName" align="center" label="填报员" show-overflow-tooltip>
                        </el-table-column>
                        <el-table-column prop="status" align="center" label="信息状态" show-overflow-tooltip>
                        	<template slot-scope="scope">
                               	{{scope.row.status == 0 ? '已保存' : scope.row.status == 1 ? '未审核' : scope.row.status == 2 ? '已驳回' : scope.row.status == 3 ? '已通过' : scope.row.status == 4 ? '省级已标记' : scope.row.status == 5 ? '市级已标记' : ''}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作" show-overflow-tooltip>
                            <template slot-scope="scope">
                                <div class="btns">
                                	<template v-if="userInfo.username == scope.row.inputUser && (scope.row.status == 2 || scope.row.status == 4 || scope.row.status == 5 || scope.row.status == 0)">
                                        <div class="textBtnLook" @click="goModify(scope.row.id)">修改</div>
                                    </template>
                                     <template v-else-if="scope.row.status == 1 && userInfo.username != scope.row.inputUser && userInfo.role == '区县'">
                                        <div class="textBtnLook" @click="gochakna(scope.row.id)">审查</div>
                                    </template>
                                    <template v-else>
                                        <div class="textBtnLook" @click="gofupinyang(scope.row.id, scope.row.status, scope.row.inputUser)">查看</div>
                                    </template>
																		<template v-if="userInfo.username === '13985794094'">
																				<div class="textBtnLook" style="margin-left: 5px" @click="delDat(scope.row.id)">删除</div>
																		</template>
                                   
                                    
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>

                </div>
                <div class="fenye">
                    <div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据 共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
                    <el-pagination :current-page.sync="currentPage" @current-change="handleCurrentChange" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import fupin from "@/assets/api/fupin"
export default {
    data() {
        return {
            value: '', //户籍
            valuesex: '', //性别
            valueget: '', //脱贫状态
            valueopt: '', //培训
            valuetrave: '', //旅游
            valuesone: '', //近三年是否能参与旅游
            valueManner: '',//参与方式
            valueeadt: '',//受教育程度

            leixing: '',
            pageSize: 7,
            total: 0,
            currentPage: 1,
            tableData: [
            ],
            idCard:'',
            provincial:'',
            lookTitle: "培训",
            leibie: '全部',
            textarea: '',
            duixiang: '',
            zubie: '',

            formInline: {
                
            },
            //受教育程度
            education: [{
                value: '本科',
                label: '本科'
            }, {
                value: '大专',
                label: '大专'
            }, {
                value: '中专',
                label: '中专'
            }, {
                value: '高中',
                label: '高中'
            }, {
                value: '初中',
                label: '初中'
            }, {
                value: '小学',
                label: '小学'
            }, {
                value: '未受过教育',
                label: '未受过教育'
            }

            ],
            //就业方式
            Manner: [{
                value: '直接就业',
                label: '直接就业'
            }, {
                value: '间接就业',
                label: '间接就业'
            }, {
                value: '自主创业',
                label: '自主创业'
            }, {
                value: '其他方式',
                label: '其他方式'
            }
            ],
            //性别
            opsex: [{
                value: '男',
                label: '男'
            }, {
                value: '女',
                label: '女'
            }],
            //贫困类别
            Category: [{
				value: '未脱贫',
				label: '未脱贫'
			}, {
				value: '已脱贫（享受政策）',
				label: '已脱贫享受政策'
			}, {
				value: '已脱贫（不再享受政策）',
				label: '已脱贫不享受政策'
			}, {
				value: '返贫',
				label: '返贫'
			}],
            options: [{
                value: '是',
                label: '是'
            }, {
                value: '否',
                label: '否'
            },],
            userInfo: '',
        }
    },
    created() {
        // 获取页面类型
        
        if (this.$route.query.idCard != undefined) {
            this.idCard = this.$route.query.idCard;
            this.getData();
            this.getDataList();
        } else {
            // gg
        }
       	this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
    mouted(){
    } ,
    methods: {
    	indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
        handleCurrentChange() {
			this.getDataList();
		},
        handleSelectionChange() {

        },
        gofupinyang(id, state, nickName) {
        	// 判断是否市州 省 查看是否可以标记
        	let userInfo = this.userInfo
        	let _type = '查看'
        	if(state == 3 && (userInfo.role == '省' || userInfo.role == '市州')){
        		if(userInfo.username != nickName){
        			_type = '标记'
        		}
        	}
        	
            const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                    type: _type,
                    id: id,
                    poorName: this.formInline.poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
        },
        getData(){
        	fetch.get(fupin.poorpeople + '/' + this.idCard, '', res => {
        		if(res.code === 200){
        			this.formInline = res.data
        		}
        	}, {})
        },
        getDataList(){
        	let par = {
        		pageSize: this.pageSize,
        		pageNumber: this.currentPage,
        		idCard: this.idCard,
        	}
        	this.tableData = [];
        	fetch.get(fupin.travelAssistList, par, res => {
        		if(res.code === 200){
        			this.tableData = res.data;
        			this.total = res.total;
        		}else{
        			this.tableData = [];
        			this.total = 0;
        		}
        	})
        },
        gochakna(id) {
            const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                    type: '审查',
                    id: id,
                    poorName: this.formInline.poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
        },
        goAdded() {
            const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                	type: '添加',
                    poorName: this.formInline.poorName,
                    idCard: this.idCard,
                }
            })
           window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
        },
        goModify(id){
             const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                    type: '修改',
                    id: id,
                    poorName: this.formInline.poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");

        },
				delDat(id){ // 特定账号删除帮扶信息
					this.$confirm('删除操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetch.delete('/proxy/api/travelAssist?id=' + id, '', res => {
          	if(res.code === 200){
          		this.$message({
          			type: 'success',
          			message: '删除成功!'
          		});
							this.getDataList()
          	}
          })
        })
					
				}
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
.yami {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.addBigBtn {
  display: block;
  width: 126px;
  height: 40px;
  background-color: #4a87c1;
  border-radius: 4px;
  margin-left: 40px;
  cursor: pointer;
  color: #ffffff;
  border: none;
  user-select: none;
   outline:0 none !important; 
}
.addBigBtn span:before {
  content: url(../../../static/img/provincial/++.png);
  margin-right: 5px;
  margin-top: 4px;
}
.lcc {
   margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.fj {
  width: 90%;
}
.bf {
}
.addBigBtn span {
  display: inline-block;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
 
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
/* .content {
  height: auto;
  padding: 21px;
  padding-bottom: 40px;
} */
.color {
  color: rgba(10, 31, 51, 1);
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
</style>
