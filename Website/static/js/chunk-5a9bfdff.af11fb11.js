(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a9bfdff"],{"81f4":function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("section",{staticClass:"container"},[n("treeselect",e._g(e._b({attrs:{value:e.value,defaultExpandLevel:1/0,options:e.treeOptions,normalizer:e.normalizer,"show-count":!0,placeholder:e.placeholder,noOptionsText:"暂无数据"}},"treeselect",e.$attrs,!1),e.$listeners))],1)},a=[],l=n("5530"),r=(n("a9e3"),n("ca17")),c=n.n(r),s=(n("542c"),n("b775")),o={components:{Treeselect:c.a},props:{value:{type:[String,Number],default:null},options:{type:Array,default:function(){return[]}},nodeKey:{type:String,default:"id"},defaultProps:{type:Object,default:function(){return{children:"children",label:"label"}}},placeholder:{type:String,default:"请选择"},apiCfg:{type:Object,default:null}},data:function(){return{treeOptions:this.options}},watch:{"apiCfg.config.params":function(){this.getTreeselect()}},created:function(){this.getTreeselect()},methods:{normalizer:function(e){""!==e.children&&void 0!==e.children&&null!==e.children&&0!==e.children.length||delete e.children;var t=this.nodeKey,n=this.defaultProps.label,i=this.defaultProps.children;return{id:e[t],label:e[n],children:e[i]}},getTreeselect:function(){var e=this;if(this.apiCfg){var t=this.apiCfg,n=t.config,i=t.handleFixRequestData,a=t.handleFixResponseData;if(n){var r=Object(l["a"])({},n);this.$HE.isFunction(i)&&(r=i(r,this)),Object(s["a"])(r).then((function(t){e.$HE.isFunction(a)&&(t=a(t));var n=t,i=n.data;null!==e.value?e.treeOptions=[{id:"0",name:"顶级节点",children:i}]:e.treeOptions=i}))}}}}},u=o,d=(n("add3"),n("2877")),f=Object(d["a"])(u,i,a,!1,null,"16758d89",null);t["default"]=f.exports},add3:function(e,t,n){"use strict";n("e037")},e037:function(e,t,n){}}]);