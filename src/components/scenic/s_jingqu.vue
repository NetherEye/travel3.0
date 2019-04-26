<template>
	<div class="public ">
		<div class="main">
			<div class="main_content">
				<div class="box">
					<div class="content" style="margin-left:51px;">
						<div class="item">
							<el-form ref="form" label-position="left" :model="filter" label-width="100px" style="width:80%">
								<div>
									<el-row>
										<el-col :span="12">
											<div class="grid-content bg-purple">
												<el-form-item label="景区名称">
													<el-input v-model="filter.scenicName" disabled clearable></el-input>
												</el-form-item>
											</div>
										</el-col>
										<el-col :span="12">
											<div class="grid-content bg-purple-light">
												<el-form-item label="景区类别" style="">
													<el-select v-model="filter.scenicType" clearable placeholder="全部">
														<el-option v-for="item in  optionaccounting" :key="item.value" :label="item.label" :value="item.label"></el-option>
													</el-select>
												</el-form-item>
											</div>
										</el-col>
									</el-row>
								</div>
								<div>
									<el-row>
										<el-col :span="8">
											<div class="grid-content bg-purple">
												<el-form-item label="景区融合类型">
													<el-select v-model="filter.fusionType" clearable placeholder="全部">
														<el-option v-for="item in optionsCategory" :key="item.value" :label="item.label" :value="item.label"></el-option>
													</el-select>
												</el-form-item>
											</div>
										</el-col>
										<el-col :span="8">
											<div class="grid-content bg-purple-light">
												<el-form-item label="经度" label-width="60px">
													<el-input v-model.number="filter.longitude" disabled :maxlength="20" clearable></el-input>
												</el-form-item>
											</div>
										</el-col>
										<el-col :span="8">
											<div class="grid-content bg-purple">
												<el-form-item label="纬度" label-width="60px">
													<el-input v-model="filter.latitude" :maxlength="20" disabled clearable></el-input>
												</el-form-item>
											</div>
										</el-col>
									</el-row>
								</div>
								<div style="display: flex;width: 100%;height: 400px;margin-bottom: 10px;">
									<div style="width: 100px;height: 400px;"></div>
									<div class="baidumap" id="allmap"></div>
								</div>
								<el-form-item label="地址">
									<el-button type="text" disabled>搜索地址并右键点击地图获取经纬度</el-button>
									<el-input ref="suggestId" id="suggestId" v-model="filter.address" name="address_detail" clearable></el-input>
									
								</el-form-item>
								<div>
									<el-form-item label="景区介绍">
										<el-input type="textarea" :rows="7" resize='none' :autosize="{minRows:7,maxRows:7}" v-model="filter.scenicIntroduction"></el-input>
									</el-form-item>
								</div>
								<div>
									<el-form-item label="景区宣传语">
										<el-input v-model="filter.scenicPublicity" style="width:100%;" clearable>
										</el-input>
									</el-form-item>
								</div>
								<div>
									<el-col :span="12">
										<el-form-item label="主要负责人">
											<el-input v-model="filter.managerName" :maxlength="20" clearable>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="12">
										<el-form-item label="主要负责人电话" label-width="120px">
											<el-input v-model="filter.managerPhone" :maxlength="20" clearable>
											</el-input>
										</el-form-item>
									</el-col>
								</div>
								<div>
									<el-col :span="8">
										<el-form-item label="主体企业名称" label-width="100px">
											<el-input v-model="filter.enterpriseName" :maxlength="20" clearable>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="主体企业负责人" label-width="120px">
											<el-input v-model="filter.enterpriseManagerName" :maxlength="20" clearable>
											</el-input>
										</el-form-item>
									</el-col>
									<el-col :span="8">
										<el-form-item label="主体企业负责人电话" label-width="140px">
											<el-input v-model="filter.enterpriseManagerPhone" :maxlength="20" clearable>
											</el-input>
										</el-form-item>
									</el-col>
								</div>
							</el-form>
						</div>
						<div class="item1">
							<p class="color ft18 mar">上传规划</p>
							<div class="fuj">
								<div class="img filesLook" :class="'filesDel'" v-for="(item, i) in fileList" :key="i">
									<template v-if="imgs.indexOf(item.fileType) != -1">
										<img :src="item.url" />
										<div class="img_tilte ft12">照片描述</div>

										<template>
											<i class="btnDel" @click="delItem(i)"></i>
										</template>
										<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>

									</template>
									<template v-else>
										<img src="../../../static/img/provincial/wenjianmiaoshu.png" />
										<div class="img_tilte ft12 ellipsis" :title="item.originalName">{{item.originalName}}</div>
										<template>
											<i class="btnDel" @click="delItem(i)"></i>
										</template>
										<div class="file_look" :class="handleLookType(item.fileType)" @click="view(item)"></div>
									</template>
								</div>

								<div class="files">
									<div class="upload" v-show="!uploading">
										<input ref="file" type="file" multiple name="" id="" value="" @change="upload" />
									</div>

									<el-progress type="circle" :percentage="percentage" v-if="uploading"></el-progress>
								</div>
							</div>
						</div>
						<div class="mi">
							<p class="dibu" @click="goSubmit">提交</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="footer">
			<my-footer></my-footer>
		</div>
		<my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
	</div>
</template>

<script>
import footer from '@/components/com/footer'
import fetch from "@/assets/tools/fetch"
import jingqu from "@/assets/api/jingqu"
import allApi from "@/assets/api/user"
import publics from "@/assets/tools/publics"
import fullScreenView from '@/components/com/fullScreenView'
import BMap from 'BMap'
import BMapSymbolSHAPEPOINT from 'BMap_Symbol_SHAPE_POINT'
export default {
	data() {
		return {
			fileList: [],
			rightArr: [],
			seeMedia: false,
			viewIndex: 0,
			viewFileList: [],
			id: '',
			uploading: false,
			signData: '', // 上传签名
			percentage: 0,
			//景区类别
			accounting: '',
			optionaccounting: [
				{ value: '-1', label: '5A级景区' },
				{ value: '0', label: '4A级景区' },
				{ value: '1', label: '3A级景区' },
				{ value: '-2', label: '2A级景区' },
				{ value: '2', label: '100旅游景区' },
				{ value: '3', label: '国家级度假区' },
				{ value: '4', label: '省级度假区' },
				{ value: '5', label: '其他类型' },
			],
			//景区旅游类别
			Category: '',
			optionsCategory: [
				{ value: '-1', label: '温泉' },
				{ value: '0', label: '综合体' },
				{ value: '1', label: '农旅融合' },
				{ value: '2', label: '文旅融合' },
				{ value: '3', label: '体旅融合' },
				{ value: '4', label: '水旅融合' },
				{ value: '5', label: '森旅融合' },
				{ value: '6', label: '小城镇旅游融合' },
				{ value: '7', label: '工业旅游融合' }
			],
			isFilter: false, // 是否展开筛选
			filter: {
				scenicName: '',
				scenicType: '',
				fusionType: '',
				address: '',
				longitude: '',
				scenicIntroduction: '',
				scenicPublicity: '',
				managerName: '',
				managerPhone: '',
				enterpriseName: '',
				enterpriseManagerName: '',
				enterpriseManagerPhone: '',
			},
			textarea: '',
			input10: '',
			pageSize: 10,
			total: 0,
			currentPage: 1,
			type: '',
			address_detail: '',

			multipleSelection: [],
			userInfo: '',
			imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png','image'],
			userlocation: ''
		}
	},
	created() {
		this.getData();
		this.getFileSign();
	},
	mounted(){
		
	},
	components: { 'my-footer': footer, 'my-view': fullScreenView },
	methods: {
		baiduMap (lng, lat) {
		    var map = new BMap.Map('allmap')
		    
		    if(!lng){
		    	lng = 106.636589
		    }
		    if(!lat){
		    	lat = 26.653429
		    }
		    
		    var point = new BMap.Point(lng, lat)
		    map.centerAndZoom(point, 20)
		    
		    map.clearOverlays();    //清除地图上所有覆盖物
	    	var marker = new BMap.Marker(new BMap.Point(lng, lat))  // 创建标注
	    	map.addOverlay(marker)   
		    
		    var th = this
		    map.addEventListener('rightclick', function(e){
		    	map.clearOverlays();    //清除地图上所有覆盖物
		    	var marker = new BMap.Marker(new BMap.Point(e.point.lng, e.point.lat))  // 创建标注
		    	map.addOverlay(marker)   
		    	// 将标注添加到地图中
		    	th.filter.longitude = e.point.lng;
                th.filter.latitude = e.point.lat;
		    })
                   
                   var ac = new BMap.Autocomplete(    //建立一个自动完成的对象
                       {
                           "input": "suggestId"
                           , "location": map
                       })
                   var myValue
                   ac.addEventListener("onconfirm", function (e) {    //鼠标点击下拉列表后的事件
                       var _value = e.item.value;
                       myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
                       th.filter.address = myValue
                       
                       
                       setPlace();
                   });

                   function setPlace() {
                       map.clearOverlays();    //清除地图上所有覆盖物
                       function myFun() {
                           th.userlocation = local.getResults().getPoi(0).point;    //获取第一个智能搜索的结果
                          
                           
                           th.filter.longitude = th.userlocation.lng;
                       	   th.filter.latitude = th.userlocation.lat
                           map.centerAndZoom(th.userlocation, 18);
                           map.addOverlay(new BMap.Marker(th.userlocation));    //添加标注
                       }

                       var local = new BMap.LocalSearch(map, { //智能搜索
                           onSearchComplete: myFun
                       });
                       local.search(myValue);
//                     //测试输出坐标（指的是输入框最后确定地点的经纬度）
//                     	map.addEventListener("click", function(e){
//                         th.filter.longitude = th.userlocation.lng;
//                         th.filter.latitude = th.userlocation.lat
//							var marker = new BMap.Marker(new BMap.Point(th.userlocation.lng, th.userlocation.lat))  // 创建标注
//		    				map.addOverlay(marker)              // 将标注添加到地图中
//                     })
                  }
		    
	  	},
	  	handleSite(v){
	  		
	  	},
		handleFilter() {
			this.isFilter = !this.isFilter;
		},
		toggleSelection(rows) {
			if (rows) {
				rows.forEach(row => {
					this.$refs.multipleTable.toggleRowSelection(row);
				});
			} else {
				this.$refs.multipleTable.clearSelection();
			}
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
		},
		goScenic() {
			const { href } = this.$router.resolve({
				name: '扶贫人口',
				query: {
					a: 1,
					b: 2
				}
			})
			window.open(href, '_blank', "height=800,width=1280,top=100,left=100");
		},
		//获取详情
		getData() {
			fetch.get(jingqu.jingqugengxing, '', res => {
				if (res.code === 200) {
					this.filter = res.data;
					let { filesList, longitude, latitude, address } = res.data;
					this.fileList = filesList;
					this.id = res.data.id
					this.filter.address = address
					this.baiduMap(longitude, latitude)
				}
			})
		},
		delItem(i) {
			this.fileList.splice(i, 1);
		},
		//提交
		goSubmit() {
			var regEn = /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im;
			var str = /[\u4e00-\u9fa5]$/;
			var jindu = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
			var weidu = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
			var myreg = /^(1[3456789][0-9]{9})$/;
			var flag = false;
			for (var item in this.filter) {
				if (this.filter[item] === '') {
					flag = true;
				}
			}
			if (flag) {
				this.$message({
					type: 'warning',
					message: '请填写完整的景区信息！'
				})
				return;
			}
			if (!myreg.test(this.filter.managerPhone)) {
				this.$message({
					type: 'warning',
					message: '主要负责人电话手机号格式不正确'
				})
				return false;
			}
			if (!myreg.test(this.filter.enterpriseManagerPhone)) {
				this.$message({
					type: 'warning',
					message: '主体企业负责人电话手机号格式不正确'
				})
				return false;
			}
			// if (!jindu.test(this.filter.longitude)) {
			// 	this.$message({
			// 		type: 'warning',
			// 		message: '经度输入格式错误'
			// 	})
			// 	return false;
			// }
			// if (!weidu.test(this.filter.latitude)) {
			// 	this.$message({
			// 		type: 'warning',
			// 		message: '纬度输入格式错误'
			// 	})
			// 	return false;
			// }

			if (regEn.test(this.filter.managerName)) {
				this.$message({
					type: 'warning',
					message: '主要负责人不能有特殊字符'
				})
				return false;
			}
			if (regEn.test(this.filter.enterpriseName)) {
				this.$message({
					type: 'warning',
					message: '主体企业名称不能有特殊字符'
				})
				return false;
			}
			if (regEn.test(this.filter.enterpriseManagerName)) {
				this.$message({
					type: 'warning',
					message: '主体企业负责人不能有特殊字符'
				})
				return false;
			}
			let par = {
				id: this.id,
				scenicType: this.filter.scenicType,   //景区类别 
				fusionType: this.filter.fusionType,   //景区融合类型
				address: this.filter.address,     //详细地址
				longitude: this.filter.longitude,    //经度
				latitude: this.filter.latitude,      //纬度
				scenicIntroduction: this.filter.scenicIntroduction,    //景区介绍
				scenicPublicity: this.filter.scenicPublicity,      //景区宣传语
				managerPhone: this.filter.managerPhone,    //主要负责人电话
				managerName: this.filter.managerName,      //主要负责人姓名
				enterpriseName: this.filter.enterpriseName,     //主体企业名称
				enterpriseManagerName: this.filter.enterpriseManagerName,     //主体企业负责人姓名
				enterpriseManagerPhone: this.filter.enterpriseManagerPhone,   //主体企业负责人电话
				fileInfo: JSON.stringify(this.fileList),    //图片
			}
			if (this.fileList.length == 0) {
				this.$message({
					type: 'warning',
					message: '缺少佐证材料'
				})
				delete par.fileInfo
				return
			}
			fetch.put(jingqu.jingquxiangqing, par, res => {
				if (res.code === 200) {
					this.$message({
						showClose: true,
						duration: '1000',
						message: res.message,
						type: "success",

					});
					this.getData()
				}
			})
		},
		// 关闭查看器
		closeView() {
			this.seeMedia = false;
		},
		view(item) {
			var AdvanceExit = false;
			this.viewFileList = [];
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png','image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg', 'm2v', 'mkv', 'video/mp4','video'];

			this.fileList.forEach(a => {
				if (imgs.indexOf(a.fileType) != -1) {
					a.ftp = 'pic'
					this.viewFileList.push(a)
					return
				} else if (videos.indexOf(a.fileType) != -1) {
					a.ftp = 'mov'
					this.viewFileList.push(a)
					return
				} else if (item.url === a.url) {
					window.location = a.url;
					AdvanceExit = true;
				}

			})
			if (AdvanceExit) {
				return
			}
			this.viewFileList.forEach((a, i) => {
				if (a.url === item.url) {
					this.viewIndex = i
				}
			})

			this.seeMedia = true;


		},
		// 获取上传签名
		getFileSign() {
			fetch.get(allApi.getFileSign, '', res => {
				if (res.code === 200) {
					this.signData = res.data
				}
			})
		},
		//上传图片
		upload() {
			var file = this.$refs['file'].files[0];
			if (file == undefined) {
				return
			}
			if (file.name.lastIndexOf('.') == -1) {    //如果不存在"."  
				this.$message({
					type: 'error',
					message: '文件路径不正确！'
				})
				return
			}
			var _type = file.name.slice(file.name.lastIndexOf('.') + 1);
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg', 'm2v', 'mkv',],
				others = ['txt', 'xls', 'xlsx', 'doc', 'docx', 'pdf', 'ppt', 'zip'];
			if (imgs.indexOf(_type) === -1 && videos.indexOf(_type) === -1 && others.indexOf(_type) === -1) {
				this.$message({
					type: 'error',
					message: '文件格式暂不支持！'
				})
				return
			}
			this.uploading = true;
			let par = this.signData;
			par.key = par.dir + '/' + publics.getGUID()+'.'+_type;
			fetch.file(par, file, a => {
				let loaded = a.loaded,
					total = a.total;
				this.$nextTick(() => {
					this.percentage = Math.ceil((loaded / total) * 100);
				})

			}, res => {
				if (res.status === 200) {
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
		// 文件类型className返回
		handleLookType(type) {
			var imgs = ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png','image'],
				videos = ['mp4', 'rmvb', 'avi', 'ts', '3gp', 'flv', 'mpeg','m2v', 'mkv', 'video/mp4','video'];
			if (imgs.indexOf(type) != -1) {
				return 'pic'
			} else if (videos.indexOf(type) != -1) {
				return 'mov'
			} else {
				return 'file'
			}
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
}
.main_content {
  height: 100%;
  background: rgba(255, 255, 255, 1);
  display: flex;
  flex-direction: column;
  border-radius: 3px;
  box-shadow: 0px 0px 120px 0px rgba(31, 32, 41, 0.05);
  overflow: auto;
}
.filter {
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.isFilter {
  width: 190px;
  height: 50px;
  background: rgba(244, 244, 244, 1);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 18px;
  font-weight: 400;
  color: rgba(61, 97, 150, 1);
}
.rotate {
  transform: rotate(180deg);
}
.isFilter > img {
  margin-right: 10px;
  transition: all 0.3s;
}
.filterBox {
  position: absolute;
  border-top: 1px solid rgba(238, 238, 238, 1);
  padding: 36px 50px 46px 50px;
  height: auto;
  z-index: 999;
  background-color: #fff;
  top: 74px;
  left: 0;
  right: 0;
  opacity: 0.99;
  box-shadow: 0px 10px 40px rgba(0, 0, 0, 0.14);
}
.mi {
  margin-top: 34px;
  display: flex;
  justify-content: space-around;
}
.dibu {
  width: 130px;
  height: 40px;
  background-color: #45c3ad;
  border-radius: 4px;
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #f8f8f8;
  cursor: pointer;
}
.yey {
  width: 130px;
  height: 40px;
  background-color: #a4a8b3;
  border-radius: 4px;
}
.filter_btn {
  display: flex;
  justify-content: flex-end;
  padding-left: 52px;
  margin-top: 13px;
}
.filter_btn > div {
  margin-left: 30px;
}
.table {
  flex: 1;
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
.ft12 {
  font-size: 12px;
}
.ft18 {
  font-size: 14px;
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
  width: 400px;
  margin-right: 66px;
}
.item_item:last-child {
  margin-right: 0;
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
.upload > input {
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
.img > img {
  display: block;
  height: 120px;
  width: 100%;
  border-radius: 4px;
}
.fuj {
  display: flex;
  flex-wrap: wrap;
}
.baidumap{
	flex: 1;
}
</style>