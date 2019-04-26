//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************



/* 首页api */

let index = {
	'travelAssist': url + '/api/travelAssist',  // 旅游扶贫计划数
	'count': url + '/api/plan/count',  // 获取年度计划数统计
	'detail': url + '/api/plan/detail',  // 获取计划数详情
	'pieData': url + '/api/plan/finishRate', // 饼图
	'helpPoor': url + '/api/export/travelAssistTask', // 导出扶贫进度表
	'train': url + '/api/export/train', // 导出培训进度表
	'replan': url + '/api/plan/country', // 修改计划数
}


export default index;