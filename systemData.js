/* mobilecaddy-utils - v2.0.1 - Bundle Time: 2018-11-26 16:18:13 */
/* git info: "2018-11-23 16:02:33 +0000": f458f3fe3659eef32ccde089f82b18d5376b87d6 (msd-628/p2m-fileUtils) */
/* Copyright 2018 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createSystemDataSoup=createSystemDataSoup,exports.getRecordTypeDots=getRecordTypeDots;var mobileCaddy=_interopRequireWildcard(require("./constants")),logger=_interopRequireWildcard(require("./logger")),appDataUtils=_interopRequireWildcard(require("./appDataUtils"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var o in e)if(Object.prototype.hasOwnProperty.call(e,o)){var r=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,o):{};r.get||r.set?Object.defineProperty(t,o,r):t[o]=e[o]}return t.default=e,t}var LOCAL_DEV=!!window.LOCAL_DEV,USE_FORCETK=!!window.USE_FORCETK,smartstore=cordova.require("com.salesforce.plugin.smartstore");function getQueryAndSoupDefinition(e,t,o){console.log("in getQueryAndSoupDefinition");var r=[],a="Select ";e.forEach(function(e){r.push({path:e.Column_Name,type:e.Column_Type}),0!==e.Column_Name.indexOf("_")&&(a+=e.Column_Name+",")}),a=a.substring(0,a.length-1),t(a+=" From "+e[0].Name,r)}function populateSysDataSoupVariables(e,t,o,r){console.log("In populate system data row values");var a=function(e,t){if(t.status){console.log("In remoting callback for getSysDataSoupVariables with record count = "+e.length);var a=JSON.parse(e);console.log("Parse json soup field defns done"),smartstore.upsertSoupEntries("syncLib_system_data",a,o,r)}else"exception"===t.type?(alert(t.message),logger.error("Exception return from getSystemDataRowValues = "+t.message)):logger.error("Unknown return from getSystemDataRowValues = "+t.message)};!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSysDataSoupVariables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};a(e,t)},r):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getSysDataSoupVariables",e,t,a,{escape:!1})}function createSystemDataSoup(e,t,o,r){console.log("In createSystemDataSoup"),getSystemDataSoupDefinition(o,r,e,t)}function getSystemDataSoupDefinition(e,t,o,r){console.log("In getSystemDataSoupDefinition with audId = "+e+" and sysDataPlatSupVersion = "+t);var a=function(a,s){if(s.status){console.log("In getSystemDataSoupDefinition callback -> "+a),console.log("Parse json app defns"+a);var n=JSON.parse(a);console.log("Parse json app defns done"),n.forEach(function(e){console.log(e)}),smartstore.registerSoup("syncLib_system_data",n,function(){populateSysDataSoupVariables(e,t,function(){populateDefsForSObjectMobileTables(e,t,o,r)},r)},r)}else"exception"===s.type?(alert(s.message),logger.error("Exception return from getSystemDataSoupDefinition = "+s.message)):logger.error("Unknown return from getSystemDataSoupDefinition = "+s.message)};!0===USE_FORCETK?(console.debug("USE_FORCETK == true"),force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getSystemDataSoupDefinition001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};a(e,t)},r)):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getSystemDataSoupDefinition",e,t,a,{escape:!1})}function populateDefsForSObjectMobileTables(e,t,o,r){console.log(mobileCaddy.START_PAGE_CONTROLLER+".getDefsForSObjectMobileTables");var a=function(e,t){if(t.status){var a=JSON.parse(e);console.log("Parse json table defns done"),smartstore.upsertSoupEntries("syncLib_system_data",a,function(e){console.log("successful upsert with rec count = "+e.length),o(e)},function(e){logger.error("Error returned from upsert, message =  "+e),r(e)})}else"exception"===t.type?(alert(t.message),logger.error("Exception return from getDefsForSObjectMobileTables = "+t.message)):logger.error("Unknown return from getDefsForSObjectMobileTables = "+t.message)};!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/getDefsForSObjectMobileTables001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,systemDataPlatformSupportVersion:t}},function(e){var t={status:"200"};a(e,t)},r):Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".getDefsForSObjectMobileTables",e,t,a,{escape:!1,timeout:12e4})}function getRecordTypeDots(e){return new Promise(function(t,o){var r,a=function(e,a){if(console.log("getRecordTypeDots",r,e),a.status){smartstore.registerSoup("dotsRecordTypes",[{path:"Table",type:"string"},{path:"Data",type:"string"}],function(r){var a=JSON.parse(e).map(function(e){return{Table:e.mobileTableName,Data:JSON.stringify(e.recTypeInfoList)}});console.log("upsertRecs",a),smartstore.upsertSoupEntries("dotsRecordTypes",a,function(o){console.log("successful upsert with rec count = "+o.length);var r={};JSON.parse(e).forEach(function(e){var t={};e.recTypeInfoList.forEach(function(e){e.recTypeDevName?(t[e.recTypeId]={recTypeName:e.recTypeName,recTypeDevName:e.recTypeDevName},t[e.recTypeName]=e.recTypeId,t[e.recTypeDevName]=e.recTypeId):(t[e.recTypeId]=e.recTypeName,t[e.recTypeName]=e.recTypeId)}),r[e.mobileTableName]=t}),localStorage.setItem("lsDotsRecordTypes",JSON.stringify(r)),t()},function(e){logger.error("Error returned from upsert, message =  "+e),o(e)})},function(e){o(e)})}else"exception"===a.type?(logger.error("Exception return from p2mRefreshRecTypeDOTs = "+a.message),o(a.message)):(logger.error("Unknown return from p2mRefreshRecTypeDOTs = "+a.message),o(a.message))};appDataUtils.getCachedCurrentValueFromAppSoup("syncRefreshVersion").then(function(t){r=t,!0===USE_FORCETK?force.request({method:"POST",path:"/services/apexrest/mobilecaddy1/p2mRefreshRecTypeDOTs001",contentType:"application/json",data:{audId:e,startPageControllerVersion:mobileCaddy.START_PAGE_CONTROLLER_VSN,syncRefreshDataVersion:r,connSessJson:"{}"}},function(e){var t={status:"200"};a(e,t)},function(e){a("[]",{status:"OK"})}):Visualforce.remoting.Manager.getAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".p2mRefreshRecTypeDOTs")?Visualforce.remoting.Manager.invokeAction("mobilecaddy1."+mobileCaddy.START_PAGE_CONTROLLER+".p2mRefreshRecTypeDOTs",e,r,"{}",a,{escape:!1,timeout:12e4}):a("[]",{status:"OK"})})})}