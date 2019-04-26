<template>
	<div class="public procin">
		<div class="main">
			<div class="left">
				<div class="top">
					<div class="data_item">
						<div class="data_title">
							旅游扶贫计划数
						</div>
						<p class="data_p">2017-2019年3年计划数： <span class="data" @click="addmi('totalNumber', '2017-2019年3年各市州扶贫/培训计划数')">{{mi=='201'?'0':tableData.totalNumber}}人</span></p>
						<p class="data_p">2017年计划数： <span class="data" @click="addmi('firstNumber','2017各市州扶贫/培训计划数')">{{mi=='201'?'0':tableData.firstNumber}}人</span></p>
						<p class="data_p">2018年计划数： <span class="data" @click="addmi('secondNumber','2018年各市州扶贫/培训计划数')">{{mi=='201'?'0':tableData.secondNumber}}人</span></p>
						<p class="data_p">2019年计划数： <span class="data" @click="addmi('thirdNumber','2019年各市州扶贫/培训计划数')">{{mi=='201'?'0':tableData.thirdNumber}}人</span></p>
						<div class="pie piel1">
							<div class="right_p pie1">本年度完成数</div>
							<div class="right_p pie2">本年度未完成数</div>
							<div id="pieBox1"></div>
						</div>
					</div>
				</div>
				<div class="line" style="height: 1px;background:rgba(238,238,238,1);"></div>
				<div class="bottom">
					<div class="data_item">
						<div class="data_title peix">
							培训计划数
						</div>
						<p class="data_p">2017-2019年3年计划数： <span class="data" @click="addmione('totalNumber', '2017-2019年3年各市州扶贫/培训计划数')">{{mione=='201'?'0':tableDataone.totalNumber}}人</span></p>
						<p class="data_p">2017年计划数： <span class="data" @click="addmione('firstNumber','2017各市州扶贫/培训计划数')">{{mione=='201'?'0':tableDataone.firstNumber}}人</span></p>
						<p class="data_p">2018年计划数： <span class="data" @click="addmione('secondNumber','2018年各市州扶贫/培训计划数')">{{mione=='201'?'0':tableDataone.secondNumber}}人</span></p>
						<p class="data_p">2019年计划数： <span class="data" @click="addmione('thirdNumber','2019年各市州扶贫/培训计划数')">{{mione=='201'?'0':tableDataone.thirdNumber}}人</span></p>
						<div class="pie piel2">
							<div class="right_p pie1">本年度完成数</div>
							<div class="right_p pie2">本年度培训计划数</div>
							
							<div id="pieBox2"></div>
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
				<el-table-column type="index" label="序号" align="center"></el-table-column>
				<el-table-column property="orgName" label="市州" align="center"></el-table-column>
				<el-table-column property="value" label="计划人数(人)" align="center"></el-table-column>

			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisible = false">关 闭</el-button>
			</div>
		</el-dialog>

		<el-dialog :title="title" :visible.sync="dialogTableVisibleone" center width="570px">
			<el-table :data="tu" class="ycy" height="528px">
				<el-table-column type="index" label="序号" align="center"></el-table-column>
				<el-table-column property="orgName" label="市州" align="center"></el-table-column>
				<el-table-column property="value" label="计划人数(人)" align="center"></el-table-column>
			</el-table>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTableVisibleone = false">关 闭</el-button>
			</div>
		</el-dialog>
		
		<div class="footer">
			<my-footer></my-footer>
		</div>
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
	</div>
	
</template>

<script>
import fetch from "@/assets/tools/fetch"
import index from "@/assets/api/index"
import allApi from "@/assets/api/peixun"
import user from "@/assets/api/user"

var echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/grid');
require("echarts/lib/component/legendScroll");

import footer from '@/components/com/footer'

export default {
	data() {
		return {
			mi:'',//判断201
			mione:'',//判断201
			filter: {
				startTime: '',
				endTime: '',
			},
			dialogTableVisible: false,
			dialogTableVisibleone: false,
			rightArr: [],
			tableData: [], // 旅游扶贫计划数
			tableDataone: [],  // 培训计划数
			gridData: [], //旅游详情
			gridDataone: [],// 培训详情
			tu: [],
			title: '',
			fupinWan: {
				value: 0,
				total: 0,
			},
			fpFinsin: {
				finishCount: null,
				planCount: null
			},
			pxFinsin: {
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
			rightArrTotal: 0, // 进度条总数 用于计算百分比 
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
	components: { 'my-footer': footer },
	created() {
		this.getData();
		this.getFilter();
		this.getFilterone();
		this.getxingqing();
		this.getpeixunxingqing();

	},
	mounted() {
		this.pieData();
		this.pieData1();
	},
	watch: {
		
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
		            var link = document.createElement('a');
		            link.href = res.href
		            link.download = res.realFileName;
		            document.body.appendChild(link);
		            var evt = document.createEvent("MouseEvents");
		            evt.initEvent("click", false, false);
		            link.dispatchEvent(evt);
		            document.body.removeChild(link);
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
					var link = document.createElement('a');
		            link.href = res.href
		            link.download = res.realFileName;
		            document.body.appendChild(link);
		            var evt = document.createEvent("MouseEvents");
		            evt.initEvent("click", false, false);
		            link.dispatchEvent(evt);
		            document.body.removeChild(link);
				}
			}, { target: '.btn3', loadingText: '正在导出' })
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
					var link = document.createElement('a');
		            link.href = res.href
		            link.download = res.realFileName;
		            document.body.appendChild(link);
		            var evt = document.createEvent("MouseEvents");
		            evt.initEvent("click", false, false);
		            link.dispatchEvent(evt);
		            document.body.removeChild(link);
				}
			}, { target: '.btn4', loadingText: '正在导出' })
		},
		//弹框
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
		addmione(key, title) {
			this.dialogTableVisibleone = true
			this.title = title;
			this.tu = [];
			this.gridDataone.forEach(a => {
				let obj = {
					value: a[key],
					orgName: a.orgName,
				}
				this.tu.push(obj)
			})
		},
		pieData() {
			let par = {
				planType: 2
			}
			fetch.get(index.pieData, par, res => {
				
				if (res.code === 200) {
					this.pxFinsin = res.data
					this.initEcharts2()
				}
			}, {target: '.piel2'})
		},
		pieData1() {
			let par = {
				planType: 1,
				startTime: '',
				finishTime: ''
			}
			fetch.get(index.pieData, par, res => {
				if (res.code === 200) {
					this.fpFinsin = res.data;
					this.initEcharts1();
				}
			}, {target: '.piel1'})
		},
		//查询
		addquery(){
			this.getData()
		},
		//进度
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
				}else{
					this.rightArr=[];
				}
			}, {target: '.right_content'})
		},
		//旅游扶贫计划数
		getFilter() {
			let par = {
				planType: 1
			}
			fetch.get(index.count, par, res => {
				this.mi=res.code
				if (res.code === 200) {
					this.tableData = res.data;
				}
			}, {target: '.top'})
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
		//培训计划数
		getFilterone() {
			let par = {
				planType: 2
			}
			fetch.get(index.count, par, res => {
				this.mione=res.code
				if (res.code === 200) {
					this.tableDataone = res.data;
				}
			}, {target: '.bottom'})
		},
		//培训计划数详情
		getpeixunxingqing() {
			let par = {
				planType: 2
			}
			fetch.get(index.detail, par, res => {
				if (res.code === 200) {
					this.gridDataone = res.data;
				}
			})
		},
		initEcharts1() {
			var myChart = echarts.init(document.getElementById('pieBox1'));
			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)",

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
								value: this.fpFinsin.finishCount,
								name: '本年度完成数',
								label: {
									show: true, position: 'center', formatter: '{d}%', color: "#3a4c70", fontSize: 26
								},
								itemStyle: {
									color: "#2c7ecc"
								},
								labelLine: { show: false, },
							},
							{
								value: this.fpFinsin.planCount - this.fpFinsin.finishCount,
								name: '本年度未完成数',
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
		initEcharts2() {
			var myChart = echarts.init(document.getElementById('pieBox2'));
			myChart.setOption({
				tooltip: {
					trigger: 'item',
					formatter: "{a} <br/>{b}: {c} ({d}%)"
				},
				calculable: true,
				series: [
					{
						name: '培训计划数',
						type: 'pie',
						radius: ['73%', '100%'],
						startAngle: 260, // 圆形旋转角度
						avoidLabelOverlap: false,
						hoverAnimation: false,
						data: [
							{
								value: this.pxFinsin.finishCount,
								name: '本年度完成数',
								label: {
									show: true, position: 'center', formatter: "{d}%", color: "#3a4c70", fontSize: 26
								},
								itemStyle: {
									color: "#2c7ecc"
								},
								labelLine: { show: false, },
							},
							{
								value: this.pxFinsin.planCount - this.pxFinsin.finishCount,
								name: '本年度未完成数',
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
  padding: 0 20px;
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
  font-size: 18px;
  color: rgba(48, 54, 56, 1);
  display: flex;
  align-items: center;
}
.data_title:before {
  content: url(../../../static/img/provincial/qsly.png);
  width: 35px;
  height: 35px;
  margin-right: 7px;
}
.data_p {
  font-size: 16px;
  color: rgba(111, 121, 146, 1);
  padding-left: 10px;
  margin-bottom: 40px;
}
.pie {
  position: absolute;
  right: 24px;
  top: 80px;
}
.right_p {
  font-size: 17px;
  color: rgba(111, 121, 146, 1);
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  padding-left: 12px;
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
  user-select: none;
}
#pieBox1,
#pieBox2 {
  width: 140px;
  height: 140px;
  font-size: 16px;
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
</style>