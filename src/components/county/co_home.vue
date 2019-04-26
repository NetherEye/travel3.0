<template>
	<div class="publics">
		<div class="aside">
			<nick-name></nick-name>
			<div class="aside_nav">
				<div class="aside_nav_item" @click="go_nav(item)" :class="item.isSelect ? 'activeNav' : ''" v-for="item in nav_array" :key="item.title">
					<img :src="item.icon"/>
					<div class="nav_li">{{item.title}}</div>
					
				</div>
			</div>
		</div>
		<div class="main">
			<my-header></my-header>
			<div class="content">
				<router-view/>
			</div>
		</div>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import nickName from '@/components/com/nickName'
import allApi from "@/assets/api/user"
import header from '@/components/com/header'
export default{
	data(){
		return{
			nav_array: [
				{
					path: '/county',
					title: '首页',
					icon: "../../../static/img/provincial/home_icon.png",
					isSelect: true,
				},
				{
					path: '/county/message',
					title: '通知公告',
					icon: '../../../static/img/provincial/Notice_icon.png',
					isSelect: false,
				},
				{
					path: '/county/fupin',
					title: '扶贫信息',
					icon: '../../../static/img/provincial/train_icon.png',
					isSelect: false,
				},
				{
					path: '/county/peixun',
					title: '培训管理',
					icon: '../../../static/img/provincial/Training_icon.png',
					isSelect: false,
				},
				{
					path: '/county/area',
					title: '区划管理',
					icon: '../../../static/img/provincial/quhuaguanli.png',
					isSelect: false,
				},
				{
					path: '/county/zhanghao',
					title: '账号管理',
					icon: '../../../static/img/provincial/account_icon.png',
					isSelect: false,
				},
				{
					path: '/county/cun',
					title: '村信息',
					icon: '../../../static/img/provincial/village_icon.png',
					isSelect: false,
				},
				{
					path: '/county/jingqu',
					title: '景区信息',
					icon: '../../../static/img/provincial/view_icon.png',
					isSelect: false,
				},
			],
			userInfo: {}
		}
	},
	components: {
		'nick-name': nickName, 'my-header': header
	},
	created(){
		if(localStorage.getItem('userInfo') != undefined){
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
			if(this.userInfo.isTemp === true){
				this.nav_array.splice(3, 0, {
					path: '/county/oldData',
					title: '2.0旧数据处理',
					icon: '../../../static/img/provincial/train_icon.png',
					isSelect: false,
				})
			}
		}
		// 获取本地nav
		if(sessionStorage.getItem('activeNav') != undefined){
			this.nav_array.forEach(a => {
				a.isSelect = false;
				if(a.path == sessionStorage.getItem('activeNav')){
					a.isSelect = true;
				}
			})
		}
		
	},
	methods: {
		go_nav(item){
			this.nav_array.forEach(a => {
				a.isSelect = false;
			})
			item.isSelect = true;
			
			sessionStorage.setItem('activeNav', item.path);
			
			this.$router.push({path: item.path})
		}
	},

	
}
	
</script>

<style scoped>
.publics{
	height: 100%;
}
.aside{
	width: 260px;
	min-width: 260px;
	height: 100%;
	display: flex;
	flex-direction: column;
    background:linear-gradient(0deg,rgba(26,73,125,1),rgba(70,103,157,1));
    float: left;
}
.aside_cap{
	height: 98px;
	
}
.aside_nav{
	flex: 1;
	overflow: auto;
}
.aside_cap_title{
	font-size: 24px;
	color:rgba(255,255,255,1);
	display: flex;
	align-items: center;
	height: 98px;
	font-weight: 400;
}
.aside_cap_title:before{
	content: url(../../../static/img/provincial/location.png);
	display: block;
	margin-right: 10px;
	width: 64px;
	height: 64px;
	margin-left: 43px;
}
.aside_nav_item{
	height: 80px;
	color:rgba(255,255,255,1);
	font-size: 18px;
	font-weight: 400;
	display: flex;
	align-items: center;
	cursor: pointer;
	position: relative;
}
.aside_nav_item > img{
	margin-left: 37px;
	margin-right: 8px;
}
.activeNav{
	background: #496e98;
	transition: all .4s;
}
.activeNav:before{
	content: '';
	width:8px;
	height:80px;
	background:rgba(255,255,255,1);
	position: absolute;
}

.main{
	height: 100%;
	overflow: hidden;
}
.header{
	height: 100px;
	position: relative;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 35px rgba(227,227,227,0.26);
	overflow: hidden;
}
.header_log{
	width: 363px;
	height: 48px;
	margin: 0 auto;
	background: url(../../../static/img/provincial/logo-.png) no-repeat center center;
	background-size: cover;
	margin-top: 26px;
}

.header_opear{
	width: 426px;
	height: 60px;
	position: absolute;
	right: 0;
	top: 26px;
	display: flex;
}
.opear_item{
	width:142px;
	height:48px;
	background:rgba(255,255,255,1);
	border-radius:30px;
	box-shadow:0px 0px 8px rgba(166,166,166,0.3);
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.header_opear .opear_item:nth-child(1){
	margin-right: 34px;
}
.changePwd{
	font-size:16px;
	font-weight:400;
	color:rgba(26,73,125,1);
	position: relative;
}
.changePwd_icon{
	width: 16px;
	height: 20px;
	background: url(../../../static/img/provincial/password_icon.png) no-repeat center center;
	background-size: cover;
	margin-right: 10px;
}
.logout{
	font-size:16px;
	font-weight:400;
	color:rgba(255,75,27,1);
}
.logout_icon{
	width: 17px;
	height: 17px;
	background: url(../../../static/img/provincial/Edit_icon.png) no-repeat center center;
	background-size: cover;
	margin-right: 10px;
}

.content{
	position: absolute;
	top: 100px;
	bottom: 0;
	left: 260px;
	right: 0;
}

</style>