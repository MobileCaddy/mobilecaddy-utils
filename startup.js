/* mobilecaddy-utils - v3.0.6 - Bundle Time: 2022-11-28 10:54:02 */
/* git info: "2022-11-24 11:04:43 +0000": 5dcdfd5ecf556ebfd5a3bf0ba90953f15381ddbf (HEAD) */
/* Copyright 2022 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.startup=startup,exports.getStatus=getStatus;var smartstore,mobileCaddy=_interopRequireWildcard(require("./constants")),_=_interopRequireWildcard(require("underscore")),smartStoreUtils=_interopRequireWildcard(require("./smartStoreUtils")),systemData=_interopRequireWildcard(require("./systemData")),logger=_interopRequireWildcard(require("./logger")),syncRefresh=_interopRequireWildcard(require("./syncRefresh")),appDataUtils=_interopRequireWildcard(require("./appDataUtils"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)if(Object.prototype.hasOwnProperty.call(e,n)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,n):{};r.get||r.set?Object.defineProperty(t,n,r):t[n]=e[n]}return t.default=e,t}var LOCAL_DEV=!!window.LOCAL_DEV,USE_FORCETK=!!window.USE_FORCETK,INITIAL_APPCACHE_INFO=[],startupStatus=["Initialising"];if(window.addEventListener("error",function(e){var t=e.error?e.error.stack:null;e.error&&e.error.toString()}),"serviceWorker"in navigator&&"function"==typeof BroadcastChannel){var broadcast=new BroadcastChannel("sw-channel");broadcast.onmessage=function(e){writeSWCachetoStore(e.data.payload)}}function setContainerVersion(){return new Promise(function(e,t){window.plugin&&plugin.mcsdk?plugin.mcsdk.getConfig(function(t){window[mobileCaddy.CONTAINER_VSN_KEY]=t.result.baseBuildVersion,t.result.baseBuildVersion.startsWith("3"),e()},function(t){logger.error("Error getting mcsdk baseBuildVersion",t),e()}):e()})}function useSdkReq(){return!(!window[mobileCaddy.CONTAINER_VSN_KEY]||!window[mobileCaddy.CONTAINER_VSN_KEY].startsWith("3"))}function writeSWCachetoStore(e){INITIAL_APPCACHE_INFO=e.map(function(e){return{Name:"",Description:e}}),registerCacheSoup().then(function(e){(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).upsertSoupEntries("cacheSoup",INITIAL_APPCACHE_INFO,function(e){},function(e){})})}function createRecsToSyncSoup(e,t){(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).registerSoup("recsToSync",[{path:"Mobile_Table_Name",type:"string"},{path:"SOUP_Record_Id",type:"string"},{path:"Id",type:"string"},{path:"LastModifiedDateTime",type:"integer"},{path:"CRUD_Operation",type:"string"},{path:"Current_Connection_Session",type:"string"}],e,t)}function createRecsToSyncSoupPromise(){return new Promise(function(e,t){(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).registerSoup("recsToSync",[{path:"Mobile_Table_Name",type:"string"},{path:"SOUP_Record_Id",type:"string"},{path:"Id",type:"string"},{path:"LastModifiedDateTime",type:"integer"},{path:"CRUD_Operation",type:"string"},{path:"Current_Connection_Session",type:"string"}],function(){e()},function(e){t(e)})})}function createFileLibrarySoup(){return new Promise(function(e,t){(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).registerSoup("File_Library__ap",[{path:"Id",type:"string"},{path:"SF_Content_Version_Id__c",type:"string"},{path:"File_Type__c",type:"string"},{path:"Synchronised__c",type:"integer"}],function(){e()},function(e){t(e)})})}var CHECK_CACHE_SUCCESS=100900,CHECK_CACHE_FAILURE=100901,CHECK_CACHE_SKIPPED=100902;function checkCache(e){var t=navigator.appVersion.match(/.Chrome\/(\S*)/gm),n=!1;if(t&&(t=t[0].split("/")[1].split(".")[0],Number(t)>=69&&(n=!0)),n&&"serviceWorker"in navigator)e({status:CHECK_CACHE_SKIPPED});else{startupStatus.unshift("Checking Cache"),INITIAL_APPCACHE_INFO=[];var r=localStorage.getItem("tmpCacheItems");if(r){var i=JSON.parse(r);if(i.length>0&&("preBootstrap-noupdate"==i[i.length-1].Description||"preBootstrap-checking"==i[i.length-1].Description))return INITIAL_APPCACHE_INFO=[],void e({status:CHECK_CACHE_SUCCESS});if(INITIAL_APPCACHE_INFO=i,i.length>0&&"preBootstrap-cached"==i[i.length-1].Description)return void e({status:CHECK_CACHE_SUCCESS})}else window.applicationCache?INITIAL_APPCACHE_INFO.push({Name:"AppCache: Initial Status",Description:window.applicationCache.status}):INITIAL_APPCACHE_INFO.push({Name:"AppCache: Initial Status",Description:"window.applicationCache is undefined"});if(window.applicationCache){window.applicationCache.addEventListener("checking",function(e){writeCacheInfo(e)},!1),window.applicationCache.addEventListener("downloading",function(e){writeCacheInfo(e)},!1),window.applicationCache.addEventListener("progress",function(e){writeCacheInfo(e)},!1);var o={};switch(o.status=CHECK_CACHE_SUCCESS,window.applicationCache.status){case window.applicationCache.CHECKING:case window.applicationCache.DOWNLOADING:return window.applicationCache.addEventListener("updateready",function(t){writeCacheInfo(t,e)},!1),window.applicationCache.addEventListener("cached",function(t){writeCacheInfo(t,e)},!1),window.applicationCache.addEventListener("error",function(t){writeCacheInfo(t,e)},!1),void window.applicationCache.addEventListener("noupdate",function(t){writeCacheInfo(t,e)},!1);case window.applicationCache.UPDATEREADY:default:e(o)}}else e({status:CHECK_CACHE_SKIPPED})}}function writeCacheInfo(e,t){"progress"==e.type?INITIAL_APPCACHE_INFO.push({Name:"Event ",Description:e.loaded+" of "+e.total}):INITIAL_APPCACHE_INFO.push({Name:"Event ",Description:e.type});var n={};"udpateready"==e.type||"cached"==e.type?n.status=CHECK_CACHE_SUCCESS:n.status=CHECK_CACHE_FAILURE,t&&"function"==typeof t&&t(n)}function startup(e){if(window.ionic&&!window.Ionic&&(window.Ionic=window.ionic),!e)return new Promise(function(e,t){setContainerVersion().then(function(t){"undefined"!=typeof plugin&&plugin.mcsdk&&(!window.Ionic.version||window.Ionic.version.startsWith("1")),checkCache(function(t){preparePlatform(function(t){e(t)},t)})}).catch(function(e){logger.error("setContainerVersion",e),t(e)})});setContainerVersion().then(function(t){"undefined"==typeof plugin||!plugin.mcsdk||window.Ionic.version&&window.Ionic.version.startsWith("1")||plugin.mcsdk.hideSplashScreen(),checkCache(function(t){preparePlatform(e,t)})}).catch(function(e){logger.error("setContainerVersion",e)})}function preparePlatform(e,t){startupStatus.unshift("Preparing platform");var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),r=getUrlParamByName("appSoupJson");if(""!==r){var i=JSON.parse(r);n.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"}],function(){n.upsertSoupEntries("appSoup",i,function(r){n.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){buildOrReturn(e,t)},function(e){})},function(e){})},function(e){})}else void 0!==LOCAL_DEV&&LOCAL_DEV?setupCodeFlow().then(function(n){buildOrReturn(e,t)}).catch(function(e){throw logger.error(e),e}):navigator.appVersion.includes("Electron")?n.soupExists("appSoup",function(r){if(r)buildOrReturn(e,t);else{var i=[],o=ipcRenderer.sendSync("request-creds","");getUrlParamByName("access_token","?"+o);if(i.push({Name:"accessToken",CurrentValue:getUrlParamByName("access_token","?"+o),NewValue:null}),i.push({Name:"refreshToken",CurrentValue:getUrlParamByName("refresh_token","?"+o),NewValue:null}),i.push({Name:"clientId",CurrentValue:getUrlParamByName("client_id","?"+o),NewValue:null}),i.push({Name:"orgId",CurrentValue:getUrlParamByName("org_id","?"+o),NewValue:null}),i.push({Name:"applicationName",CurrentValue:getUrlParamByName("buildName","?"+o),NewValue:null}),i.push({Name:"buildName",CurrentValue:getUrlParamByName("buildName","?"+o),NewValue:null}),window.location.pathname.startsWith("/apex/"))i.push({Name:"loginUrl",CurrentValue:window.location.protocol+"//"+window.location.host,NewValue:null});else{var a=window.location.pathname.split("/")[1];i.push({Name:"loginUrl",CurrentValue:window.location.protocol+"//"+window.location.host+"/"+a,NewValue:null})}var u=ipcRenderer.sendSync("request-device-info","");i.push({Name:"buildStatus",CurrentValue:"Initial"}),i.push({Name:"buildVersion",CurrentValue:u.buildVersion}),i.push({Name:"buildOS",CurrentValue:u.platform}),i.push({Name:"deviceUuid",CurrentValue:u.uuid});n.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"}],function(){n.upsertSoupEntries("appSoup",i,function(n){registerCacheSoup().then(function(n){buildOrReturn(e,t)})},function(e){})},function(e){})}}):registerCacheSoup().then(function(n){buildOrReturn(e,t)})}function registerCacheSoup(){return new Promise(function(e,t){var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore");n.soupExists("cacheSoup",function(r){if(r)e();else{n.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){e()},function(e){t(e)})}})})}var THIRD_PARTY_NEW_INSTALL=100800,THIRD_PARTY_RESTART=100801;function buildOrReturn(e,t){var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore");n.upsertSoupEntries("cacheSoup",INITIAL_APPCACHE_INFO,function(){smartStoreUtils.querySoupRecsPromise("appSoup").then(function(r){var i={},o=[];if(r.forEach(function(e){if(void 0!==i[e.Name])throw"Should only be 1 "+e.Name+" entry in the app soup.  Found more";i[e.Name]=e}),i.userOverrideId||(i.userOverrideId=""),"Complete"==i.buildStatus.CurrentValue&&"Complete"==i.buildStatus.NewValue)if(null!==e){var a={};if(a.status=THIRD_PARTY_RESTART,a.mc_add_status=t.status,a.curVsn=i.dynVersionNumber.CurrentValue,void 0!==i.dynVersionNumber.NewValue&&(a.newVsn=i.dynVersionNumber.NewValue),navigator.appVersion.includes("Electron")){var u=window.location.protocol+"//"+window.location.host+window.location.pathname;ipcRenderer.send("startPageUrl",u)}"undefined"!=typeof plugin&&plugin.mcsdk&&window.Ionic.version&&window.Ionic.version.startsWith("1")&&plugin.mcsdk.getSplashScreenTimeout(function(e){setTimeout(function(){plugin.mcsdk.hideSplashScreen()},e.result)}),e(a)}else"undefined"!=typeof plugin&&plugin.mcsdk&&plugin.mcsdk.hideSplashScreen();else{startupStatus.unshift("Preparing database");var s=function(r,a){if(a.status){o=JSON.parse(r);var u=_.find(o,{Name:"audId"}).CurrentValue,s=_.find(o,{Name:"sysDataPlatSupVersion"}).CurrentValue;if(navigator.appVersion.includes("Electron")){var c=window.location.protocol+"//"+window.location.host+window.location.pathname;ipcRenderer.send("startPageUrl",c)}var p=_.find(o,{Name:"dynVersionNumber"}).CurrentValue;i.dynVersionNumber?i.dynVersionNumber.CurrentValue=p:i.dynVersionNumber={CurrentValue:p},localStorage.setItem("appSoupValObj",JSON.stringify(i)),appDataUtils.getPlatformAppConfig(i,!0).then(function(){return startupStatus.unshift("Building system tables"),createRecsToSyncSoupPromise()}).then(function(){return createFileLibrarySoup()}).then(function(){systemData.createSystemDataSoup(function(){startupStatus.unshift("Building tables"),smartStoreUtils.buildMobileTables(function(){var r=i.buildStatus;r.CurrentValue="Complete",r.NewValue="Complete",o.map(function(e){return i[e.Name]&&(e._soupEntryId=i[e.Name]._soupEntryId),e}),o.push(r),startupStatus.unshift("Finalising build"),n.upsertSoupEntries("appSoup",o,function(){systemData.getRecordTypeDots(u,s).then(function(){if(null!==e){var n={};n.status=THIRD_PARTY_NEW_INSTALL,n.mc_add_status=t.status,"undefined"!=typeof plugin&&plugin.mcsdk&&window.Ionic.version&&window.Ionic.version.startsWith("1")&&plugin.mcsdk.getSplashScreenTimeout(function(e){setTimeout(function(){plugin.mcsdk.hideSplashScreen()},e.result)}),e(n)}else"undefined"!=typeof plugin&&plugin.mcsdk&&plugin.mcsdk.hideSplashScreen()}).catch(function(e){})},function(e){})},function(e){})},function(e){},u,s)}).catch(function(e){})}else"exception"===a.type&&alert(a.message)};syncRefresh.heartBeat(function(e){useSdkReq()?plugin.mcsdk.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getAUDInfo001",contentType:"application/json",data:{buildVersion:i.buildVersion.CurrentValue,buildName:i.buildName.CurrentValue,buildOS:i.buildOS.CurrentValue,deviceUuid:i.deviceUuid.CurrentValue,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,overrideUserId:""}},function(e){var t={};t.status=e.status,s(JSON.parse(e.data),t)},function(e){}):!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getAUDInfo001",contentType:"application/json",data:{buildVersion:i.buildVersion.CurrentValue,buildName:i.buildName.CurrentValue,buildOS:i.buildOS.CurrentValue,deviceUuid:i.deviceUuid.CurrentValue,overrideUserId:force.getUserId(),startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN}},function(e){var t={status:"200"};s(e,t)},function(e){}):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getAudInfo",i.buildVersion.CurrentValue,i.buildName.CurrentValue,i.buildOS.CurrentValue,i.deviceUuid.CurrentValue,i.userOverrideId,s,{escape:!1,timeout:3e4})},function(e){alert("Failed to refresh authentication. Please uninstall/re-install the application")})}}).catch(function(e){})},function(e){})}function getUrlParamByName(e,t){t||(t=window.location.search),e=e.replace(/[\[]/,"\\[").replace(/[\]]/,"\\]");var n=new RegExp("[\\?&]"+e+"=([^&#]*)").exec(t);return null===n?"":decodeURIComponent(n[1].replace(/\+/g," "))}function setupCodeFlow(){return new Promise(function(e,t){var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore");maybeInitForceJS().then(function(e){return maybePerformCodeFlowNewInstall()}).then(function(r){startupStatus.unshift("Creating CodeFlow records"),n.soupExists("appSoup",function(r){if(r)n.soupExists("cacheSoup",function(r){if(r)e();else{n.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){e()},function(e){t(e)})}},function(e){t(e)});else{n.registerSoup("appSoup",[{path:"Name",type:"string"},{path:"teststring",type:"string"},{path:"testinteger",type:"string"},{path:"CurrentValue",type:"string"},{path:"NewValue",type:"string"},{path:"testno",type:"integer"}],function(){var r=window.DEVICE_APP_NAME?window.DEVICE_APP_NAME:"BIZ001",i=[{Name:"applicationName",CurrentValue:"MAP-0012001",NewValue:"MAP-0012001",_soupEntryId:1},{Name:"userId",CurrentValue:"",NewValue:"",_soupEntryId:2},{Name:"buildStatus",CurrentValue:"Initial",NewValue:"Initial",_soupEntryId:3},{Name:"buildVersion",CurrentValue:"001",NewValue:"001",_soupEntryId:4},{Name:"buildName",CurrentValue:r,NewValue:r,_soupEntryId:5},{Name:"buildOS",CurrentValue:"Android",NewValue:"Android",_soupEntryId:6},{Name:"deviceUuid",CurrentValue:"c86d3e94574debug",NewValue:"c86d3e94574debug",_soupEntryId:7},{Name:"accessToken",CurrentValue:"123",NewValue:"123",_soupEntryId:8}];localStorage.setItem("appSoup",JSON.stringify(i));n.registerSoup("cacheSoup",[{path:"Name",type:"string"},{path:"Description",type:"string"}],function(){e()},function(e){t(e)})},function(e){t(e)})}})}).catch(function(e){logger.error(e),t(e)})})}function maybeInitForceJS(){return new Promise(function(e,t){if(USE_FORCETK){var n=window.SF_LOGIN_URL?window.SF_LOGIN_URL:"https://login.salesforce.com";force.isLoggedIn()?e():(force.init({appId:"3MVG9Rd3qC6oMalWEuQby1hkUef0N2L7kTPExDjRAs1GH35ueKyc3q_D5NY0LLoLHnfwIr_Y8PyeRotaClrtZ",apiVersion:"v30.0",loginUrl:n,tokenStore:localStorage,oauthRedirectURL:"http://localhost:3030/oauthcallback.html",proxyURL:"http://localhost:3000"}),force.isLoggedIn()?e():force.login(function(){e()},function(e){alert("Salesforce login failed"),t(e)}))}else e()})}function maybePerformCodeFlowNewInstall(){return new Promise(function(e,t){var n=!localStorage.getItem("initialSyncState");if(USE_FORCETK&&n){var r=window.DEVICE_APP_NAME?window.DEVICE_APP_NAME:"BIZ001";force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/codeflowUtils001",contentType:"application/json",data:{buildVersion:"001",buildName:r,buildOS:"Android",deviceUuid:"c86d3e94574debug",overrideUserId:"",startPageControllerVersion:"001"}},function(t){e()},function(e){alert("Salesforce codeflowUtils001 failed"),t(e)})}else e()})}function getStatus(){return startupStatus}