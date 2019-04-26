<template>
	<div class="public area "  @click.stop='isFilter=false'>
		<div class="main">
			<div class="main_content">
				<div class="filter"  @mouseenter='isFilter=true' @click.stop='isFilter=true'>
					
							<el-form :inline="true" :model="filter" class="demo-form-inline">
								<el-form-item label="申请区县">
									<el-select v-model="filter.countryId" placeholder="全部" clearable>
										<el-option v-for="item in countyOps" :key="item.id" :label="item.orgName" :value="item.id">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="申请类型">
									<el-select v-model="filter.usertype" placeholder="全部" clearable>
										<el-option v-for="item in optionsTypes" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="审核状态">
									<el-select v-model="filter.Status" placeholder="全部" clearable>
										<el-option v-for="item in optionsStatus" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</el-form-item>
								<el-form-item label="申请日期">
									<div class="block">
										<el-date-picker v-model="filter.time" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
										</el-date-picker>
									</div>
								</el-form-item>
							</el-form>
							<div class="filter_btn">
								<div class="btn btn1" @click.stop="addquery">查询</div>
								<!-- <div class="btn btn3" @click="exports">批量导出</div> -->
							</div>
				</div>
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
						<el-table-column type="index" :index="indexMethod" label="序号" align="center" width="100px">
						</el-table-column>
						<el-table-column prop="country" align="center" label="申请区县" show-overflow-tooltip>
						</el-table-column>
						<el-table-column align="center" label="申请类型" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{scope.row.applyType == 1 ? '更名': '添加'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="applyTime" align="center" label="申请日期" show-overflow-tooltip>
							<template slot-scope="scope">
								{{!scope.row.applyTime ? '' : scope.row.applyTime.slice(0, 10)}}
							</template>
						</el-table-column>
						<el-table-column prop="checkStatus" align="center" label="审批状态" show-overflow-tooltip>
							<template slot-scope="scope">
								<span>{{ scope.row.checkStatus === 0 ? '待审批' : scope.row.checkStatus === 1 ? '已通过' : '未通过'}}</span>
							</template>
						</el-table-column>
						<el-table-column prop="checkTime" align="center" label="审批日期" show-overflow-tooltip>
							<template slot-scope="scope">
								{{!scope.row.checkTime ? '' : scope.row.checkTime.slice(0, 10)}}
							</template>
						</el-table-column>
						<el-table-column align="center" label="操作" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="btns">
									<div class="textBtnLook" @click="goArea(scope.row.id)">查看详情</div>
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
		<div class="footer">
			<my-footer></my-footer>
		</div>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import area from "@/assets/api/area"
import allApi from "@/assets/api/user"
import footer from '@/components/com/footer'
export default {
	data() {
		return {
			countyOps: [],
			//申请类型
			valueTypes: '全部',
			optionsTypes: [{
				value: '0',
				label: '添加'
			}, {
				value: '1',
				label: '更名'
			}],
			//审核状态
			valueStatus: '全部',
			optionsStatus: [{
				value: '0',
				label: '待审批'
			}, {
				value: '1',
				label: '已通过'
			}, {
				value: '2',
				label: '未通过'
			}],
			value1: '',
			isFilter: false, // 是否展开筛选
			filter: {
				countryId: '',
				usertype: '',
				Status: '',
				time: '',
			},
			pageSize: 10,
			total: 0,
			currentPage: 1,

			tableData: [
			],
			multipleSelection: [],
		}
	},
	created() {
		this.getData()
		this.getFilter()
	},
	components: { 'my-footer': footer },
	methods: {
		indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		handleCurrentChange() {
			this.getData();
		},
		// 查询
		addquery() {
			this.currentPage = 1;
			this.getData()
			this.isFilter = false;
		},
		goArea(id) {
			const { href } = this.$router.resolve({
				name: '行政区划',
				query: {
					type: '2',
					id: id
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		getData() {
		let par = {
			pageSize: this.pageSize,
			pageNumber: this.currentPage,
			applyCountry: this.filter.countryId,
			applyType: this.filter.usertype,
			checkStatus: this.filter.Status,
			queryTime: this.filter.time,
		}

		fetch.get(area.xzdistrict, par, res => {
			if (res.code == 200) {
				res.data[0].applyTime = res.data[0].applyTime.slice(0, 10)
				res.data[0].checkTime = res.data[0].checkTime.slice(0, 10)
				this.tableData = res.data;
				this.total = res.total;

			} else {
				this.tableData = [],
					this.total = 0;
			}

		}, { target: '.el-table__body-wrapper' });
	},
	getFilter() {
		let par = {
			orgLevel:3
		}
		fetch.get(allApi.getDivsion, par, res => {
			if (res.code === 200) {
				this.countyOps = res.data
			}
		})
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
  display: flex;
  justify-content: start;
  padding-left: 30px;
  align-items: center;
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
  z-index: 999;
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