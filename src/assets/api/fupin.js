//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let fupin = {
	'reportMember': url + '/api/reportMember', // 获取填报员 get
	'poorpeopleList': url + '/api/poorpeople/list', // 获取贫困人口列表 get
	'poorpeople': url + '/api/poorpeople', // 获取贫困人口基本信息 +'/idCard'
	'travelAssistList': url + '/api/travelAssist/list', // 帮扶信息列表 get
	'travelAssistDetail': url + '/api/travelAssist', // 帮扶信息详情 get + '/id'
	'addTravelAssist': url + '/api/travelAssist', // 新增帮扶信息 post
	'updateTravelAssist': url + '/api/travelAssist', // 修改帮扶信息 put
	'checkTravelAssist': url + '/api/travelAssist/check', //区县审核帮扶信息 put
	'markTravelAssist': url + '/api/travelAssist/mark', // 省级市州标记可疑 put
	'importTravelAssist': url + '/api/import/travelAssist', // 导入帮扶信息 post
	'exportTravelAssist': url + '/api/export/travelAssist', // 导出帮扶信息 get
	'getPrjSite': url + '/api/projectAddress', // 获取项目地址
}


export default fupin;

