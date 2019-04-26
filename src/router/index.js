import Vue from 'vue'
import Router from 'vue-router'

import login from '@/components/login/login';
//const login = resolve => require(['@/components/login/login'], resolve)
const erji = resolve => require(['@/components/com/erji'], resolve)
const common = resolve => require(['@/components/com/common'], resolve)
/* 路由懶加載 */

/* 二级 */

const dxfind = resolve => require(['@/components/com/dxfind'], resolve)
const addPx = resolve => require(['@/components/com/addPx'], resolve)
const coUser = resolve => require(['@/components/com/coUser'], resolve)
const messageLook = resolve => require(['@/components/com/messageLook'], resolve)
const fpmessage = resolve => require(['@/components/com/fpmessage'], resolve)
const hdxiangqing = resolve => require(['@/components/com/hdxiangqing'], resolve)
const questioList = resolve => require(['@/components/com/questioList'], resolve)
const userDadly = resolve => require(['@/components/com/userDadly'], resolve)
const questionnaire = resolve => require(['@/components/com/questionnaire'], resolve)
const setUpUser = resolve => require(['@/components/com/setUpUser'], resolve)
const xgUser = resolve => require(['@/components/com/xgUser'], resolve)
const coXgUser = resolve => require(['@/components/com/coXgUser'], resolve)

const scenicyang = resolve => require(['@/components/com/scenicyang'], resolve)
const areayang = resolve => require(['@/components/com/areayang'], resolve)
const fupinyang = resolve => require(['@/components/com/fupinyang'], resolve)
const fupinxq = resolve => require(['@/components/com/fupinxq'], resolve)
const research = resolve => require(['@/components/com/research'], resolve)
const shortsurvey = resolve => require(['@/components/com/shortsurvey'], resolve)
const training = resolve => require(['@/components/com/training'], resolve)
const addcun = resolve => require(['@/components/com/addcun'], resolve)

const oldDataDetail = resolve => require(['@/components/publicPage/oldDataDetail'], resolve)

/* public page */
const oldData = resolve => require(['@/components/publicPage/oldData'], resolve)

/* 省级 */
import p_home from '@/components/provincial/p_home';
//const p_home = resolve => require(['@/components/provincial/p_home'], resolve)
const p_index = resolve => require(['@/components/provincial/p_index'], resolve)
const p_message = resolve => require(['@/components/provincial/p_message'], resolve)
const p_fupin = resolve => require(['@/components/provincial/p_fupin'], resolve)
const p_peixun = resolve => require(['@/components/provincial/p_peixun'], resolve)
const p_duanxin = resolve => require(['@/components/provincial/p_duanxin'], resolve)
const p_zhanghao = resolve => require(['@/components/provincial/p_zhanghao'], resolve)
const p_cun = resolve => require(['@/components/provincial/p_cun'], resolve)
const p_jingqu = resolve => require(['@/components/provincial/p_jingqu'], resolve)
const p_area = resolve => require(['@/components/provincial/p_area'], resolve)

/* 市级 */
import c_home from '@/components/city/c_home';
//const c_home = resolve => require(['@/components/city/c_home'], resolve)
const c_index = resolve => require(['@/components/city/c_index'], resolve)
const c_message = resolve => require(['@/components/city/c_message'], resolve)
const c_fupin = resolve => require(['@/components/city/c_fupin'], resolve)
const c_peixun = resolve => require(['@/components/city/c_peixun'], resolve)
const c_zhanghao = resolve => require(['@/components/city/c_zhanghao'], resolve)
const c_cun = resolve => require(['@/components/city/c_cun'], resolve)
const c_jingqu = resolve => require(['@/components/city/c_jingqu'], resolve)
const c_area = resolve => require(['@/components/city/c_area'], resolve)

/* 县级 */
import co_home from '@/components/county/co_home';
//const co_home = resolve => require(['@/components/county/co_home'], resolve)
const co_index = resolve => require(['@/components/county/co_index'], resolve)
const co_message = resolve => require(['@/components/county/co_message'], resolve)
const co_fupin = resolve => require(['@/components/county/co_fupin'], resolve)
const co_peixun = resolve => require(['@/components/county/co_peixun'], resolve)
const co_zhanghao = resolve => require(['@/components/county/co_zhanghao'], resolve)
const co_cun = resolve => require(['@/components/county/co_cun'], resolve)
const co_jingqu = resolve => require(['@/components/county/co_jingqu'], resolve)
const co_area = resolve => require(['@/components/county/co_area'], resolve)

/* 乡级 */
import v_home from '@/components/village/v_home';
//const v_home = resolve => require(['@/components/village/v_home'], resolve)
const v_index = resolve => require(['@/components/village/v_index'], resolve)
const v_message = resolve => require(['@/components/village/v_message'], resolve)
const v_fupin = resolve => require(['@/components/village/v_fupin'], resolve)
const v_cun = resolve => require(['@/components/village/v_cun'], resolve)
const v_fill = resolve => require(['@/components/village/v_fill'], resolve)

/* 景区 */
import s_fupin from '@/components/scenic/s_fupin';
const s_home = resolve => require(['@/components/scenic/s_home'], resolve)
const s_index = resolve => require(['@/components/scenic/s_index'], resolve)
const s_message = resolve => require(['@/components/scenic/s_message'], resolve)
//const s_fupin = resolve => require(['@/components/scenic/s_fupin'], resolve)
const s_jingqu = resolve => require(['@/components/scenic/s_jingqu'], resolve)
const s_fill = resolve => require(['@/components/scenic/s_fill'], resolve)

Vue.use(Router)

export default new Router({
	routes: [{
			path: '/',
			name: '登录',
			component: login
		},
		/* 二级页面 */
		{
			path: '/second',
			name: '二级页面',
			meta: {
				level: ['省', '市州', '区县', '乡镇', '景区'],
			},
			component: erji,
			children: [{
					path: 'addPx',
					name: '新增培训',
					component: addPx,
				},
				{
					path: 'messageLook',
					name: '通知公告查看',
					component: messageLook,
				},
				{
					path: 'setUpUser',
					name: '创建账号',
					component: setUpUser,
				},
				{
					path: 'xgUser',
					name: '修改账号',
					component: xgUser,
				},
				{
					path: 'coXgUser',
					name: '区县修改账号',
					component: coXgUser,
				},
				{
					path: 'coUser',
					name: '县级创建账号',
					component: coUser,
				},
				{
					path: 'dxfind',
					name: '短信查看',
					component: dxfind,
				},
				{
					path: 'questionnaire',
					name: '调查问卷设计',
					component: questionnaire,
				},
				{
					path: 'userDadly',
					name: '账号操作日志',
					component: userDadly,
				},
				{
					path: 'hdxiangqing',
					name: '培训活动详情',
					component: hdxiangqing,
				},
				{
					path: 'scenicyang',
					name: '景区基本信息',
					component: scenicyang,
				},
				{
					path: 'fupinyang',
					name: '扶贫人口',
					component: fupinyang,
				},
				{
					path: 'fpmessage',
					name: '扶贫信息查看',
					component: fpmessage,
				},
				{
					path: 'questioList',
					name: '调查问卷列表',
					component: questioList,
				},
				{
					path: 'areayang',
					name: '行政区划',
					component: areayang,
				}, {
					path: 'research',
					name: '短信调查问卷',
					component: research,
				}, {
					path: 'shortsurvey',
					name: '新建调查问卷',
					component: shortsurvey,
				}, {
					path: 'training',
					name: '培训信息',
					component: training,
				}, {
					path: 'addcun',
					name: '新增村信息',
					component: addcun,
				}, {
					path: 'oldDataDetail',
					name: '旧数据详情',
					component: oldDataDetail
				},
				
			],
		},

		/* 通用页面 */
		{
			path: '/common',
			name: '通用页面',
			component: common,
			meta: {
				level: ['省', '市州', '区县', '乡镇', '景区'],
			},
			children: [{
				path: 'fupinxq',
				name: '省级扶贫详情',
				component: fupinxq
			}],
		},
		/* 省级 */
		{
			path: '/provincial',
			component: p_home,
			meta: {
				level: '省'
			},
			children: [{
					path: '',
					name: '省级首页',
					component: p_index
				},
				{
					path: 'message',
					name: '省级公告',
					component: p_message
				},
				{
					path: 'fupin',
					name: '省级扶贫',
					component: p_fupin,
				},
				{
					path: 'peixun',
					name: '省级培训',
					component: p_peixun
				},
				{
					path: 'duanxin',
					name: '省级短信',
					component: p_duanxin
				},
				{
					path: 'zhanghao',
					name: '省级账号',
					component: p_zhanghao
				},
				{
					path: 'cun',
					name: '省级村',
					component: p_cun,

				},
				{
					path: 'jingqu',
					name: '省级景区',
					component: p_jingqu,
				},
				{
					path: 'area',
					name: '省级区域',
					component: p_area,
				},
			]
		},

		/* 市级 */
		{
			path: '/city',
			component: c_home,
			meta: {
				level: '市州'
			},
			children: [{
					path: '',
					name: '市级首页',
					component: c_index
				},
				{
					path: 'message',
					name: '市级公告',
					component: c_message
				},
				{
					path: 'fupin',
					name: '市级扶贫',
					component: c_fupin,
				},
				{
					path: 'peixun',
					name: '市级培训',
					component: c_peixun
				},
				{
					path: 'zhanghao',
					name: '市级账号',
					component: c_zhanghao
				},
				{
					path: 'cun',
					name: '市级村',
					component: c_cun,

				},
				{
					path: 'jingqu',
					name: '市级景区',
					component: c_jingqu,
				},
				{
					path: 'area',
					name: '市级区域',
					component: c_area,
				},
			]
		},

		/* 县级 */
		{
			path: '/county',
			component: co_home,
			meta: {
				level: '区县'
			},
			children: [{
					path: '',
					name: '县级首页',
					component: co_index
				},
				{
					path: 'message',
					name: '县级公告',
					component: co_message
				},
				{
					path: 'fupin',
					name: '县级扶贫',
					component: co_fupin,
				},
				{
					path: 'peixun',
					name: '县级培训',
					component: co_peixun
				},
				{
					path: 'zhanghao',
					name: '县级账号',
					component: co_zhanghao
				},
				{
					path: 'cun',
					name: '县级村',
					component: co_cun,

				},
				{
					path: 'jingqu',
					name: '县级景区',
					component: co_jingqu,
				},
				{
					path: 'area',
					name: '县级区域',
					component: co_area,
				},
				{
					path: 'oldData',
					name: '2.0旧数据处理',
					component: oldData,
				}
			]
		},

		/* 乡级 */
		{
			path: '/village',
			component: v_home,
			meta: {
				level: '乡镇'
			},
			children: [{
					path: '',
					name: '乡级首页',
					component: v_index
				},
				{
					path: 'message',
					name: '乡级公告',
					component: v_message
				},
				{
					path: 'fupin',
					name: '乡级扶贫',
					component: v_fupin,
				},
				{
					path: 'fill',
					name: '乡级我填写的',
					component: v_fill,
				},
				{
					path: 'cun',
					name: '乡级村',
					component: v_cun,

				},
			]
		},
		/* 景区 */
		{
			path: '/scenic',
			component: s_home,
			meta: {
				level: '景区'
			},
			children: [{
					path: '',
					name: '景区首页',
					component: s_index
				},
				{
					path: 'message',
					name: '景区公告',
					component: s_message
				},
				{
					path: 'fupin',
					name: '景区扶贫',
					component: s_fupin,
				},
				{
					path: 'fill',
					name: '景区我填写的',
					component: s_fill,
				},
				{
					path: 'jingqu',
					name: '景区景区',
					component: s_jingqu,

				},
			]
		},

	]
})