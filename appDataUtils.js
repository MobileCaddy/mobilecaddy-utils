/* mobilecaddy-utils - v3.1.3 - Bundle Time: 2023-10-04 16:37:13 */
/* git info: "2023-09-25 11:25:47 +0100": 15a6a86a9d44838e14e6db342d3b9d5a374b456a (v3) */
/* Copyright 2023 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.getCurrentValueFromAppSoup=getCurrentValueFromAppSoup,exports.getCachedCurrentValueFromAppSoup=getCachedCurrentValueFromAppSoup,exports.getPlatformAppConfig=getPlatformAppConfig,exports.updateNewValueInAppSoup=updateNewValueInAppSoup,exports.upsertNewValueInAppSoup=upsertNewValueInAppSoup,exports.updateCurrentValueInAppSoup=updateCurrentValueInAppSoup,exports.upsertCurrentValueInAppSoup=upsertCurrentValueInAppSoup;var smartstore,smartStoreUtils=_interopRequireWildcard(require("./smartStoreUtils")),mobileCaddy=_interopRequireWildcard(require("./constants"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var t=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};t.get||t.set?Object.defineProperty(n,r,t):n[r]=e[r]}return n.default=e,n}var LOCAL_DEV=!!window.LOCAL_DEV,USE_FORCETK=!!window.USE_FORCETK;function useSdkReq(){return!(!window[mobileCaddy.CONTAINER_VSN_KEY]||!window[mobileCaddy.CONTAINER_VSN_KEY].startsWith("3"))}function getCachedCurrentValueFromAppSoup(e){var n=localStorage.getItem("appSoup-"+e);return new Promise(function(r,t){n?r(n):getCurrentValueFromAppSoup(e).then(function(n){localStorage.setItem("appSoup-"+e,n),r(n)})})}function getCurrentValueFromAppSoup(e){return new Promise(function(n,r){var t=(window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore")).buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE);smartStoreUtils.querySoupRecordsWithQuerySpec("appSoup",t,function(e){e[0]?n(e[0].CurrentValue):n(e[0])},function(e){r(e)})})}function updateValueInAppSoup(e,n,r,t){return new Promise(function(u,o){var i=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),p=i.buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE);smartStoreUtils.querySoupRecordsWithQuerySpec("appSoup",p,function(p){if(p.length>0)p[0][r]=n,i.upsertSoupEntries("appSoup",p,function(e){u(e)},function(e){o(e)});else if(t){var a={Name:e};a[r]=n,i.upsertSoupEntries("appSoup",[a],function(e){u(e)},function(e){o(e)})}else u()},function(e){o(e)})})}function updateNewValueInAppSoup(e,n){return updateValueInAppSoup(e,n,"NewValue",!1)}function upsertNewValueInAppSoup(e,n){return updateValueInAppSoup(e,n,"NewValue",!0)}function updateCurrentValueInAppSoup(e,n){return updateValueInAppSoup(e,n,"CurrentValue",!1)}function upsertCurrentValueInAppSoup(e,n){return updateValueInAppSoup(e,n,"CurrentValue",!0)}function getPlatformAppConfig(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return new Promise(function(r,t){getRemoteAppNamespace().then(function(u){null===u||null===u.result?r():getAppSoup(e).then(function(e){var o=function(e,n){if(n.status){var t=[],u="string"==typeof e?JSON.parse(e):e;if(u.dvUpgradeReq)r(u);else{for(var o in u)if(null!==u[o])if("translations"==o){var i=JSON.parse(u[o].replace(/(\r\n|\n|\r|\t)/gm,""));for(var p in i)null!==i[p]&&t.push({Name:"translations-"+p,CurrentValue:i[p]})}else if("string"==typeof u[o]){var a="version"===o?"appConfigVersion":o;t.push({Name:a,CurrentValue:u[o].replace(/(\r\n|\n|\r|\t)/gm,"")})}else t.push({Name:o,CurrentValue:JSON.stringify(u[o])});t.reduce(function(e,n){return e.then(function(e){return upsertCurrentValueInAppSoup(n.Name,n.CurrentValue)})},Promise.resolve()).then(function(e){r(e)}).catch(function(e){})}}else"exception"===n.type&&r()};if(useSdkReq()){var i=e.appConfigVersion?e.appConfigVersion.CurrentValue:"";maybeGetPlatformAppConfigFromContainer(n).then(function(n){if(n){o(n,{status:200})}else plugin.mcsdk.request({method:"POST",path:"/services/apexrest/"+u.result+"/getAppConfig001",contentType:"application/json",data:{params:JSON.stringify({currentAppConfigVersion:i,buildVersion:e.buildVersion.CurrentValue,buildName:e.buildName.CurrentValue,dynamicVersion:e.dynVersionNumber.CurrentValue,clientBundleVersion:window.clientBundleVersion,containerBaseBuildVersionw:window[mobileCaddy.CONTAINER_VSN_KEY]})}},function(e){o(e,{status:200})},function(e){r()})}).catch(function(e){logger.error("ERROR maybeGetPlatformAppConfigFromContainer",e),t(e)})}else if(LOCAL_DEV&&!USE_FORCETK){Visualforce.remoting.Manager.invokeAction("GetAppConfiguration001.getAppConfig",e.buildVersion.CurrentValue,e.buildName.CurrentValue,o,{escape:!1,timeout:3e4})}else{var p=e.appConfigVersion?e.appConfigVersion.CurrentValue:"";if(!0!==USE_FORCETK)return fetch("/services/apexrest/"+u.result+"/getAppConfig001",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e.accessToken.CurrentValue},body:JSON.stringify({params:JSON.stringify({currentAppConfigVersion:p,buildVersion:e.buildVersion.CurrentValue,buildName:e.buildName.CurrentValue,dynamicVersion:e.dynVersionNumber.CurrentValue,clientBundleVersion:window.clientBundleVersion})})}).then(function(e){return 200===e.status?e.json():Promise.reject(e)}).then(function(e){o(e,{status:"200"})}).catch(function(e){t(e)});force.request({method:"POST",path:"/services/apexrest/"+u.result+"/getAppConfig001",contentType:"application/json",data:{params:JSON.stringify({currentAppConfigVersion:p,buildVersion:e.buildVersion.CurrentValue,buildName:e.buildName.CurrentValue,dynamicVersion:e.dynVersionNumber.CurrentValue,clientBundleVersion:window.clientBundleVersion})}},function(e){var n={status:"200"};o(e,n)},function(e){r()})}})})})}function getRemoteAppNamespace(){return new Promise(function(e,n){LOCAL_DEV?window.REMOTE_NAMESPACE?e({result:window.REMOTE_NAMESPACE}):e(null):"undefined"!=typeof plugin&&plugin.mcsdk||LOCAL_DEV?plugin.mcsdk.getAppConfigNamespace(function(n){e(n)}):e(null)})}function maybeGetPlatformAppConfigFromContainer(e){return new Promise(function(n,r){e&&plugin.mcsdk.getGetAppConfigData?plugin.mcsdk.getGetAppConfigData(function(e){n(e.result)},function(e){n(null)}):n(null)})}function getAppSoup(e){return new Promise(function(n,r){if(e)n(e);else{var t={};smartStoreUtils.querySoupRecsPromise("appSoup").then(function(e){e.forEach(function(e){void 0===t[e.Name]&&(t[e.Name]=e)}),n(t)})}})}