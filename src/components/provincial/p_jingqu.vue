<template>
	<div class="public jingqu " @click.stop='isFilter=false'>
		<div class="main">
			<div class="main_content">
				<div class="filter" @mouseenter='isFilter=true' @click.stop='isFilter=true'>
					<el-form :inline="true" class="demo-form-inline">
						<el-form-item label="景区名称">
							<el-input class="mar" clearable v-model="user" width="80px" placeholder="景区名称"></el-input>
						</el-form-item>
						<el-form-item label="景区类别">
							<el-select v-model="accounting" clearable placeholder="全部">
								<el-option v-for="item in  optionaccounting" :key="item.value" :label="item.label" :value="item.label"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="景区融合类型">
							<el-select v-model="Category" clearable placeholder="全部">
								<el-option v-for="item in optionsCategory" :key="item.value" :label="item.label" :value="item.label"></el-option>
							</el-select>
						</el-form-item>
					</el-form>
					<div class="filter_btn">
						<div class="btn btn1" @click.stop="addquery">查询</div>
						<div class="btn btn2" @click="exports">批量导出</div>
					</div>
				</div>
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
						<el-table-column type="index" :index="indexMethod" label="序号" align="center" width="100px">
						</el-table-column>
						<el-table-column prop="scenicName" label="景区名称" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="scenicType" align="center" label="景区类别" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="fusionype" align="center" label="景区融合类型" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="country" align="center" label="所属市州" show-overflow-tooltip>
						</el-table-column>
						<el-table-column align="center" label="操作" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="btns">
									<div class="textBtnLook" @click="goScenic(scope.row.id)">查看详情</div>
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
import jingqu from "@/assets/api/jingqu"
import footer from '@/components/com/footer'
export default {
	data() {
		return {
			isFilter: false, // 是否展开筛选
			user: '',
			//景区类别
			accounting: '',
			optionaccounting: [
				{ value: '-1', label: '5A级景区' },
				{ value: '0', label: '4A级景区' },
				{ value: '1', label: '3A级景区' },
				{ value: '-2', label: '2A级景区' },
				{ value: '2', label: '100旅游景区' },
				{ value: '3', label: '国家级度假区' },
				{ value: '4', label: '省级度假区' },
				{ value: '5', label: '其他类型' },
			],
			//景区旅游类别
			Category: '',
			optionsCategory: [
				{ value: '-1', label: '温泉' },
				{ value: '0', label: '综合体' },
				{ value: '1', label: '农旅融合' },
				{ value: '2', label: '文旅融合' },
				{ value: '3', label: '体旅融合' },
				{ value: '4', label: '水旅融合' },
				{ value: '5', label: '森旅融合' },
				{ value: '6', label: '小城镇旅游融合' },
				{ value: '7', label: '工业旅游融合' }
			],
			pageSize: 10,
			total: 0,
			currentPage: 1,

			tableData: [],
			multipleSelection: [],
		}
	},
	created() {
		this.getData();
	},
	components: { 'my-footer': footer },
	methods: {
		indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
		handleFilter() {
			this.isFilter = !this.isFilter;
		},
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
		goScenic(id) {
			const { href } = this.$router.resolve({
				name: '景区基本信息',
				query: {
					type: '查看',
					id: id,

				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		handleCurrentChange() {
			this.getData();
		},
		// 查询
		addquery() {
			this.currentPage = 1;
			this.getData();
			this.isFilter = false;
		},
		// 导出
		exports() {
			// let {user, accounting, Category} = this.filter;
			let par = {
				scenicName: this.user,
				scenicType: this.accounting,
				fusionType: this.Category,
			}
			// return;
			fetch.export(jingqu.scenic, par, res => {
				if (res.code === 200) {
					window.location = res.href
				}
			}, { target: '.btn3', loadingText: '正在导出' })
		},
		getData() {
			let par = {
				pageSize: this.pageSize,
				pageNumber: this.currentPage,
				scenicName: this.user,
				scenicType: this.accounting,
				fusionType: this.Category,
			}
			fetch.get(jingqu.jingqulist, par, res => {
				if (res.code === 200) {
					this.tableData = res.data;
					this.total = res.total;
					this.checkBottom();
					this.$refs.drawerLayout.toggle(false);
				} else {
					this.loading = false;
					this.tableData = [];
					this.total = 0;
					fetch.feedBack(res, this)
				}

			}, { target: '.el-table__body-wrapper' });
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