//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let jingqu = {
    'jingqulist': url + '/api/scenic/list', // 1．获取景区信息列表
    'jingquxiangqing': url + '/api/scenic', // 2．获取景区详情信息
    'jingqugengxing': url + '/api/scenic', // 2．获取景区详情信息  
    'scenic': url + '/api/export/scenic', // 4．导出景区信息 
    'isA': url + '/api/isAGrade', // 是否A级景区
}


export default jingqu;
