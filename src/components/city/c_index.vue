<template>
	<div class="public city procin">
		<div class="main loading">
			<div class="left">
				<div class="top">
					<div class="data_item">
						<p class="data_p">2017-2019年3年计划数： <span class="data" @click="addmi('totalNumber', '2017-2019年3年各市州扶贫/培训计划数')">{{tableData.totalNumber}}人</span></p>
						<div class="line" style="height: 1px;background:rgba(238,238,238,1);"></div>
						<p class="data_p">2017年计划数： <span class="data" @click="addmi('firstNumber', '2017年各市州扶贫/培训计划数')">{{tableData.firstNumber}}人</span></p>
						<div class="line" style="height: 1px;background:rgba(238,238,238,1);"></div>
						<p class="data_p">2018年计划数： <span class="data" @click="addmi('secondNumber', '2018年各市州扶贫/培训计划数')">{{tableData.secondNumber}}人</span></p>
						<div class="line" style="height: 1px;background:rgba(238,238,238,1);"></div>
						<p class="data_p">2019年计划数： <span class="data" @click="addmi('thirdNumber', '2019年各市州扶贫/培训计划数')">{{tableData.thirdNumber}}人</span></p>
					</div>
				</div>
				<div class="line" style="height: 1px;background:rgba(238,238,238,1);"></div>
				<div class="bottom">
					<div class="data_item">
						<div style="display: flex;align-items: center;height: 120px;">
							<div class="right_p pie1">本年度完成数</div>
							<div class="right_p pie2">本年度未完成数</div>
						</div>
						<div class="pie">

							<div id="pieBox1"></div>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="filter">
					<el-date-picker v-model="filter.startTime" type="month" placeholder="起始日期" value-format="yyyy-MM" @change="filter.endTime = ''" :picker-options="disDate" style="width: 180px;margin: 8px;">
					</el-date-picker>
					<el-date-picker v-model="filter.endTime" type="month" placeholder="结束日期" value-format="yyyy-MM" :picker-options="disDate1" style="width: 180px;margin: 8px;">
					</el-date-picker>
					<div class="btn btn1" style="margin: 8px;" @click="addquery">查询</div>
					<div class="btn btn2" style="margin: 8px;" @click="exports">导出培训进度表</div>
					<div class="btn btn3" style="margin: 8px;" @click="inports">导出扶贫进度表</div>
					<div class="btn btn4" style="margin: 8px;" @click="exportNine">导出九项工程</div>
				</div>
				<div class="right_content">
					<div class="right_content_item" v-for="(item, i) in rightArr" :key="i">
						<div class="item_left">{{item.orgName}}</div>
						<div class="item_center">
							<el-progress :percentage="item.personCount != 0 ? item.personCount / rightArrTotal * 100 : 0" color="#306CA4" :show-text="false"></el-progress>
						</div>
						<div class="item_right">{{item.personCount}}</div>

					</div>
				</div>
			</div>
		</div>
		<!-- 弹框 -->
		<el-dialog :title="title" :visible.sync="dialogTableVisible" center width="570px">
			<el-table :data="tu" class="ycy" height="528px">
				<el-table-column type="index" label="序号" width="100%" align="center"></el-table-column>
				<el-table-column property="orgName" label="市州" align="center"></el-table-column>
				<el-table-column property="value" label="计划人数(人)" align="center"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">取 消</el-button>
			</div>
		</el-dialog>
		<el-dialog title="导出九项工程" :visible.sync="exportNineShow" width="500px">
			<el-select v-model="exportNineObj.belongType" placeholder="请选择">
				<el-option v-for="item in optionsEngineers" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<el-date-picker v-model="exportNineObj.year" :clearable="false" type="year" placeholder="选择年" format="yyyy年" value-format="yyyy" :editable="false">
			</el-date-picker>
			<span slot="footer" class="dialog-footer">
			    <el-button @click="exportNineShow = false">取 消</el-button>
			    <el-button type="primary" @click="exportNineHttp">确 定</el-button>
			  </span>
		</el-dialog>
		<div class="footer">
			<my-footer></my-footer>
		</div>
	</div>
</template>

<script>
var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/grid');
require("echarts/lib/component/legendScroll");

import footer from '@/components/com/footer'
import fetch from "@/assets/tools/fetch"
import index from "@/assets/api/index"
import allApi from "@/assets/api/peixun"
import user from "@/assets/api/user"
export default {
	data() {
		return {
			filter: {
				startTime: '',
				endTime: '',
			},
			dialogTableVisible: false,
			rightArr: [],
			tableData: [],
			mi: '',
			tu: [],
			title: '',
			fpFinsin: {
				finishCount: null,
				planCount: null
			},
			disDate: {
				disabledDate: time => {
					var falg = false;
					if(time.getFullYear() == new Date().getFullYear()){
						if (time.getMonth() > new Date().getMonth()) {
							falg = true
						}
					}else if(time.getFullYear() > new Date().getFullYear()){
						falg = true
					}
					
					return falg;
				}
			},
			disDate1: {
				disabledDate: time => {
					var falg = false;

					if(this.filter.startTime){
						if (time.getFullYear() < new Date(this.filter.startTime).getFullYear()) {
							falg = true
						}else if(time.getFullYear() == new Date(this.filter.startTime).getFullYear()){
							if (time.getMonth() < new Date(this.filter.startTime).getMonth()) {
								falg = true
							}
						}
					}
					
					if(time.getFullYear() == new Date().getFullYear()){
						if (time.getMonth() > new Date().getMonth()) {
							falg = true
						}
					}else if(time.getFullYear() > new Date().getFullYear()){
						falg = true
					}
					
					return falg;
				}
			},
			userInfo: {},
			rightArrTotal: 0,
			exportNineShow: false,
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
			exportNineObj: {
				belongType: '',
				year: ''
			}
		}
	},
	created() {
		this.getData();
		this.pieData();
		if (localStorage.getItem('userInfo')) {
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	components: { 'my-footer': footer },
	mounted() {
		this.getFilter();
		this.getxingqing();
	},
	methods: {
		// 导出
		exports() {
			this.$confirm('导出市州或区县培训进度表, 请选择?', '提示', {
	        	confirmButtonText: '区县',
	        	cancelButtonText: '市州',
	        	type: 'success',
	        	closeOnPressEscape: false,
	        	distinguishCancelAndClose: true
	        }).then(() => {
	        	this.exportsP('county')
	        }).catch(action => {
	        	if(action == 'cancel'){
	        		this.exportsP('city')   
	        	}
	       		     
	        });
		},
		exportsP(type) {
			let url,btn;
			if(type == 'city'){
				url = allApi.exportCity
				btn = '.btn2'
			}else{
				url = allApi.exportCounty
				btn = '.btn2'
			}
			fetch.export(url, '', res => {
				if (res.code === 200) {
					window.location = res.href
				}
			}, { target: btn, loadingText: '正在导出' })
		},
		//
		inports() {
			
			this.$confirm('导出市州或区县扶贫进度表, 请选择?', '提示', {
	        	confirmButtonText: '区县',
	        	cancelButtonText: '市州',
	        	type: 'success',
	        	closeOnPressEscape: false,
	        	distinguishCancelAndClose: true
	        }).then(() => {
	        	this.exportsF('country')
	        }).catch(action => {
	        	if(action == 'cancel'){
	        		this.exportsF('city')   
	        	}
	       		     
	        });
			
			
		},
		exportsF(url){
			fetch.export(index.helpPoor + '/' + url, '', res => {
				if (res.code === 200) {
					window.location = res.href
				}
			}, { target: '.btn3', loadingText: '正在导出' })
		},
		pieData() {
			let par = {
				planType: 1,
				startTime: '',
				finishTime: ''
			}
			fetch.get(index.pieData, par, res => {
				if (res.code === 200) {
					this.fpFinsin = res.data;
					this.initEcharts();
				}
			}, { target: '.bottom' })
		},
		addmi(key, title) {
			this.dialogTableVisible = true,
				this.title = title;
			this.tu = [];
			this.gridData.forEach(a => {
				let obj = {
					value: a[key],
					orgName: a.orgName,
				}
				this.tu.push(obj)
			})

		},
		// 弹框

		initEcharts() {
			var myChart = echarts.init(document.getElementById('pieBox1'));
			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				calculable: true,
				labelLine: { show: false, },
				series: [
					{
						name: '旅游扶贫计划数',
						type: 'pie',
						radius: ['73%', '100%'],
						startAngle: 260, // 圆形旋转角度
						avoidLabelOverlap: false,
						hoverAnimation: false,
						data: [
							{
								value: this.fpFinsin.finishCount, name: '本年度完成数',
								label: {
									show: true, position: 'center', formatter: "{d}%", color: "#3a4c70", fontSize: 26
								},
								itemStyle: {
									color: "#2c7ecc"
								},
								labelLine: { show: false, },
							},
							{								value: this.fpFinsin.planCount - this.fpFinsin.finishCount, name: '本年度未完成数',
								itemStyle: {
									color: "#3bbba2",
								},
								label: {
									show: false, position: 'center', formatter: "{d}%", color: "#3a4c70", fontSize: 26
								},
							},
						]
					}
				]
			});

		},
		//查询
		addquery() {
			this.getData()
		},
		// 进度
		getData() {
			let par = {
				startTime: this.filter.startTime,
				finishTime: this.filter.endTime
			}
			fetch.get(index.travelAssist, par, res => {
				
				if (res.code === 200) {
					this.rightArr = res.data;
					this.rightArrTotal = 0;
					res.data.forEach((prev) =>{
						this.rightArrTotal += prev.personCount;
					});
				} else {
					this.rightArr = [];
				}
			}, { target: '.right_content' })
		},
		// 市年度进度
		getFilter() {
			fetch.get(index.count, '', res => {
				this.mi = res.code;
				if (res.code === 200) {
					this.tableData = res.data;
				}
			}, { target: '.top' })
		},
		//旅游扶贫计划数详情
		getxingqing() {
			let par = {
				planType: 1
			}
			fetch.get(index.detail, par, res => {
				if (res.code === 200) {
					this.gridData = res.data;
				}
			})
		},
		exportNine(){
			this.exportNineObj = {
				belongType: '',
				year: ''
			}
			this.exportNineShow = true
		},
		exportNineHttp(){
			if(this.exportNineObj.belongType == '' || this.exportNineObj.year == ''){
				this.$message({
					type: 'warning',
					message: '不能为空！'
				})
				return
			}
			this.exportNineShow = false
			fetch.export(user.exportNine, this.exportNineObj, res => {
				if (res.code === 200) {
					window.location = res.href
				}
			}, { target: '.btn4', loadingText: '正在导出' })
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
  overflow: auto;
}

@media only screen and (max-width: 1860px) {
	.main .right{
		margin-top: 20px;
		float: left;
	}
}

.left {
  display: inline-block;
  width: 702px;
  height: 100%;
  float: left;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.top,
.bottom {
  flex: 1;
}
.right {
  display: inline-block;
  width: 877px;
  height: 100%;
  padding: 0 20px;
  float: right;
  background: #ffffff;
  position: relative;
  overflow: auto;
}
.filter {
  height: 104px;
  display: flex;
  align-items: center;
}
.right_content_item {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item_left,
.item_right {
  width: 180px;
}
.right_content {
  position: absolute;
  top: 104px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
.item_left {
  text-align: right;
  padding-right: 10px;
  font-size: 18px;
  color: rgba(111, 121, 146, 1);
}
.item_right {
  font-size: 20px;
  color: rgba(111, 121, 146, 1);
  padding-left: 10px;
}
.item_center {
  flex: 1;
  padding: 0 10px;
}
.data_item {
  position: relative;
}
.data_title {
  height: 80px;
  font-size: 23px;
  color: rgba(48, 54, 56, 1);
  display: flex;
  align-items: center;
}
.data_title:before {
  content: url(../../../static/img/provincial/qsly.png);
  width: 40px;
  height: 40px;
  margin-right: 7px;
}
.data_p {
  font-size: 16px;
  color: rgba(111, 121, 146, 1);
}
.data_p:nth-child(1) {
  margin-top: 60px;
  margin-bottom: 28px;
  padding-left: 20px;
}
.data_p:nth-child(3) {
  margin-top: 28px;
  margin-bottom: 28px;
  padding-left: 90px;
}
.data_p:nth-child(5) {
  margin-top: 28px;
  margin-bottom: 28px;
  padding-left: 90px;
}
.data_p:nth-child(7) {
  margin-top: 28px;
  margin-bottom: 28px;
  padding-left: 90px;
}
.pie {
  position: absolute;
  top: 100px;
  left: 200px;
}
.right_p {
  font-size: 17px;
  color: rgba(111, 121, 146, 1);
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 12px;
  margin-left: 20px;
  margin-right: 40px;
}
.pie1:before {
  content: url(../../../static/img/provincial/wanchengshu.png);
  width: 18px;
  height: 18px;
  margin-right: 9px;
}
.pie2:before {
  content: url(../../../static/img/provincial/wanchenglv.png);
  width: 18px;
  height: 18px;
  margin-right: 9px;
}
.data_p:last-child {
  margin-bottom: 0;
}
.data {
  font-size: 16px;
  text-decoration: underline;
  cursor: pointer;
}
#pieBox1,
#pieBox2 {
  width: 140px;
  height: 140px;
}
.peix {
}
.peix:before {
  content: url(../../../static/img/provincial/peix.png);
  width: 40px;
  height: 40px;
  margin-right: 7px;
}
@media only screen and (max-width: 1919px) {
  .main {
    padding-right: 0;
  }
}
.line {
  cursor: pointer;
}
</style>