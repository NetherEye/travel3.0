<template>
	<div class="public">
		<div class="box">
			<div class="title">{{type == '查看' ? '关于' + lookTitle + '的公告' : '发布通知公告'}}</div>
			<div class="content">
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item" v-if="type != '查看'">
						<p class="color ft18 mar">通知标题</p>
						<p>
							<el-input v-model="input10" clearable :disabled="type == '查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">文件号</p>
						<p>
							<el-input v-model="input11" clearable :disabled="type == '查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft16 mar">类别</p>
						<p>
							<el-select v-model="leibie" clearable style="width: 400px;" :disabled="type == '查看'">
								<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</p>
					</div>
				</div>
				<div class="item1">
					<p class="color ft16 mar">通知内容</p>
					<el-input type="textarea" :rows="7" resize='none' :autosize="{minRows:7,maxRows:7}"   v-model="textarea" :disabled="type == '查看'">
					</el-input>
				</div>
				<div class="item2"  v-if="type != '查看'">
					<div class="item2_item1">发送组别</div>
					<div class="item2_item2">
						<el-radio-group v-model="zubie" @change="selectSend"  v-if="type == '发布'">
							<el-radio :label="2" v-if="city">市州</el-radio>
							<el-radio :label="3" v-if="district">区县</el-radio>
							<el-radio :label="4" v-if="town">乡镇</el-radio>
							<el-radio :label="6" v-if="scenic">景区</el-radio>
						</el-radio-group>
						<el-input id="style" v-model="input13" clearable disabled v-if="type == '查看'">
						</el-input>
					</div>
				</div>
				<div class="item2">
					<div class="item2_item1">选择发送对象</div>
					<div class="item2_item2 loading">
						<el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" v-if="type == '发布'">全选</el-checkbox>
						<el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange" v-if="type == '发布'">
							<el-checkbox :class="wid" v-for="(city,index) in cities" :label="city.id" :key="index">{{city.label}}</el-checkbox>
					    </el-checkbox-group>
						<el-input id="style" v-model="input12" clearable disabled v-if="type == '查看'">
						</el-input>
					</div>
				</div>
				<div class="item1">
					<p class="color ft16 mar">上传附件</p>
					<div class="fuj">
						<div class="img filesLook" :class="type == '发布' ? 'filesDel' : ''" v-for="(item, i) in fileList">
							<template v-if="imgs.indexOf(item.fileType) != -1">
								<img :src="item.url" />
								<div class="img_tilte ft12">照片描述</div>
								
								<template v-if="type == '发布'">
									<i class="btnDel" @click="delItem(i)"></i>
								</template>
								<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
								
							</template>
							<template v-else>
								<img src="../../../static/img/provincial/wenjianmiaoshu.png" />
								<div class="img_tilte ft12 ellipsis" :title="item.originalName">{{item.originalName}}</div>
								<template v-if="type == '发布'">
									<i class="btnDel" @click="delItem(i)"></i>
								</template>
								<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
							</template>
						</div>

						<div class="files" v-if="type == '发布'">
							<div class="upload" v-show="!uploading">
								<input ref="file" type="file" multiple name="" id="" value="" @change="upload" />
							</div>
							
							<el-progress type="circle" :percentage="percentage" v-if="uploading"></el-progress>
						</div>
					</div>
				</div>
				<my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
				<div class="btns" style="margin-top: 40px;" v-if="type == '发布'">
					<div class="btn btn2" @click="send">发布</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import allApi from "@/assets/api/user"
import message from "@/assets/api/message"
import publics from "@/assets/tools/publics"
import fullScreenView from '@/components/com/fullScreenView'
export default{
	components: {'my-view': fullScreenView },
	data(){
		return{
			wid:'',
			thisID:'',
			input10:'',
			input11:'',
			input12:[],
			type: '发布',
			lookTitle: "",
			leibie: '全部',
			textarea: '',
			seeMedia: false,
			viewIndex: 0,
			viewFileList: [],
			zubie: '',
			options: [
				{value: '文件', label: '文件'},
				{value: '通知', label: '通知'},
				{value: '公告', label: '公告'}
			],
			Data:[],
			checkAll: false,
	        checkedCities: [],
	        cities: [],
	        isIndeterminate: false,
			uploading: false,
			percentage: 0,
			signData: '', // 上传签名
			fileList: [],
			userInfo:'',
			imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png','image/jpeg','image/png','image'],
			city: true,
			district: true,
			town: true,
			scenic: true
		}
	},
	created(){
		this.userInfo = JSON.parse(localStorage.getItem('userInfo'));
		this.setZubie();
		// 获取页面类型 发布 查看
		if(this.$route.query.type != undefined){
			this.type = this.$route.query.type;
			if (this.$route.query.b == 1) {
				if (this.$route.query.id != undefined) {
		            this.thisID = this.$route.query.id;
					this.getDatas();// 获取详情(发给我的)
		        } else {
		            // gg
		        }
	       } else {
				if (this.$route.query.id != undefined) {
		            this.thisID = this.$route.query.id;
					this.getData();// 获取详情(我发布的)
		        } else {
		            // gg
		        }
	        }
		}else{
			// gg
		}
		
		this.getFileSign();
	},
	methods: {
		setZubie() {
			if(this.userInfo.role == "市州"){
				this.city = false;
			}
			if(this.userInfo.role == "区县"){
				this.city = false;
				this.district = false;
			}
		},
		selectSend(val){
			let par = {
				level: val
			}
			var obj = {
				key: '',
				value: '',
			}
			if(val == 2){
				obj.key = 'city';
				obj.value = 'cityId';
				this.wid = 'w102'
			}
			if(val == 3){
				obj.key = 'district';
				obj.value = 'districtId';
				this.wid = 'w146'
			}
			if(val == 4){
				obj.key = 'town';
				obj.value = 'townId';
				this.wid = 'w170'
			}
			if(val == 6){
				obj.key = 'scenic';
				obj.value = 'scenicId';
				this.wid = 'w342'
			}
			
			this.cities = [];
			fetch.get(message.org, par, res => {
				if (res.code === 200) {
					res.data.forEach(a => {
						this.cities.push({
							id: a[obj.value],
							label: a[obj.key],
						})
					})
				 	
				 	// 校验当前cities的值是否包含于checkedCities 来选择checkAll状态
					var _checkAll = false;
					this.cities.forEach(a => {
						if(this.checkedCities.indexOf(a.id) != -1){
							_checkAll = true;
							return
						}
					})
					this.checkAll = _checkAll
                } else {
                    this.cities = []
                }
               
           });
		},
		handleCheckAllChange(val) {
			
	        if(val){
	        	  this.cities.forEach(a => {
	        	  	this.checkedCities.push(a.id)
	        	  })
	        }else{
	        	  this.checkedCities = [];
	        }
	        this.isIndeterminate = false;
	    },
	    handleCheckedCitiesChange(value) {
			// 校验当前cities的值是否包含于checkedCities 来选择checkAll状态
			var _checkAll = false;
			var count = 0;
			this.cities.forEach(a => {
				if(this.checkedCities.indexOf(a.id) != -1){
					count++;
					_checkAll = true;
					
					return
				}
			})
			this.checkAll = _checkAll;
			this.isIndeterminate = count == this.cities.length ? false : true
	    },
		getDatas() {
			// 获取详情(发给我的)
			fetch.get(message.receiveList + '/' + this.thisID, '', res => {
				if (res.code === 200) {
					this.input11 = res.data.fileNumber;
					this.lookTitle = res.data.title;
					this.leibie = res.data.noticeType;
					this.textarea = res.data.noticeContent;
					this.fileList = res.data.sysFilesList;
					res.data.receiverList.forEach(v => {
						this.input12.push(v.orgName);  
					});
                } else {
                    
                }
            });
		},
		getData() {
			// 获取详情(我发布的)
            fetch.get(message.publisherList + '/' + this.thisID, '', res => {
				if (res.code === 200) {
					this.input11 = res.data.fileNumber;
					this.lookTitle = res.data.title;
					this.leibie = res.data.noticeType;
					this.textarea = res.data.noticeContent;
					this.fileList = res.data.sysFilesList;
					res.data.receiverList.forEach(v => {
						this.input12.push(v.orgName);
					});
                } else {
                    
                }
			});
		},
		send() {
			var regEn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
			if (this.input10.length >= 50) {
				this.$message({
					type: 'warning',
					message: '请正确的填写通知标题！'
				})
				return 
			}
			if (this.input11.length >= 50 || regEn.test(this.input11)) {
				this.$message({
					type: 'warning',
					message: '请正确的填写文件号！'
				})
				return 
			}
			if(this.zubie == ''){
				this.$message({
					type: 'warning',
					message: '请选择发送组别！'
				})
				return
			}
			if(this.checkedCities == ''){
				this.$message({
					type: 'warning',
					message: '请选择发送对象！'
				})
				return
			}
			if(this.fileList == ''){
				this.$message({
					type: 'warning',
					message: '请上传附件！'
				})
				return
			}
			// 发布通知
			var _receive = [];
			this.checkedCities.forEach(a => {
				_receive.push({
					receive: a
				})
			})
            let par = {
				title: this.input10,
				fileNumber: this.input11,
				noticeType: this.leibie,
				noticeContent: this.textarea,
				receive: JSON.stringify(_receive),	
				fileInfo: JSON.stringify(this.fileList)
			};
			fetch.post(message.notice, par, res => {
				if (res.code === 200) {
					this.$message({
						type: 'success',
						message: res.message,
					})
					this.input10 = '';
					this.input11 = '';
					this.leibie = '';
					this.zubie = '';
					this.textarea = '';
					this.cities = [];
					this.fileList = [];
					this.checkedCities = [];
					this.checkAll = false;
					this.isIndeterminate = false
				}else{
					
				}
			});
       },
       
       // 关闭查看器
    	closeView(){
    		this.seeMedia = false;
    	},
    	// 查看或下载
    	view(item){
    		var AdvanceExit = false;
    		this.viewFileList = [];
    		var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png','image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv', 'video/mp4','video'];
			
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
		// 获取上传签名
		getFileSign() {
			
			fetch.get(allApi.getFileSign, '', res => {
				if(res.code === 200) {
					this.signData = res.data
				}
			})
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
			par.key = par.dir + '/' + publics.getGUID() +'.'+_type;
			
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
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png','image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv', 'video/mp4','video'];
			if(imgs.indexOf(type) != -1){
				return 'pic'
			}else if(videos.indexOf(type) != -1){
				return 'mov'
			}else{
				return 'file'
			}
		}
	}
}
</script>

<style scoped>
	.public {
	  height: auto;
	  padding: 40px;
	}
	.el-checkbox+.el-checkbox{
		margin: 0;
	}
	.w102{
		width: 102px;
	}
	.w146{
		width: 146px;
	}
	.w170{
		width: 170px;
	}
	.w342{
		width: 342px;
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
	.color{
		color:rgba(10,31,51,1);
	}
	.ft12{
		font-size: 12px;
	}
	.ft16{
		font-size: 18px;
	}
	.ft20{
		font-size: 20px;
	}
	.mar{
		margin-top: 13px;
		margin-bottom: 10px;
	}
	.item{
		display: flex;
	}
	.item_item{
		width: 400px;
		margin-right: 66px;
	}
	.item_item:last-child{
		margin-right: 0;
	}
	.item2{
		display: flex;
		margin: 29px 0;
		line-height: 2.3;
		
	}
	.item2_item1{
		width: 112px;
		margin-right: 12px;
	}
	.item2_item2{
		flex: 1;
	}
	.upload{
		display: inline-block;
		width:150px;
		height:150px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		box-shadow:0px 0px 8px 0px rgba(31,32,41,0.18);
		margin-right: 50px;
		background: url(../../../static/img/provincial/zz.png) no-repeat center center;
		cursor: pointer;
	}
	.upload>input{
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
	.img{
		display: inline-block;
		width:150px;
		height:150px;
		background:rgba(255,255,255,1);
		border-radius:4px;
		box-shadow:0px 0px 8px 0px rgba(31,32,41,0.18);
		margin-right: 50px;
	}
	.img .img_tilte{
		height: 30px;
		text-align: center;
		line-height: 30px;
		color:rgba(70,103,157,1);
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.img>img{
		display: block;
		height: 120px;
		width: 100%;
		border-radius:4px;
	}
	.fuj{
		display: flex;
		flex-wrap: wrap;
	}
</style>
