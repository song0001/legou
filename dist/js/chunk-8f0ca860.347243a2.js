(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f0ca860"],{b053:function(t,c,n){"use strict";n.d(c,"b",(function(){return e})),n.d(c,"a",(function(){return i}));var o=n("0c6d");function e(t){return Object(o["a"])({method:"get",url:"/collect/listAction",data:t})}function i(t){return Object(o["a"])({method:"post",url:"/collect/addcollect",data:t})}},b5ba:function(t,c,n){"use strict";n.r(c);var o=function(){var t=this,c=t.$createElement,n=t._self._c||c;return n("div",[n("van-nav-bar",{attrs:{fixed:"",title:"乐购","left-text":"返回","left-arrow":""},on:{"click-left":t.onClickLeft}}),n("div",{staticClass:"content"},[n("h2",[t._v("我的收藏")]),n("ul",{staticClass:"collect"},t._l(t.collectGoodsList,(function(c){return n("li",{key:c.id,on:{click:function(n){return t.goGoods(c)}}},[n("img",{attrs:{src:c.list_pic_url,alt:""}}),n("p",[t._v(t._s(c.name))]),n("p",{staticClass:"price"},[t._v("¥"+t._s(c.retail_price))])])})),0)])],1)},e=[],i=n("b053"),l={data:function(){return{collectGoodsList:[]}},created:function(){this.init()},methods:{onClickLeft:function(){this.$router.back(1)},init:function(){var t=this;Object(i["b"])({openId:localStorage.getItem("openId")}).then((function(c){console.log(c),t.collectGoodsList=c.collectGoodsList}))},goGoods:function(t){this.$router.push({path:"/goods",query:{id:t.id}})}}},s=l,r=(n("e9d9"),n("2877")),a=Object(r["a"])(s,o,e,!1,null,"0a57d535",null);c["default"]=a.exports},e9d9:function(t,c,n){"use strict";n("f31a")},f31a:function(t,c,n){}}]);
//# sourceMappingURL=chunk-8f0ca860.347243a2.js.map