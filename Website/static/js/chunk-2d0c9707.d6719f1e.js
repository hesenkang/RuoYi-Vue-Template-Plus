(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c9707"],{"58c1":function(e,a,n){"use strict";n.r(a);n("d3b7"),n("3ca3"),n("ddb0");var i={name:"侧栏",isShow:!1,props:{width:"320px"},viewData:{name:"sideTree",apiCfg:{config:{url:"/paramodelset/getTree",method:"post",data:{}}},data:function(){return[]||!1},props:{nodeKey:"id",defaultProps:{children:"children",label:"devModelName"}}}},l={name:"头部",isShow:!0,props:{height:"none"},viewData:{asyncComponent:"",componentCfg:{apiCfg:{config:{url:"",method:"",data:{}},handleFixRequestData:function(e){return e},handleFixResponseData:function(e){return e}},fields:[{label:"项目名称",field:"name",type:"input",props:{}}],hasControl:!0,submitText:"提交",resetText:"重置",props:{inline:!0}}}},t={name:"主体",props:{},viewData:{asyncComponent:function(){return Promise.all([n.e("chunk-commons"),n.e("chunk-9657921a")]).then(n.bind(null,"7bdb"))},componentCfg:{buttonsCfg:{data:[{label:"添加",type:"Add",showMode:"top",url:"",props:{type:"primary"},modal:{isShow:!1,title:"新增",hasControl:!0,submitText:"确 定",closeText:"取 消",formCfg:{fields:[{label:"方案名称",field:"programName",type:"input",props:{},isRequired:!0},{label:"收费方式",field:"chargeMethod",type:"radio",props:{},defaultValue:1,options:"ChargeMethod"},{label:"单价(¥/kW·h)",field:"price",type:"input",props:{},isRequired:!0,isShow:function(e){return console.log(e),1===e.chargeMethod}},{label:"尖电价(¥/kW·h)",field:"J",type:"JFPGTimeInput",props:{},isRequired:!0,isShow:function(e){return 3===e.chargeMethod}},{label:"峰电价(¥/kW·h)",field:"F",type:"JFPGTimeInput",props:{},isRequired:!0,isShow:function(e){return 3===e.chargeMethod}},{label:"平电价(¥/kW·h)",field:"P",type:"JFPGTimeInput",props:{},isRequired:!0,isShow:function(e){return 3===e.chargeMethod}},{label:"谷电价(¥/kW·h)",field:"G",type:"JFPGTimeInput",props:{},isRequired:!0,isShow:function(e){return 3===e.chargeMethod}},{label:"深谷电价(¥/kW·h)",field:"SG",type:"JFPGTimeInput",props:{},isRequired:!0,isShow:function(e){return 3===e.chargeMethod}}],hasControl:!1,props:{inline:!0}},form:{}}},{label:"删除",type:"Delete",showMode:"top",url:"",props:{type:"danger"}},{label:"编辑",type:"Edit",showMode:"row",detailUrl:"",url:"",props:{type:"text"}}]},columnsCfg:{data:[{label:"项目名称",field:"programName",align:"center"},{label:"客户名称",field:"chargeType",align:"center",options:"ChargeType"},{label:"详细地址",field:"status",align:"center",options:"ChargeStatus"},{label:"负责人",field:"createBy",align:"center"},{label:"联系电话",field:"createTime",align:"center"}],apiCfg:{config:{url:"",method:"",data:{}},handleFixResponseData:function(e){return e}}},dataCfg:{data:[{name:"小明",deviceName:"新风机AHU",level:1},{name:"小明",deviceName:"新风机AHU",level:2},{name:"小明",deviceName:"新风机AHU",level:3},{name:"小明",deviceName:"新风机AHU",level:4},{name:"小明",deviceName:"新风机AHU",level:5},{name:"小明",deviceName:"新风机AHU",level:1},{name:"小明",deviceName:"新风机AHU",level:2},{name:"小明",deviceName:"新风机AHU",level:3},{name:"小明",deviceName:"新风机AHU",level:4},{name:"小明",deviceName:"新风机AHU",level:5},{name:"小明",deviceName:"新风机AHU",level:1},{name:"小明",deviceName:"新风机AHU",level:2},{name:"小明",deviceName:"新风机AHU",level:3},{name:"小明",deviceName:"新风机AHU",level:4},{name:"小明",deviceName:"新风机AHU",level:5},{name:"小明",deviceName:"新风机AHU",level:1},{name:"小明",deviceName:"新风机AHU",level:2},{name:"小明",deviceName:"新风机AHU",level:3},{name:"小明",deviceName:"新风机AHU",level:4},{name:"小明",deviceName:"新风机AHU",level:5}],apiCfg:{config:{url:"",method:"get",data:{}},handleFixRequestData:function(e){return e},handleFixResponseData:function(e){return e}}},pagination:{isShow:!0,pageNum:1,pageSize:15,props:{"page-sizes":[1,15,30,40,50,100]}},props:{}}}},o={aside:i,mainHeader:l,main:t,footer:{name:"底部",isShow:!1}};a["default"]=o}}]);