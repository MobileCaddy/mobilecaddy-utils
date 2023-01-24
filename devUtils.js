/* mobilecaddy-utils - v3.1.0 - Bundle Time: 2023-01-24 10:52:59 */
/* git info: "2022-12-15 11:08:00 +0000": 27330828fcfbb43f4518129de1ca3f53428e27e3 (MSD-647/initialSyncPagingFailureHandling) */
/* Copyright 2023 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.analInc=analInc,exports.deleteRecord=deleteRecord,exports.dirtyTables=dirtyTables,exports.syncMobileTable=syncMobileTable,exports.initialSync=initialSync,exports.getCurrentUserId=getCurrentUserId,exports.getCurrentUserName=getCurrentUserName,exports.getUserLocale=getUserLocale,exports.getCachedAppSoupValue=getCachedAppSoupValue,exports.getRecordTypes=getRecordTypes,exports.insertRecord=insertRecord,exports.insertRecords=insertRecords,exports.logout=logout,exports.readRecords=readRecords,exports.smartSql=smartSql,exports.updateRecord=updateRecord,exports.updateRecords=updateRecords,exports.maybeReadTransformType=maybeReadTransformType,exports.maybeWriteTransformType=maybeWriteTransformType,exports.upgradeAvailable=upgradeAvailable,exports.GET_REC_TYPES_UNKONWN_TABLE=exports.UPDATE_RECS_UNKNOWN_RECORD_TYPE=exports.UPDATE_RECS_UNKNOWN_ID=exports.UPDATE_RECS_DATATYPE_MISMATCH=exports.UPDATE_RECS_ACCESS_DENIED=exports.UPDATE_RECS_UNKONWN_FIELD=exports.UPDATE_RECS_UNKONWN_TABLE=exports.UPDATE_RECS_OK=exports.READ_RECS_ACCESS_DENIED=exports.READ_RECS_UNKONWN_TABLE=exports.READ_RECS_OK=exports.INSERT_RECS_UNKNOWN_RECORD_TYPE=exports.INSERT_RECS_PROTECTED_FIELD=exports.INSERT_RECS_DATATYPE_MISMATCH=exports.INSERT_RECS_MANDATORY_MISSING=exports.INSERT_RECS_ACCESS_DENIED=exports.INSERT_RECS_UNKONWN_FIELD=exports.INSERT_RECS_UNKONWN_TABLE=exports.INSERT_RECS_OK=exports.DELETE_RECS_MANDATORY_MISSING=exports.DELETE_RECS_ACCESS_DENIED=exports.DELETE_RECS_UNKONWN_FIELD=exports.DELETE_RECS_UNKONWN_TABLE=exports.DELETE_RECS_OK=exports.SYNC_MANDATORY_MISSING=exports.SYNC_UNKONWN_TABLE=exports.SYNC_ALREADY_IN_PROGRESS=exports.SYNC_NOK=exports.SYNC_OK=void 0;var smartstore,smartStoreUtils=_interopRequireWildcard(require("./smartStoreUtils")),appDataUtils=_interopRequireWildcard(require("./appDataUtils")),fileUtils=_interopRequireWildcard(require("./fileUtils")),syncRefresh=_interopRequireWildcard(require("./syncRefresh")),logger=_interopRequireWildcard(require("./logger")),_=_interopRequireWildcard(require("underscore"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,r):{};n.get||n.set?Object.defineProperty(t,r,n):t[r]=e[r]}return t.default=e,t}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var USE_FORCETK=!!window.USE_FORCETK,UNKONWN_TABLE=1,UNKONWN_FIELD=2,ACCESS_DENIED=3,MANDATORY_MISSING=4,DATATYPE_MISMATCH=5,PROTECTED_FIELD=6,UNKNOWN_ID=7,UNKNOWN_RECORD_TYPE=8,SYNC_ALREADY_IN_PROGRESS_INC=98,UNKONWN_ERR=99,SYNC=100400,SYNC_NOK_STATUS=100402,INSERT_RECS=100700,READ_RECS=101e3,UPDATE_RECS=101100,DELETE_RECS=101200,GET_REC_TYPES=101300,SYSTEM_TABLES=["syncLib_system_data","appSoup","cacheSoup","recsToSync","SnapShot_Connection_Session__mc"],PROTECTED_FIELDS=["autonumber","CreatedById","CreatedDate","IsDeleted","IsClosed","IsWon","LastModifiedById","LastModifiedDate","LastReferencedDate","mobilecaddy1__MC_Proxy_ID","MC_Proxy_ID","OwnerId","SystemModstamp","Id","dirtyFlag"],initalSyncTableCallCnt=0;function analInc(e){return new Promise(function(t,r){var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),o=new Date,a=new Date(o.getFullYear(),o.getMonth(),o.getDate(),0,0,0,0).valueOf();maybeCreateAnalyticTable().then(function(){return getCurAnalyticsAndHousekeep(a)}).then(function(r){var o={};if(0===r.length){o[e]=1;var s={Name:a,Data:JSON.stringify(o)};t(o[e]),n.upsertSoupEntries("Analytics",[s],function(e){},function(e){logger.error("Unable to insert analytic recs",e)})}else{var i=r[0];(o=JSON.parse(i.Data))[e]=void 0===o[e]?1:o[e]+1,t(o[e]),i.Data=JSON.stringify(o),n.upsertSoupEntriesWithExternalId("Analytics",[i],"Name",function(e){},function(e){logger.error(e)})}}).catch(function(e){logger.error("Error in analInc",e),r(e)})})}function maybeCreateAnalyticTable(){return new Promise(function(e,t){var r=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore");r.soupExists("Analytics",function(n){if(n)e();else{r.registerSoup("Analytics",[{path:"Name",type:"integer"},{path:"Data",type:"string"}],function(t){e()},function(e){t(e)})}},function(e){logger.error(e),t(e)})})}function getCurAnalyticsAndHousekeep(e){return new Promise(function(t,r){var n=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),o="";appDataUtils.getCurrentValueFromAppSoup("audId").then(function(e){return o=e,smartStoreUtils.querySoupRecsPromise("Analytics")}).then(function(a){var s=[],i=[],c=[];a.forEach(function(t){if(t.Name==e)s.push(t);else{var r={Name:t.Name.toString(),SystemModstamp:t.Name,mobilecaddy1__Error_Text__c:JSON.parse(t.Data),mobilecaddy1__Application_User_Device__c:o,mobilecaddy1__Log_Type__c:"analytic"};i.push(r),c.push(t._soupEntryId)}}),0!==i.length&&smartStoreUtils.insertRecords("Mobile_Log__mc",i,function(e){n.removeFromSoup("Analytics",c,function(e){t(s)},function(e){logger.error("Unable to insert analytic recs",e),r(e)})},function(e){logger.error("Unable to insert analytic recs",e),r(e)}),t(s)}).catch(function(e){logger.error("Error housekeeping Analytics",e),r(e)})})}function checkTableAccess(e,t,r){return new Promise(function(n,o){var a=function(t,a){var s=0;switch(t){case INSERT_RECS:s=1;break;case READ_RECS:s=4;break;case UPDATE_RECS:s=7;break;case DELETE_RECS:s=10;break;default:s=0}if("Y"==a.charAt(s))n(r);else{var i={};i.status=t+ACCESS_DENIED,i.mc_add_status=e,o(i)}};-1==SYSTEM_TABLES.indexOf(e)?localStorage["meta-tableCRUD-"+e]?a(t,localStorage["meta-tableCRUD-"+e]):smartStoreUtils.getTableDefnColumnValue(e,"Application Record CRUD").then(function(r){localStorage["meta-tableCRUD-"+e]=r,a(t,r)}).catch(function(e){o(e)}):n(r)})}function getCurrentUserId(){return new Promise(function(e,t){if(!0===USE_FORCETK){var r=force.getUserId();e(r)}else getCachedAppSoupValue("userId").then(function(t){e(t)}).catch(function(e){logger.error("getCurrentUserId",e),t(e)})})}function getCurrentUserName(){var e="";return new Promise(function(t,r){getCachedAppSoupValue("userFirstName").then(function(t){return e=t,getCachedAppSoupValue("userLastName")}).then(function(r){t(e+" "+r)}).catch(function(e){logger.error("getCurrentUserName",e),r(e)})})}function getUserLocale(){return getCachedAppSoupValue("userLocale")}function getCachedAppSoupValue(e){return new Promise(function(t,r){appDataUtils.getCachedCurrentValueFromAppSoup(e).then(function(e){t(e)}).catch(function(e){logger.error("getCachedAppSoupValue",e),r(e)})})}function isValidEmail(e){if(0===e.length)return!0;var t=e.indexOf("@"),r=e.lastIndexOf(".");return!(t<1||r<t+2||r+2>=e.length)}var BYTES=0,CHARS=1;function isValidStrLength(e,t,r){if(void 0===e)return!0;switch(t){case BYTES:for(var n=e.length,o=e.length-1;o>=0;o--){var a=e.charCodeAt(o);a>127&&a<=2047?n++:a>2047&&a<=65535&&(n+=2),a>=56320&&a<=57343&&o--}return n<=r;default:return!0}}function isValidFieldAndTranslate(e,t,r,n){if("_soupLastModifiedDate"==e)return n;var o=_.findWhere(r,{path:e}),a={};if(void 0===o)return a.status=t+UNKONWN_FIELD,a.mc_add_status=e,a;var s=0;switch(t){case INSERT_RECS:s=1;break;case READ_RECS:s=4;break;case UPDATE_RECS:s=7;break;default:s=0}if("Y"!=o.crud.charAt(s))return a.status=t+ACCESS_DENIED,a;try{return a.value=maybeWriteTransformType(n,o.appColType,o.platColType),a}catch(r){return a.status=t+DATATYPE_MISMATCH,a.mc_add_status=r+"->"+e,a}}function listMobileTableColumns(e){return new Promise(function(t,r){localStorage["meta-tableDEF-"+e]?t(JSON.parse(localStorage["meta-tableDEF-"+e])):smartStoreUtils.listMobileTableColumns(e,smartStoreUtils.FULL,function(r){localStorage["meta-tableDEF-"+e]=JSON.stringify(r),t(r)},function(e){r(e)})})}function maybeReadTransformType(e,t,r){switch(r){case"checkbox":case"Deleted":return"true"===String(e);case"CreatedDate":case"date":case"datetime":case"LastActivtyDate":case"LastModifiedDate":case"LastReferencedDate":case"LastViewedDate":case"SystemModstamp":return null!==e?new Date(e):e;default:return e}}function maybeWriteTransformType(e,t,r){var n=/^([\+-]?\d{4}(?!\d{2}\b))((-?)((0[1-9]|1[0-2])(\3([12]\d|0[1-9]|3[01]))?|W([0-4]\d|5[0-2])(-?[1-7])?|(00[1-9]|0[1-9]\d|[12]\d{2}|3([0-5]\d|6[1-6])))([T\s]((([01]\d|2[0-3])((:?)[0-5]\d)?|24\:?00)([\.,]\d+(?!:))?)?(\17[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3]):?([0-5]\d)?)?)?)?$/;switch(r){case"autonumber":throw"invalid_autonumber";case"checkbox":case"Deleted":if("boolean"==typeof e||"true"===e||"false"===e)return String(e);throw"invalid_boolean";case"date":if("string"==typeof e){if(!n.test(e))throw"invalid_date";e=new Date(e)}if(e instanceof Date)return e.setUTCHours(0),e.setUTCMinutes(0),e.setUTCSeconds(0),e.setUTCMilliseconds(0),e.valueOf();if(null===e)return null;throw"invalid_date";case"datetime":if("string"==typeof e){if(!n.test(e))throw"invalid_datetime";e=new Date(e)}if(e instanceof Date)return e.valueOf();if(null===e)return null;throw"invalid_datetime";case"email":if(isValidEmail(e))return e;throw"invalid_email";default:switch(t){case"jsString":if("string"==typeof e)return e;if("number"==typeof e)return e.toString();throw"invalid_string";case"jsNumber":if("number"==typeof e||null===e)return e;throw"invalid_number";default:return e}}}function tableExists(e,t){return new Promise(function(r,n){var o={};localStorage["meta-tableCRUD-"+e]?r():smartStoreUtils.listMobileTables(smartStoreUtils.ALPHA,function(a){a.concat(SYSTEM_TABLES).indexOf(e)>=0?r():(o.status=t+UNKONWN_TABLE,o.mc_add_status=e,n(o))},function(e){o.status=t+UNKONWN_ERR,o.mc_add_status="Unkonwn error "+e,n(o)})})}function validateRecords(e,t,r,n,o){return new Promise(function(a,s){var i={},c={};i.status=r,getRecordTypesMap().then(function(t){return t[e]&&(c=t[e]),getCurrentUserId()}).then(function(e){n.forEach(function(n){if(delete n._soupEntryId,delete n.$$HashKey,n.RecordTypeName){if(n.RecordTypeId=c[n.RecordTypeName],_.isEmpty(c))return i.status=r+UNKONWN_FIELD,i.mc_add_status=n.RecordTypeName,a(i);if(!n.RecordTypeId)return i.status=r+UNKNOWN_RECORD_TYPE,i.mc_add_status=n.RecordTypeName,a(i);delete n.RecordTypeName}for(var s in n)if(n.hasOwnProperty(s)&&s!=t){var u=isValidFieldAndTranslate(s,r,o,n[s]);if(u.status==r+UNKONWN_FIELD){i.status=u.status,i.mc_add_status=s;break}if(u.status==r+DATATYPE_MISMATCH){i.status=u.status,i.mc_add_status=s;break}if(u.status==r+ACCESS_DENIED){i.status=u.status,i.mc_add_status=s;break}if(r==INSERT_RECS&&PROTECTED_FIELDS.indexOf(s)>=0){i.status=r+PROTECTED_FIELD,i.mc_add_status=s;break}n[s]=u.value}if(i.status!=r+UNKONWN_FIELD&&i.status!=r+DATATYPE_MISMATCH&&i.status!=r+PROTECTED_FIELD){var E=(new Date).getTime();r==INSERT_RECS&&(n.CreatedById=e,n.CreatedDate=E),n.SystemModstamp=E,n.LastModifiedDate=E,n.LastModifiedById=e,n.IsDeleted="false",o.forEach(function(e){if(r==INSERT_RECS){var t=e.crud.charAt(1);PROTECTED_FIELDS.indexOf(e.path)<0&&"false"==e.nillable&&"Y"==t?_.has(n,e.path)||(i.status=r+MANDATORY_MISSING,i.mc_add_status=e.path):("IsClosed"==e.path&&(n.IsClosed="false"),"IsWon"==e.path&&(n.IsWon="false"))}""!==e.proxyRefField&&void 0!==n[e.path]&&n[e.path].length>18&&(n[e.proxyRefField]=n[e.path])})}}),i.records=n,a(i)},function(e){logger.error("validateRecords",e)})})}function getRecordTypes(e){return new Promise(function(t,r){tableExists(e,GET_REC_TYPES).then(function(){return getRecordTypesMap()}).then(function(r){t(r[e])}).catch(function(e){r(e)})})}function getRecordTypesMap(){return new Promise(function(e,t){localStorage.getItem("lsDotsRecordTypes")?e(JSON.parse(localStorage.getItem("lsDotsRecordTypes"))):smartStoreUtils.querySoupRecords("dotsRecordTypes",function(t){var r={};t.forEach(function(e){var t={};JSON.parse(e.Data).forEach(function(e){e.recTypeDevName?(t[e.recTypeId]={recTypeName:e.recTypeName,recTypeDevName:e.recTypeDevName},t[e.recTypeName]=e.recTypeId,t[e.recTypeDevName]=e.recTypeId):(t[e.recTypeId]=e.recTypeName,t[e.recTypeName]=e.recTypeId)}),r[e.Table]=t}),localStorage.setItem("lsDotsRecordTypes",JSON.stringify(r)),e(r)},function(e){logger.error("Error returned from upsert, message =  "+e),t(e)})})}function deleteRecord(e,t,r){return new Promise(function(n,o){return deleteRecords(e,[t],r)})}function deleteRecords(e,t,r){var n,o={};return new Promise(function(a,s){t.length>0?tableExists(e,DELETE_RECS).then(function(){return listMobileTableColumns(e)}).then(function(t){return checkTableAccess(e,DELETE_RECS,t)}).then(function(n){return new Promise(function(o,a){var s=isValidFieldAndTranslate(r,DELETE_RECS,n);s.status!=DELETE_RECS+UNKONWN_FIELD?validateRecords(e,r,DELETE_RECS,t,n).then(function(e){e.status==DELETE_RECS?o(e.records):(a(e),logger.error(e))}):(a(s),logger.error(s))})}).then(function(n){return smartStoreUtils.queryMobileTable(e,r,t[0][r])}).then(function(t){if(0===t.length)o.status=DELETE_RECS+MANDATORY_MISSING,logger.warn("deleteRecord no record found",e),o.mc_add_status="no record found",s(o);else{if(!(t[0].Id.length<19))return n=t,smartStoreUtils.querySoupRecsPromise("recsToSync");o.status=DELETE_RECS+ACCESS_DENIED,logger.warn("deleteRecord Cannot delete synced records"),o.mc_add_status="Cannot delete synced records",s(o)}}).then(function(t){var r=t.reduce(function(t,r){return r.Mobile_Table_Name==e&&_.findWhere(n,{_soupEntryId:r.SOUP_Record_Id})&&t.push({_soupEntryId:r._soupEntryId}),t},[]);smartStoreUtils.deleteRecordsFromSoup(n,e,function(){smartStoreUtils.deleteRecordsFromSoup(r,"recsToSync",function(){o.status=DELETE_RECS,o.records=n,a(o)},function(e){s(e)})},function(e){s(e)})}).catch(function(e){s(e)}):(o.status=DELETE_RECS,logger.warn("deleteRecord No records supplied"),o.mc_add_status="No records supplied",o.records=[],a(o))})}function dirtyTables(e){return new Promise(function(t,r){readRecords("recsToSync").then(function(r){var n=[],o=[],a={};e&&e.forEach(function(e){a[e.table]=e.failures}),r.records.forEach(function(t){"Connection_Session__mc"==t.Mobile_Table_Name||void 0!==n[t.Mobile_Table_Name]||e&&a[t.Mobile_Table_Name]&&(!a[t.Mobile_Table_Name]||a[t.Mobile_Table_Name][t.Id])||(n[t.Mobile_Table_Name]=!0,o.push(t.Mobile_Table_Name))}),t(o)}).catch(function(e){logger.error(e),r(e)})})}function enrichWithRecordTypeNames(e,t){return new Promise(function(r,n){e.length>0&&-1==SYSTEM_TABLES.indexOf(t)?getRecordTypesMap().then(function(n){if(n[t]){var o=n[t],a=e.map(function(e){return"object"==_typeof(o[e.RecordTypeId])?(e.RecordTypeName=o[e.RecordTypeId].recTypeName,e.RecordTypeDevName=o[e.RecordTypeId].recTypeDevName):e.RecordTypeName=o[e.RecordTypeId],e.RecordTypeName||logger.warn("enrichWithRecordTypeNames",e.RecordTypeId),e});r(a)}else r(e)}).catch(function(e){n(e)}):r(e)})}function insertRecord(e,t){return insertRecords(e,[t])}function insertRecords(e,t){var r=JSON.parse(JSON.stringify(t)),n={};return new Promise(function(t,o){tableExists(e,INSERT_RECS).then(function(){return listMobileTableColumns(e)}).then(function(t){return checkTableAccess(e,INSERT_RECS,t)}).then(function(t){return new Promise(function(n,o){validateRecords(e,null,INSERT_RECS,r,t).then(function(e){e.status==INSERT_RECS?n(e.records):o(e)})})}).then(function(r){smartStoreUtils.insertRecords(e,r,function(e){n.status=INSERT_RECS,n.records=e,upgradeAvailable().then(function(e){n.upgradeAvailable=e,t(n)}).catch(function(e){t(n),logger.error(e)})},function(e){o(e),logger.error(e)})}).catch(function(e){o(e),logger.error(e)})})}function logout(){localStorage.clear(),navigator.appVersion.includes("Electron")?ipcRenderer.sendSync("logout",""):"undefined"!=typeof plugin&&plugin.mcsdk?plugin.mcsdk.logout():cordova.require("com.salesforce.plugin.sfaccountmanager").logout()}function readRecords(e){arguments.length>1&&void 0!==arguments[1]&&arguments[1];var t={};return new Promise(function(r,n){tableExists(e,READ_RECS).then(function(){return checkTableAccess(e,READ_RECS)}).then(function(){return listMobileTableColumns(e)}).then(function(o){smartStoreUtils.querySoupRecords(e,function(a){t.status=READ_RECS,a.length>0?-1==SYSTEM_TABLES.indexOf(e)?smartStoreUtils.getTableDefnColumnValue(e,"Last Refresh Date/Time").then(function(r){return readProcessRecs(e,a,o,r,t)}).then(function(e){r(e)}).catch(function(e){n(e),logger.error(e)}):readProcessRecs(e,a,o,null,t).then(function(e){r(e)}):(t.records=[],upgradeAvailable().then(function(e){t.upgradeAvailable=e,r(t)}).catch(function(e){r(t),logger.error(e)}))},function(e){n(e),logger.error(e)})},function(e){n(e),logger.error(e)})})}function readProcessRecs(e,t,r,n,o){return new Promise(function(a,s){t.forEach(function(e){for(var t in e){var o=_.findWhere(r,{path:t});void 0!==o&&(e[t]=maybeReadTransformType(e[t],o.appColType,o.platColType),"LastModifiedDate"==t&&(e.dirtyFlag=calcDirtyFlag(e[t],n)))}}),o.records=t.filter(function(e){return"object"==_typeof(e)}),enrichWithRecordTypeNames(o.records,e).then(function(e){return o.records=e,upgradeAvailable()}).then(function(e){o.upgradeAvailable=e,a(o)}).catch(function(e){a(o),logger.error(e)})})}function smartSql(e){return smartRead(e,arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e3)}function smartRead(e,t){return new Promise(function(r,n){var o,a,s=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),i={},c=/FROM\s+\{(\S*)\}/gi.exec(e),u=t||1e3,E=c[1];parseSmartSql(E,e).then(function(e){var t=e[0];return a=e[1],o=s.buildSmartQuerySpec(t,u),"MC-TIMING smartRead "+E,tableExists(E,READ_RECS)}).then(function(){return checkTableAccess(E,READ_RECS)}).then(function(){return listMobileTableColumns(E)}).then(function(e){smartStoreUtils.smartQuerySoupRecordsWithQuerySpec(o,function(t){i.status=READ_RECS,t.length>0?-1==SYSTEM_TABLES.indexOf(E)&&a?smartStoreUtils.getTableDefnColumnValue(E,"Last Refresh Date/Time").then(function(r){return smartReadProcessRecs(E,t,e,r,i)}).then(function(e){r(e)}):smartReadProcessRecs(E,t,e,null,i).then(function(e){r(e)}):(i.records=[],upgradeAvailable().then(function(e){i.upgradeAvailable=e,r(i)}).catch(function(e){r(i),logger.error(e)}))},function(){n()})},function(e){n(e),logger.error(e)})})}function smartReadProcessRecs(e,t,r,n,o){return new Promise(function(a,s){var i=[],c=!0;t.forEach(function(e){var t;if("object"==_typeof(e[1]))for(var o in t=e[1]){var a=_.findWhere(r,{path:o});void 0!==a&&(t[o]=maybeReadTransformType(t[o],a.appColType,a.platColType),"LastModifiedDate"==o&&(e[1].dirtyFlag=calcDirtyFlag(e[1][o],n)))}else t=e,c=!1;i.push(t)}),o.records=i.filter(function(e){return"object"==_typeof(e)}),c?enrichWithRecordTypeNames(o.records,e).then(function(e){return o.records=e,upgradeAvailable()}).then(function(e){o.upgradeAvailable=e,a(o)}).catch(function(e){a(o),logger.error(e)}):upgradeAvailable().then(function(e){o.upgradeAvailable=e,a(o)}).catch(function(e){a(o),logger.error(e)})})}function parseSmartSql(e,t){return new Promise(function(r,n){var o=!0;"*"!==t.match(/SELECT\s+(.*)\s+FROM/i)[1]&&(o=!1);var a=t.match(/\s+FROM\s+{(.*)}\s+WHERE\s+(.*)/i);if(null!==a&&null!==a[1]){var s,i,c=t,u=a[2].split(" AND "),E={},_="";u.forEach(function(e){var t=e.match(/{(.*):(.*)}\s+=\s+(.*)/i);if(t){var r=t[2];_=t[3].split("'")[1],E[r]=_}}),u.forEach(function(e){var t=e.match(/{(.*):(.*)}\s+IN\s+\((.*)\)/i);if(t&&"Id"==t[2]){var r=t[3].split(",");(i=r.some(function(e){return e.length>20}))&&(s=t[3])}}),void 0!==E.Id&&E.Id.length>18||i?smartStoreUtils.getProxyFieldName(e).then(function(e){if(i){var t=":Id} IN ("+s+") OR {"+a[1]+":"+e+"} IN";c=c.replace(":Id} IN",t)}else c=c.replace("Id} =",e+"} =");r([c,o])}):r([c,o])}else r([t,o])})}function calcDirtyFlag(e,t){return t&&"null"!=t||(t=0),e.valueOf()>t}function innerProcessRefreshTablePromise(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,r=t?t.sessNum:1,n=t?t.totalSess:1,o=t?t.csPId:null;return new Promise(function(t,a){var s=function(e){t(e)},i={table:e};syncRefresh.p2mRefreshTable(e,0,!1,r,n,o,function(e){e.status==syncRefresh.P2M_REFRESH_OK?(i.status=SYNC,s(i)):(i.status=e.status,i.mc_add_status=e.mc_add_status,e.sessNum&&(i.sessNum=e.sessNum,i.totalSess=e.totalSess,i.csPId=e.csPId),s(i))},function(e){logger.error("innerProcessRefreshTablePromise error",e),a(e)})})}function initialSync(e,t){return new Promise(function(r,n){if(0===e.length)r({status:SYNC+MANDATORY_MISSING});else{var o={};syncRefresh.heartBeat(function(a){if(a.status==syncRefresh.HEARTBEAT_OK||a.status==syncRefresh.HEARTBEAT_NOT_DEVICE||a.status==syncRefresh.HEARTBEAT_REFRESHED_OK){var s=[];dirtyTables().then(function(r){return r.forEach(function(t){var r=e.indexOf(t);r>-1&&(s.push({table:t,status:SYNC_NOK_STATUS,mc_add_status:"Dirty records"}),e.splice(r,1))}),attemptDoInitialSync(e,t,null)}).then(function(e){var t=s.concat(e).filter(function(e){return e});r(t);var o={mobilecaddy1__Mobile_Process_Status__c:""};setinitialSyncFailCSStatus().then(function(e){syncRefresh.maybeSyncConnSess(o,function(){},function(e){n(e),logger.error(e)})})}).catch(function(e){if(Array.isArray(e)){var t=s.concat(e).filter(function(e){return e});logger.error("InitialSync Failed"),syncMobileTable("Mobile_Log__mc").then(function(e){var r={mobilecaddy1__Mobile_Process_Status__c:""};setinitialSyncFailCSStatus().then(function(e){syncRefresh.maybeSyncConnSess(r,function(){syncMobileTable("Mobile_Log__mc"),n(t)},function(e){n(e),logger.error(e)})})}).catch(function(e){logger.error("Failed sending Mobile Logs"),n(e)}),n(t)}else n(e),logger.error(e)})}else o.status=SYNC_NOK_STATUS,o.mc_add_status=a.status,r(o),100101==o.mc_add_status||100102==o.mc_add_status?logger.error(o):logger.log(o)},function(e){logger.error(e),o.status=SYNC_NOK_STATUS,r(o)})}})}function attemptDoInitialSync(e,t,r,n){return new Promise(function(o,a){r||(r=[]),n||(n=1);var s,i=(localStorage.getItem("doParallelInitialSyncFlag")?"true"===localStorage.getItem("doParallelInitialSyncFlag"):!!window.doParallelInitialSyncFlag&&window.doParallelInitialSyncFlag)&&(window.location.origin.includes("localhost")||window.mcBaseBuildVersion&&"3"===window.mcBaseBuildVersion[0])?doParallelInitialSync:doInitialSync;window.syncFun=i.name,i(e,t,r).then(function(i){if(i.forEach(function(e,t){e&&(r.push(e),e.status!=SYNC&&void 0===s&&(s=t))}),void 0!==s)if(n<3){var c=e.splice(s,e.length-s);setTimeout(function(e){attemptDoInitialSync(c,t,r,n+1).then(function(e){o(e)}).catch(function(e){a(e)})},3e3)}else a(r);else o(r)})})}function doInitialSync(e,t,r){Promise.resolve();var n,o=[];return r&&(n={},r.forEach(function(e){n[e.table]={sessNum:e.sessNum,csPId:e.csPId,totalSess:e.totalSess}})),e.reduce(function(e,r){return e.then(function(e){if(e&&e[e.length-1].status!=SYNC)return Promise.resolve();t&&t({status:0,table:r});var o=n&&n[r]?n[r]:null;return o?innerProcessRefreshTablePromise(r,o):innerProcessRefreshTablePromise(r)}).then(function(e){return t&&t(e),e&&o.push(e),o}).catch(function(e){logger.errorAndDispatch(e)})},Promise.resolve())}function doParallelInitialSync(e,t){return new Promise(function(r,n){var o=e.map(function(e){return internalParallelSyncTable(e,t)});Promise.allSettled=Promise.allSettled||function(e){return Promise.all(e.map(function(e){return e.then(function(e){return{status:"fulfilled",value:e}}).catch(function(e){return{status:"rejected",reason:e}})}))},Promise.allSettled(o).then(function(e){r(e.map(function(e){return e.value}))}).catch(function(e){logger.errorAndDispatch(e),r(values)})})}function internalParallelSyncTable(e,t){return new Promise(function(r,n){var o=1500*initalSyncTableCallCnt;initalSyncTableCallCnt++,setTimeout(function(){innerProcessRefreshTablePromise(e).then(function(n){t&&t({status:0,table:e}),r(n)}).catch(function(e){n(e)})},o)})}function setinitialSyncFailCSStatus(){return new Promise(function(e,t){var r=window.smartstore?window.smartstore:cordova.require("com.salesforce.plugin.smartstore"),n="SELECT * FROM {Connection_Session__mc} WHERE {Connection_Session__mc:mobilecaddy1__Mobile_Process_Status__c} = 'P2M RE Exception/Timeout'",o=r.buildSmartQuerySpec(n,100);smartStoreUtils.smartQuerySoupRecordsWithQuerySpec(o,function(t){var n=t.map(function(e){return e[1].mobilecaddy1__Mobile_Process_Status__c="P2M InitialSync Faliure",e[1]});r.upsertSoupEntries("Connection_Session__mc",n,function(t){var n=t.map(function(e){return{Id:e.Id,SystemModstamp:e.SystemModstamp-1,mobilecaddy1__Session_Type__c:null,mobilecaddy1__Mobile_Process_Status__c:null,mobilecaddy1__Session_Created_Location_Error__c:null,mobilecaddy1__MC_Proxy_ID__c:null}});r.upsertSoupEntries("SnapShot_Connection_Session__mc",n,function(t){var n=t.map(function(e){return{Mobile_Table_Name:"Connection_Session__mc",CRUD_Operation:"Insert",SOUP_Record_Id:e._soupEntryId,Id:e.Id,LastModifiedDateTime:e.SystemModstamp}});r.upsertSoupEntries("recsToSync",n,function(){e()},function(e){logger.error(e)})},function(e){logger.error(e)})},function(e){logger.error(e)}),e()},function(e){logger.error(e),t(e)})})}function syncMobileTable(e,t,r,n,o,a){return new Promise(function(s,i){tableExists(e,SYNC).then(function(){return syncRefresh.syncMobileTable(e,t,r,n,o,a)}).then(function(e){s(e)}).catch(function(e){i(e)})})}function updateRecord(e,t,r){return updateRecords(e,[t],r)}function updateRecords(e,t,r){var n=JSON.parse(JSON.stringify(t)),o={};return new Promise(function(t,a){n.length>0?tableExists(e,UPDATE_RECS).then(function(){return listMobileTableColumns(e)}).then(function(t){return checkTableAccess(e,UPDATE_RECS,t)}).then(function(t){return new Promise(function(o,a){var s=isValidFieldAndTranslate(r,UPDATE_RECS,t);s.status!=UPDATE_RECS+UNKONWN_FIELD?validateRecords(e,r,UPDATE_RECS,n,t).then(function(e){e.status==UPDATE_RECS?o(e.records):a(e)}):a(s)})}).then(function(n){smartStoreUtils.updateRecordsWithExternalId(e,n,r,function(e){o.status=UPDATE_RECS,o.records=e,upgradeAvailable().then(function(e){o.upgradeAvailable=e,t(o)}).catch(function(e){t(o)})},function(e){a(e),logger.error(e)})},function(e){a(e),logger.error(e)}):(o.status=UPDATE_RECS,o.mc_add_status="No records supplied",o.records=[],t(o),logger.warn(o))})}function upgradeAvailable(){return new Promise(function(e,t){smartStoreUtils.queryMobileTable("appSoup","Name","dynVersionNumber").then(function(t){void 0!==t[0].NewValue&&t[0].NewValue!=t[0].CurrentValue?e(!0):e(!1)}).catch(function(e){logger.error(e),t(e)})})}var SYNC_OK=SYNC;exports.SYNC_OK=SYNC_OK;var SYNC_NOK=syncRefresh.SYNC_NOK_STATUS;exports.SYNC_NOK=SYNC_NOK;var SYNC_ALREADY_IN_PROGRESS=syncRefresh.SYNC+syncRefresh.SYNC_ALREADY_IN_PROGRESS_INC;exports.SYNC_ALREADY_IN_PROGRESS=SYNC_ALREADY_IN_PROGRESS;var SYNC_UNKONWN_TABLE=syncRefresh.SYNC+UNKONWN_TABLE;exports.SYNC_UNKONWN_TABLE=SYNC_UNKONWN_TABLE;var SYNC_MANDATORY_MISSING=syncRefresh.SYNC+MANDATORY_MISSING;exports.SYNC_MANDATORY_MISSING=SYNC_MANDATORY_MISSING;var DELETE_RECS_OK=DELETE_RECS;exports.DELETE_RECS_OK=DELETE_RECS_OK;var DELETE_RECS_UNKONWN_TABLE=DELETE_RECS+UNKONWN_TABLE;exports.DELETE_RECS_UNKONWN_TABLE=DELETE_RECS_UNKONWN_TABLE;var DELETE_RECS_UNKONWN_FIELD=DELETE_RECS+UNKONWN_FIELD;exports.DELETE_RECS_UNKONWN_FIELD=DELETE_RECS_UNKONWN_FIELD;var DELETE_RECS_ACCESS_DENIED=DELETE_RECS+ACCESS_DENIED;exports.DELETE_RECS_ACCESS_DENIED=DELETE_RECS_ACCESS_DENIED;var DELETE_RECS_MANDATORY_MISSING=DELETE_RECS+MANDATORY_MISSING;exports.DELETE_RECS_MANDATORY_MISSING=DELETE_RECS_MANDATORY_MISSING;var INSERT_RECS_OK=INSERT_RECS;exports.INSERT_RECS_OK=INSERT_RECS_OK;var INSERT_RECS_UNKONWN_TABLE=INSERT_RECS+UNKONWN_TABLE;exports.INSERT_RECS_UNKONWN_TABLE=INSERT_RECS_UNKONWN_TABLE;var INSERT_RECS_UNKONWN_FIELD=INSERT_RECS+UNKONWN_FIELD;exports.INSERT_RECS_UNKONWN_FIELD=INSERT_RECS_UNKONWN_FIELD;var INSERT_RECS_ACCESS_DENIED=INSERT_RECS+ACCESS_DENIED;exports.INSERT_RECS_ACCESS_DENIED=INSERT_RECS_ACCESS_DENIED;var INSERT_RECS_MANDATORY_MISSING=INSERT_RECS+MANDATORY_MISSING;exports.INSERT_RECS_MANDATORY_MISSING=INSERT_RECS_MANDATORY_MISSING;var INSERT_RECS_DATATYPE_MISMATCH=INSERT_RECS+DATATYPE_MISMATCH;exports.INSERT_RECS_DATATYPE_MISMATCH=INSERT_RECS_DATATYPE_MISMATCH;var INSERT_RECS_PROTECTED_FIELD=INSERT_RECS+PROTECTED_FIELD;exports.INSERT_RECS_PROTECTED_FIELD=INSERT_RECS_PROTECTED_FIELD;var INSERT_RECS_UNKNOWN_RECORD_TYPE=INSERT_RECS+UNKNOWN_RECORD_TYPE;exports.INSERT_RECS_UNKNOWN_RECORD_TYPE=INSERT_RECS_UNKNOWN_RECORD_TYPE;var READ_RECS_OK=READ_RECS;exports.READ_RECS_OK=READ_RECS_OK;var READ_RECS_UNKONWN_TABLE=READ_RECS+UNKONWN_TABLE;exports.READ_RECS_UNKONWN_TABLE=READ_RECS_UNKONWN_TABLE;var READ_RECS_ACCESS_DENIED=READ_RECS+ACCESS_DENIED;exports.READ_RECS_ACCESS_DENIED=READ_RECS_ACCESS_DENIED;var UPDATE_RECS_OK=UPDATE_RECS;exports.UPDATE_RECS_OK=UPDATE_RECS_OK;var UPDATE_RECS_UNKONWN_TABLE=UPDATE_RECS+UNKONWN_TABLE;exports.UPDATE_RECS_UNKONWN_TABLE=UPDATE_RECS_UNKONWN_TABLE;var UPDATE_RECS_UNKONWN_FIELD=UPDATE_RECS+UNKONWN_FIELD;exports.UPDATE_RECS_UNKONWN_FIELD=UPDATE_RECS_UNKONWN_FIELD;var UPDATE_RECS_ACCESS_DENIED=UPDATE_RECS+ACCESS_DENIED;exports.UPDATE_RECS_ACCESS_DENIED=UPDATE_RECS_ACCESS_DENIED;var UPDATE_RECS_DATATYPE_MISMATCH=UPDATE_RECS+DATATYPE_MISMATCH;exports.UPDATE_RECS_DATATYPE_MISMATCH=UPDATE_RECS_DATATYPE_MISMATCH;var UPDATE_RECS_UNKNOWN_ID=UPDATE_RECS+UNKNOWN_ID;exports.UPDATE_RECS_UNKNOWN_ID=UPDATE_RECS_UNKNOWN_ID;var UPDATE_RECS_UNKNOWN_RECORD_TYPE=UPDATE_RECS+UNKNOWN_RECORD_TYPE;exports.UPDATE_RECS_UNKNOWN_RECORD_TYPE=UPDATE_RECS_UNKNOWN_RECORD_TYPE;var GET_REC_TYPES_UNKONWN_TABLE=GET_REC_TYPES+UNKONWN_TABLE;exports.GET_REC_TYPES_UNKONWN_TABLE=GET_REC_TYPES_UNKONWN_TABLE;