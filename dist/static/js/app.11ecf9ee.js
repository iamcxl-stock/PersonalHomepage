(window.webpackJsonp=window.webpackJsonp||[]).push([["app"],{"1Cbk":function(e,t,o){},"1U1s":function(e,t,o){"use strict";var n=o("1Cbk");o.n(n).a},"A0++":function(e,t,o){"use strict";var n=o("xUNX");o.n(n).a},BLJF:function(e,t,o){"use strict";var n=o("ReAY");o.n(n).a},GSUI:function(e,t,o){"use strict";o.d(t,"b",function(){return a}),o.d(t,"a",function(){return r}),o.d(t,"c",function(){return i});var n=o("vDqi"),s=o.n(n),a=function(e){return s.a.get("/search/searchEnginesData",e).then(function(e){return e.data})},r=function(e){return s.a.post("/search/searchEnginesAutoComplete",e).then(function(e){return e.data})},i=function(e){return s.a.post("/search/searchLog",e).then(function(e){return e.data})}},LRcJ:function(e,t,o){},ReAY:function(e,t,o){},Vtdi:function(e,t,o){"use strict";o.r(t);var n=o("Kw5r"),s=o("XJYT"),a=o.n(s),r=(o("D66Q"),o("oNX8").a),i=(o("BLJF"),o("KHd+")),c=Object(i.a)(r,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"search"},[o("div",[o("i",{class:e.searchIcon})]),e._v(" "),o("div",[o("el-autocomplete",{ref:"input",staticClass:"search-input",attrs:{placeholder:"请输入内容","fetch-suggestions":e.autoComplete},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.search()}},model:{value:e.word,callback:function(t){e.word=t},expression:"word"}},[o("el-select",{staticClass:"search-engine-select",attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:e.searchEngines.select,callback:function(t){e.$set(e.searchEngines,"select",t)},expression:"searchEngines.select"}},e._l(e.searchEngines.options,function(e){return o("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1),e._v(" "),o("el-button",{staticClass:"search-button",attrs:{slot:"append",icon:"el-icon-search"},on:{click:function(t){return e.search()}},slot:"append"})],1)],1)])},[],!1,null,"2fd23dec",null);c.options.__file="Search.vue";var l=c.exports,u=o("gDS+"),h=o.n(u),_=o("gjeX"),f=o.n(_),m=o("vDqi"),d=o.n(m),p={name:"login",data:function(){return{visible:!1,username:"",password:"",salt:"",user:""}},methods:{md5It:function(e){return e=f()(e)},login:function(){var e=this;""===this.username||""===this.password||void 0===this.username||void 0===this.password||0==this.username.length||0==this.password.length?this.$notify.error({message:"请填写用户名和密码",type:"error"}):function(e){return d.a.post("/login/userLoginGetSalt",e).then(function(e){return e.data})}({login_name:this.username}).then(function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):function(e){return d.a.post("/login/userLogin",e).then(function(e){return e.data})}({login_name:e.username,password:e.md5It(e.md5It(e.md5It(e.password)+t.data.stable_salt)+t.data.salt),timestamp:Math.round(new Date/1e3)}).then(function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):(e.visible=!1,e.$message({message:t.msg,type:"success"}),e.user=t.user,sessionStorage.setItem("user",h()(t.user)),e.$emit("user",e.user))})})},logout:function(){sessionStorage.removeItem("user"),this.user="",this.$message({message:"退出成功！",type:"success"}),this.$emit("user","")}},created:function(){},mounted:function(){try{var e=sessionStorage.getItem("user").replace(/\"/g,"");this.user=e}catch(e){}}},w=(o("ipUE"),Object(i.a)(p,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login-button"},[o("el-popover",{directives:[{name:"show",rawName:"v-show",value:""==e.user,expression:"user==''"}],staticClass:"login-popover",attrs:{placement:"top",width:"160"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[o("div",{staticStyle:{"text-align":"right",margin:"0"}},[o("el-input",{staticClass:"username",attrs:{size:"small",placeholder:"用户名"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login()}},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e._v(" "),o("el-input",{staticClass:"password",attrs:{size:"small",placeholder:"密码","show-password":""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.login()}},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),e._v(" "),o("el-button",{staticClass:"login",attrs:{size:"small",type:"primary"},on:{click:function(t){return e.login()}}},[e._v("登录")])],1),e._v(" "),o("el-button",{attrs:{slot:"reference",type:"text"},slot:"reference"},[e._v("登录")])],1),e._v(" "),o("el-dropdown",{directives:[{name:"show",rawName:"v-show",value:""!=e.user,expression:"user!=''"}],staticClass:"user-popover",attrs:{trigger:"hover"}},[o("span",{staticClass:"el-dropdown-link userinfo-inner"},[e._v(e._s(e.user))]),e._v(" "),o("el-dropdown-menu",{attrs:{slot:"dropdown"},slot:"dropdown"},[o("el-dropdown-item",[e._v("设置")]),e._v(" "),o("el-dropdown-item",{attrs:{divided:""},nativeOn:{click:function(t){return e.logout(t)}}},[e._v("退出登录")])],1)],1)],1)},[],!1,null,"1f3149bc",null));w.options.__file="Login.vue";var g=w.exports,v={name:"weather",props:{locations:Array,user:String},data:function(){return{weathers:[{location:"",weatherForm:{tmp:"-",tmp_min:"-",tmp_max:"-",fl:"-",wind:"-",aqi:"-",tomorrow_tmp_min:"-",tomorrow_tmp_max:"-"},iconfontWeatherClass:"el-icon-more",iconfontAqiClass:"el-icon-more",iconfontTomorrowWeatherClass:"el-icon-more"}],loading:!0,todayShow:!0,popover:{visible:!1,location:""}}},methods:{addLocation:function(){var e=this;this.popover.visible=!1,function(e){return d.a.post("/weather/weatherPersonalizedSave",e).then(function(e){return e.data})}({user:sessionStorage.getItem("user").replace(/\"/g,""),location:this.popover.location}).then(function(t){200!==t.code?e.$message({message:t.msg,type:"error"}):e.$message({message:t.msg,type:"success"})})},getWeatherDatafront:function(e){var t=this;this.todayShow=!1,""==e|0==e.length&&(e=void 0);try{var o=sessionStorage.getItem("user").replace(/\"/g,"")}catch(e){o=void 0}(function(e){return d.a.post("/weather/weatherData",e).then(function(e){return e.data})})({locations:e,user:o}).then(function(e){if(200!==e.code)t.$message({message:e.msg,type:"error"});else{t.weathers=[];for(var o=0;o<e.data.length;o++){var n=e.data[o],s=n.location,a=n.fl,r=n.tmp,i=n.wind,c=n.cond_code_d,l=(n.cond_txt_d,n.cond_code_n,n.cond_txt_n,n.tmp_max),u=n.tmp_min,h=n.tomorrow_cond_code_d,_=(n.tomorrow_cond_txt_d,n.tomorrow_tmp_max),f=n.tomorrow_tmp_min,m=n.aqi;t.weathers.push({weatherForm:{}}),t.weathers[o].weatherForm.tmp=r,t.weathers[o].weatherForm.tmp_min=u,t.weathers[o].weatherForm.tmp_max=l,t.weathers[o].weatherForm.fl=a,t.weathers[o].weatherForm.wind=i,t.weathers[o].weatherForm.aqi=m,t.weathers[o].weatherForm.tomorrow_tmp_min=f,t.weathers[o].weatherForm.tomorrow_tmp_max=_,t.weathers[o].location=s,t.loading=!1,100==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-qing"),(c>=101&&c<=102||104==c||c>=202&&c<=208)&&(t.weathers[o].iconfontWeatherClass="iconfont icon-duoyun"),103==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-duoyunzhuanyin"),200==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-feng"),201==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-qing"),c>=209&&c<=213&&(t.weathers[o].iconfontWeatherClass="iconfont icon-taifeng"),c>=301&&c<=303&&(t.weathers[o].iconfontWeatherClass="iconfont icon-baoyu"),304!=c&&313!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-bingbao"),300!=c&&305!=c&&309!=c&&314!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-xiaoyu"),306!=c&&315!=c&&399!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-zhongyu"),(c>=307&&c<=308||c>=310&&c<=312||c>=316&&c<=318)&&(t.weathers[o].iconfontWeatherClass="iconfont icon-dayu"),400!=c&&407!=c&&408!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-xiaoxue"),401!=c&&409!=c&&499!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-zhongxue"),402!=c&&410!=c||(t.weathers[o].iconfontWeatherClass="iconfont icon-daxue"),403==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-baoxue"),c>=404&&c<=406&&(t.weathers[o].iconfontWeatherClass="iconfont icon-yujiaxue"),(c>=500&&c<=501||c>=509&&c<=510||c>=514&&c<=515)&&(t.weathers[o].iconfontWeatherClass="iconfont icon-wu"),502==c&&(t.weathers[o].iconfontWeatherClass="iconfont icon-mai"),c>=503&&c<=504&&(t.weathers[o].iconfontWeatherClass="iconfont icon-shachen1"),c>=507&&c<=508&&(t.weathers[o].iconfontWeatherClass="iconfont icon-shachenbao"),m>=100&&(t.weathers[o].iconfontAqiClass="iconfont icon-PM"),m<100&&(t.weathers[o].iconfontAqiClass="iconfont icon-app_icons--"),100==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-qing"),(h>=101&&h<=102||104==h||h>=202&&h<=208)&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-duoyun"),103==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-duoyunzhuanyin"),200==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-feng"),201==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-qing"),h>=209&&h<=213&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-taifeng"),h>=301&&h<=303&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-baoyu"),304!=h&&313!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-bingbao"),300!=h&&305!=h&&309!=h&&314!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-xiaoyu"),306!=h&&315!=h&&399!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-zhongyu"),(h>=307&&h<=308||h>=310&&h<=312||h>=316&&h<=318)&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-dayu"),400!=h&&407!=h&&408!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-xiaoxue"),401!=h&&409!=h&&499!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-zhongxue"),402!=h&&410!=h||(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-daxue"),403==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-baoxue"),h>=404&&h<=406&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-yujiaxue"),(h>=500&&h<=501||h>=509&&h<=510||h>=514&&h<=515)&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-wu"),502==h&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-mai"),h>=503&&h<=504&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-shachen1"),h>=507&&h<=508&&(t.weathers[o].iconfontTomorrowWeatherClass="iconfont icon-shachenbao"),t.todayShow=!0}}}).catch(function(e){console.log(e)})}},created:function(){},mounted:function(){this.getWeatherDatafront(this.locations)}},C=(o("1U1s"),Object(i.a)(v,function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"weather"},[o("el-carousel",{attrs:{height:"250px",trigger:"click",interval:"5000"}},e._l(e.weathers,function(t){return o("el-carousel-item",{key:t},[o("el-row",{directives:[{name:"show",rawName:"v-show",value:e.todayShow,expression:"todayShow"}],ref:"weatherForm",refInFor:!0,attrs:{type:"flex",justify:"center",model:t.weatherForm}},[o("td",[o("el-row",{attrs:{type:"flex",justify:"left"}},[o("td",{staticClass:"todayWeatherIcon"},[o("i",{class:t.iconfontWeatherClass,staticStyle:{"font-size":"100px"}})]),e._v(" "),o("td",{staticClass:"todayWeatherText"},[o("div",{staticClass:"todayWeatherTextDiv"},[e._v(e._s(t.weatherForm.tmp)+"°C")])])]),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"left"}},[o("td",{staticClass:"todayAqiIcon"},[o("i",{class:t.iconfontAqiClass,staticStyle:{"font-size":"50px"}})]),e._v(" "),o("td",{staticClass:"todayAqiText"},[o("div",{staticClass:"todayAqiTextDiv"},[e._v("AQI:"+e._s(t.weatherForm.aqi))])])]),e._v(" "),o("el-row",{attrs:{type:"flex",justify:"left"}},[o("td",{staticClass:"tomorrowWeatherIcon"},[o("i",{class:t.iconfontTomorrowWeatherClass,staticStyle:{"font-size":"50px"}})]),e._v(" "),o("td",{staticClass:"tomorrowWeatherText"},[o("div",{staticClass:"tomorrowWeatherTextDiv"},[e._v("明日:"+e._s(t.weatherForm.tomorrow_tmp_min)+"°C-"+e._s(t.weatherForm.tomorrow_tmp_max)+"°C")])])])],1),e._v(" "),o("div",{staticStyle:{float:"left","margin-top":"30px",width:"1px",height:"200px",background:"darkgray","margin-left":"25px","margin-right":"25px"}}),e._v(" "),o("div",{staticClass:"weatherSideText"},[o("td",[o("div",{staticClass:"weatherSideTextDetail"},[e._v("今日气温: "+e._s(t.weatherForm.tmp_min)+"°C-"+e._s(t.weatherForm.tmp_max)+"°C")]),e._v(" "),o("div",{staticClass:"weatherSideTextDetail"},[e._v("风力: "+e._s(t.weatherForm.wind))]),e._v(" "),o("div",{staticClass:"weatherSideTextDetail"},[e._v("体感温度: "+e._s(t.weatherForm.fl)+"°C")])])])])],1)}),1),e._v(" "),o("el-popover",{attrs:{placement:"top",width:"160"},model:{value:e.popover.visible,callback:function(t){e.$set(e.popover,"visible",t)},expression:"popover.visible"}},[o("p",[e._v("添加城市：")]),e._v(" "),o("el-input",{attrs:{size:"mini",placeholder:"城市名称，如：北京"},model:{value:e.popover.city,callback:function(t){e.$set(e.popover,"city",t)},expression:"popover.city"}}),e._v(" "),o("div",{staticStyle:{"text-align":"right",margin:"0"}},[o("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.addLocation()}}},[e._v("确定")])],1),e._v(" "),o("el-button",{directives:[{name:"show",rawName:"v-show",value:""!=e.user,expression:"user!=''"}],attrs:{slot:"reference",icon:"el-icon-plus",size:"mini",circle:""},slot:"reference"})],1)],1)},[],!1,null,"2ec56aaa",null));C.options.__file="Weather.vue";var y={components:{search:l,login:g,weather:C.exports},data:function(){return{user:"",locations:[""]}},methods:{userLogined:function(e){var t=this;this.user=e,function(e){return d.a.post("/userInfo",e).then(function(e){return e.data})}({user:this.user}).then(function(e){200!==e.code?t.$message({message:e.msg,type:"error"}):t.locations=e.data.locations})}},mounted:function(){var e=sessionStorage.getItem("user").replace(/\"/g,"");this.user=void 0==e?"":e,console.log(this.user)}},x=(o("A0++"),Object(i.a)(y,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"app"}},[t("el-row",{staticClass:"loginRow"},[t("login",{on:{user:this.userLogined}})],1),this._v(" "),t("el-row",{staticClass:"searchRow"},[t("search")],1),this._v(" "),t("el-row",{staticClass:"cardRow"},[t("el-col",{attrs:{span:7,offset:1}},[t("el-card",{attrs:{shadow:"hover"}},[t("weather",{attrs:{locations:this.locations,user:this.user}})],1)],1)],1)],1)},[],!1,null,null,null));x.options.__file="App.vue";var b=x.exports,E=o("jE9Z");n.default.use(E.a);var W=new E.a({mode:"history",base:Object({NODE_ENV:"production"}).BASE_URL,routes:[]}),k=o("L2JU");o("vjVy"),o("H1Ta");n.default.use(a.a),n.default.use(k.a),new n.default({router:W,el:"#app",render:function(e){return e(b)}})},ipUE:function(e,t,o){"use strict";var n=o("LRcJ");o.n(n).a},oNX8:function(module,__webpack_exports__,__webpack_require__){"use strict";var babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__=__webpack_require__("gDS+"),babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default=__webpack_require__.n(babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0__),axios__WEBPACK_IMPORTED_MODULE_1__=__webpack_require__("vDqi"),axios__WEBPACK_IMPORTED_MODULE_1___default=__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__),_api_search__WEBPACK_IMPORTED_MODULE_2__=__webpack_require__("GSUI");__webpack_exports__.a={name:"search",data:function(){return{word:"",searchIcon:"search-icon el-icon-search",searchEngines:{select:"",select_engine_id:0,main_url:"",auto_complete_url:"",options:[]}}},methods:{searchEnginesDataFront:function(){var e=this;Object(_api_search__WEBPACK_IMPORTED_MODULE_2__.b)().then(function(t){if(200!==t.code)e.$message({message:t.msg,type:"error"});else{for(var o=0;o<t.data.length;o++)e.searchEngines.options.push({id:t.data[o].id,main_url:t.data[o].main_url,auto_complete_url:t.data[o].auto_complete_url,icon:t.data[o].icon,label:t.data[o].name,value:t.data[o].name});e.searchEngines.select=e.searchEngines.options[0].value,e.searchEngines.select_engine_id=e.searchEngines.options[0].id,e.searchEngines.main_url=e.searchEngines.options[0].main_url,e.searchEngines.auto_complete_url=e.searchEngines.options[0].auto_complete_url}})},search:function(){for(var e=0;e<this.searchEngines.options.length&&this.searchEngines.options[e].value!=this.searchEngines.select;e++);this.searchEngines.select_engine_id=this.searchEngines.options[e].id;var t=this.searchEngines.options[e].main_url.replace("%word%",this.word);window.open(t);try{var o=sessionStorage.getItem("user").replace(/\"/g,"")}catch(e){o=void 0}var n={user:o,engine_id:this.searchEngines.select_engine_id,search_text:this.word};Object(_api_search__WEBPACK_IMPORTED_MODULE_2__.c)(n).then(function(e){200!==e.code&&console.log(e.msg)}),this.word=""},autoComplete:function autoComplete(queryString,cb){if(""===queryString||queryString===[]||void 0===queryString)cb([]);else{var lastWord=sessionStorage.getItem("lastWord");if(lastWord==queryString)cb(eval(sessionStorage.getItem("lastWordAutoComplete")));else{sessionStorage.setItem("lastWord",queryString);var autoCompleteUrl=this.searchEngines.auto_complete_url.replace("%word%",this.word);try{var user=sessionStorage.getItem("user").replace(/\"/g,"")}catch(e){var user=void 0}var para={autoCompleteUrl:autoCompleteUrl,name:this.searchEngines.select,user:user};Object(_api_search__WEBPACK_IMPORTED_MODULE_2__.a)(para).then(function(e){var t=e.data.map(function(e){return{value:e}});sessionStorage.setItem("lastWordAutoComplete",babel_runtime_core_js_json_stringify__WEBPACK_IMPORTED_MODULE_0___default()(t)),cb(t)})}}}},created:function(){this.searchEnginesDataFront()},mounted:function(){this.$refs.input.focus()}}},vjVy:function(e,t,o){},xUNX:function(e,t,o){}},[["Vtdi","runtime","chunk-elementUI","chunk-libs"]]]);