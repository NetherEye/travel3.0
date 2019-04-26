<template>
	<div class="header">
		<div class="header_nick">用户：{{userInfo.nickName}}</div>
		<div class="header_log"></div>
		<div class="header_opear">
			<div class="opear_item" @click="goPwd">
				<div class="changePwd_icon"></div>
				<div class="changePwd">修改密码</div>
			</div>
			<div class="opear_item" @click="logout">
				<div class="logout_icon"></div>
				<div class="logout">退出</div>
			</div>
		</div>
		<el-dialog title="修改密码" :visible.sync="pwdDialogVisible" center custom-class="pwdDialog">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="dialogForm">
				<el-form-item label="原密码" prop="oldpwd">
					<el-input type="password" v-model="ruleForm.oldpwd"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="newpwd">
					<el-input type="password" v-model="ruleForm.newpwd"></el-input>
				</el-form-item>
				<el-form-item label="重复新密码" prop="checkpwd">
					<el-input type="password" v-model="ruleForm.checkpwd"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    	<div class="btn btn4" @click="updatePwd">完成修改</div>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/user"
export default{
	
	data(){
		var validatePass2 = (rule, value, callback) => {
	        if (value === '') {
	        	callback(new Error('请再次输入密码'));
	        } else if (value !== this.ruleForm.newpwd) {
	        	callback(new Error('两次输入密码不一致!'));
	        } else {
	        	callback();
	        }
	    };
		return{
			pwdDialogVisible: false,
			ruleForm: {
				oldpwd: '',
				newpwd: '',
				checkpwd: '',
			},
			 rules: {
	            oldpwd: [
		            { required: true, message: '请输入原始密码', trigger: 'blur' },
	            ],
	            newpwd: [
		            { required: true, message: '请输入新密码', trigger: 'blur' },
	            ],
	            checkpwd: [
		            { required: true, message: '请再次输入新密码', trigger: 'blur' },
		            { validator: validatePass2, trigger: 'blur' }
	            ],
	       },
	       userInfo: {}
		}
	},
	created(){
		if(localStorage.getItem('userInfo') != undefined){
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods: {
		goPwd(){
			this.pwdDialogVisible = true;
			// 重置
			this.$refs['ruleForm'].resetFields()
		},
		updatePwd(){
			this.$refs['ruleForm'].validate((b) => {
				if(b){
					let par = {
						oldPassWord: this.ruleForm.oldpwd,
						newPassWord: this.ruleForm.newpwd,
						newAgainPassWord: this.ruleForm.checkpwd,
					}
					fetch.put(allApi.updatePwd, par, res => {
						if(res.code === 200){
							this.$message({
								type: 'success',
								message: res.message
							})
							this.pwdDialogVisible = false;
						}
					})
				}else{
					
				}
			})
		},
		logout(){
			fetch.logout(this)
		},
	},

	
}
	
</script>

<style scoped>
.header{
	height: 100px;
	position: relative;
	background:rgba(255,255,255,1);
	box-shadow:0px 0px 35px rgba(227,227,227,0.26);
	overflow: hidden;
	min-width: 515px;
}
.header_log{
	width: 363px;
	height: 48px;
	margin: 0 auto;
	position: relative;
	background: url(../../../static/img/provincial/logo-.png) no-repeat center center;
	background-size: cover;
	margin-top: 26px;
	z-index: 999;
}
.header_nick{
	position: absolute;
	left: 20px;
	top: 26px;
	color: #1d4b7f;
	padding: 14px 28px;
	background:rgba(255,255,255,1);
	border-radius:30px;
	box-shadow:0px 0px 8px rgba(166,166,166,0.3);
	z-index: 9;
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
@media only screen and (max-width: 1500px) {
	.header_opear{
		width: 300px;
		justify-content: space-between;
	}
}
@media only screen and (max-width: 1250px) {
	.header_opear{
		width: 280px;
		justify-content: space-between;
	}
	.header_opear .opear_item:nth-child(1){
		margin-right: 5px;
	}
}
@media only screen and (max-width: 1190px) {
	.opear_item{
		width: 20px;
		height: 20px;
	}
	.changePwd, .logout{
		display: none;
	}
	.changePwd_icon, .logout_icon{
		margin-right: 0;
	}
	.header_opear{
		width: 80px;
		justify-content: flex-start;
	}
}


</style>