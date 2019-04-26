<template>
	<div class="public">
		<div class="main">
			<div class="left">
				<div class="news">
					<div class="new_title"><i class="i1"></i><span>系统通知</span></div>
					<div class="new_content">
						<div class="new_content_item" v-for="(item, i) in new1Arr" :key="i">
							<span class="ellipsis">{{item.title}}</span>
							<span style="width: 200px;min-width: 200px;">{{item.publishTime}}</span>
						</div>
					</div>
					<div class="fenye">
						<div class="fenye_title ellipsis">共 {{total1}} 条数据 每页 {{pageSize1}} 条数据  共 {{Math.floor(total1/pageSize1) + (total1%pageSize1 != 0 ? 1 : 0)}} 页</div>
						<el-pagination :current-page.sync="currentPage1" @current-change="getData" :pager-count="5" small  :page-size="pageSize1" layout="prev, pager, next, jumper" :total="total1">
						</el-pagination>
					</div>  
				</div>
			</div>
			<div class="kong" style="width: 29px;height: 100%;"></div>
			<div class="right">
				<div class="bottom">
					<div class="news">
						<div class="new_title"><i class="i3"></i><span>通知公告</span></div>
						<div class="new_content">
							<div class="new_content_item" v-for="(item, i) in new3Arr" :key="i" @click="look(item)">
								<span class="ellipsis">{{item.title}}</span>
								<span style="width: 200px;min-width: 200px;">{{item.publishTime}}</span>
							</div>
						</div>
						<div class="fenye">
							<div class="fenye_title ellipsis">共 {{total3}} 条数据 每页 {{pageSize3}} 条数据 共 {{Math.floor(total3/pageSize3) + (total3%pageSize3 != 0 ? 1 : 0)}} 页</div>
							<el-pagination :current-page.sync="currentPage3" @current-change="getData3" :pager-count="5" small  :page-size="pageSize3" layout="prev, pager, next, jumper" :total="total3">
							</el-pagination>
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
import footer from '@/components/com/footer'
import fetch from "@/assets/tools/fetch"
import message from "@/assets/api/message"
export default{
	data(){
		return{
			pageSize1: 10,
			total1: 0,
			currentPage1: 1,
			pageSize3: 10,
			total3: 0,
			currentPage3: 1,
			new1Arr: [],
			new3Arr: []
		}
	},
	components: {'my-footer': footer},
	created(){
		this.getData();
		this.getData3();
	},
	methods: {
		go(){
			const {href} = this.$router.resolve({
				name: '通知公告查看',
				query: {
					type: '发布'
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		look(item){
			const {href} = this.$router.resolve({
				name: '通知公告查看',
				query: {
					type: '查看',
					b: 1,
					id: item.id
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		getData(){
			let par1 = {
				pageSize: this.pageSize1,
				pageNumber: this.currentPage1
				
			}
			fetch.get(message.sys, par1, res => {
				if (res.code === 200) {
					this.new1Arr = res.data;
					this.total1 = res.total;
				}else{
					this.new1Arr = [];
					this.total1 = 0;
				}
			})
		},
		getData3(){
			let par3 = {
				pageSize: this.pageSize3,
				pageNumber: this.currentPage3
				
			}
			fetch.get(message.receive, par3, res => {
				if (res.code === 200) {
					this.new3Arr = res.data;
					this.total3 = res.total;
				}else{
					this.new3Arr = [];
					this.total3 = 0;
				}
			})
		}
	}
}
	
</script>

<style scoped>
	.public{
		height: 100%;
		position: relative;
	}
	.footer{
		height: 60px;
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.main{
		position: absolute;
		top: 0;
		bottom: 60px;
		left: 0;
		right: 0;
		background: #eff2f7;
		padding: 00px 40px 0px 20px;
		display: flex;
	}
	.left{
		flex: 1;
	}
	.right{
		flex: 1;
		display: flex;
		flex-direction: column;
	}
	.top{
		flex: 1;
	}
	.bottom{
		flex: 1;
	}
	.news{
		height: 100%;
		position: relative;
	}
	.new_title{
		height: 84px;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
	}
	.new_title>i{
		width: 35px;
		height: 35px;
		margin-right: 11px;
	}
	.i1{
		background: url(../../../static/img/provincial/xttz.png) no-repeat center center;
		background-size: cover;
	}
	.i2{
		background: url(../../../static/img/provincial/wfbd.png) no-repeat center center;
		background-size: cover;
	}
	.i3{
		background: url(../../../static/img/provincial/tzgg.png) no-repeat center center;
		background-size: cover;
	}
	.new_title>span{
		font-size:18px;
		color:rgba(48,54,56,1);
	}
	.new_content{
		position: absolute;
		left: 0;
		right: 0;
		top: 84px;
		bottom: 60px;
		background: #FFFFFF;
		border-radius: 3px 3px 1px 1px;
		overflow: auto;
	}
	.new_content_item{
		height: 62px;
		font-size:16px;
		color:rgba(111,121,146,1);
		border-bottom: 1px solid #EEEEEE;
		padding: 0 40px;
		padding-right: 0;
		line-height: 62px;
		display: flex;
		justify-content: space-between;
		cursor: pointer;
	}
	.fenye{
		height: 60px;
		background: #FFFFFF;
		position: absolute;
		bottom: 0;
		width: 100%;
		border-radius: 1px 1px 3px 3px;
	}
	.btn{
		position: absolute;
		right: 0;
	}
</style>