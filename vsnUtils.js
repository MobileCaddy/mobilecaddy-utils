/* mobilecaddy-utils - v3.1.1 - Bundle Time: 2023-02-20 11:55:37 */
/* git info: "2023-02-20 11:53:22 +0000": 6e9cdd460c64841d4deb69c45bbb8385f93c3453 (v3) */
/* Copyright 2023 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.clearSoups=clearSoups,exports.getSoupsToClear=getSoupsToClear,exports.hardReset=hardReset,exports.upgradeAvailable=upgradeAvailable,exports.upgradeIfAvailable=upgradeIfAvailable,exports._getBootstrapUrl=_getBootstrapUrl;var devUtils=_interopRequireWildcard(require("./devUtils.js")),appDataUtils=_interopRequireWildcard(require("./appDataUtils")),smartStoreUtils=_interopRequireWildcard(require("./smartStoreUtils")),syncRefresh=_interopRequireWildcard(require("./syncRefresh")),logger=_interopRequireWildcard(require("./logger")),_=_interopRequireWildcard(require("underscore")),mobileCaddy=_interopRequireWildcard(require("./constants"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};o.get||o.set?Object.defineProperty(t,r,o):t[r]=e[r]}return t.default=e,t}var SYSTEM_TABLES=["cacheSoup","recsToSync"];function useSdkReq(){return!(!window[mobileCaddy.CONTAINER_VSN_KEY]||!window[mobileCaddy.CONTAINER_VSN_KEY].startsWith("3"))}function getSoupsToClear(e,t){return new Promise(function(t,r){null===e?smartStoreUtils.listMobileTables(smartStoreUtils.ALPHA,function(e){var r=SYSTEM_TABLES;_.each(e,function(e){r.push(e),r.push("SnapShot_"+e),localStorage.removeItem("meta-tableDEF-"+e),localStorage.removeItem("meta-tableCRUD-"+e)}),t(r)},function(e){r(e)}):t([])})}function clearSoups(e,t){return new Promise(function(r,o){getSoupsToClear(e,t).then(function(e){return Promise.all(e.map(smartStoreUtils.deleteSoup))}).then(function(){r()}).catch(function(e){logger.error(e),o(e)})})}function hardReset(e){return new Promise(function(t,r){var o={},n=e?"Version Upgrade":"HardReset";testRefreshAccessToken().then(function(){smartStoreUtils.querySoupRecsPromise("appSoup").then(function(e){return e.forEach(function(e){o[e.Name]=e.CurrentValue}),clearSoups(null,["appSoup"])}).then(function(){return getBootstrapUrl(o)}).then(function(r){var i,a,c=getAppEnv();"codeflow"==c&&(i=localStorage.getItem("forceOAuth"),a=localStorage.getItem("appSoup"));if(e&&localStorage.getItem("lsItemsToPersist")){var l=JSON.parse(localStorage.getItem("lsItemsToPersist")).map(function(e){return{key:e,value:localStorage.getItem(e)}});l.push({key:"lsItemsToPersist",value:localStorage.getItem("lsItemsToPersist")}),localStorage.clear(),l.forEach(function(e){localStorage.setItem(e.key,e.value)})}else localStorage.clear();if("codeflow"==c)localStorage.setItem("forceOAuth",i),localStorage.setItem("appSoup",a),window.location.protocol+"//"+window.location.host+"/www",t("ok");else{if("platform"!=c)return useSdkReq()?Promise.resolve(r):getRedirectUrl(r,o,n);window.location.href.substr(0,window.location.href.indexOf("#"))}}).then(function(e){appDataUtils.updateNewValueInAppSoup("buildStatus","Resetting").then(function(){smartStoreUtils.deleteSoup("syncLib_system_data").then(function(o){if(useSdkReq())plugin.mcsdk.upgradeDynamicVersion(n,function(e){r(e)});else if(e.type&&"rest"==e.type)plugin.mcsdk.upgradeDynamicVersion(e.pathname);else{try{window.location.href=e}catch(e){logger.errorAndDispatch("error on redirect",e),r(e)}t()}}).catch(function(e){logger.errorAndDispatch(e)}),t()}).catch(function(e){logger.errorAndDispatch(e),r(e)})}).catch(function(e){logger.errorAndDispatch(e),r(e)})}).catch(function(e){logger.error("Tokens are bad, testRefreshAccessToken rejected with: "+JSON.stringify(e)),window.history.go(-(history.length-1)),navigator.appVersion.includes("Electron")||("undefined"!=typeof plugin&&plugin.mcsdk?plugin.mcsdk.logout():cordova.require("com.salesforce.plugin.sfaccountmanager").logout()),r(e)})})}function getRedirectUrl(e,t,r){return new Promise(function(o,n){var i,a="";navigator&&navigator.connection&&(a=navigator.connection.type),window.device&&(i=window.device);var c="";navigator.appVersion.includes("Electron")&&(i=ipcRenderer.sendSync("request-device-info",""),a="wifi",c="landscape");var l=l||c,s=e+"?deviceUuid="+i.uuid+"&deviceName="+i.name+"&deviceCordova="+i.cordova+"&deviceVersion="+i.version+"&deviceModel="+i.model+"&buildName="+t.buildName+"&buildVersion="+t.buildVersion+"&buildOS="+t.buildOS+"&knownAud="+t.audId+"&currentDv="+t.dynVersionNumber+"&orientation="+l+"&viewportWidth="+window.innerWidth+"&viewportHeight="+window.innerHeight+"&sessionType="+r+"&connType="+a+"&loginUrl="+t.loginUrl+"&millsFromEpoch="+(new Date).getTime();"undefined"!=typeof plugin&&plugin.mcsdk?plugin.mcsdk.getRESTBootstrapSetting(function(n){n.result?plugin.mcsdk.getConfig(function(n){var c={deviceUuid:i.uuid,deviceCordova:i.cordova,deviceName:i.name,deviceVersion:i.version,deviceModel:i.model,buildName:t.buildName,buildVersion:t.buildVersion,buildOS:t.buildOS,orientation:l,viewportWidthString:window.innerWidth,viewportHeightString:window.innerHeight,sessionType:r,userLanguage:"",connType:a,millsFromEpochString:(new Date).getTime(),loginUrl:t.loginUrl,containerVersion:n.containerVersion,containerAppName:n.containerAppName,containerBundleID:n.containerBundleID},s=new URL(e).origin;return fetch(s+"/services/apexrest/mobilecaddy1/mcBootstrap001/",{method:"POST",mode:"cors",headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+t.accessToken},body:JSON.stringify(c)}).then(function(e){return e.json()}).then(function(e){var t=new URL(e.path);o({type:"rest",pathname:t.pathname})})}):o(s)}):o(s)})}function getBootstrapUrl(e){return new Promise(function(t,r){var o,n="/apex/mobilecaddy1__MobileCaddyBootstrap001_mc";switch(e.platAuthUrl){case"i":case"I":o=e.instanceUrl+n;break;case"l":case"L":o=e.loginUrl+n;break;case"":o=void 0;break;default:o=e.platAuthUrl}o?t(o):"undefined"!=typeof plugin&&plugin.mcsdk?plugin.mcsdk.getBootstrapUrl(function(e){t(e.result)},function(e){logger.error("Failed to get boostrap URL from contaner",e),r(e)}):(e.authURLType||(e.authURLType="login"),o="login"==e.authURLType?e.loginUrl+n:e.instanceUrl+n,t(o))})}function testRefreshAccessToken(){return new Promise(function(e,t){syncRefresh.refreshToken(function(t){e("ok")},function(e){t(e)})})}function getAppEnv(){return"localhost:3030"==window.location.host?"codeflow":"undefined"!=typeof mockStore?navigator.appVersion.includes("Electron")?"desktop":"platform":"device"}function upgradeAvailable(){return devUtils.upgradeAvailable()}function upgradeIfAvailable(e){return new Promise(function(t,r){upgradeAvailable().then(function(o){if(o&&"force"==e)return hardReset(!0);if(o){var n="skip-failures"==e?syncRefresh.getSyncRecFailures():null;devUtils.dirtyTables(n).then(function(e){e.length>0?t(!1):syncRefresh.getRTSPendingconnSess(function(e){if(null===e||void 0===e)return hardReset(!0);t(!1)},function(e){t(!1)})}).catch(function(e){logger.error(e),r(e)})}else t(!1)}).catch(function(e){logger.error(e),r(e)})})}function _getBootstrapUrl(e){return getBootstrapUrl(e)}