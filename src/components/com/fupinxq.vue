<template>
	<div class="public fupinxq">
		<div class="box">
			<div class="title">{{poorName}}旅游帮扶信息详情</div>
			<div class="content">
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>项目名称：</p>
						<p>
							<el-input v-model="form.projectName" placeholder="项目名称" :maxLength="50" clearable :disabled="type !='添加'&& type!='修改'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">项目主体：</p>
						<p>
							<el-input v-model="form.projectSubject" placeholder="项目主体" :maxLength="50" clearable :disabled="type !='添加'&& type!='修改'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>项目地址：</p>
						<p>
							<template>
								<el-select v-model="form.projectAddress" style="width:100%" placeholder="全部" :disabled="type !='添加'&& type!='修改'">
									<el-option v-for="item in countyOps" :key="item.id" :label="item.orgName" :value="item.id">
									</el-option>
								</el-select>
							</template>

						</p> 
					</div>
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>所属九项工程：</p>
						<p>
							<el-select v-model="form.belongType" clearable placeholder="全部" style="width:100%" :disabled="type !='添加'&& type!='修改'">
								<el-option v-for="item in optionsEngineers" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</p>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>带动类型：</p>
						<p>
							<el-select v-model="form.assistType" clearable placeholder="全部" style="width:100%" disabled>
								<el-option v-for="item in assistTypeArr" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>带动贫困人口增收方式：</p>
						<p>
							<el-select v-model="form.incomeType" @change="handleIncomeType" clearable style="width:100%" placeholder="全部" :disabled="type !='添加'&& type!='修改'">
								<el-option v-for="item in optionsapproach" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</p>
					</div>
					
					<div class="item_item" v-if="form.incomeType == '其他间接带动方式'">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>带动方式描述：</p>
						<p>
							<p>
								<el-input v-model="form.assistTypeDescribe" placeholder="补填带动方式描述" :maxLength="50" clearable :disabled="type !='添加'&& type!='修改'">
								</el-input>
							</p>
						</p>
					</div>
					
					<div class="item_item">
						<p class="color ft16 mar">工作开始时间：</p>
						<p>
							<el-date-picker v-model="form.startTime" @change="changeStartTime" :picker-options="disDate" value-format="yyyy-MM" type="month" placeholder="选择日期" style="width:100%" :disabled="type !='添加'&& type!='修改'">
							</el-date-picker>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">工作结束时间：</p>
						<p>
							<el-date-picker v-model="form.finishTime" :picker-options="disDate1" value-format="yyyy-MM" type="month" placeholder="选择日期" style="width:100%" :disabled="type !='添加'&& type!='修改'">
							</el-date-picker>
						</p>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>收入时间：</p>
						<p>
							<el-date-picker v-model="form.incomeTime" :picker-options="disDate1" value-format="yyyy-MM" type="month" placeholder="选择日期" style="width:100%" :disabled="type !='添加'&& type!='修改'">
							</el-date-picker>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar"><span style="color: red;" v-if="type == '添加' || type == '修改'">*</span>收入金额：</p>
						<p>
							<el-input v-model.number="form.income" @change="moneyChange" :maxLength="6" style="width:100%;" clearable placeholder="收入金额" :disabled="type !='添加'&& type!='修改'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">填报人员：</p>
						<p>
							<el-input v-model="form.nickName" style="width:100%;" clearable disabled>
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">备注：</p>
						<p>
							<el-input v-model="form.remark" clearable :disabled="type !='添加'&& type!='修改'">
							</el-input>
						</p>
					</div>
				</div>
				<div class="item1">
					<p class="color ft16 mar">佐证材料：</p>
					<div class="fuj">
						<div class="img filesLook" :class="type == '添加' || type == '修改' ? 'filesDel' : ''" v-for="(item, i) in fileList">
							<template v-if="imgs.indexOf(item.fileType) != -1">
								<img :src="item.url" />
								<div class="img_tilte ft12">照片描述</div>
								
								<template v-if="type == '添加' || type == '修改'">
									<i class="btnDel" @click="delItem(i)"></i>
								</template>
								<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
								
							</template>
							<template v-else>
								<img src="../../../static/img/provincial/wenjianmiaoshu.png" />
								<div class="img_tilte ft12 ellipsis" :title="item.originalName">{{item.originalName}}</div>
								<template v-if="type == '添加' || type == '修改'">
									<i class="btnDel" @click="delItem(i)"></i>
								</template>
								<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
							</template>
						</div>

						<div class="files" v-if="type == '添加' || type == '修改'">
							<div class="upload" v-show="!uploading">
								<input ref="file" type="file" multiple name="" id="" value="" @change="upload" />
							</div>
							
							<el-progress type="circle" :percentage="percentage" v-if="uploading"></el-progress>
						</div>
					</div>
				</div>
				<div class="item1" v-if="form.status == 2 || form.status == 4 || form.status == 5">
					<p class="color ft16 mar">{{form.status == 2 ? '驳回' : '标记'}}原因：</p>
					<div class="fuj">
						<el-input type="textarea" disabled :rows="5" resize="none" :autosize="{ minRows: 5, maxRows: 5}" v-model="rejectContent_personal">
						</el-input>
					</div>
				</div>
				<div class="footer">
					<template v-if="type == '标记' && (userInfo.role == '市州' || userInfo.role == '省')">
						<p class="dibu" @click="gobiaoji">标记可疑</p>
					</template>
					<template v-if="type == '审查' && userInfo.role == '区县'">
						<p class="dibu" @click="gopass">通过</p>
						<p class="dibu" @click="goreject">驳回</p>
					</template>
					
					<template v-if="(type == '添加') && (userInfo.role == '市州' || userInfo.role == '区县')">
						<p class="dibu ycy" @click="sub('3')">提交</p>
					</template>
					<template v-if="(type == '修改') && (userInfo.role == '市州' || userInfo.role == '区县') && form.status != 1 && form.status != 3">
						<p class="dibu ycy" @click="updateP">修改</p>
					</template>
					
					<template v-if="(type == '修改') && (userInfo.role != '市州' && userInfo.role != '区县') && form.status != 1 && form.status != 3">
						<p class="dibu ycy" @click="update">修改</p>
					</template>
					<template v-if="(type == '修改') && (userInfo.role != '市州' && userInfo.role != '区县') && form.status != 1 && form.status != 3">
						<p class="dibu" @click="updateSub">修改并提交</p>
					</template>
					
					<template v-if="type == '添加' && (userInfo.role != '市州' && userInfo.role != '区县')">
						<p class="dibu ycy lcc" style="background-color: #4a87c1;" @click="save">仅保存</p>
						<p class="dibu ycy" @click="sub('1')">保存并提交</p>
					</template>

				</div>
			</div>

		</div>
		<el-dialog :visible.sync="dialogFormVisible">
			<div class="item1">
				<p class="color ft16 mar">{{type == '审核' ? '驳回意见' : '标记备注'}}：</p>
				<el-input type="textarea" :rows="7" resize="none" :autosize="{minRows:7,maxRows:7}" :placeholder="type == '审核' ? '请说明驳回意见' : '请说明标记原因'" v-model="rejectContent">
				</el-input>
			</div>
			<div slot="footer" class="dialog-footer">
				<template v-if="sss">
					<p class="dibu" @click="tag">标记可疑</p>
					<p class="dibu  yey" @click="dialogFormVisible=false">取消</p>
				</template>
				<template v-if="sac">
					<p class="dibu" @click="reject">驳回</p>
					<p class="dibu  yey" @click="dialogFormVisible=false">取消</p>
				</template>
			</div>
		</el-dialog>
		<my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import publics from "@/assets/tools/publics"
import fupin from "@/assets/api/fupin"
import allApi from "@/assets/api/user"
import fullScreenView from '@/components/com/fullScreenView'
export default {
	data() {
		return {
			rejectContent: '',
			banOpear: false, // 禁止操作层 即将关闭窗口时触发
			seeMedia: false,
			viewIndex: 0,
			dialogFormVisible: false,
			httpCount: 0, // 该页面请求次数 
			sss: false,
			sac: false,
			uploading: false,
			percentage: 0,
			form: {
				projectName: '',
				projectSubject: '',
				projectAddress: '',
				belongType: '',
				assistType: '',
				incomeType: '',
				incomeTime: '',
				income: '',
				remark: '',
				finishTime: '',
				startTime: '',
				assistTypeDescribe: '',
			},
			formLabelWidth: '120px',
			input10: '乡村旅游从业人员培训',
			type: '', // 全部权限
			leibie: '全部',
			lookTitle: "培训",
			options: [{
					value: '全部',
					label: '全部'
				},
				{
					value: '单个',
					label: '单个'
				}
			],
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
			optionsapproachOld: [
			{
					value: '带动直接就业',
					label: '带动直接就业'
				}, {
					value: '直接参与旅游相关经营增加收入',
					label: '直接参与旅游相关经营增加收入'
				}, {
					value: '直接开办农事体验或旅游活动项目增加收入',
					label: '直接开办农事体验或旅游活动项目增加收入'
				}, {
					value: '直接出售农副土特产品等增加收入',
					label: '直接出售农副土特产品等增加收入'
				}, {
					value: '直接出租房屋或土地等自有资产增加收入',
					label: '直接出租房屋或土地等自有资产增加收入'
				}, {
					value: '将房屋、土地、人力等自有资源折算入股分红',
					label: '将房屋、土地、人力等自有资源折算入股分红'
				}, {
					value: '通过政府、企业低价或无偿提供的停车场、商铺等经营性资产增加收入',
					label: '通过政府、企业低价或无偿提供的停车场、商铺等经营性资产增加收入'
				}, {
					value: '从旅游发展中获得补助收入',
					label: '从旅游发展中获得补助收入'
				},
				{
					value: '通过旅游发展获得资产增值收入',
					label: '通过旅游发展获得资产增值收入'
				},
				{
					value: '其他间接带动方式',
					label: '其他间接带动方式'
				},
			],
			assistTypeArr: [
				{
					value: '直接带动',
					label: '直接带动'
				},
				{
					value: '间接带动',
					label: '间接带动'
				},
			],
			tableData: [{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				},
				{
					date: '2016-05-03',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}
			],
			countyOps: [],
			signData: '', // 上传签名
			poorName: '',
			fileList: [],
			idCard: '',
			id: '', // 帮扶id
			viewFileList: [],
			disDate: {
				
			},
			disDate1: {
				disabledDate: time => {
					var falg = false;
					
					let n1 = time.getFullYear();
					let n2 = '0' + (time.getMonth() + 1);
					let _time1 = n1 + '-' + n2.slice(-2);
					
					if(new Date(this.form.startTime).getTime() > new Date(_time1).getTime()){
						falg = true
					}
					
					
					let nowTime = new Date();
					let _year = nowTime.getFullYear();
					let _month = '0' + (nowTime.getMonth() + 1);
					let _time = _year + '-' +  _month.slice(-2);
					if(time.getTime() > new Date(_time).getTime()){
						falg = true
					}
					return falg
				}
			},
			userInfo: '',
			imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
			rejectContent_personal: '' // 驳回和标记原因，中途加入回显 单独用一个状态保存 避免影响到前面数据产生报错
		}
	},
	components: {'my-view': fullScreenView},
	created() {
		// 获取页面类型
		if(this.$route.query.type != undefined) {
			this.type = this.$route.query.type;
		} else {
			// gg
		}
		if(this.$route.query.poorName != undefined) {
			this.poorName = this.$route.query.poorName;
		} else {
			// gg
		}
		if(this.$route.query.idCard != undefined) {
			this.idCard = this.$route.query.idCard;
		} else {
			// gg
		}
		if(this.$route.query.id != undefined) {
			this.id = this.$route.query.id;
		} else {
			// gg
		}
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
		this.dis(); // 选择器禁用或者某些级别不为人知的操作...
		
		// 如果不修新增或者修改的话 就不请求某些api 添加 查看 修改 审核
		if(this.type != '添加'){
			this.getData();
		}
		
		if(this.type == '添加' || this.type == '修改'){
			this.getFileSign();
			this.getSite();
		}
	},
	methods: {
		//标记可疑
		gobiaoji() {
			this.rejectContent = ''
			this.dialogFormVisible = true;
			this.sss = true;
		},
		getData(){
			fetch.get(fupin.travelAssistDetail + '/' + this.id, '', res => {
				if(res.code === 200){
					let {
						projectName,
						projectSubject,
						projectAddress,
						belongType,
						assistType,
						incomeType,
						incomeTime,
						income,
						remark,
						endTime,
						startTime,
						filesList,
						status,
						nickName,
						projectAddressId,
						assistTypeDescribe,
						rejectContent
					} = res.data;
					
					this.form = {
						projectName,
						projectSubject,
						belongType,
						assistType,
						incomeType,
						incomeTime,
						income,
						remark,
						startTime,
						assistTypeDescribe,
						nickName,
						status: status,
						projectAddress: (this.type == '查看' || this.type == '审核' || this.type == '标记') ?  projectAddress : projectAddressId,
						finishTime: !endTime ? this.form.finishTime : endTime,
						
					}
					
					this.rejectContent_personal = rejectContent || ''
	
					this.fileList = !filesList ? [] : filesList;
				}
			}, {})
		},
		// 关闭查看器
    	closeView(){
    		this.seeMedia = false;
    	},
    	// 查看或下载
    	view(item){
    		var AdvanceExit = false;
    		this.viewFileList = [];
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv', 'video/mp4', 'video'];
			
    		this.fileList.forEach(a => {
    			if(imgs.indexOf(a.fileType) != -1){
    				a.ftp = 'pic'
					this.viewFileList.push(a)
					return
				}else if(videos.indexOf(a.fileType) != -1){
					a.ftp = 'mov'
					this.viewFileList.push(a)
					return
				}else if(item.url === a.url){
					window.location = a.url;
					AdvanceExit = true;
				}
				
    		})
    		if(AdvanceExit){
    			return
    		}
    		this.viewFileList.forEach((a,i) => {
    			if(a.url === item.url){
    				this.viewIndex = i
    			}
    		})
    		
    		this.seeMedia = true;
    		
			
    	},
		// 通过
		gopass() {
			let par = {
				id: this.id,
				status: 1,
			}
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.put(fupin.checkTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					window.opener.location.reload()
				}else{
					this.httpCount = 0
				}
			})
		},
		//驳回
		goreject() {
			this.rejectContent = ''
			this.dialogFormVisible = true;
			this.sac = true;
		},
		reject(){
			let par = {
				id: this.id,
				status: 2,
				rejectContent: this.rejectContent
			}
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.put(fupin.checkTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					window.opener.location.reload()
				}else{
					this.httpCount = 0
				}
			})
		},
		tag(){
			let par = {
				id: this.id,
				markContent: this.rejectContent
			}
			fetch.put(fupin.markTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					window.opener.location.reload()
				}
			})
		},
		
		// 保存
		save() {
			var flag = false;
			var no = ['projectSubject', 'startTime', 'assistTypeDescribe', 'finishTime', 'status', 'nickName'];
			for(var item in this.form) {
				// 不检测
				if(no.indexOf(item) != -1){
					continue;
				}
				
				if(item != 'remark' && (this.form[item] == '' || this.form[item] == null)) {
					flag = true;
				}
			}
			if(flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整信息'
				})
				return
			}
			
			if(this.form.incomeType == '其他间接带动方式'){
				if(!this.form.assistTypeDescribe){
					this.$message({
						type: 'warning',
						message: '请补填带动方式描述'
					})
					return
				}
			}
			
			let par = this.form;
			if(this.fileList.length == 0){
				delete par.fileInfo
			}else{
				par.fileInfo = JSON.stringify(this.fileList);
			}
			
			par.idCard = this.idCard;
			par.poorName = this.poorName;
			
			par.status = 0;
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.post(fupin.addTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					window.opener.location.reload()
				}else{
					this.httpCount = 0
				}
			})
		},
		
		// 提交
		sub(state) {
			var flag = false;
			var no = ['projectSubject', 'assistTypeDescribe', 'startTime', 'finishTime', 'status', 'nickName'];
			for(var item in this.form) {
				// 不检测
				if(no.indexOf(item) != -1){
					continue;
				}
				if(item != 'remark' && (this.form[item] === '' || this.form[item] === null ||  this.form[item] === undefined)) {
					flag = true;
				}
			}
			if(flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整信息'
				})
				return
			}
			
			if(this.form.incomeType == '其他间接带动方式'){
				if(!this.form.assistTypeDescribe){
					this.$message({
						type: 'warning',
						message: '请补填带动方式描述'
					})
					return
				}
			}
			
			let par = this.form;
			if(this.fileList.length == 0){
				this.$message({
					type: 'warning',
					message: '缺少佐证材料'
				})
				delete par.fileInfo
				return
			}else{
				par.fileInfo = JSON.stringify(this.fileList);
			}
			
			
			par.idCard = this.idCard;
			par.poorName = this.poorName;
			
			par.status = Number(state);
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.post(fupin.addTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					window.opener.location.reload()
				}else{
					this.httpCount = 0
				}
			})
		},
		
		update(){
			let {projectName, projectSubject, assistTypeDescribe, projectAddress, belongType, assistType, incomeType, incomeTime, income, remark, phone, startTime, finishTime} = this.form;
			
			let par = {
				Id: this.id,
				projectName: projectName,
				projectSubject: projectSubject,
				projectAddress: projectAddress,
				belongType: belongType,
				assistType: assistType,
				incomeType: incomeType,
				incomeTime: incomeTime,
				income: income,
				remark: remark,
				startTime: startTime,
				finishTime: finishTime,
				status: 0,
				assistTypeDescribe: assistTypeDescribe
			}
			var flag = false;
			
			var jy = ['projectName', 'projectAddress', 'belongType', 'assistType', 'incomeType', 'incomeTime', 'income'];
			
			jy.forEach(a => {
				if(par[a] == '' || par[a] == null || par[a] == undefined){
					flag = true;
				}
			})
			
			if(flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整信息'
				})
				return
			}
			
			if(this.form.incomeType == '其他间接带动方式'){
				if(!this.form.assistTypeDescribe){
					this.$message({
						type: 'warning',
						message: '请补填带动方式描述'
					})
					return
				}
			}
			
			if(this.fileList.length == 0){
				delete par.fileInfo;
				
			}else{
				par.fileInfo = JSON.stringify(this.fileList);
			}
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.put(fupin.updateTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						window.close()
					}, 1500)
					if(window.opener.location.hash.indexOf('training') === -1){
						window.opener.location.reload()
					}
				}else{
					this.httpCount = 0
				}
			})
		},
		
		updateSub(){
			let {projectName, projectSubject, assistTypeDescribe, projectAddress, belongType, assistType, incomeType, incomeTime, income, remark, phone, startTime, finishTime} = this.form;
			
			let par = {
				Id: this.id,
				projectName: projectName,
				projectSubject: projectSubject,
				projectAddress: projectAddress,
				belongType: belongType,
				assistType: assistType,
				incomeType: incomeType,
				incomeTime: incomeTime,
				income: income,
				remark: remark,
				startTime: startTime,
				finishTime: finishTime,
				status: 1,
				assistTypeDescribe: assistTypeDescribe
			}
			var flag = false;
			var no = ['projectSubject', 'assistTypeDescribe', 'startTime', 'finishTime', 'status', 'nickName', 'remark'];
			for(var i in par){
				// 不检测
				if(no.indexOf(i) != -1){
					continue;
				}
				if(par[i] === undefined || par[i] === null || par[i] === ''){
					flag = true
				}
			}
			
			if(flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整信息'
				})
				return
			}
			
			
			if(this.form.incomeType == '其他间接带动方式'){
				if(!this.form.assistTypeDescribe){
					this.$message({
						type: 'warning',
						message: '请补填带动方式描述'
					})
					return
				}
			}
			
			if(this.fileList.length == 0){
				this.$message({
					type: 'warning',
					message: '缺少佐证材料'
				})
				return
				
			}else{
				par.fileInfo = JSON.stringify(this.fileList);
			}
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.put(fupin.updateTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						
						window.close()
					}, 1500)
					if(window.opener.location.hash.indexOf('training') === -1){
						window.opener.location.reload()
					}
				}else{
					this.httpCount = 0
				}
			})
		},
		updateP(){
			let {projectName, assistTypeDescribe, projectSubject, projectAddress, belongType, assistType, incomeType, incomeTime, income, remark, phone, startTime, finishTime} = this.form;
			
			let par = {
				Id: this.id,
				projectName: projectName,
				projectSubject: projectSubject,
				projectAddress: projectAddress,
				belongType: belongType,
				assistType: assistType,
				incomeType: incomeType,
				incomeTime: incomeTime,
				income: income,
				remark: remark,
				startTime: startTime,
				finishTime: finishTime,
				status: 3,
				assistTypeDescribe: assistTypeDescribe,
			}
			var flag = false;
			var no = ['projectSubject', 'startTime', 'assistTypeDescribe', 'finishTime', 'status', 'nickName', 'remark'];
			for(var i in par){
				// 不检测
				if(no.indexOf(i) != -1){
					continue;
				}
				if(par[i] === undefined || par[i] === null || par[i] === ''){
					flag = true
				}
			}
			
			if(flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整信息'
				})
				return
			}
			
			if(this.form.incomeType == '其他间接带动方式'){
				if(!this.form.assistTypeDescribe){
					this.$message({
						type: 'warning',
						message: '请补填带动方式描述'
					})
					return
				}
			}
			
			if(this.fileList.length == 0){
				this.$message({
					type: 'warning',
					message: '缺少佐证材料'
				})
				return
				
			}else{
				par.fileInfo = JSON.stringify(this.fileList);
			}
			this.httpCount++;
			if(this.httpCount > 1){
				this.$message({
					type: 'error',
					message: '请勿重复请求！'
				})
				return
			}
			fetch.put(fupin.updateTravelAssist, par, res => {
				if(res.code === 200){
					this.$loading({
						text: res.message
					})
					setTimeout(() => {
						
						window.close()
					}, 1500)
					if(window.opener.location.hash.indexOf('training') === -1){
						window.opener.location.reload()
					}
				}else{
					this.httpCount = 0
				}
			})
		},
		
		getSite() {
			this.countyOps = [];
			fetch.get(fupin.getPrjSite, '', res => {
				if(res.code === 200) {
					this.countyOps = res.data
				}
			})
		},
		// 获取上传签名
		getFileSign() {
			if(this.type != '添加' && this.type != '修改') {
				return
			}
			fetch.get(allApi.getFileSign, '', res => {
				if(res.code === 200) {
					this.signData = res.data
				}
			})
		},
		// 新增选择器禁用
		dis() {
			if(this.type == '添加' || this.type == '修改') { // 新增或者修改时
				// 公共禁用
				this.disDate = this.banFuture();
				
				var user = this.userInfo;
				this.form.nickName = user.nickName;
				if(user.role == '市州' || user.role == '区县') {
					this.optionsEngineers.map(a => {
						if(a.value != '旅游教育培训扶贫工程') {
							
							a.disabled = true;
						}
						return a;
					})
					this.assistTypeArr.map(a => {
						if(a.value != '间接带动') {
							a.disabled = true;
						}
						return a;
					})
					this.optionsapproach.map(a => {
						if(a.value != '从旅游发展中获得补助收入') {
							a.disabled = true;
						}
						return a;
					})
				}
				if(user.role == '乡镇') {
					this.optionsEngineers.map(a => {
						if(a.value == '旅游教育培训扶贫工程') {
							
							a.disabled = true;
						}
						if(a.value == '景区带动旅游扶贫工程') {
							a.disabled = true;
						}
						return a;
					})
				}
				if(user.role == '景区') {
					this.optionsEngineers.map(a => {
						if(a.value != '景区带动旅游扶贫工程') {
							a.disabled = true;
						}
						return a;
					})
				}
			}
			
		},
		// 禁止未来
		banFuture(){
			
			let obj = {
				disabledDate: time => {
					let nowTime = new Date();
					let _year = nowTime.getFullYear();
					let _month = '0' + (nowTime.getMonth() + 1);
					let _time = _year + '-' +  _month.slice(-2);
					return time.getTime() > new Date(_time).getTime();
					
					
				}
			}
			return obj
			
		},
		upload() {
			var file = this.$refs['file'].files[0];
			if(file == undefined){
				return
			}
			
			if (file.name.lastIndexOf('.')==-1){    //如果不存在"."  
            	this.$message({
            		type: 'error',
            		message: '文件路径不正确！'
            	})
                return
           	}
			var _type = file.name.slice(file.name.lastIndexOf('.') + 1);
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv',],
				others = ['txt', 'xls', 'xlsx', 'doc', 'docx', 'pdf', 'ppt', 'zip'];
			if(imgs.indexOf(_type)  === -1 && videos.indexOf(_type) === -1 && others.indexOf(_type) === -1){
				this.$message({
            		type: 'error',
            		message: '文件格式暂不支持！'
            	})
				return
			}
			
			this.uploading = true;
			let par = this.signData;
			par.key = par.dir + '/' + publics.getGUID() + '.' + _type;
	  		fetch.file(par, file, a => {
	  		  	let loaded = a.loaded,
			    total = a.total;
			    this.$nextTick(() =>{
			    	this.percentage = Math.ceil((loaded/total) * 100);
			    })
	  			
	  		}, res => {
	  			if(res.status === 200){
	  				let obj = {
	  					fileName: par.key,
	  					fileType: _type,
	  					originalName: file.name,
	  					url: par.host + '/' + par.key,
	  				}
	  				this.fileList.push(obj);
	  			}
	  			this.$refs['file'].value = '';
	  			this.uploading = false;
	  			this.percentage = 0;
	  		})

		},
		delItem(i){
			this.fileList.splice(i, 1);
		},
		// 文件类型className返回
		handleLookType(type){
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv', 'video/mp4', 'video'];
			if(imgs.indexOf(type) != -1){
				return 'pic'
			}else if(videos.indexOf(type) != -1){
				return 'mov'
			}else{
				return 'file'
			}
		},
		changeStartTime(){
			if(this.form.finishTime == undefined || this.form.finishTime == '' || this.form.finishTime == null){
				
			}else if(new Date(this.form.finishTime).getTime() < new Date(this.form.startTime)){
				this.form.finishTime = ''
			}
			if(this.form.incomeTime == undefined || this.form.incomeTime == '' || this.form.incomeTime == null){
				
			}else if(new Date(this.form.incomeTime).getTime() < new Date(this.form.startTime)){
				this.form.incomeTime = ''
			}
			
		},
		moneyChange(v){
			if(v === "" || v ==null){
					return
			}
			if(isNaN(v)){
				
				this.$message({
					type: 'warning',
					message: '输入金额只能是数字！'
				})
				this.form.income = 60
				return
			}
			if(v < 60){
				this.$message({
					type: 'warning',
					message: '收入不得低于60元'
				})
				this.form.income = 60
			}else if(v > 299999){
				this.$message({
					type: 'warning',
					message: '收入不得高于299999元'
				})
				this.form.income = 299999
			}
		},
		// 带动方式改变带动类型
		handleIncomeType(v){
			if(this.type == '添加' || this.type == '修改'){
				var s;
				this.optionsapproachOld.forEach((a, i) => {
					if(a.value == v){
						s = i
					}
				})
				if(s != null){
					if(s <= 4){
						this.form.assistType = '直接带动'
					}else{
						this.form.assistType = '间接带动'
					}
				}else{
					this.form.assistType = ''
				}
			}
		}
	},
	computed: {
		optionsapproach: function(){
//			var arr = [0, 10];
//			if(this.form.assistType == '直接带动'){
//				arr = [0, 7]
//			}else if(this.form.assistType == '间接带动'){
//				arr = [7, 10]
//			}
//			return this.optionsapproachOld.slice(arr[0], arr[1])
			return this.optionsapproachOld
		}
		
	}
}
</script>

<style scoped>
	.addBtn {
		margin-top: 80px;
		text-align: center;
	}
	
	.addBtn button {
		width: 130px;
		height: 44px;
		background-color: #45c3ad;
		border-radius: 4px;
	}
	
	button {
		font-size: 16px;
		outline: none;
		list-style: none;
		border: none;
		color: #eaefff;
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
		min-width: 150px;
		min-height: 150px;
		outline: none;
		opacity: 0;
		cursor: pointer;
	}
	
	.files {
		display: flex;
		position: relative;
		min-width: 150px;
		min-height: 150px;
		align-items: center;
		justify-content: center;
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
		flex-wrap: wrap;
	}
	
	.item_item1 {
		width: 100%;
	}
	
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
	
	.color {
		color: rgba(10, 31, 51, 1);
	}

	.mar {
		margin-top: 13px;
		margin-bottom: 10px;
	}
	
	.item {
		display: flex;
	}
	
	.item_item {
		width: 400px;
		margin-right: 66px;
	}
	
	.item_item:last-child {
		margin-right: 0;
	}
	
	.item2 {
		display: flex;
		margin: 29px 0;
	}
	
	.item2_item1 {
		width: 112px;
		margin-right: 12px;
	}
	
	.item2_item2 {
		flex: 1;
	}
	
	.footer {
		margin-top: 40px;
		display: flex;
		justify-content: center;
	}
	
	.footer>p {
		margin: 0 10px;
	}
	
	.dibu {
		width: 130px;
		height: 40px;
		background-color: #ff4b1b;
		border-radius: 4px;
		font-size: 16px;
		line-height: 40px;
		text-align: center;
		color: #f8f8f8;
		cursor: pointer;
	}
	
	.ycy {
		background-color: #45c3ad;
	}
	
	.yey {
		width: 130px;
		height: 40px;
		background-color: #a4a8b3;
		border-radius: 4px;
	}
</style>
