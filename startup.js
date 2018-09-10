/* mobilecaddy-utils - v2.0.0 - Bundle Time: 2018-09-10 13:42:32 */
/* git info: "2018-09-10 13:41:13 +0100": b8e025ed252ff0d8eecc501c7ccdff0408e732d7 (v2) */
/* Copyright 2018 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getStatus=exports.startup=void 0;var _constants=require("./constants"),mobileCaddy=_interopRequireWildcard(_constants),_underscore=require("underscore"),_=_interopRequireWildcard(_underscore),_smartStoreUtils=require("./smartStoreUtils"),smartStoreUtils=_interopRequireWildcard(_smartStoreUtils),_systemData=require("./systemData"),systemData=_interopRequireWildcard(_systemData),_logger=require("./logger"),logger=_interopRequireWildcard(_logger),_syncRefresh=require("./syncRefresh"),syncRefresh=_interopRequireWildcard(_syncRefresh);function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t.default=e,t}var smartstore=cordova.require("com.salesforce.plugin.smartstore"),LOCAL_DEV=!!window.LOCAL_DEV,USE_FORCETK=!!window.USE_FORCETK,INITIAL_APPCACHE_INFO=[];console.log("LOCAL_DEV",LOCAL_DEV),console.log("USE_FORCETK",USE_FORCETK);var startupStatus=["Initialising"];function createRecsToSyncSoup(e,t){smartstore.registerSoup("recsToSync",[{path:"Mobile_Table_Name",type:"string"},{path:"SOUP_Record_Id",type:"string"},{path:"Id",type:"string"},{path:"LastModifiedDateTime",type:"integer"},{path:"CRUD_Operation",type:"string"},{path:"Current_Connection_Session",type:"string"}],e,t)}function createRecsToSyncSoupPromise(){return new Promise(function(e,t){smartstore.registerSoup("recsToSync",[{path:"Mobile_Table_Name",type:"string"},{path:"SOUP_Record_Id",type:"string"},{path:"Id",type:"string"},{path:"LastModifiedDateTime",type:"integer"},{path:"CRUD_Operation",type:"string"},{path:"Current_Connection_Session",type:"string"}],function(){e()},function(e){t(e)})})}console.log("Startup error listener"),window.addEventListener("error",function(e){var t=e.error?e.error.stack:null,o=e.error?e.error.toString():e;t&&(o+="\n"+t),console.log("Error event listener fired",JSON.stringify(o))});var CHECK_CACHE_SUCCESS=100900,CHECK_CACHE_FAILURE=100901;function checkCache(e){console.log("checkCache entry"),startupStatus.unshift("Checking Cache"),INITIAL_APPCACHE_INFO=[];var t=localStorage.getItem("tmpCacheItems");if(console.log("cacheLS",t),t){var o=JSON.parse(t);if(o.length>0&&("preBootstrap-noupdate"==o[o.length-1].Description||"preBootstrap-checking"==o[o.length-1].Description))return console.log("not 1st run up"),INITIAL_APPCACHE_INFO=[],void e({status:CHECK_CACHE_SUCCESS});if(console.log("Hi"),INITIAL_APPCACHE_INFO=o,o.length>0&&"preBootstrap-cached"==o[o.length-1].Description)return console.log("Returning success"),void e({status:CHECK_CACHE_SUCCESS})}else INITIAL_APPCACHE_INFO.push({Name:"AppCache: Initial Status",Description:window.applicationCache.status});window.applicationCache.addEventListener("checking",function(e){writeCacheInfo(e)},!1),window.applicationCache.addEventListener("downloading",function(e){writeCacheInfo(e)},!1),window.applicationCache.addEventListener("progress",function(e){writeCacheInfo(e)},!1);var r={};switch(r.status=CHECK_CACHE_SUCCESS,window.applicationCache.status){case window.applicationCache.CHECKING:case window.applicationCache.DOWNLOADING:return window.applicationCache.addEventListener("updateready",function(t){writeCacheInfo(t,e)},!1),window.applicationCache.addEventListener("cached",function(t){writeCacheInfo(t,e)},!1),window.applicationCache.addEventListener("error",function(t){writeCacheInfo(t,e)},!1),window.applicationCache.addEventListener("noupdate",function(t){writeCacheInfo(t,e)},!1),void console.log("checkCache - Cache Busy");case window.applicationCache.UPDATEREADY:e(r),console.log("cache in updateready");break;default:console.log("cache in default",window.applicationCache),e(r)}}function writeCacheInfo(e,t){"progress"==e.type?(console.log("cache in progress"),INITIAL_APPCACHE_INFO.push({Name:"Event ",Description:e.loaded+" of "+e.total})):INITIAL_APPCACHE_INFO.push({Name:"Event ",Description:e.type});var o={};"udpateready"==e.type||"cached"==e.type?(console.log("cache in update ready or cached"),o.status=CHECK_CACHE_SUCCESS):(console.log("cache in else",e.type),o.status=CHECK_CACHE_FAILURE),console.log("return object "),console.log(o),t&&"function"==typeof t&&t(o)}function startup(e){if(!e)return console.log("returning Promise"),new Promise(function(e,t){checkCache(function(t){preparePlatform(function(t){e(t)},t)})});checkCache(function(t){preparePlatform(e,t)}),console.log("mobileCaddy.QUERY_BUFFER_SIZE",mobileCaddy.QUERY_BUFFER_SIZE)}function preparePlatform(e,t){console.log("prep platform cache status",t),startupStatus.unshift("Preparing platform");var o=getUrlParamByName("appSoupJson");if(""!==o){console.log("app soup json = "+JSON.stringify(o));var r=JSON.parse(o);smartstore.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"}],function(){smartstore.upsertSoupEntries("appSoup",r,function(o){smartstore.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){buildOrReturn(e,t)},function(e){console.log("Failed to create cache soup with error = "+e)})},function(e){console.log("Failed to update app soup with error = "+e)})},function(e){console.log("Failed to register app soup with error = "+e)})}else console.log("app soup json2 = "+o),void 0!==LOCAL_DEV&&LOCAL_DEV?setupCodeFlow().then(function(o){buildOrReturn(e,t)}).catch(function(e){throw console.error(e),logger.error(e),e}):navigator.appVersion.includes("Electron")?smartstore.soupExists("appSoup",function(o){if(o)buildOrReturn(e,t);else{var r=[],n=ipcRenderer.sendSync("request-creds","");console.log("creds",n);getUrlParamByName("access_token","?"+n);if(r.push({Name:"accessToken",CurrentValue:getUrlParamByName("access_token","?"+n),NewValue:null}),r.push({Name:"refreshToken",CurrentValue:getUrlParamByName("refresh_token","?"+n),NewValue:null}),r.push({Name:"clientId",CurrentValue:getUrlParamByName("client_id","?"+n),NewValue:null}),r.push({Name:"orgId",CurrentValue:getUrlParamByName("org_id","?"+n),NewValue:null}),r.push({Name:"applicationName",CurrentValue:getUrlParamByName("buildName","?"+n),NewValue:null}),r.push({Name:"buildName",CurrentValue:getUrlParamByName("buildName","?"+n),NewValue:null}),window.location.pathname.startsWith("/apex/"))r.push({Name:"loginUrl",CurrentValue:window.location.protocol+"//"+window.location.host,NewValue:null});else{var a=window.location.pathname.split("/")[1];r.push({Name:"loginUrl",CurrentValue:window.location.protocol+"//"+window.location.host+"/"+a,NewValue:null})}var i=ipcRenderer.sendSync("request-device-info","");console.log("Device from Electron",JSON.stringify(i)),r.push({Name:"buildStatus",CurrentValue:"Initial"}),r.push({Name:"buildVersion",CurrentValue:i.buildVersion}),r.push({Name:"buildOS",CurrentValue:i.platform}),r.push({Name:"deviceUuid",CurrentValue:i.uuid});smartstore.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"}],function(){smartstore.upsertSoupEntries("appSoup",r,function(o){smartstore.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){buildOrReturn(e,t)},function(e){console.log("Failed to create cache soup with error = "+e)})},function(e){console.log("Failed to update app soup with error = "+e)})},function(e){console.log("Failed to register app soup with error = "+e)})}}):buildOrReturn(e,t)}var THIRD_PARTY_NEW_INSTALL=100800,THIRD_PARTY_RESTART=100801;function buildOrReturn(e,t){console.debug("cache status = "+JSON.stringify(t),INITIAL_APPCACHE_INFO),smartstore.upsertSoupEntries("cacheSoup",INITIAL_APPCACHE_INFO,function(){smartStoreUtils.querySoupRecsPromise("appSoup").then(function(o){var r={},n=[];if(o.forEach(function(e){if(void 0!==r[e.Name])throw"Should only be 1 "+e.Name+" entry in the app soup.  Found more";r[e.Name]=e}),r.userOverrideId||(r.userOverrideId=""),"Complete"==r.buildStatus.CurrentValue&&"Complete"==r.buildStatus.NewValue){if(null!==e){console.log("build already complete - calling 3rd party callback function");var a={};if(a.status=THIRD_PARTY_RESTART,a.mc_add_status=t.status,a.curVsn=r.dynVersionNumber.CurrentValue,void 0!==r.dynVersionNumber.NewValue&&(a.newVsn=r.dynVersionNumber.NewValue),navigator.appVersion.includes("Electron")){var i=window.location.protocol+"//"+window.location.host+window.location.pathname;ipcRenderer.send("startPageUrl",i)}e(a)}}else{startupStatus.unshift("Preparing database");var s=function(o,a){if(a.status){console.log("Parse json aud"+o),n=JSON.parse(o);var i=_.find(n,{Name:"audId"}).CurrentValue,s=_.find(n,{Name:"sysDataPlatSupVersion"}).CurrentValue;if(navigator.appVersion.includes("Electron")){var u=window.location.protocol+"//"+window.location.host+window.location.pathname;ipcRenderer.send("startPageUrl",u)}createRecsToSyncSoupPromise().then(function(){systemData.createSystemDataSoup(function(){startupStatus.unshift("Building tables"),smartStoreUtils.buildMobileTables(function(){var o=r.buildStatus;o.CurrentValue="Complete",o.NewValue="Complete",n.map(function(e){return r[e.Name]&&(e._soupEntryId=r[e.Name]._soupEntryId),e}),n.push(o),startupStatus.unshift("Finalising build"),smartstore.upsertSoupEntries("appSoup",n,function(){systemData.getRecordTypeDots(i,s).then(function(){if(null!==e){var o={};o.status=THIRD_PARTY_NEW_INSTALL,o.mc_add_status=t.status,console.log("Calling 3rd party callback"),console.log(o),e(o)}}).catch(function(e){console.log("From getRecordTypeDots "+e)})},function(e){console.log("From upsert soup records "+e)})},function(e){console.log("Error building mobile tables "+e)})},function(e){console.log("create system data soup returned error"+e)},i,s),console.log("Exiting startup")}).catch(function(e){console.log("Error building recs to sync soup "+e)})}else"exception"===a.type&&alert(a.message)};syncRefresh.heartBeat(function(e){console.log("getAudInfo heartbeat response",e),!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getAUDInfo001",contentType:"application/json",data:{buildVersion:r.buildVersion.CurrentValue,buildName:r.buildName.CurrentValue,buildOS:r.buildOS.CurrentValue,deviceUuid:r.deviceUuid.CurrentValue,overrideUserId:force.getUserId(),startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN}},function(e){console.info("response -> "+JSON.stringify(e));var t={status:"200"};s(e,t)},function(e){console.error("err -> "+JSON.stringify(e))}):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getAudInfo",r.buildVersion.CurrentValue,r.buildName.CurrentValue,r.buildOS.CurrentValue,r.deviceUuid.CurrentValue,r.userOverrideId,s,{escape:!1,timeout:3e4})},function(e){console.error("getAudInfo heartbeat error",e),alert("Failed to refresh authentication. Please uninstall/re-install the application")})}}).catch(function(e){console.error(e)})},function(e){console.log("Failed to update app soup with initial app cache info = "+e)})}function getUrlParamByName(e,t){t||(t=window.location.search),console.info("getUrlParamByName -> name = "+e),e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var o=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return console.log("getUrlParamByName results -> "+o),null===o?"":decodeURIComponent(o[1].replace(/\+/g," "))}function setupCodeFlow(){return new Promise(function(e,t){console.log("setupCodeFlow"),maybeInitForceJS().then(function(e){return maybePerformCodeFlowNewInstall()}).then(function(o){startupStatus.unshift("Creating CodeFlow records"),smartstore.soupExists("appSoup",function(o){if(o)smartstore.soupExists("cacheSoup",function(o){if(o)e();else{smartstore.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){e()},function(e){t(e)})}},function(e){t(e)});else{smartstore.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"teststring",type:"string"},{path:"testinteger",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"},{path:"testno",type:"integer"}],function(){var o=window.DEVICE_APP_NAME?window.DEVICE_APP_NAME:"BIZ001",r=[{Name:"applicationName",CurrentValue:"MAP-0012001",NewValue:"MAP-0012001",_soupEntryId:1},{Name:"userId",CurrentValue:"",NewValue:"",_soupEntryId:2},{Name:"buildStatus",CurrentValue:"Initial",NewValue:"Initial",_soupEntryId:3},{Name:"buildVersion",CurrentValue:"001",NewValue:"001",_soupEntryId:4},{Name:"buildName",CurrentValue:o,NewValue:o,_soupEntryId:5},{Name:"buildOS",CurrentValue:"Android",NewValue:"Android",_soupEntryId:6},{Name:"deviceUuid",CurrentValue:"c86d3e94574debug",NewValue:"c86d3e94574debug",_soupEntryId:7}];localStorage.setItem("appSoup",JSON.stringify(r));smartstore.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){e()},function(e){t(e)})},function(e){t(e)})}})}).catch(function(e){logger.error(e),t(e)})})}function maybeInitForceJS(){return new Promise(function(e,t){if(console.log("maybeInitForceJS"),USE_FORCETK){var o=window.SF_LOGIN_URL?window.SF_LOGIN_URL:"https://login.salesforce.com";console.log("window.SF_LOGIN_URL",window.SF_LOGIN_URL),force.init({appId:"3MVG9Rd3qC6oMalWEuQby1hkUef0N2L7kTPExDjRAs1GH35ueKyc3q_D5NY0LLoLHnfwIr_Y8PyeRotaClrtZ",apiVersion:"v30.0",loginUrl:o,tokenStore:localStorage,oauthRedirectURL:"http://localhost:3030/oauthcallback.html",proxyURL:"http://localhost:3000"}),force.isLoggedIn()?(console.info("forcejs - Already logged in"),e()):force.login(function(){console.log("Salesforce login succeeded"),e()},function(e){console.error(e),alert("Salesforce login failed"),t(e)})}else e()})}function maybePerformCodeFlowNewInstall(){return new Promise(function(e,t){var o=!localStorage.getItem("initialSyncState");if(USE_FORCETK&&o){var r=window.DEVICE_APP_NAME?window.DEVICE_APP_NAME:"BIZ001";force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/codeflowUtils001",contentType:"application/json",data:{buildVersion:"001",buildName:r,buildOS:"Android",deviceUuid:"c86d3e94574debug",overrideUserId:"",startPageControllerVersion:"001"}},function(t){console.info("response -> "+JSON.stringify(t));e()},function(e){console.error(e),alert("Salesforce codeflowUtils001 failed"),t(e)})}else e()})}function getStatus(){return startupStatus}exports.startup=startup,exports.getStatus=getStatus;