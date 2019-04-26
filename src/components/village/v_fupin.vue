<template>
	<div class="public" @click.stop="isFilter = false">
		<div class="main">
			<div class="main_content">
				<div class="filter" @mouseenter="isFilter = true" @click.stop="isFilter = true">
					<div class="isFilter"><img :class="isFilter ? 'rotate' : ''" src="../../../static/img/provincial/select_icon.png" /><span>{{isFilter ? '收起筛选' : '展开筛选'}}</span></div>
					<transition name="el-zoom-in-top">
						<div class="filterBox" v-show="isFilter" style="padding: 36px 50px 46px 50px;">
							<el-form :inline="true" :model="filter" class="demo-form-inline">
								<el-form-item label="姓名检索">
									<el-input v-model="filter.poorName" clearable placeholder="姓名"></el-input>
								</el-form-item>
								<el-form-item label="身份证号">
									<el-input class="mar" v-model="filter.idCard" clearable style="width:517px" placeholder="身份证号"></el-input>
								</el-form-item>
								<el-form-item label="户籍乡镇" >
									<el-select v-model="filter.townId" clearable  @change="handleTownId" placeholder="全部" filterable>
										<el-option v-for="item in townOps" :key="item.id" :label="item.orgName" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="户籍村" label-width="76px">
									<el-select v-model="filter.villageId" clearable placeholder="全部" filterable>
										<el-option v-for="item in villageOps" :key="item.id" :label="item.orgName" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="九项工程">
										<el-select v-model="filter.belongType" clearable placeholder="全部">
										<el-option v-for="item in optionsEngineers" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="带动类型">
									<el-select v-model="filter.assistType" clearable placeholder="全部">
										<el-option v-for="item in drive" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="带动贫困人口增收方式">
									<el-select v-model="filter.incomeType" clearable placeholder="全部" style="width:423px">
										<el-option v-for="item in optionsapproach" :key="item.value"   :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="信息状态">
									<el-select v-model="filter.status" clearable placeholder="全部">
										<el-option v-for="item in information" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>

								<el-form-item label="人员状态">
									<el-select v-model="filter.personnelStatus" clearable placeholder="全部">
										<el-option v-for="item in personnel" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="收入时间" label-width="76px">
									<el-date-picker v-model="filter.incomeTime" type="year" placeholder="全部" style="width:200px" format="yyyy年"  value-format="yyyy">
									</el-date-picker>
								</el-form-item>
								
							</el-form>
							
							
							
							<div class="filter_btn">
								<div class="btn btn1" @click.stop="find">查询</div>
								<div class="btn btn2" @click="importE">批量导入</div>
								<div class="btn btn3" @click="exports">批量导出</div>
							</div>
						</div>
					</transition>
				</div>
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" width="140px" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
						
						<el-table-column type="index" :index="indexMethod" label="序号" align="center" width="80px">
						</el-table-column>
						<el-table-column prop="poorName" label="贫困人口姓名" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="idCard" align="center" label="身份证号码" width="220px" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="phone" align="center" label="联系方式" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="city" align="center" label="户籍市州" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="country" align="center" label="户籍区县" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="town" align="center" label="户籍乡镇" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="village" align="center" label="户籍村" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="status" align="center" label="帮扶状态" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="income" align="center" label="当年收入" show-overflow-tooltip>
						</el-table-column>
						<el-table-column align="center" label="操作" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="btns">
									<div class="textBtnLook" @click="goFupin(scope.row.idCard)">补充资料</div>
								</div>
							</template>
						</el-table-column>
					</el-table>

				</div>
				<div class="fenye">
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
import fupin from "@/assets/api/fupin"
import allApi from "@/assets/api/user"

export default {
	data() {
		return {
			options: [{
				value: '是',
				label: '是'
			}, {
				value: '否',
				label: '否'
			},],
			//景区类别
			optionaccounting:[
				{ value: '5A级景区', label: '5A级景区' },
				{ value: '4A级景区', label: '4A级景区' },
				{ value: '3A级景区', label: '3A级景区' },
				{ value: '2A级景区', label: '2A级景区' },
				{ value: '100旅游景区', label: '100旅游景区' },
				{ value: '国家级度假区', label: '国家级度假区' },
				{ value: '省级度假区', label: '省级度假区' },
				{ value: '其他类型', label: '其他类型' },
			],
			//带动类型
			drive:[{
				 value:'直接带动',
				 label:'直接带动'
			},{
				 value:'间接带动',
				 label:'间接带动'
			}],
			//带动贫困人口增收方式
			optionsapproachOld: [{
				value: '带动直接就业',
				label: '带动直接就业'
			}, {
				value: '直接参与旅游相关经营增加收入',
				label: '直接参与旅游相关经营增加收入'
			}, {
				value: '直接开办农事体验或旅游活动项目增加收入',
				label: '直接开办农事体验或旅游活动项目增加收入'
			}, {
				value: '直接出售农副土特产品等增加收入',
				label: '直接出售农副土特产品等增加收入'
			}, {
				value: '直接出租房屋或土地等自有资产增加收入',
				label: '直接出租房屋或土地等自有资产增加收入'
			}, {
				value: '将房屋、土地、人力等自有资源折算入股分红',
				label: '将房屋、土地、人力等自有资源折算入股分红'
			}, {
				value: '通过政府、企业低价或无偿提供的停车场、商铺等经营性资产增加收入',
				label: '通过政府、企业低价或无偿提供的停车场、商铺等经营性资产增加收入'
			}, {
				value: '从旅游发展中获得补助收入',
				label: '从旅游发展中获得补助收入'
			},
			{
				value: '通过旅游发展获得资产增值收入',
				label: '通过旅游发展获得资产增值收入'
			},
			{
				value: '其他间接带动方式',
				label: '其他间接带动方式'
			},
			],
			//九项工程
			optionsEngineers:[{
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
			//人员状态
			personnel:[{
				value:'1',
				label:'已帮扶'
			},{
				value:'2',
				label:'未帮扶'
			}],
			isFilter: false, // 是否展开筛选
			filter: {
				poorName:'',
				cityId: '',
				countryId: '',
				townId: '',
				villageId: '',
				belongType: '',
				incomeType: '',
				assistType: '',
				scenicType: '',
				scenicId: '',
				projectAddress: '',
				projectAddressArr: '',
				jingqu1: '',
				jingqu2: '',
			},
			pageSize: 10,
			total: 0,
			currentPage: 1,

			tableData: [
				
			],
			multipleSelection: [],
			cityOps: [],
			countryOps: [],
			townOps: [],
			villageOps: [],
			projectAddressOps: [],
			jingqu2Ops: [],
			jingquOps: [],
		}
	},
	created(){
		this.getData()
		this.getFilter()
	},
	components: { 'my-footer': footer },
	methods: {
		indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
		find(){
			this.currentPage = 1;
			this.getData();
			this.isFilter = false
		},
		getData(){
			let par = {
				poorName: this.filter.poorName,
				idCard: this.filter.idCard,
				cityId: this.filter.cityId,
				countryId: this.filter.countryId,
				townId: this.filter.townId,
				villageId: this.filter.villageId,
				projectAddress: this.filter.projectAddress,
				scenicId: this.filter.scenicId,
				scenicType: this.filter.scenicType,
				incomeTime: this.filter.incomeTime,
				belongType: this.filter.belongType,
				incomeType: this.filter.incomeType,
				assistType: this.filter.assistType,
				status: this.filter.status,
				personnelStatus: this.filter.personnelStatus,
				username: this.filter.username,
				
				
				pageSize: this.pageSize,
				pageNumber: this.currentPage,
			}
			fetch.get(fupin.poorpeopleList, par, res => {
				if(res.code === 200){
					this.tableData = res.data;
					this.total = res.total;
				}else{
					this.tableData = [];
					this.total = 0;
				}
			}, {target: '.el-table__body-wrapper'})
		},
		getFilter(){
			let par = {
				orgLevel: 4,
			}
			fetch.get(allApi.getDivsion, par, res => {
				if(res.code === 200){
					this.townOps = res.data
				}
			})
			
		},
		handleTownId(v){
			this.filter.villageId = '';
			this.villageOps = [];
			
			if(!v) {
				return
			};
			let par = {
				orgId: this.filter.townId
			}
			fetch.get(allApi.getDivsion, par, res => {
				if(res.code === 200){
					this.villageOps = res.data
				}
			})
		},
		handleFilter() {
			this.isFilter = !this.isFilter;
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
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
		exports(){
			let {idCard, cityId, townId, incomeTime, belongType, incomeType, assistType, personnelStatus, status} = this.filter;
			let par = {
				idCard: idCard,
				cityId: cityId,
				townId: townId,
				incomeTime: incomeTime,
				belongType: belongType,
				incomeType: incomeType,
				assistType: assistType,
				status: status,
				personnelStatus: personnelStatus,
			}
			fetch.export(fupin.exportTravelAssist, par, res => {
				if(res.code === 200){
					window.location = res.href
				}
			}, {target: '.btn3', loadingText: '正在导出'})
		},
		importE(){
			const { href } = this.$router.resolve({
				name: '培训信息',
				query: {
					type: '1',
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
			this.isFilter = false;
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
  justify-content: center;
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
</style>
