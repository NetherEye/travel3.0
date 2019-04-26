//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let allApi = {
  'mainData': url + '/api/train', // 登录
  'org': url + '/api/organization',
  'getCountry': url + '/api/train/getOrg', // 验证是否登录
  'train': url + '/api/train', // 验证是否登录/api/train/join
  'join': url + '/api/train/join', // 验证是否登录/api/train/join
  'reShow': url + 'api/train/reShow/', // 验证是否登录/api/train/join
  'exportCity': url + '/api/export/train/city', 
  'exportCounty': url + '/api/export/train/country', 
}


export default allApi;

