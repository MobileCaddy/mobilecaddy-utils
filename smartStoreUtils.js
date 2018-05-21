/* mobilecaddy-utils - v2.0.0 - Bundle Time: 2018-05-21 21:01:28 */
/* git info: "2018-05-21 20:56:14 +0100": a6c8930a1910fb38f55c08e517b78094c867a7f9 (v2) */
/* Copyright 2018 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.smartQuerySoupRecordsWithQuerySpec=exports.querySoupRecordsWithQuerySpec=exports.querySoupRecsPromise=exports.querySoupRecords=exports.queryMobileTableWithAnd=exports.queryMobileTable=exports.setTableDefnColumnValue=exports.getTableDefnColumnValue=exports.getSysDataRowMapColHeadings=exports.getSysDataRowMapColHeading=exports.listMobileTableColumns=exports.listMobileTables=exports.getProxyFieldName=exports.updateRecordsWithExternalId=exports.insertRecords=exports.deleteRecordsFromSoup=exports.deleteRecordsForExternalId=exports.deleteSoup=exports.buildMobileTables=exports.FULL=exports.BUILD=exports.ALPHA=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},_constants=require("./constants"),mobileCaddy=_interopRequireWildcard(_constants),_appDataUtils=require("./appDataUtils"),appDataUtils=_interopRequireWildcard(_appDataUtils),_logger=require("./logger"),logger=_interopRequireWildcard(_logger);function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(o[t]=e[t]);return o.default=e,o}var smartstore=cordova.require("com.salesforce.plugin.smartstore");function deleteRecordsForExternalId(e,o,t,r,n){if(!r&&!n)return new Promise(function(r,n){if(0===o.length)r();else{var i="";"object"==_typeof(o[0])?o.forEach(function(e,o){i+=0===o?"'"+e[t]+"'":",'"+e[t]+"'"}):o.forEach(function(e,o){i+=0===o?"'"+e+"'":", '"+e+"'"});var s="SELECT * FROM {"+e+"} WHERE {"+e+":"+t+"} IN ("+i+")";console.log("deleteRecordsForExternalId soql",s),querySpec=smartstore.buildSmartQuerySpec(s),smartQuerySoupRecordsWithQuerySpec(querySpec,function(o){console.log("recs",o);var t=o.map(function(e){return e[0]});smartstore.removeFromSoup(e,t,function(e){r(e)},function(e){n(e)})},function(e){n(e)})}});if(0===o.length)r();else{var i=[];o.forEach(function(e){i.push(e[t])}),querySoupRecords(e,function(o){var s=[];o.forEach(function(e){-1!=i.indexOf(e[t])&&s.push(e._soupEntryId)}),0===s.length?r():smartstore.removeFromSoup(e,s,r,n)},n)}}function collectRecsFromCursor(e,o,t){var r=[];function n(e){o(r)}function i(e){if(console.error("onCursorClosedError",e),console.error("onCursorClosedError",e.stack),!t)throw e;t(e)}!function e(o){o.currentPageOrderedEntries.forEach(function(e){r.push(e)}),o.currentPageIndex<o.totalPages-1?cordova.require("com.salesforce.plugin.smartstore").moveCursorToNextPage(o,e):cordova.require("com.salesforce.plugin.smartstore").closeCursor(o,n,i)}(e)}function getSoupDefinitionRows(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",smartstore.buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){console.log("soup definition rows success callback with rec count = "+e.length);var t=[];e.forEach(function(e){console.log("processing record = "),e.Type!=mobileCaddy.STANDING_DATA_OBJECT&&e.Type!=mobileCaddy.DYNAMIC_DATA_OBJECT?(console.log("Record Match"),t.push(e)):console.log("Record does not match")}),o(t)},t)}function getSoupObjectDefinition(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",cordova.require("com.salesforce.plugin.smartstore").buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){for(var t,r=0;r<e.length;r++)if(e[r].Type==mobileCaddy.STANDING_DATA_OBJECT||e[r].Type==mobileCaddy.DYNAMIC_DATA_OBJECT){t=e[r];break}o(t)},t)}function removeSoupDefinitions(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",cordova.require("com.salesforce.plugin.smartstore").buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){deleteRecordsFromSoup(e,"syncLib_system_data",function(){console.log("Success delete records from soup, calling callback"),o()},t)},t)}function buildSoupQueryString(e,o,t){console.log("in buildSoupQueryString for soup = "+e),getSoupDefinitionRows(e,function(r){console.log("In getSoupDefinitionRows success callback"),0===r.length?(simpleMessageSL("No soup columns defined for soup "+e),t("No soup columns defined for soup "+e)):getSoupObjectDefinition(e,function(t){console.log("in getSoupObjectDefinition success callback");var n="Select ";r.forEach(function(e){n+=e.Column_Name+","}),n=n.substring(0,n.length-1),o(n+=" From "+e)},t)},t)}function getQueryAndSoupDefinition(e,o,t){console.log("in getQueryAndSoupDefinition");var r=[],n="Select ";e.forEach(function(e){console.log("soup column defn = "),r.push({path:e.Column_Name,type:e.Column_Type}),0!==e.Column_Name.indexOf("_")&&(n+=e.Column_Name+",")}),n=n.substring(0,n.length-1),o(n+=" From "+e[0].Name,r)}function querySoupRecords(e,o,t){var r=smartstore.buildAllQuerySpec("_soupEntryId",null,mobileCaddy.QUERY_BUFFER_SIZE);smartstore.querySoup(e,r,function(e){collectRecsFromCursor(e,function(e){o(e)},t)})}function querySoupRecsPromise(e){return new Promise(function(o,t){querySoupRecords(e,function(e){o(e.filter(function(e){return"object"==(void 0===e?"undefined":_typeof(e))}))},function(e){t(e)})})}function querySoupRecordsWithQuerySpec(e,o,t,r){smartstore.querySoup(e,o,function(o){collectRecsFromCursor(o,function(o){console.log("Passing records back to callback for soup = "+e+" and rec count = "+o.length),t(o)},r)},r)}function smartQuerySoupRecordsWithQuerySpec(e,o,t){console.debug("smartQuerySoupRecordsWithQuerySpec",e),smartstore.runSmartQuery(e,function(e){collectRecsFromCursor(e,function(e){console.log("Passing records back to callback for soup with rec count = "+e.length),o(e)},t)},t)}function queryMobileTable(e,o,t,r,n){if(void 0===r&&void 0===n)return new Promise(function(r,n){var i=smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL);querySoupRecordsWithQuerySpec(e,i,function(e){r(e)},function(e){n(e)})});var i=smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL);querySoupRecordsWithQuerySpec(e,i,function(e){r(e)},n)}function queryMobileTableWithAnd(e,o,t,r,n,i,s){querySoupRecordsWithQuerySpec(e,smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL),function(e){var o=[];e.forEach(function(e){e[r]==n&&o.push(e)}),i(o)},s)}function getDefnRowForTableName(e,o,t){getSysDataRowMapColHeading("Row Mapping PT","Mobile Table Name",function(r){queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001","Platform Table Definition",r,e,function(t){1!=t.length&&console.error("Should be exactly 1 table defn row for table: "+e+", but we got "+t.length),o(t[0])},t)},t)}function getTableDefnColumnValue(e,o){return new Promise(function(t,r){getDefnRowForTableName(e,function(e){getSysDataRowMapColHeading("Row Mapping PT",o,function(o){t(e[o])},function(e){r(e)})},function(e){r(e)})})}function setTableDefnColumnValue(e,o,t){return new Promise(function(r,n){getDefnRowForTableName(e,function(e){getSysDataRowMapColHeading("Row Mapping PT",o,function(o){e[o]=t,smartstore.upsertSoupEntries("syncLib_system_data",[e],function(){r()},function(e){n(e)})},function(e){n(e)})},function(e){n(e)})})}function getSysDataRowMapColHeading(e,o,t,r){queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001",e,"MC_Var_String_003",o,function(r){1!=r.length&&(r.forEach(function(e){console.log(e)}),console.error("Must be exactly 1 Row Mapping Record for Sys Data Row Type = "+e+" and Sys Data Row Value = "+o+" found count = "+r.length)),t(r[0].MC_Var_String_004)},r)}function getSysDataRowMapColHeadings(e,o,t,r){querySoupRecordsWithQuerySpec("syncLib_system_data",smartstore.buildExactQuerySpec("MC_Var_String_001",e,mobileCaddy.QUERY_BUFFER_SIZE_SL),function(r){var n=[];o.forEach(function(o){var t=!1;if(r.forEach(function(e){if(e.MC_Var_String_003==o)return n.push(e.MC_Var_String_004),void(t=!0)}),!t)throw"No mapping found for type = "+e+" and value = "+o}),t(n)},r)}var NONE=0,ALPHA_ORDER=1,BUILD_ORDER=2;function listMobileTables(e,o,t){getSysDataRowMapColHeadings("Row Mapping PT",["Mobile Table Name","Build Order"],function(r){var n=r[0],i=r[1];queryMobileTable("syncLib_system_data","MC_Var_String_001","Platform Table Definition",function(t){var r=[];e==BUILD_ORDER?(t.sort(function(e,o){var t=0,r=parseInt(e[i]),n=parseInt(o[i]);return isNaN(r)||isNaN(n)||(t=r-n),t}),t.forEach(function(e){r.push(e[n])}),null!==o&&o(r)):(t.forEach(function(e){r.push(e[n])}),e==ALPHA_ORDER&&r.sort(),null!==o&&o(r))},t)},t)}var LIST=0,BUILD_OBJECT=1,FULL_LIST=2;function listMobileTableColumns(e,o,t,r){getSysDataRowMapColHeadings("Row Mapping TC",["Parent SOUP Name","Table Column Name","Mobile Column Type","Application Field CRUD","META isNillable","Platform Column Type","Device Value Type","Proxy Ref Field Name"],function(r){var n=r[0],i=r[1],s=r[2],u=r[3],a=r[4],l=r[5],c=r[6],p=r[7];queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001","Platform Table Column",n,e,function(e){var r=[];e.forEach(function(e){o==LIST?r.push(e[i]):o==FULL_LIST?r.push({path:e[i],type:e[s],crud:e[u],nillable:e[a],platColType:e[l],appColType:e[c],proxyRefField:e[p]}):r.push({path:e[i],type:e[s]})}),t(r)},function(e){console.log("Error retrieving column names = "+e)})},r)}function cacheProxyFieldNames(e,o){o.forEach(function(o){o.path.includes("MC_Proxy_ID")&&localStorage.setItem("proxyField-"+e,o.path)})}function buildMobileTables(e,o){console.debug("About to buildMobileTables"),listMobileTables(BUILD_ORDER,function(t){var r=t.length;t.forEach(function(t){listMobileTableColumns(t,BUILD_OBJECT,function(n){console.debug("tableColumnObjectArray -> "+n),smartstore.registerSoup(t,n,function(){console.log("success on register soup "+t),setTableDefnColumnValue(t,"SOUP Built Date/Time",(new Date).getTime()).then(function(){return console.log("success on update of soup build date time"),cacheProxyFieldNames(t,n),getTableDefnColumnValue(t,"Snapshot Data Required")}).then(function(i){"Yes"==i?smartstore.registerSoup("SnapShot_"+t,n,function(){console.log("Success from build of SnapShot_"+t),setTableDefnColumnValue(t,"Snapshot SOUP Built Date/Time",(new Date).getTime()),0===--r&&e()},function(e){console.error("Fail on create of SnapShot_"+t+" "+e),o(e)}):0===--r&&e()}).catch(function(e){o(e)})},o)},function(e){console.error("Fail on create of table"+t+" "+e),o(e)})})},o)}function deleteSoup(e){return console.debug("deleteSoup",e),new Promise(function(o,t){smartstore.removeSoup(e,function(){logger.log("deleteSoup",e),o()},function(e){logger.errorAndDispatch("deleteSoup",e),t(e)})})}function deleteRecordsFromSoup(e,o,t,r){if(console.log("In delete recs from soup with rec count = "+e.length),0!==e.length){var n=[];e.forEach(function(e){e&&e._soupEntryId&&n.push(e._soupEntryId)}),0!==n.length?smartstore.removeFromSoup(o,n,function(e){console.log("Deleted rec(s) - calling callback"),t(e)},r):t()}else t()}function insertRecords(e,o,t,r){console.log("in insert records"),console.log("mobile table name = "+e),console.log("records = "+JSON.stringify(o)),console.log("records size = "+o.length),smartstore.upsertSoupEntries(e,o,function(o){console.log("back from upsert soup with records = "+JSON.stringify(o));var n=(new Date).getTime();addProxyIds(e,o,n,function(o){console.log("back with proxy ids = "+JSON.stringify(o));var i=[];o.forEach(function(o){var t={Mobile_Table_Name:e,CRUD_Operation:"Insert",SOUP_Record_Id:o._soupEntryId,Id:o.Id,LastModifiedDateTime:n};i.push(t)}),smartstore.upsertSoupEntriesWithExternalId("recsToSync",i,"Id",t,r)},r)},r)}function addProxyIds(e,o,t,r,n){var i;getProxyFieldName(e).then(function(e){return i=e,appDataUtils.getCachedCurrentValueFromAppSoup("audId")}).then(function(s){o.forEach(function(o){var r="PROXY%"+e+"%"+t+"%"+o._soupEntryId+"%"+s;o.Id=r,o[i]=r}),smartstore.upsertSoupEntries(e,o,function(e){r(e)},n)}).catch(function(e){n(e)})}function fillOutRecords(e,o,t){var r=o.length,n=0;return new Promise(function(i,s){getProxyFieldName(e).then(function(u){o.forEach(function(a,l){queryMobileTable(e,t,a[t]).then(function(c){if(c.length>0){var p=c[0];for(var d in a)p[d]=a[d];o[l]=p,++n>=r&&i(o)}else"Id"==t&&a.Id.length>18?queryMobileTable(e,u,a.Id).then(function(e){if(e.length>0){var t=e[0];for(var u in a)"Id"!=u&&(t[u]=a[u]);o[l]=t,++n>=r&&i(o)}else s({status:101107})}):s({status:101107})}).catch(function(e){s(e)})})}).catch(function(e){s(e)})})}function updateRecordsWithExternalId(e,o,t,r,n){fillOutRecords(e,o,t).then(function(o){smartstore.upsertSoupEntriesWithExternalId(e,o,t,function(o){queryMobileTable("recsToSync","Mobile_Table_Name",e,function(t){var i=[];o.forEach(function(o){var r,n;if(t.forEach(function(e){e.Id!=o.Id||(r=e)}),void 0!==r)if(console.log("existingRecToSync",r),r.Current_Connection_Session&&void 0!==r.Current_Connection_Session)switch(r.CRUD_Operation){case"Insert":case"InsertUpdate":n="InsertUpdate";break;default:n="UpdateUpdate"}else n=r.CRUD_Operation;else n="Update";var s={Mobile_Table_Name:e,SOUP_Record_Id:o._soupEntryId,Id:o.Id,CRUD_Operation:n,LastModifiedDateTime:o.SystemModstamp};"InsertUpdate"!=n&&"UpdateUpdate"!=n||(s.Current_Connection_Session=r.Current_Connection_Session),i.push(s)}),smartstore.upsertSoupEntriesWithExternalId("recsToSync",i,"Id",r,n)},n)},n)}).catch(function(e){n(e)})}function getProxyFieldName(e){return new Promise(function(o,t){var r=localStorage.getItem("proxyField-"+e);r?o(r):(console.log("getProxyFieldName",e),listMobileTableColumns(e,LIST,function(t){var r=null;t.forEach(function(o){o.includes("MC_Proxy_ID")&&(r=o,localStorage.setItem("proxyField-"+e,o),console.log("GOT IT ",r))}),o(r)},function(e){console.error("listMobileTableColumns",JSON.stringify(e)),o(null)}))})}var ALPHA=exports.ALPHA=ALPHA_ORDER,BUILD=exports.BUILD=BUILD_ORDER,FULL=exports.FULL=FULL_LIST;exports.buildMobileTables=buildMobileTables,exports.deleteSoup=deleteSoup,exports.deleteRecordsForExternalId=deleteRecordsForExternalId,exports.deleteRecordsFromSoup=deleteRecordsFromSoup,exports.insertRecords=insertRecords,exports.updateRecordsWithExternalId=updateRecordsWithExternalId,exports.getProxyFieldName=getProxyFieldName,exports.listMobileTables=listMobileTables,exports.listMobileTableColumns=listMobileTableColumns,exports.getSysDataRowMapColHeading=getSysDataRowMapColHeading,exports.getSysDataRowMapColHeadings=getSysDataRowMapColHeadings,exports.getTableDefnColumnValue=getTableDefnColumnValue,exports.setTableDefnColumnValue=setTableDefnColumnValue,exports.queryMobileTable=queryMobileTable,exports.queryMobileTableWithAnd=queryMobileTableWithAnd,exports.querySoupRecords=querySoupRecords,exports.querySoupRecsPromise=querySoupRecsPromise,exports.querySoupRecordsWithQuerySpec=querySoupRecordsWithQuerySpec,exports.smartQuerySoupRecordsWithQuerySpec=smartQuerySoupRecordsWithQuerySpec;