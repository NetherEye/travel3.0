<template>
    <div class="public">
        <div class="box">
            <div class="title">编辑短信</div>
            <div class="content">
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        短信内容
                    </div>
                    <div class="wu_right">
                        <el-input type="textarea" :rows="7" style="width:100%;" :autosize="{minRows:7,maxRows:7}" v-model="textarea">
                        </el-input>
                    </div>
                </div>
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        发送对象
                    </div>
                    <div class="wu_right">
                        <el-radio v-model="radio" label="1">备选项</el-radio>
                    </div>
                </div>
                <div class="item" style="margin-bottom: 34px;margin-top:34px">
                    <div class="wu_left">
                        插入调查问卷
                    </div>
                    <div class="wu_right wu_mi">
                        <p>
                            <el-radio v-model="radio" label="1">备选项</el-radio>
                        </p>
                        <div>
                            <div class="btn" @click="survey">新建调查问卷</div>
                        </div>
                    </div>
                </div>
                <div class="item  mi" style="margin-bottom: 34px;margin-top:34px">
                    <div class="btn TT">发送</div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            radio: '',
            type: '旅游景区详情',
            lookTitle: "培训",
            leibie: '全部',
            textarea: '',
            duixiang: '',
            zubie: '',
            options: [
                { value: '全部', label: '全部' },
                { value: '单个', label: '单个' }
            ],
        }
    },
    created() {
        // 获取页面类型 发布 查看
        if (this.$route.query.type != undefined) {
            this.type = this.$route.query.type;
        } else {
            // gg
        }
    },
    methods:{
        survey(){
            const { href } = this.$router.resolve({
				name: '新建调查问卷',
				query: {
					type: '查看',
				}
			})
			window.open(href, '_blank', "height=800,width=600");
        }
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
.img > img {
  display: block;
  height: 120px;
  width: 100%;
  border-radius: 4px;
}
.fuj {
  display: flex;
}
.wu_left {
  width: 8%;
  height: 50px;
  min-width: 75px;
  display: flex;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #0a1f33;
}
.wu_right {
  width: 92%;
}
.wu_mi {
  line-height: 37px;
}
.btn {
  width: 188px;
  height: 44px;
  background-color: #46679d;
  border-radius: 4px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
  color: #f8f8f8;
}
.mi{
    display: flex;
    justify-content: space-around;
}
.TT{
    width: 130px;
	height: 44px;
	background-color: #45c3ad;
	border-radius: 4px;
    font-size: 18px;
    color: #f8f8f8;
}
</style>