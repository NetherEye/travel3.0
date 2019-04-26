//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let cun = {
    'cunvillage': url + '/api/import/village', // 1．导入村信息
    'dcvillage': url + '/api/export/village', // 7．导出村信息
    'xzcuntown': url + '/api/village/town', // 2．乡镇获取归属乡镇
    'cunxingz': url + '/api/village', // 3．新增村信息POST  // 修改 PUT  //获取 GET
    'cunxiangq': url + '/api/village', // 6．获取村信息详情
}


export default cun;

