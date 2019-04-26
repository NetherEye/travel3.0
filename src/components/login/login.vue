<template>
	<div class="public">
		<div class="login">
			<div class="hehe"></div>
			<div class="box_wrap">
				<div class="box">
					<div class="box_header"></div>
					<div class="box_nav">
						<div class="box_nav_item">
							<img src="../../../static/img/provincial/shengji.png"/>
						</div>
						<div class="box_nav_item">
							<img src="../../../static/img/provincial/shiji.png"/>
						</div>
						<div class="box_nav_item">
							<img src="../../../static/img/provincial/xianji.png"/>
						</div>
						<div class="box_nav_item">
							<img src="../../../static/img/provincial/xiangji.png"/>
						</div>
						<div class="box_nav_item">
							<img src="../../../static/img/provincial/jingqu.png"/>
						</div>
					</div>
					<div class="box_content">
						<div class="form">
							<!--<div class="form_item">
								<div class="form_item_left" :class="loginType != '省' ? 'width26' : ''"></div>
								<div class="form_item_right">
									<el-select v-model="value1" :class="loginType != '省' ? 'select1' : ''" size="small">
										<el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<el-select v-model="value2" class="select1" size="small" v-if="loginType != '省'">
										<el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
									<el-select v-model="value3" size="small" v-if="loginType == '景区' || loginType == '乡镇'" style="margin-top: 10px;">
										<el-option v-for="item in options3" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</div>
							</div>-->
							<div class="form_item" style="margin-top: 30px;">
								<div class="form_item_left"></div>
								<div class="form_item_right">
									<el-input v-model.trim="username" @keyup.enter.native="handleusername" placeholder="用户名" size="small"></el-input>
								</div>
							</div>
							<div class="form_item">
								<div class="form_item_left"></div>
								<div class="form_item_right">
									<el-input type="password" ref="password" @keyup.enter.native="handlepassword" v-model.trim="password" placeholder="请输入密码" size="small" class="input1">
										<!--<template slot="append"><span @click="forgot">忘记密码？</span></template>-->
									</el-input>
									
								</div>
							</div>
							<div class="form_item">
								<div class="form_item_left"></div>
								<div class="form_item_right">
									<div class="submit" @click="login">登录</div>
								</div>
								
							</div>
						</div>
					</div>
					<!-- <div class="box_footer">
						
					</div> -->
				</div>
			</div>
		</div>
		<div class="footer"><div>贵州省旅游发展委员会主办 贵州紫光科技有限公司承办 黔ICP备17003904号</div></div>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/user"

export default{
	data(){
		return{
			form: {
				
			},
			options1: [
				
			],
			options2: [
				
			],
			options3: [
				
			],
			value1: '',
			value2: '',
			value3: '',
			username: '',
			password: '',
		}
	},
	methods: {
		forgot(){ // 忘记密码
			
		},
		handleusername(){
			if(this.username == ''){
				this.$message({
					type: 'warning',
					message: '请输入账号！'
				})
				return
			}
			this.$refs['password'].focus()
		},
		handlepassword(){
			if(this.password == ''){
				this.$message({
					type: 'warning',
					message: '请输入密码！'
				})
				return
			}
			this.login()
		},
		login(){
			if(this.username == ''){
				this.$message({
					type: 'warning',
					message: '请输入账号！'
				})
				return
			}
			if(this.password == ''){
				this.$message({
					type: 'warning',
					message: '请输入密码！'
				})
				return
			}
			
			let par = {
				username: this.username,
				password: this.password
			}
			fetch.post(allApi.login, par, res => {
				console.log(res)
				if(res.code === 200){
					
					localStorage.setItem('token', res.data.token);
					let {nickName, role, username, isTemp, orgName} = res.data; 
					let obj = {
						nickName: nickName,
						role: role,
						username: username,
						isTemp: isTemp,
						orgName
					}
					localStorage.setItem('userInfo', JSON.stringify(obj));
					
					this.$message({
							type: 'success',
							message: '登录成功'
					})
					if(obj.role == '省'){
						sessionStorage.setItem('activeNav', '/provincial');
						this.$router.push({name:'省级首页'});
						
					}else if(obj.role == '市州'){
						sessionStorage.setItem('activeNav', '/city');
						this.$router.push({name:'市级首页'});
						
					}else if(obj.role == '区县'){
						sessionStorage.setItem('activeNav', '/county');
						this.$router.push({name:'县级首页'});
						
					}else if(obj.role == '乡镇'){
						sessionStorage.setItem('activeNav', '/village');
						this.$router.push({name:'乡级首页'});
						
					}else if(obj.role == '景区'){
						sessionStorage.setItem('activeNav', '/scenic/fupin');
						this.$router.push({name:'景区扶贫'});
						
					}
				}
			}, {loadingText: '登录中...', noToken: true})
		},
	}
	
}
	
</script>

<style scoped>
.public{
	height: 100%;
	position: relative;
	overflow: auto;
	min-height: 760px;
	min-width: 680px;
}
	
.login{
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 40px;
	background: url(../../../static/img/provincial/bj.png) no-repeat center center;
	background-size: cover;
	overflow: hidden;
	
}
.footer{
	height: 40px;
	line-height: 40px;
	font-size: 12px;
	color: #1a497d;
	background-color: #FFFFFF;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
}
.footer>div{
	text-align: center;
}
.hehe{
	height: 110px;
}
.box_wrap{
	position: absolute;
	top: 110px;
	bottom: 0;
	left: 0;
	right: 0;
	text-align: center;
}
.box{
	width: 676px;
	height: 606px;
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
}
.box_header{
	height: 74px;
	background: url(../../../static/img/provincial/logo.png) no-repeat center center;
	background-size: 564px 74px;
	margin-bottom: 17px;
}
.box_nav{
	height: 110px;
	margin-bottom: 19px;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.box_content{
	width:392px;
	height:315px;
	margin: 0 auto;
	background:rgba(255,255,255,1);
	border-radius:10px;
	box-shadow:1px 2px 4px 0px rgba(15,46,77,0.5);
	margin-bottom: 17px;
	padding-top: 41px;
	padding: 41px 81px 19px 81px;
}
.box_nav_item{
	width:110px;
	height:110px;
	background: #e5e5e5;
	border-radius:10px;
	position: relative;
	user-select:none;
	display: flex;
	align-items: center;
	justify-content: center;
	background: #FFFFFF;
}
.nav_title{
	width: 100%;
	height: 20px;
	color: #1A497D;
	font-size: 16px;
	position: absolute;
	bottom: 0;
	text-align: center;
	line-height: 20px;
}
.box_nav_item>img{
	position: absolute;
	left: 24px;
	bottom: 26px;
}
.activeLogin>.nav_title{
	border-radius:1px 1px 10px 10px;
	background: #385e93;
	color:rgba(255,255,255,1);
}
.activeLogin{
	background: #FFFFFF;
}

.box_footer{
	width:392px;
	height:55px;
	border-radius:10px;
	box-shadow:1px 2px 4px 0px rgba(15,46,77,0.5);
	margin: 0 auto;
	background: url(../../../static/img/provincial/px.png) no-repeat center center;
	background-size: 143px 37px;
	cursor: pointer;
	background-color:rgba(255,255,255,1);
}
.form{
	height: 100%;
}
.form_item{
	display: flex;
	flex-wrap: wrap;
	height: auto;
	margin-bottom: 15px;
}
.form_item_left{
	width: 28px;
	height: 32px;
}
.form_item_right{
	width: 202px;
}
/*.form_item:nth-child(1) .form_item_left{
	background: url(../../../static/img/provincial/zhcc_location.png) no-repeat center left;
	background-size: 16px 22px;
}*/
.form_item:nth-child(1) .form_item_left{
	background: url(../../../static/img/provincial/zhcc_users.png) no-repeat center left;
	background-size: 20px 22px;
}
.form_item:nth-child(2) .form_item_left{
	background: url(../../../static/img/provincial/zhcc_password.png) no-repeat center left;
	background-size: 20px 22px;
}

.submit{
	width:200px;
	height:35px;
	background:linear-gradient(0deg,rgba(70,103,157,1),rgba(26,73,125,1));
	border-radius:4px;
	text-align: center;
	line-height: 35px;
	font-size:18px;
	color:rgba(255,255,255,1);
	cursor: pointer;
}

.width26{
	width: 26px;
}
</style>