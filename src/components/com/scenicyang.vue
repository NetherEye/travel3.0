<template>
	<div class="public">
		<div class="box">
			<div class="title">{{type == '查看' ? '旅游景区详情' : '发布通知公告'}}</div>
			<div class="content">
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft18 mar">景区名称:</p>
						<p>
							<el-input v-model="tableData.scenicName" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">景区类别：</p>
						<p>
							<el-select v-model="tableData.scenicType" clearable placeholder="全部" :disabled="type=='查看'" style="width: 100%;">
								<el-option v-for="item in  optionaccounting" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>

						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">景区融合类型:</p>
						<p>
							<el-select v-model="tableData.fusionType" clearable placeholder="全部" :disabled="type=='查看'" style="width: 100%;">
								<el-option v-for="item in optionsCategory" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
						</p>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft18 mar">经度:</p>
						<p>
							<el-input v-model="tableData.longitude" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">纬度：</p>
						<p>
							<el-input v-model="tableData.latitude" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">地址:</p>
						<p>
							<el-input v-model="tableData.address" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
				</div>
				<div class="item1">
					<p class="color ft18 mar">景区介绍：</p>
					<el-input type="textarea" :rows="7" resize="none" :autosize="{minRows:7,maxRows:7}" v-model="tableData.scenicIntroduction" :disabled="type == '查看'">
					</el-input>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item1">
						<p class="color ft18 mar">景区宣传语:</p>
						<p >
							<el-input v-model="tableData.scenicPublicity" style="width:100%" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft18 mar">主体企业名称：</p>
						<p>
							<el-input v-model="tableData.fusionType" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">主体企业负责人：</p>
						<p>
							<el-input v-model="tableData.enterpriseManagerName" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">主体企业负责人电话：</p>
						<p>
							<el-input v-model="tableData.enterpriseManagerPhone" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
				</div>
				<div class="item" style="margin-bottom: 34px;">
					<div class="item_item">
						<p class="color ft18 mar">主要负责人：</p>
						<p>
							<el-input v-model="tableData.managerName" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
					<div class="item_item">
						<p class="color ft18 mar">主要负责人电话：</p>
						<p>
							<el-input v-model="tableData.managerPhone" :disabled="type=='查看'">
							</el-input>
						</p>
					</div>
				</div>
				
				<div class="item1">
					<p class="color ft18 mar">上传规划</p>
					<div class="fuj">
						<div class="img filesLook" v-for="(item, i) in fileList" :key='i'>
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
					</div>
				</div>
			</div>
		</div>
		<my-view :seeMedia="seeMedia" :nowIndex="viewIndex" :data="viewFileList" @cust="closeView"></my-view>
	</div>
</template>

<script>
import fetch from "@/assets/tools/fetch"
import jingqu from "@/assets/api/jingqu"
import allApi from "@/assets/api/user"
import publics from "@/assets/tools/publics"
import fullScreenView from '@/components/com/fullScreenView'
import axios from 'axios'
export default {
	components: { 'my-view': fullScreenView },
	data() {
		return {
			uploading: false,
			tableData: [],
			seeMedia: false,
			fileList: [],
			input10: '',
			thisID: null,
			type: '旅游景区详情',
			lookTitle: "培训",
			leibie: '全部',
			textarea: '',
			duixiang: '',
			percentage: 0,
			viewIndex: 0,
			viewFileList: [],
			zubie: '',
			options: [
				{ value: '全部', label: '全部' },
				{ value: '单个', label: '单个' }
			],
			
			//景区类别
			accounting: '',
			optionaccounting: [
				{ value: '-1', label: '5A级景区' },
				{ value: '0', label: '4A级景区' },
				{ value: '1', label: '3A级景区' },
				{ value: '2A级景区', label: '2A级景区' },
				{ value: '2', label: '100旅游景区' },
				{ value: '3', label: '国家级度假区' },
				{ value: '4', label: '省级度假区' },
				{ value: '5', label: '其他类型' },
			],
			//景区旅游类别
			Category: '',
			Added: '', // 市级权限
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
			imgs: ['jpg', 'jpeg', 'gif', 'bmp', 'png', 'image/jpeg', 'image/png', 'image'],
		}
	},
	created() {
		// 获取页面类型 发布 查看
		if (this.$route.query.type != undefined) {
			this.type = this.$route.query.type;
		} else {
		}
		if (this.$route.query.Added != undefined) {
			this.Added = this.$route.query.Added;
		} else {
			// gg
		}
		if (this.$route.query.id != undefined) {
			this.thisID = this.$route.query.id;
			this.getData();
		} else {
		}
	},
	methods: {
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
		getData() {
			fetch.get(jingqu.jingquxiangqing + '?id=' + this.thisID, '', res => {
				if (res.code === 200) {
					this.tableData = res.data;
					let { filesList } = res.data;
					this.fileList = filesList;
				} else {
				}
			});
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
.color {
  color: rgba(10, 31, 51, 1);
}
.ft12 {
  font-size: 12px;
}
.ft16{
	font-size: 18px;
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
.item_item1 {
  width: 100%;
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
</style>
