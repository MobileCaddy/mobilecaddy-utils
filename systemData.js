/* mobilecaddy-utils - v3.0.5 - Bundle Time: 2022-10-14 14:42:10 */
/* git info: "2022-10-11 15:24:07 +0100": b14b1a1a4979ce9737dce5e58164d3a057391646 (v3) */
/* Copyright 2022 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createSystemDataSoup=createSystemDataSoup,exports.getRecordTypeDots=getRecordTypeDots;var smartstore,mobileCaddy=_interopRequireWildcard(require("./constants")),logger=_interopRequireWildcard(require("./logger")),appDataUtils=_interopRequireWildcard(require("./appDataUtils"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var a=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};a.get||a.set?Object.defineProperty(t,r,a):t[r]=e[r]}return t.default=e,t}function useSdkReq(){return!(!window[mobileCaddy.CONTAINER_VSN_KEY]||!window[mobileCaddy.CONTAINER_VSN_KEY].startsWith("3"))}var USE_FORCETK=!!window.USE_FORCETK;function getQueryAndSoupDefinition(e,t,r){var a=[],o="Select ";e.forEach(function(e){a.push({path:e.Column_Name,type:e.Column_Type}),0!==e.Column_Name.indexOf("_")&&(o+=e.Column_Name+",")}),o=o.substring(0,o.length-1),t(o+=" From "+e[0].Name,a)}function populateSysDataSoupVariables(e,t,r,a){var o=function(e,t){if(t.status){var o=JSON.parse(e);(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).upsertSoupEntries("syncLib_system_data",o,r,a)}else"exception"===t.type?(alert(t.message),logger.error("Exception return from getSystemDataRowValues = "+t.message)):logger.error("Unknown return from getSystemDataRowValues = "+t.message)};useSdkReq()?plugin.mcsdk.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSysDataSoupVariables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:e.status};o(JSON.parse(e.data),t)},a):!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSysDataSoupVariables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};o(e,t)},a):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getSysDataSoupVariables",e,t,o,{escape:!1})}function createSystemDataSoup(e,t,r,a){getSystemDataSoupDefinition(r,a,e,t)}function getSystemDataSoupDefinition(e,t,r,a){var o=function(o,s){if(s.status){var n=JSON.parse(o);n.forEach(function(e){}),(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).registerSoup("syncLib_system_data",n,function(){populateSysDataSoupVariables(e,t,function(){populateDefsForSObjectMobileTables(e,t,r,a)},a)},a)}else"exception"===s.type?(alert(s.message),logger.error("Exception return from getSystemDataSoupDefinition = "+s.message)):logger.error("Unknown return from getSystemDataSoupDefinition = "+s.message)};useSdkReq()?plugin.mcsdk.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSystemDataSoupDefinition001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:e.status};o(JSON.parse(e.data),t)},a):!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSystemDataSoupDefinition001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};o(e,t)},a):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getSystemDataSoupDefinition",e,t,o,{escape:!1})}function populateDefsForSObjectMobileTables(e,t,r,a){var o=function(e,t){if(t.status){var o=JSON.parse(e);(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).upsertSoupEntries("syncLib_system_data",o,function(e){r(e)},function(e){logger.error("Error returned from upsert, message =  "+e),a(e)})}else"exception"===t.type?(alert(t.message),logger.error("Exception return from getDefsForSObjectMobileTables = "+t.message)):logger.error("Unknown return from getDefsForSObjectMobileTables = "+t.message)};useSdkReq()?plugin.mcsdk.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getDefsForSObjectMobileTables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:e.status};o(JSON.parse(e.data),t)},a):!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getDefsForSObjectMobileTables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};o(e,t)},a):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getDefsForSObjectMobileTables",e,t,o,{escape:!1,timeout:12e4})}function getRecordTypeDots(e){return new Promise(function(t,r){var a,o=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),s=function(e,a){if(a.status){o.registerSoup("dotsRecordTypes",[{path:"Table",type:"string"},{path:"Data",type:"string"}],function(a){var s=JSON.parse(e).map(function(e){return{Table:e.mobileTableName,Data:JSON.stringify(e.recTypeInfoList)}});o.upsertSoupEntries("dotsRecordTypes",s,function(r){var a={};JSON.parse(e).forEach(function(e){var t={};e.recTypeInfoList.forEach(function(e){e.recTypeDevName?(t[e.recTypeId]={recTypeName:e.recTypeName,recTypeDevName:e.recTypeDevName},t[e.recTypeName]=e.recTypeId,t[e.recTypeDevName]=e.recTypeId):(t[e.recTypeId]=e.recTypeName,t[e.recTypeName]=e.recTypeId)}),a[e.mobileTableName]=t}),localStorage.setItem("lsDotsRecordTypes",JSON.stringify(a)),t()},function(e){logger.error("Error returned from upsert, message =  "+e),r(e)})},function(e){r(e)})}else"exception"===a.type?(logger.error("Exception return from p2mRefreshRecTypeDOTs = "+a.message),r(a.message)):(logger.error("Unknown return from p2mRefreshRecTypeDOTs = "+a.message),r(a.message))};appDataUtils.getCachedCurrentValueFromAppSoup("syncRefreshVersion").then(function(t){a=t,useSdkReq()?plugin.mcsdk.request({method:"POST",path:"/services/apexrest/mobilecaddy1/p2mRefreshRecTypeDOTs001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,syncRefreshDataVersion:a,connSessJson:"{}"}},function(e){var t={status:e.status};s(JSON.parse(e.data),t)},function(e){s("[]",{status:"OK"})}):!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/p2mRefreshRecTypeDOTs001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,syncRefreshDataVersion:a,connSessJson:"{}"}},function(e){var t={status:"200"};s(e,t)},function(e){s("[]",{status:"OK"})}):Visualforce.remoting.Manager.getAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".p2mRefreshRecTypeDOTs")?Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".p2mRefreshRecTypeDOTs",e,a,"{}",s,{escape:!1,timeout:12e4}):s("[]",{status:"OK"})})})}