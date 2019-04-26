<template>
	<div class="public">
		<div class="box">
			<div class="title">{{ type=='添加' ? '新增村信息':type=='修改' ?'修改村信息':'查看村信息'}}</div>
			<div class="content">
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						归属乡镇
					</div>
					<div class="wu_right">
						<el-select v-model="tableData.townId" clearable style="width: 100%;" :disabled="type=='查看'">
							<el-option v-for="item in countyOps" :key="item.id" :label="item.orgName" :value="item.id">
							</el-option>
						</el-select>
					</div>
				</div>

				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						村名
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.villageName" :maxlength="20" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						村长姓名
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.villageHeaderName" :maxlength="20" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						村长 / 负责人联系电话
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.villageHeaderPhone" :maxlength="20" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						村支书姓名
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.villageSecretaryName" :maxlength="20" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						村支书联系电话
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.villageSecretaryPhone" :maxlength="20" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						驻村第一书记姓名
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.residentSecretaryName" :maxlength="20" placeholder="无" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;margin-top:34px">
					<div class="wu_left">
						驻村第一书记联系电话
					</div>
					<div class="wu_right">
						<el-input v-model="tableData.residentSecretaryPhone" :maxlength="20" placeholder="无" clearable :disabled="type=='查看'"></el-input>
					</div>
				</div>
				<div class="item lcc" style="margin-bottom: 34px;margin-top:34px ">
					<template v-if="type=='修改'">
						<div class="item_mo">
							<div class="item_wu" @click="addkeep">保存</div>
						</div>
					</template>
					<template v-if="type=='添加'">
						<div class="item_mo">
							<div class="item_wu" @click="append">添加</div>
						</div>
					</template>

				</div>

			</div>

		</div>
	</div>
</template>

<script>
	import fetch from "@/assets/tools/fetch"
	import cun from "@/assets/api/cun"
	import allApi from "@/assets/api/user"
	export default {
		data() {
			return {
				countyOps: [],
				tableData: {
					villageName: '',
					villageHeaderName: '',
					villageHeaderPhone: '',
					villageSecretaryName: '',
					villageSecretaryPhone: '',
					residentSecretaryName: '',
					residentSecretaryPhone: '',
				},
				town: '',
				thisID: '',
				input10: '',
				type: '查看',
				lookTitle: "XX村",
				leibie: '全部',
				textarea: '',
				duixiang: '',
				zubie: '',
				options: [{
						value: '全部',
						label: '全部'
					},
					{
						value: '单个',
						label: '单个'
					}
				],
				filter: {
					villageName: '',
					town: '',
					villageHeaderName: '',
					villageHeaderPhone: '',
					villageSecretaryName: '',
					villageSecretaryPhone: '',
					residentSecretaryName: '',
					residentSecretaryPhone: '',
				},
			}
		},
		created() {
			this.getFilter();
			// 获取页面类型 发布 查看
			if(this.$route.query.type != undefined) {
				this.type = this.$route.query.type;
			} else {
				// gg
			}
			if(this.$route.query.id != undefined) {
				this.thisID = this.$route.query.id;
				this.getData();
			} else {
				// gg
			}
		},
		methods: {
			getData() {
				fetch.get(cun.cunxiangq + '/' + this.thisID, '', res => {
					if(res.code === 200) {
						res.data.residentSecretaryName = (res.data.residentSecretaryName == '无' ? '' : res.data.residentSecretaryName)
						res.data.residentSecretaryPhone = (res.data.residentSecretaryPhone == '无' ? '' : res.data.residentSecretaryPhone)
						this.tableData = res.data;
						this.total = res.total;
					} else {
						this.tableData = [];
						this.total = 0;
					}
				});
			},
			// 保存
			addkeep() {
				var str = /[\u4e00-\u9fa5]$/;
				var myreg = /^(1[3456789][0-9]{9})$/;
				var flag = false;
				if(!str.test(this.tableData.villageName)) {
					this.$message({
						type: 'warning',
						message: '村名只能是中文！'
					})
					return
				}
//				if(this.tableData.villageHeaderName == '' && this.tableData.villageHeaderPhone == '' && this.tableData.villageSecretaryName == '' && this.tableData.villageSecretaryPhone == '' && this.tableData.residentSecretaryName == '' && this.tableData.residentSecretaryPhone == '') {
//					let par = {
//						id: '',
//						villageName: this.tableData.villageName,
//						townId: this.tableData.townId,
//						villageHeaderName: this.tableData.villageHeaderName,
//						villageHeaderPhone: this.tableData.villageHeaderPhone,
//						villageSecretaryName: this.tableData.villageSecretaryName,
//						villageSecretaryPhone: this.tableData.villageSecretaryPhone,
//						residentSecretaryName: this.tableData.residentSecretaryName,
//						residentSecretaryPhone: this.tableData.residentSecretaryPhone,
//					}
//					fetch.post(cun.cunxingz, par, res => {
//
//						if(res.code == 200) {
//							var _loading = this.$loading({
//								text: '添加成功'
//							})
//							setTimeout(() => {
//								_loading.close();
//								window.close();
//							}, 3000);
//						}
//					});
//					this.flag = false
//					return
//					window.opener.location.reload()
//				} else {
//
//					this.flag = true
//				}
				
				if(this.tableData.villageHeaderName == ''||this.tableData.villageHeaderName == undefined ) {

					this.tableData.villageHeaderPhone = ''
					this.flag = true
				} else {
					if(!str.test(this.tableData.villageHeaderName)) {

						this.$message({
							type: 'warning',
							message: '村长姓名只能是中文！'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.villageHeaderPhone == ''||this.tableData.villageHeaderPhone == undefined) {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.villageHeaderPhone)) {
						this.$message({
							type: 'warning',
							message: '村长手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.villageSecretaryName == ''||this.tableData.villageSecretaryName == undefined) {
					this.tableData.villageSecretaryPhone = ''
					this.flag = true
				} else {
					if(!str.test(this.tableData.villageSecretaryName)) {
						this.$message({
							type: 'warning',
							message: '村支书姓名只能是中文！'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.villageSecretaryPhone == ''||this.tableData.villageSecretaryPhone == undefined) {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.villageSecretaryPhone)) {
						this.$message({
							type: 'warning',
							message: '村支书手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.residentSecretaryName == ''||this.tableData.residentSecretaryName == undefined) {
					this.tableData.residentSecretaryPhone=''
					this.flag = true
				} else {
					if(!str.test(this.tableData.residentSecretaryName)) {
						this.$message({
							type: 'warning',
							message: '驻村书记只能是中文！'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.residentSecretaryPhone == ''||this.tableData.residentSecretaryPhone == undefined) {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.residentSecretaryPhone)) {
						this.$message({
							type: 'warning',
							message: '驻村书记手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}

				let par = {
					id: this.thisID, //村信息Id
					villageName: this.tableData.villageName, //村名
					townId: this.tableData.townId, //归属乡镇ID
					villageHeaderName: this.tableData.villageHeaderName, // 村长姓名
					villageHeaderPhone: this.tableData.villageHeaderPhone, // 村长电话
					villageSecretaryName: this.tableData.villageSecretaryName, // 村支书姓名
					villageSecretaryPhone: this.tableData.villageSecretaryPhone, // 村支书联系电话
					residentSecretaryName: this.tableData.residentSecretaryName, // 驻村书记
					residentSecretaryPhone: this.tableData.residentSecretaryPhone, // 驻村书记电话
				}
				// return;
				fetch.put(cun.cunxingz, par, res => {
					if(res.code == 200) {
						var _loading = this.$loading({
							text: '修改成功'
						})
						setTimeout(() => {
							_loading.close();
							window.close();
						}, 3000);

					} else {
						this.tableData = [];
						this.total = '';
					}
				});
				window.opener.location.reload()
			},
			// 添加
			append() {

				var str = /[\u4e00-\u9fa5]$/;
				var myreg = /^(1[3456789][0-9]{9})$/;
				var flag = false;
				if(!str.test(this.tableData.villageName)) {
					this.$message({
						type: 'warning',
						message: '村名只能是中文！'
					})
					return
				}
				if(this.tableData.villageHeaderName == '' && this.tableData.villageHeaderPhone == '' && this.tableData.villageSecretaryName == '' && this.tableData.villageSecretaryPhone == '' && this.tableData.residentSecretaryName == '' && this.tableData.residentSecretaryPhone == '') {
					let par = {
						id: '',
						villageName: this.tableData.villageName,
						townId: this.tableData.townId,
						villageHeaderName: this.tableData.villageHeaderName,
						villageHeaderPhone: this.tableData.villageHeaderPhone,
						villageSecretaryName: this.tableData.villageSecretaryName,
						villageSecretaryPhone: this.tableData.villageSecretaryPhone,
						residentSecretaryName: this.tableData.residentSecretaryName,
						residentSecretaryPhone: this.tableData.residentSecretaryPhone,
					}
					fetch.post(cun.cunxingz, par, res => {
						console.log('第一步')
						if(res.code == 200) {
							var _loading = this.$loading({
								text: '添加成功'
							})
							setTimeout(() => {
								_loading.close();
								window.close();
							}, 3000);
						}
					});
					this.flag = false
					return
					window.opener.location.reload()
				} else {

					this.flag = true
				}
				
				if(this.tableData.villageHeaderName == '') {

					this.tableData.villageHeaderPhone = ''
					this.flag = true
				} else {

					if(!str.test(this.tableData.villageHeaderName)) {

						this.$message({
							type: 'warning',
							message: '村长姓名只能是中文！'
						})
						this.flag = false
						return
					}
				}
				if(this.tableData.villageHeaderPhone == '') {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.villageHeaderPhone)) {
						this.$message({
							type: 'warning',
							message: '村长手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.villageSecretaryName == '') {
					this.tableData.villageSecretaryPhone = ''
					this.flag = true
				} else {
					if(!str.test(this.tableData.villageSecretaryName)) {
						this.$message({
							type: 'warning',
							message: '村支书姓名只能是中文！'
						})
						this.flag = false
						return
					}
				}
				if(this.tableData.villageSecretaryPhone == '') {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.villageSecretaryPhone)) {
						this.$message({
							type: 'warning',
							message: '村支书手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.residentSecretaryName == ''||this.tableData.residentSecretaryName == undefined) {
					this.tableData.residentSecretaryPhone=''
					this.flag = true
				} else {
					if(!str.test(this.tableData.residentSecretaryName)) {
						this.$message({
							type: 'warning',
							message: '驻村书记只能是中文！'
						})
						this.flag = false
						return false;
					}
				}
				if(this.tableData.residentSecretaryPhone == ''||this.tableData.residentSecretaryPhone == undefined) {
					this.flag = true
				} else {
					if(!myreg.test(this.tableData.residentSecretaryPhone)) {
						this.$message({
							type: 'warning',
							message: '驻村书记手机号格式不正确'
						})
						this.flag = false
						return false;
					}
				}
				let par = {
					id: '',
					villageName: this.tableData.villageName,
					townId: this.tableData.townId,
					villageHeaderName: this.tableData.villageHeaderName,
					villageHeaderPhone: this.tableData.villageHeaderPhone,
					villageSecretaryName: this.tableData.villageSecretaryName,
					villageSecretaryPhone: this.tableData.villageSecretaryPhone,
					residentSecretaryName: this.tableData.residentSecretaryName,
					residentSecretaryPhone: this.tableData.residentSecretaryPhone,
				}
				fetch.post(cun.cunxingz, par, res => {
					if(res.code == 200) {
						var _loading = this.$loading({
							text: '添加成功'
						})
						setTimeout(() => {
							_loading.close();
							window.close();
						}, 3000);

					}
				});
				window.opener.location.reload()
			},
			getFilter() {
				fetch.get(cun.xzcuntown, '', res => {
					if(res.code === 200) {
						this.countyOps = res.data
					}
				})
			},
		}
	}
</script>

<style scoped>
	.public {
		height: auto;
		padding: 40px;
	}
	
	.box {
		height: auto;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
		position: relative;
	}
	
	.title {
		height: 65px;
		text-align: center;
		line-height: 65px;
		font-size: 22px;
		color: rgba(255, 255, 255, 1);
		background: rgba(70, 103, 157, 1);
		border-radius: 10px 10px 0px 0px;
		box-shadow: 0px 0px 100px 0px rgba(11, 30, 51, 0.05);
	}
	
	.content {
		height: auto;
		padding: 21px;
		padding-bottom: 40px;
	}
	
	.box {
		height: 100%;
		background: rgba(255, 255, 255, 1);
		border-radius: 10px;
		box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
		position: relative;
	}
	
	.item_mo {
		display: flex;
		justify-content: space-around;
		margin-top: 20px;
		cursor: pointer;
	}
	
	.item_wu {
		width: 130px;
		height: 44px;
		background-color: #45c3ad;
		border-radius: 4px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		color: #f8f8f8;
		font-size: 18px;
	}
	
	.title {
		height: 65px;
		text-align: center;
		line-height: 65px;
		font-size: 22px;
		color: rgba(255, 255, 255, 1);
		background: rgba(70, 103, 157, 1);
		border-radius: 10px 10px 0px 0px;
		box-shadow: 0px 0px 100px 0px rgba(11, 30, 51, 0.05);
	}
	
	.content {
		position: absolute;
		top: 65px;
		bottom: 0;
		width: 100%;
		padding: 21px;
	}
	
	.color {
		color: rgba(10, 31, 51, 1);
	}
	
	.ft12 {
		font-size: 12px;
	}
	
	.ft18 {
		font-size: 18px;
	}
	
	.ft20 {
		font-size: 20px;
	}
	
	.mar {
		margin-top: 13px;
		margin-bottom: 10px;
	}
	
	.item {
		display: flex;
	}
	
	.item_item {
		width: 100%;
		margin-right: 66px;
	}
	
	.upload {
		display: inline-block;
		width: 150px;
		height: 150px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		box-shadow: 0px 0px 8px 0px rgba(31, 32, 41, 0.18);
		margin-right: 50px;
		background: url(../../../static/img/provincial/zz.png) no-repeat center center;
		cursor: pointer;
	}
	
	.upload>input {
		display: inline-block;
		border: none;
		width: 100%;
		height: 100%;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
	
	.files {
		display: flex;
		display: inline-block;
		position: relative;
	}
	
	.files:after {
		content: "可添加图片/视频/文档";
		position: absolute;
		bottom: -22px;
		left: 6px;
		right: 0;
		font-size: 14px;
		color: rgba(164, 168, 179, 1);
	}
	
	.img {
		display: inline-block;
		width: 150px;
		height: 150px;
		background: rgba(255, 255, 255, 1);
		border-radius: 4px;
		box-shadow: 0px 0px 8px 0px rgba(31, 32, 41, 0.18);
		margin-right: 50px;
	}
	
	.img .img_tilte {
		height: 30px;
		text-align: center;
		line-height: 30px;
		color: rgba(70, 103, 157, 1);
	}
	
	.img>img {
		display: block;
		height: 120px;
		width: 100%;
		border-radius: 4px;
	}
	
	.fuj {
		display: flex;
	}
	
	.wu_left {
		width: 13%;
		min-width: 75px;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		font-size: 18px;
		letter-spacing: 0px;
		margin-right: 20px;
		color: #0a1f33;
	}
	
	.wu_right {
		width: 87%;
	}
	
	.lcc {
		display: flex;
		justify-content: space-around;
	}
</style>