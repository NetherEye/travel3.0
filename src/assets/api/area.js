//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let area = {
    'xzdistrict': url + '/api/district', // 1．获取填报申请列表   详情
    'citycheck': url + '/api/district/check', // 5．市州审核填报申请
    'reportshegnqing': url + '/api/district/report', // 3．区县填报申请
    
    
   
}


export default area;

