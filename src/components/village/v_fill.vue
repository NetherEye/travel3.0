<template>
	<div class="public" @click.stop='isFilter=false'>
		<div class="main">
			<div class="main_content">
				<div class="filter" @mouseenter='isFilter=true' @click.stop='isFilter=true'>
					<div class="switchType" style="display: flex;width: 400px;">
						<p class="sw" @click="switchType('yes')" :class="pageType == 'yes' ? 'sw-active' : ''"><i class="circle"></i>我填报的扶贫信息</p>
						<p class="sw" @click="switchType('no')" :class="pageType != 'yes' ? 'sw-active' : ''"><i class="circle"></i>我完成的任务</p>
					</div>
					<div class="isFilter" @click="handleFilter"><img :class="isFilter ? 'rotate' : ''" src="../../../static/img/provincial/select_icon.png" /><span>{{isFilter ? '收起筛选' : '展开筛选'}}</span></div>
					<div style="width: 400px;"> </div>
					<transition name="el-zoom-in-top">
						<div class="filterBox" v-show="isFilter" style="padding: 36px 50px 46px 50px;">
							<el-form :inline="true" :model="filter" class="demo-form-inline">
								<el-form-item label="姓名检索" label-width="76px" v-if="pageType == 'yes'">
									<el-input v-model="filter.poorName" clearable placeholder="姓名"></el-input>
								</el-form-item>
								<el-form-item label="身份证号">
									<el-input class="mar" v-model="filter.idCard" clearable  placeholder="身份证号"></el-input>
								</el-form-item>
								<el-form-item label="信息状态" v-if="pageType == 'yes'">
									<el-select v-model="filter.status" clearable placeholder="全部">
										<el-option v-for="item in information" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
							</el-form>
							<div class="filter_btn">
								<div class="btn btn1" @click="find">查询</div>
								<div class="btn btn2" @click="exports" v-if="pageType == 'yes'">批量导出</div>
								
							</div>
						</div>
					</transition>
				</div>
				
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" width="140px" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow">
						<el-table-column type="index" :index="indexMethod" label="序号" align="center" width="80px" key="t1">
						</el-table-column>
						<el-table-column prop="poorName" label="贫困人口姓名" align="center" show-overflow-tooltip key="t2">
						</el-table-column>
						<el-table-column prop="idCard" align="center" label="身份证号码" width="220px" show-overflow-tooltip key="t3">
						</el-table-column>
						<el-table-column prop="phone" align="center" label="联系方式" show-overflow-tooltip key="t4">
						</el-table-column>
						
						<template v-if="pageType == 'no'">
							<el-table-column prop="city" align="center" label="户籍市州" show-overflow-tooltip key="t5">
							</el-table-column>
							<el-table-column prop="country" align="center" label="户籍区县" show-overflow-tooltip key="t6">
							</el-table-column>
							<el-table-column prop="town" align="center" label="户籍乡镇" show-overflow-tooltip key="t7">
							</el-table-column>
							<el-table-column prop="village" align="center" label="户籍村" show-overflow-tooltip key="t8">
							</el-table-column>
							<el-table-column prop="status" align="center" label="帮扶状态" show-overflow-tooltip key="t9">
							</el-table-column>
							<el-table-column prop="income" align="center" label="当年收入" show-overflow-tooltip key="t10">
							</el-table-column>
							<el-table-column align="center" label="操作" show-overflow-tooltip key="one">
								<template slot-scope="scope">
									<div class="btns">
										<div class="textBtnLook" @click="goFupin(scope.row.idCard)">查看详情</div>
									</div>
								</template>
							</el-table-column>
						</template>
						<template v-else>
							<el-table-column prop="projectName" align="center" label="项目名称" show-overflow-tooltip key="t15">
							</el-table-column>
							<el-table-column prop="belongType" align="center" label="所属九项工程" show-overflow-tooltip key="t16">
							</el-table-column>
							<el-table-column prop="assistType" align="center" label="带动类型" show-overflow-tooltip key="t17">
							</el-table-column>
							<el-table-column prop="incomeType" align="center" label="带动贫困人口增收方式" show-overflow-tooltip key="t18">
							</el-table-column>
							<el-table-column prop="incomeTime" align="center" label="收入时间" show-overflow-tooltip key="t19">
							</el-table-column>
							<el-table-column prop="income" align="center" label="收入金额" show-overflow-tooltip key="t20">
							</el-table-column>
							<el-table-column prop="inputTime" align="center" label="填报时间" show-overflow-tooltip key="t21">
							</el-table-column>
							<el-table-column prop="status" align="center" label="信息状态" show-overflow-tooltip key="fist">
								<template slot-scope="scope">
									{{['已保存', '未审核', '已驳回', '已通过', '省级已标记', '市级已标记'][scope.row.status]}}
								</template>
							</el-table-column>
							<el-table-column align="center" label="操作" show-overflow-tooltip>
								<template slot-scope="scope">
									<div class="btns">
										<template v-if="userInfo.username == scope.row.inputUser && (scope.row.status == 2 || scope.row.status == 4 || scope.row.status == 5 || scope.row.status == 0)">
											<div class="textBtnLook" @click="goModify(scope.row.id, scope.row.poorName)">修改</div>
										</template>
										<template v-else-if="scope.row.status == 1 && userInfo.username != scope.row.inputUser && userInfo.role == '区县'">
											<div class="textBtnLook" @click="gochakna(scope.row.id, scope.row.poorName)">审查</div>
										</template>
										<template v-else>
											<div class="textBtnLook" @click="gofupinyang(scope.row.id, scope.row.status, scope.row.inputUser, scope.row.poorName)">查看</div>
										</template>
							
									</div>
								</template>
							</el-table-column>
						</template>
					</el-table>

				</div>
				<!-- 此处 total !== 0 是为了保证total为0时，保存在本地currentPage覆盖式会被自动重置为1 -->
				<div class="fenye" v-if="total !== 0">
					<div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据 共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
					<el-pagination :current-page.sync="currentPage" @current-change="handleCurrentPage" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
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
import fill from "@/assets/api/fill"
import allApi from "@/assets/api/user"

export default {
	data() {
		return {
			pageType: 'yes',
			
			information:[{
				value:'0',
				label:'已保存'
			},{
				value:'1',
				label:'未审核'
			},{
				value:'2',
				label:'已驳回'
			},{
				value:'3',
				label:'已通过'
			},{
				value:'4',
				label:'省级已标记'
			},{
				value:'5',
				label:'市级已标记'
			}],
			isFilter: false, // 是否展开筛选
			filter: {
				poorName:'',
				idCard: '',
				status: ''
			},
			pageSize: 10,
			total: 0,
			currentPage: 1,

			tableData: [
				
			],
			userInfo: {},
		}
	},
	created(){
		// 根据需求，当子窗口刷新父窗口时获取current
		// 如果total为0时，获取的历史currentPage最终无法覆盖分页器的值，所有需要 total !== 0 来控制渲染分页器
		if(sessionStorage.getItem('pageData')){
			let {pageNumber, idCard, status} = JSON.parse(sessionStorage.getItem('pageData'));
			this.filter.idCard = idCard || ''
			this.filter.status = status || ''
			this.currentPage = pageNumber || 1
		}
		
		this.getData()
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		
		
		
	},
	beforeRouteLeave: (to, from, next) => {
		sessionStorage.removeItem('pageData')
		next()
	},
	components: { 'my-footer': footer },
	methods: {
		indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
		find(){
			this.currentPage = 1;
			this.getData();
			this.isFilter = false;
		},
		handleCurrentPage(b){
			this.getData()
		},
		getData(){
			let par = {
				poorName: this.filter.poorName,
				idCard: this.filter.idCard,
				status: this.filter.status,
				pageSize: this.pageSize,
				pageNumber: this.currentPage,
			}
			
			let api = {
				'yes': fill.meReport,
				'no': fill.meAssist
			}
			
			if(this.pageType == 'no'){
				delete par.status
			}
			
			sessionStorage.setItem('pageData', JSON.stringify(par))
			
			fetch.get(api[this.pageType], par, res => {
				if(res.code === 200){
					this.tableData = res.data;
					this.total = res.total;
					
				}else{
					this.tableData = [];
					this.total = 0;
				}
			}, {target: '.el-table__body-wrapper'})
		},
		
		handleFilter() {
			this.isFilter = !this.isFilter;
		},
		goFupin(idCard) {
			const { href } = this.$router.resolve({
				name: '扶贫人口',
				query: {
					idCard: idCard,
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		switchType(type){
			if(type == this.pageType){
				return
			}
			
			sessionStorage.removeItem('pageData') // 清除本地保存currentPage
			
			this.pageType = type
			this.filter.poorName = ''
			this.filter.idCard = ''
			this.filter.status = ''
			this.pageSize = 10
			this.total = 0
			this.currentPage = 1
			this.getData();
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

       	},
       	gochakna(id, poorName) {
            const { href } = this.$router.resolve({
                name: '省级扶贫详情',
                query: {
                    type: '审查',
                    id: id,
                    poorName: poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
        },
        gofupinyang(id, state, nickName, poorName) {
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
                    poorName: poorName,
                }
            })
            window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
        },
        exports(){
			let {idCard, status} = this.filter;
			let par = {
				idCard, status
			}
			fetch.export(fill.export, par, res => {
				if(res.code === 200){
					window.location = res.href
				}
			}, {target: '.btn2', loadingText: '正在导出'})
		},
	},
	computed: {
		optionsapproach: function(){
			this.filter.incomeType = '';
			var arr = [0, 10];
			if(this.filter.assistType == '直接带动'){
				arr = [0, 7]
			}else if(this.filter.assistType == '间接带动'){
				arr = [7, 10]
			}
			return this.optionsapproachOld.slice(arr[0], arr[1])
		}
		
	}
}

</script>

<style scoped>
.public {
  height: 100%;
  position: relative;
}
.footer {
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
.filter {
  height: 74px;
  display: flex;
  justify-content: space-between;
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
.isFilter > img {
  margin-right: 10px;
  transition: all 0.3s;
}
.filterBox {
  position: absolute;
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 36px 50px 46px 50px;
  height: auto;
  z-index: 2001;
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
  margin-top: 13px;
}
.filter_btn > div {
  margin-left: 30px;
}
.table {
  flex: 1;
}
.circle{
	display: inline-block;
	width: 16px;
	height: 16px;
	background: #dbdbdb;
	border-radius: 50%;
	margin-right: 4px;
	position: relative;
}
.sw-active .circle:after{
	content: '';
	display: inline-block;
	border-radius: 50%;
	width: 8px;
	height: 8px;
	background: #fff;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;	
	bottom: 0;
	margin: auto;
}
.sw{
	color: #303638;
	margin: 0 20px;
	cursor: pointer;
	font-size: 16px;
	display: flex;
	align-items: center;
}
.sw-active{
	color: #4b6fa7;
	
}
.sw-active .circle{
	background: #4b6fa7;
}

</style>
