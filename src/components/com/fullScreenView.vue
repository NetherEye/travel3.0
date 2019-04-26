<template>
    <transition name="fade">
        <div class="media-wrapper" v-if="seeMedia">
            <div class="filesDel"><div class="btnDel" @click="close"></div></div>
            <div class="media-content">
                <el-carousel trigger="click" height="600px" :initial-index="nowIndex" :autoplay="false">
                	<el-carousel-item v-for="(item,index) in data" :key="index">
                		<img :src='item.url' v-if="item.ftp == 'pic'">
	                    <video :src="item.url" v-else controls="controls">
	                    </video>
                	</el-carousel-item>
                </el-carousel>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'cjMedia',
    data: function () {
        return {
        }
    },
    props: [
    	'seeMedia', 'data', 'nowIndex'
    ],
    mounted(){
    	
    },
    methods: {
        close() {
        	this.$emit('cust')
        	
        },
        
    },
    watch: {
    }
}
</script>

<style scoped>
.media-wrapper i {
    color: #fff
}
.media-controller { 
	position: absolute; 
	left: 50%; bottom: 30px; 
	transform: translateX(-50%);
}
.media-close { 
	position: absolute; 
	right: 5px; 
	top: 5px;  
}
.media-close i { 
	font-size: 30px;
}
.media-wrapper {
    position: absolute;
    width: 800px;
    height: 600px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: rgba(0, 0, 0, 0.52);
    z-index: 1010;
}

    
.media-content img {
    width: 100%;
    height: 100%;
}
.media-content video {
    width: 100%;
    height: 100%;
}

 .media-center {
 			width: 700px;
            height: 500px;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 1011;
        }
.media-left,
.media-right {
    width: 25%;
    height: 35%;
    filter: grayscale(90%);
}
.media-right {
    left: 100%;
    transform: translate(-105%, -50%);
}
.media-left {
    left: 0;
    transform: translate(5%, -50%);
}
.media-hide {
    height: 0;
    width: 0;
    left: 50%;
    z-index: 1010;
    opacity: 0;
}
.filesDel{
	position: absolute;
	right: 0;
	top: 0;
	width: 43px;
	height: 43px;
}
.btnDel{
	opacity: 1;
}

</style>