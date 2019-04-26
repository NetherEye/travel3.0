//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let fill = {
	'meReport': url + '/api/poorpeople/list/meReport', // 我填报的
	'meAssist': url + '/api/poorpeople/list/meAssist', // 我帮扶的
	'export': url + '/api/export/report', // 导出我填报的
}


export default fill;

