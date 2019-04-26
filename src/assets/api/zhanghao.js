//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let allApi = {
  'account': url + '/api/account', // 登录
  'freezeAccount': url + '/api/freezeAccount',
  'log': url + '/api/log', // 验证是否登录
  'reset': url + '/api/account/reset',
  'org': url + '/api/organization', // 获取市信息
  'unfreezeAccount': url + '/api/unfreezeAccount', // 获取市信息
  'organization': url + '/api/organization', // 获取市信息
  'user': url + '/api/user/', // 获取市信息
}


export default allApi;

