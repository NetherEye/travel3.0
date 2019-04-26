<template>
	<div class="aside_cap">
		<div class="aside_cap_title"><span class="ellipsis" :title="userInfo.orgName">{{userInfo.orgName.split(',')[0]}}</span></div>
	</div>
</template>

<script>
export default{
	
	data(){
		return{
			userInfo: {},
			
		}
	},
	created(){
		if(localStorage.getItem('userInfo') != undefined){
			this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
		}
	},
	methods: {
		
	}

	
}
	
</script>

<style scoped>
.aside_cap{
	height: 98px;
}
.aside_cap_title{
	font-size: 18px;
	color:rgba(255,255,255,1);
	display: flex;
	align-items: center;
	height: 98px;
	font-weight: 400;
	overflow:hidden;
}
.aside_cap_title:before{
	content: url(../../../static/img/provincial/dqwz.png);
	display: block;
	margin-right: 10px;
	width: 27px;
	height: 27px;
	margin-left: 36px;
}

</style>