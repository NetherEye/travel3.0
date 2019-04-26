<template>
	<div class="public" @click.stop='isFilter=false'>
		<div class="main">
			<div class="main_content">
				<div class="filter lhrXg">
							<el-form :inline="true" :model="filter" class="demo-form-inline">
								<el-form-item label="培训名称">
									<el-input v-model="filter.user" placeholder="培训名称" ></el-input>
								</el-form-item>
								<el-form-item label="培训类别">
									<el-select v-model="filter.region" placeholder="全部" clearable>
										<el-option label="乡村旅游致富带头人培训" value="乡村旅游致富带头人培训"></el-option>
										<el-option label="培训旅游从业人员" value="培训旅游从业人员"></el-option>
										<el-option label="培养乡村旅游骨干" value="培养乡村旅游骨干"></el-option>
										<el-option label="旅游扶贫重点村干部培训" value="旅游扶贫重点村干部培训"></el-option>
									</el-select>
								</el-form-item>
                <el-form-item label="州市">
                  <el-select v-model="filter.area" ref="cityName" @change="hqQx(filter.area)" clearable placeholder="全部">
                    <el-option
                      v-for="item in city"
                      :key="item.id"
                      :label="item.orgName"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="县区">
                  <el-select v-model="filter.xian" placeholder="全部" clearable>
                    <el-option
                      v-for="i in county"
                      :key="i.id"
                      :label="i.orgName"
                      :value="i.id">
                    </el-option>
                  </el-select>
                </el-form-item>
								<el-form-item label="时间">
									<div class="block">
										<el-date-picker v-model="filter.time" type="month"  value-format="yyyy-MM" placeholder="选择日期">
										</el-date-picker>
									</div>
								</el-form-item>

							</el-form>
							<div class="filter_btn">
								<div class="btn btn1" @click.stop="find">查询</div>
							</div>
						</div>
          <!--&lt;!&ndash;</transition>&ndash;&gt;-->
				<!--</div>-->
				<div class="table">
					<el-table ref="table" :data="tableData" tooltip-effect="dark" style="width: 99%;" height="100%" header-cell-class-name="tableTou" cell-class-name="tableRow" @selection-change="handleSelectionChange">
						<el-table-column type="index" label="序号" :index="indexMethod" align="center" width="100px">
						</el-table-column>
						<el-table-column label="培训名称" align="center" show-overflow-tooltip>
							<template slot-scope="scope">{{ scope.row.trainName }}</template>
						</el-table-column>
						<el-table-column prop="belongCity" label="所属市州" align="center" show-overflow-tooltip>
						</el-table-column>
						<el-table-column prop="belongDistrict" align="center" label="所属区县" show-overflow-tooltip>
						</el-table-column>
						<el-table-column align="center" prop="trainType" label="培训类别" show-overflow-tooltip>

						</el-table-column>
						<el-table-column align="center" prop="principal" label="培训负责人" show-overflow-tooltip>

						</el-table-column>
						<el-table-column align="center" prop="principalPhone"  label="培训负责人电话" show-overflow-tooltip>

						</el-table-column>
						<el-table-column align="center" prop="countPerson" label="参与人数" show-overflow-tooltip>

						</el-table-column>
						<el-table-column align="center" label="操作" show-overflow-tooltip>
							<template slot-scope="scope">
								<div class="btns">
									<div class="textBtnLook" @click="isXq(scope.$index)">查看</div>
									<div class="textBtnLook m">/</div>
									<div class="textBtnLook" @click="isFind(scope.$index)">名单</div>
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
import footer from '@/components/com/footer'
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/peixun"
export default {
	data() {
		return {
		  county:'',
      city : '',
			isFilter: false, // 是否展开筛选
			filter: {
        user : '',
        region : '',
        area :'',
        time : '',
        xian : ''
			},
			pageSize: 10,
			total: 0,
			currentPage: 0,
			tableData: [

			],
			multipleSelection: [],

      selectedOptions: [],
    };
	},
	components: {
		'my-footer': footer
	},
  created(){
	  this.getMainData()
    this.orgCity()
  },
	methods: {
    indexMethod(index) { return index + 1 + (this.currentPage - 1) * this.pageSize; },
    handleCurrentChange () {
      this.getMainData()
    },
    find() {
      this.currentPage = 1;
      this.getMainData();
      this.isFilter = false;
    },
    hqQx (val) {
      let a = {
        id : val
      }
      fetch.get(allApi.getCountry,a,res=>{
        this.county = res.data
        this.filter.xian = ''
      })
    },
	  // 获取市
    orgCity () {
      fetch.get(allApi.org,'',res=>{
        this.city = res.data
      })
    },
    findData () {
      this.getMainData()
    },
    getMainData() {
      let a = {
        trainName: this.filter.user,
        trainType : this.filter.region,
        trainDate : this.filter.time,
        trainCity : this.filter.area,
        trainDistrict : this.filter.xian,
        pageSize : 10,
        pageNumber : this.currentPage
      }
      fetch.get(allApi.mainData,a,res=>{
        if (res.code == 200) {
          this.tableData = res.data
          this.total = res.total
        } else if (res.code == 201){
          this.tableData = ''
          this.total = 0
        }
      }, {target: '.el-table__body-wrapper'})

    },
		isXq(index) {
			const {
				href
			} = this.$router.resolve({
				name: '培训活动详情',
				query: {
					id: this.tableData[index].id,
					b: 2
				}
			})
      window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
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
		isFind(index) {
			const {
				href
			} = this.$router.resolve({
				name: '扶贫信息查看',
				query: {
					id: this.tableData[index].id,
          pageSize: 10,
          pageNumber : this.currentPage,
          jibie : '省级'
				}
			})
      window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		
	}
}
</script>

<style scoped>
.public {
  height: 100%;
  position: relative;
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
  align-items: center;
  position: relative;
  justify-content: start;
  padding-left: 20px;
}

.footer {
  height: 60px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
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
  padding-left: 52px;
}

.filter_btn > div {
  margin-left: 30px;
}

.table {
  flex: 1;
}
</style>
