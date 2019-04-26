<template>
	<div class="public">
		<div class="main">
			<div class="jingqu_box">
				<div class="jingqu_box_top">
					<div class="data_item">
						<div class="data_p">我的计划数： <span class="data" @click="rePlan">{{rightArr.totalNumber}}人</span></div>
						
					</div>
				</div>
				<div class="bottom">
					<div class="data_item">
						<div style="margin-top: 40px;">
							<div class="right_p pie1">本年度完成数</div>
							<div class="right_p pie2">本年度未完成数</div>
						</div>
						<div class="pie">
				
							<div id="pieBox1"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
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
export default {
	data() {
		return {
			filter: {
				startTime: '',
				endTime: '',
			},
			fpFinsin: {
				finishCount: null,
				planCount: null
			},
			rightArr: {},
			pxFinsin: {}
			
		}
	},
	created() {
		this.getData();
		this.pieData()
	},
	mounted(){
	},
	components: { 'my-footer': footer },
	methods: {
		getData() {
			fetch.get(index.count, '', res => {
				if (res.code === 200) {
					this.rightArr = res.data;
					this.isFilter = false;
				} else {
					this.rightArr = {}
				}
			})
		},
		pieData() {
			let par = {
				planType: 1
			}
			fetch.get(index.pieData, par, res => {
				if (res.code === 200) {
					this.pxFinsin = res.data
					this.initEcharts()
				}
			})
		},
		rePlan(){
			this.$prompt('请输入计划数', '提示', {
	        	confirmButtonText: '确定',
	         	cancelButtonText: '取消',
	         	inputPattern: /^[0-9]+$/,
	         	inputErrorMessage: '格式错误'
	        }).then(({ value }) => {
	        	fetch.post(index.replan, {totalNumber: Number(value)}, res => {
	        		if(res.code === 200){
	        			this.getData()
	        			this.pieData()
	        		}
	        	})
	        })
		},
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
								value: this.pxFinsin.finishCount, name: '本年度完成数',
								label: {
									show: true, position: 'center', formatter: "{d}%", color: "#3a4c70", fontSize: 26
								},
								itemStyle: {
									color: "#2c7ecc"
								},
								labelLine: { show: false, },
							},
							{	
								value: this.pxFinsin.planCount - this.pxFinsin.finishCount, name: '本年度未完成数',
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
  padding: 0px 40px 0px 20px;
  overflow: auto;
  display: flex;
  flex-direction: column;
}
.data_item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  padding-left: 10px;
  margin-bottom: 40px;
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
  font-size: 22px;
  width: 100px;
  text-decoration: underline;
  margin-right: 40px;
  cursor: pointer;
}
#pieBox1,
#pieBox2 {
  width: 140px;
  height: 140px;
}
.jingqu_title {
  font-size: 24px;
  color: rgba(48, 54, 56, 1);
  margin: 30px 0;
}
.jingqu_box {
  flex: 1;
  background: rgba(255, 255, 255, 1);
  border-radius: 3px;
  box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
}
.jingqu_box_top {
  height: 120px;
  background: rgba(244, 245, 250, 1);
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>