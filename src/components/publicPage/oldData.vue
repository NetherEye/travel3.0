<template>
	<div class="public">
		<div class="main">
			<div class="main_content">
				<div class="filter">
					<el-form :inline="true" :model="filter">
						<el-form-item label="身份证号">
							<el-input class="mar" v-model="filter.idCard" clearable width="80px" placeholder="身份证号"></el-input>
						</el-form-item>
						<el-form-item label="九项工程">
							<el-select v-model="filter.belongType" clearable placeholder="全部">
								<el-option v-for="item in optionsEngineers" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						
						<el-form-item label="信息状态">
							<el-select v-model="filter.status" clearable placeholder="全部">
								<el-option v-for="item in information" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-form-item>
						<div class="filter_btn">
							<div class="btn btn1" @click.stop="find">查询</div>
							<div class="btn btn2" @click.stop="exports">批量导出</div>
						</div>
					</el-form>
					
				</div>
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" width="140px" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow">
						<el-table-column type="index" :index="indexMethod" label="序号" align="center" width="80px">
						</el-table-column>
						<el-table-column prop="poorName" label="贫困人口姓名" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="idCard" align="center" label="身份证号码" width="220px" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="phone" align="center" label="联系方式" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="projectName" align="center" label="项目名称" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="belongType" align="center" label="所属九大工程" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="assistType" align="center" label="带动类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="incomeType" align="center" label="带动贫困人口增收方式" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="incomeTime" align="center" label="收入时间" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="income" align="center" label="收入金额" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="status" align="center" label="信息状态" show-overflow-tooltip>
							<template slot-scope="scope">
								{{
									['已保存', '未审核', '已驳回', '已通过', '省级已标记', '市级已标记'][scope.row.status]
								}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="操作" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="btns">
									<div class="textBtnLook" @click="goFupin(scope.row.idCard, scope.row.poorName, scope.row.id)">修改</div>
								</div>
							</template>
						</el-table-column>
					</el-table>

				</div>
				<!-- 此处 total !== 0 是为了保证total为0时，保存在本地currentPage覆盖式会被自动重置为1 -->
				<div class="fenye" v-if="total !== 0">
					<div class="fenye_title">共 {{total}} 条数据 每页 {{pageSize}} 条数据 共 {{Math.floor(total/pageSize) + (total%pageSize != 0 ? 1 : 0)}} 页</div>
					<el-pagination :current-page.sync="currentPage" @current-change="getData" :page-size="pageSize" layout="prev, pager, next, jumper" :total="total">
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
import oldData from "@/assets/api/oldData"

export default {
	data() {
		return {
			optionsEngineers: [{
				value: '旅游项目建设扶贫工程',
				label: '旅游项目建设扶贫工程'
			}, {
				value: '景区带动旅游扶贫工程',
				label: '景区带动旅游扶贫工程'
			}, {
				value: '旅游资源开发扶贫工程',
				label: '旅游资源开发扶贫工程'
			}, {
				value: '乡村旅游扶贫工程',
				label: '乡村旅游扶贫工程'
			}, {
				value: '旅游商品扶贫工程',
				label: '旅游商品扶贫工程'
			}, {
				value: '旅游+产业扶贫工程',
				label: '旅游+产业扶贫工程'
			}, {
				value: '旅游结对帮扶扶贫工程',
				label: '旅游结对帮扶扶贫工程'
			}, {
				value: '乡村旅游标准化建设工程',
				label: '乡村旅游标准化建设工程'
			},
			{
				value: '旅游教育培训扶贫工程',
				label: '旅游教育培训扶贫工程'
			},
			],
			//信息状态
			information: [{
				value: '0',
				label: '已保存'
			}, {
				value: '1',
				label: '未审核'
			}, {
				value: '2',
				label: '已驳回'
			}, {
				value: '3',
				label: '已通过'
			}, {
				value: '4',
				label: '省级已标记'
			}, {
				value: '5',
				label: '市级已标记'
			}],
			
			filter: {
				idCard: '',
				belongType: '',
				status: ''
			},
			pageSize: 10,
			total: 0,
			currentPage: 1,

			tableData: [

			],
		}
	},
	created() {
		// 根据需求，当子窗口刷新父窗口时获取current
		// 如果total为0时，获取的历史currentPage最终无法覆盖分页器的值，所有需要 total !== 0 来控制渲染分页器
		if(sessionStorage.getItem('pageData')){
			let {pageNumber, idCard, status, belongType} = JSON.parse(sessionStorage.getItem('pageData'));
			this.filter.idCard = idCard || ''
			this.filter.status = status || ''
			this.filter.belongType = belongType || ''
			this.currentPage = pageNumber || 1
		}
		
		this.getData()
	},
	beforeRouteLeave: (to, from, next) => {
		sessionStorage.removeItem('pageData')
		next()
	},
	components: { 'my-footer': footer },
	methods: {
		indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
		find() {
			this.currentPage = 1;
			this.getData();
		},
		getData() {
			let par = {
				idCard: this.filter.idCard,
				belongType: this.filter.belongType,
				status: this.filter.status,
				pageSize: this.pageSize,
				pageNumber: this.currentPage,
			}
			
			sessionStorage.setItem('pageData', JSON.stringify(par))
			
			fetch.get(oldData.oldData, par, res => {
				if (res.code === 200) {
					this.tableData = res.data;
					this.total = res.total;
				} else {
					this.tableData = [];
					this.total = 0;
				}
			}, { target: '.el-table__body-wrapper' })
		},
		goFupin(idCard, poorName, id) {
			const { href } = this.$router.resolve({
				name: '旧数据详情',
				query: {
					idCard: idCard,
					poorName: poorName,
					id: id,
					type: 'update'
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		exports(){
			let {idCard, belongType, status} = this.filter;
			let par = {
				idCard, belongType, status
			}
			fetch.export(oldData.export, par, res => {
				if(res.code === 200){
					window.location = res.href
				}
			}, {target: '.btn2', loadingText: '正在导出'})
		},

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
  /*display: flex;
  justify-content: flex-start;
  align-items: center;*/
}
.el-form{
	height: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 20px;
}
.el-form-item{
	margin-bottom: 0;
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
}
.filter_btn > div {
  margin-left: 30px;
}
.table {
  flex: 1;
}
</style>
