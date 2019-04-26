//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let allApi = {
	'login': url + '/api/login', // 登录
	'logout': url + '/logout',
	'isLogin': url + '/api/isLogin', // 验证是否登录
	'getDivsion': url + '/api/organization', // get 获取区划
	'getFileSign': url + '/api/oss/sign', // get 上传签名
	'downTemplate': url + '/api/template/travelAssist', // 下载模板  扶贫
	'downoneTemplate': url + '/api/template/village', // 下载模板   村
	'updatePwd': url + '/api/account', // 修改密码
	'exportNine': url + '/api/export/belongTypeCount' // 导出九项工程
}


export default allApi;

