//let url = process.env.TOKENAPI;
let url = "/proxy";
//*********************上线时候打开注释打包发给后台*******************************

let message = {
	'notice': url + '/api/notice', // 1.发布通知 post
    'publisher': url + '/api/notice/publisher', // 2.查看我发布的 get
    'publisherList': url + '/api/notice/publisher', // 3.获取详情(我发布的) get /id
    'receive': url + '/api/notice/receive', // 4.发给我的通知 get
    'receiveList': url + '/api/notice/receive', // 5.获取详情(发给我的) post /id
    'org': url + '/api/notice/org', // 6.获取发送组别对象
    'sys': url + '/api/notice/sys', // 7.系统通知 GET
}


export default message;

