/* mobilecaddy-utils - v2.0.1 - Bundle Time: 2018-11-29 10:57:03 */
/* git info: "2018-11-23 16:02:33 +0000": f458f3fe3659eef32ccde089f82b18d5376b87d6 (msd-628/p2m-fileUtils) */
/* Copyright 2018 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.buildMobileTables=buildMobileTables,exports.deleteSoup=deleteSoup,exports.deleteRecordsForExternalId=deleteRecordsForExternalId,exports.deleteRecordsFromSoup=deleteRecordsFromSoup,exports.insertRecords=insertRecords,exports.upsertSoupEntries=upsertSoupEntries,exports.updateRecordsWithExternalId=updateRecordsWithExternalId,exports.getProxyFieldName=getProxyFieldName,exports.listSoups=listSoups,exports.listMobileTables=listMobileTables,exports.listMobileTableColumns=listMobileTableColumns,exports.getSysDataRowMapColHeading=getSysDataRowMapColHeading,exports.getSysDataRowMapColHeadings=getSysDataRowMapColHeadings,exports.getTableDefnColumnValue=getTableDefnColumnValue,exports.setTableDefnColumnValue=setTableDefnColumnValue,exports.queryMobileTable=queryMobileTable,exports.queryMobileTableWithAnd=queryMobileTableWithAnd,exports.querySoupRecords=querySoupRecords,exports.querySoupRecsPromise=querySoupRecsPromise,exports.querySoupRecordsWithQuerySpec=querySoupRecordsWithQuerySpec,exports.smartQuerySoupRecordsWithQuerySpec=smartQuerySoupRecordsWithQuerySpec,exports.FULL=exports.BUILD=exports.ALPHA=void 0;var mobileCaddy=_interopRequireWildcard(require("./constants")),logger=_interopRequireWildcard(require("./logger"));function _interopRequireWildcard(e){if(e&&e.__esModule)return e;var o={};if(null!=e)for(var t in e)if(Object.prototype.hasOwnProperty.call(e,t)){var n=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(e,t):{};n.get||n.set?Object.defineProperty(o,t,n):o[t]=e[t]}return o.default=e,o}function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}var smartstore=cordova.require("com.salesforce.plugin.smartstore");function deleteRecordsForExternalId(e,o,t,n,r){if(!n&&!r)return new Promise(function(n,r){if(0===o.length)n();else{var i="";"object"==_typeof(o[0])?o.forEach(function(e,o){i+=0===o?"'"+e[t]+"'":",'"+e[t]+"'"}):o.forEach(function(e,o){i+=0===o?"'"+e+"'":", '"+e+"'"});var u="SELECT {"+e+":_soupEntryId} FROM {"+e+"} WHERE {"+e+":"+t+"} IN ("+i+")";console.log("deleteRecordsForExternalId soql",u),smartQuerySoupRecordsWithQuerySpec(smartstore.buildSmartQuerySpec(u,1e4)).then(function(o){console.log("recs",o);var t=o.map(function(e){return e[0]});smartstore.removeFromSoup(e,t,function(e){n(e)},function(e){r(e)})}).catch(function(e){r(e)})}});if(0===o.length)n();else{var i=[];o.forEach(function(e){i.push(e[t])});var u="";o.forEach(function(e,o){u+=0===o?"'"+e[t]+"'":",'"+e[t]+"'"});var s="SELECT {"+e+":_soupEntryId} FROM {"+e+"} WHERE {"+e+":"+t+"} IN ("+u+")";console.log("deleteRecordsForExternalId soql",s),smartQuerySoupRecordsWithQuerySpec(smartstore.buildSmartQuerySpec(s,1e4),function(o){console.log("recs",o);var t=o.map(function(e){return e[0]});smartstore.removeFromSoup(e,t,function(e){n()},function(e){r(e)})},function(e){r(e)})}}function collectRecsFromCursor(e,o,t){var n=[];function r(e){o(n)}function i(e){if(console.error("onCursorClosedError",e),console.error("onCursorClosedError",e.stack),!t)throw e;t(e)}!function e(o){o.currentPageOrderedEntries.forEach(function(e){n.push(e)}),o.currentPageIndex<o.totalPages-1?cordova.require("com.salesforce.plugin.smartstore").moveCursorToNextPage(o,e):cordova.require("com.salesforce.plugin.smartstore").closeCursor(o,r,i)}(e)}function getSoupDefinitionRows(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",smartstore.buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){console.log("soup definition rows success callback with rec count = "+e.length);var t=[];e.forEach(function(e){console.log("processing record = "),e.Type!=mobileCaddy.STANDING_DATA_OBJECT&&e.Type!=mobileCaddy.DYNAMIC_DATA_OBJECT?(console.log("Record Match"),t.push(e)):console.log("Record does not match")}),o(t)},t)}function getSoupObjectDefinition(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",cordova.require("com.salesforce.plugin.smartstore").buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){for(var t,n=0;n<e.length;n++)if(e[n].Type==mobileCaddy.STANDING_DATA_OBJECT||e[n].Type==mobileCaddy.DYNAMIC_DATA_OBJECT){t=e[n];break}o(t)},t)}function removeSoupDefinitions(e,o,t){querySoupRecordsWithQuerySpec("syncLib_system_data",cordova.require("com.salesforce.plugin.smartstore").buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){deleteRecordsFromSoup(e,"syncLib_system_data",function(){console.log("Success delete records from soup, calling callback"),o()},t)},t)}function buildSoupQueryString(e,o,t){console.log("in buildSoupQueryString for soup = "+e),getSoupDefinitionRows(e,function(n){console.log("In getSoupDefinitionRows success callback"),0===n.length?t("No soup columns defined for soup "+e):getSoupObjectDefinition(e,function(t){console.log("in getSoupObjectDefinition success callback");var r="Select ";n.forEach(function(e){r+=e.Column_Name+","}),r=r.substring(0,r.length-1),o(r+=" From "+e)},t)},t)}function getQueryAndSoupDefinition(e,o,t){console.log("in getQueryAndSoupDefinition");var n=[],r="Select ";e.forEach(function(e){console.log("soup column defn = "),n.push({path:e.Column_Name,type:e.Column_Type}),0!==e.Column_Name.indexOf("_")&&(r+=e.Column_Name+",")}),r=r.substring(0,r.length-1),o(r+=" From "+e[0].Name,n)}function querySoupRecords(e,o,t){var n=smartstore.buildAllQuerySpec("_soupEntryId",null,mobileCaddy.QUERY_BUFFER_SIZE);smartstore.querySoup(e,n,function(e){collectRecsFromCursor(e,function(e){o(e)},t)})}function querySoupRecsPromise(e){return new Promise(function(o,t){querySoupRecords(e,function(e){o(e.filter(function(e){return"object"==_typeof(e)}))},function(e){t(e)})})}function querySoupRecordsWithQuerySpec(e,o,t,n){smartstore.querySoup(e,o,function(o){collectRecsFromCursor(o,function(o){console.log("Passing records back to callback for soup = "+e+" and rec count = "+o.length),t(o)},n)},n)}function smartQuerySoupRecordsWithQuerySpec(e,o,t){if(console.debug("smartQuerySoupRecordsWithQuerySpec",e),void 0===o&&void 0===t)return new Promise(function(o,t){smartstore.runSmartQuery(e,function(e){collectRecsFromCursor(e,function(e){console.log("Passing records back to callback for soup with rec count = "+e.length),o(e)},function(e){t(e)})},function(e){t(e)})});smartstore.runSmartQuery(e,function(e){collectRecsFromCursor(e,function(e){console.log("Passing records back to callback for soup with rec count = "+e.length),o(e)},t)},t)}function queryMobileTable(e,o,t,n,r){if(void 0===n&&void 0===r)return new Promise(function(n,r){var i=smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL);querySoupRecordsWithQuerySpec(e,i,function(e){n(e)},function(e){r(e)})});var i=smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL);querySoupRecordsWithQuerySpec(e,i,function(e){n(e)},r)}function queryMobileTableWithAnd(e,o,t,n,r,i,u){querySoupRecordsWithQuerySpec(e,smartstore.buildExactQuerySpec(o,t,mobileCaddy.QUERY_BUFFER_SIZE_SL),function(e){var o=[];e.forEach(function(e){e[n]==r&&o.push(e)}),i(o)},u)}function getDefnRowForTableName(e,o,t){getSysDataRowMapColHeading("Row Mapping PT","Mobile Table Name",function(n){queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001","Platform Table Definition",n,e,function(t){1!=t.length&&console.error("Should be exactly 1 table defn row for table: "+e+", but we got "+t.length),o(t[0])},t)},t)}function getTableDefnColumnValue(e,o){return new Promise(function(t,n){getDefnRowForTableName(e,function(e){getSysDataRowMapColHeading("Row Mapping PT",o,function(o){t(e[o])},function(e){n(e)})},function(e){n(e)})})}function setTableDefnColumnValue(e,o,t){return new Promise(function(n,r){getDefnRowForTableName(e,function(e){getSysDataRowMapColHeading("Row Mapping PT",o,function(o){e[o]=t,smartstore.upsertSoupEntries("syncLib_system_data",[e],function(){n()},function(e){r(e)})},function(e){r(e)})},function(e){r(e)})})}function getSysDataRowMapColHeading(e,o,t,n){var r=e+"_"+o,i=localStorage.getItem(r);i?t(i):queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001",e,"MC_Var_String_003",o,function(n){1!=n.length&&console.error("Must be exactly 1 Row Mapping Record for Sys Data Row Type = "+e+" and Sys Data Row Value = "+o+" found count = "+n.length),localStorage.setItem(r,n[0].MC_Var_String_004),t(n[0].MC_Var_String_004)},n)}function getSysDataRowMapColHeadings(e,o,t,n){querySoupRecordsWithQuerySpec("syncLib_system_data",smartstore.buildExactQuerySpec("MC_Var_String_001",e,mobileCaddy.QUERY_BUFFER_SIZE_SL),function(n){var r=[];o.forEach(function(o){var t=!1;if(n.forEach(function(e){if(e.MC_Var_String_003==o)return r.push(e.MC_Var_String_004),void(t=!0)}),!t)throw"No mapping found for type = "+e+" and value = "+o}),t(r)},n)}var NONE=0,ALPHA_ORDER=1,BUILD_ORDER=2;function listSoups(){return new Promise(function(e,o){Promise.resolve();var t=["Connection_Session__mc","Mobile_Log__mc"],n=["SnapShot_Connection_Session__mc","SnapShot_Mobile_Log__mc"],r=["appSoup","cacheSoup","dotsRecordTypes","recsToSync","syncLib_system_data"];soupExists("Analytics").then(function(o){o&&r.unshift("Analytics"),listMobileTables(ALPHA_ORDER,function(o){o.splice(o.indexOf("Connection_Session__mc"),1),o.splice(o.indexOf("Mobile_Log__mc"),1);var i=t.concat(o).concat(n);o.reduce(function(e,o){return e.then(function(){return getTableDefnColumnValue(o,"Snapshot Data Required")}).then(function(e){return console.log("snapShotExists ",o,e),"Yes"==e&&-1==t.indexOf(o)&&i.push("SnapShot_"+o),i}).catch(function(e){console.error(e)})},Promise.resolve()).then(function(o){e(o.concat(r))})},function(e){logger.error("Failed to listSoups",e)})})})}function soupExists(e){return new Promise(function(o,t){smartstore.soupExists("Analytics",function(e){o(e)},function(o){logger.error("soupExists",e,o),t(o)})})}function listMobileTables(e,o,t){getSysDataRowMapColHeadings("Row Mapping PT",["Mobile Table Name","Build Order"],function(n){var r=n[0],i=n[1];queryMobileTable("syncLib_system_data","MC_Var_String_001","Platform Table Definition",function(t){var n=[];e==BUILD_ORDER?(t.sort(function(e,o){var t=0,n=parseInt(e[i]),r=parseInt(o[i]);return isNaN(n)||isNaN(r)||(t=n-r),t}),t.forEach(function(e){n.push(e[r])}),null!==o&&o(n)):(t.forEach(function(e){n.push(e[r])}),e==ALPHA_ORDER&&n.sort(),null!==o&&o(n))},t)},t)}var LIST=0,BUILD_OBJECT=1,FULL_LIST=2;function listMobileTableColumns(e,o,t,n){getSysDataRowMapColHeadings("Row Mapping TC",["Parent SOUP Name","Table Column Name","Mobile Column Type","Application Field CRUD","META isNillable","Platform Column Type","Device Value Type","Proxy Ref Field Name"],function(n){var r=n[0],i=n[1],u=n[2],s=n[3],c=n[4],a=n[5],l=n[6],p=n[7];queryMobileTableWithAnd("syncLib_system_data","MC_Var_String_001","Platform Table Column",r,e,function(e){var n=[];e.forEach(function(e){o==LIST?n.push(e[i]):o==FULL_LIST?n.push({path:e[i],type:e[u],crud:e[s],nillable:e[c],platColType:e[a],appColType:e[l],proxyRefField:e[p]}):n.push({path:e[i],type:e[u]})}),t(n)},function(e){console.log("Error retrieving column names = "+e)})},n)}function cacheProxyFieldNames(e,o){o.forEach(function(o){o.path.includes("MC_Proxy_ID")&&localStorage.setItem("proxyField-"+e,o.path)})}function buildMobileTables(e,o){console.debug("About to buildMobileTables"),console.time("buildMobileTables"),listMobileTables(BUILD_ORDER,function(t){var n=t.length;t.forEach(function(t){listMobileTableColumns(t,BUILD_OBJECT,function(r){console.debug("tableColumnObjectArray -> "+r),smartstore.registerSoup(t,r,function(){console.log("success on register soup "+t),setTableDefnColumnValue(t,"SOUP Built Date/Time",(new Date).getTime()).then(function(){return console.log("success on update of soup build date time"),cacheProxyFieldNames(t,r),getTableDefnColumnValue(t,"Snapshot Data Required")}).then(function(i){"Yes"==i?smartstore.registerSoup("SnapShot_"+t,r,function(){console.log("Success from build of SnapShot_"+t),setTableDefnColumnValue(t,"Snapshot SOUP Built Date/Time",(new Date).getTime()),0===--n&&(console.timeEnd("buildMobileTables"),e())},function(e){console.error("Fail on create of SnapShot_"+t+" "+e),o(e)}):0===--n&&(console.timeEnd("buildMobileTables"),e())}).catch(function(e){o(e)})},o)},function(e){console.error("Fail on create of table"+t+" "+e),o(e)})})},o)}function deleteSoup(e){return console.debug("deleteSoup",e),new Promise(function(o,t){smartstore.removeSoup(e,function(){logger.log("deleteSoup",e),o()},function(e){logger.errorAndDispatch("deleteSoup",e),t(e)})})}function deleteRecordsFromSoup(e,o,t,n){if(console.log("In delete recs from soup with rec count = "+e.length),0!==e.length){var r=[];e.forEach(function(e){e&&e._soupEntryId&&r.push(e._soupEntryId)}),0!==r.length?smartstore.removeFromSoup(o,r,function(e){console.log("Deleted rec(s) - calling callback"),t(e)},n):t()}else t()}function upsertSoupEntries(e,o){return new Promise(function(t,n){smartstore.upsertSoupEntries(e,o,function(e){t(e)},function(e){n(e)})})}function insertRecords(e,o,t,n){console.log("in insert records"),console.log("mobile table name = "+e),console.log("records = "+JSON.stringify(o)),console.log("records size = "+o.length),smartstore.upsertSoupEntries(e,o,function(o){console.log("back from upsert soup with records = "+JSON.stringify(o));var r=(new Date).getTime();addProxyIds(e,o,r,function(o){console.log("back with proxy ids = "+JSON.stringify(o));var i=[];o.forEach(function(o){var t={Mobile_Table_Name:e,CRUD_Operation:"Insert",SOUP_Record_Id:o._soupEntryId,Id:o.Id,LastModifiedDateTime:r};i.push(t)}),smartstore.upsertSoupEntriesWithExternalId("recsToSync",i,"Id",t,n)},n)},n)}function addProxyIds(e,o,t,n,r){var i;getProxyFieldName(e).then(function(e){return i=e,getCachedCurrentValueFromAppSoup("audId")}).then(function(n){return o.forEach(function(o){var r="PROXY%"+e+"%"+t+"%"+o._soupEntryId+"%"+n;o.Id=r,o[i]=r}),upsertSoupEntries(e,o)}).then(function(e){n(e)}).catch(function(e){r(e)})}function fillOutRecords(e,o,t){var n=o.length,r=0;return new Promise(function(i,u){getProxyFieldName(e).then(function(s){o.forEach(function(c,a){queryMobileTable(e,t,c[t]).then(function(l){if(l.length>0){var p=l[0];for(var f in c)p[f]=c[f];o[a]=p,++r>=n&&i(o)}else"Id"==t&&c.Id.length>18?queryMobileTable(e,s,c.Id).then(function(e){if(e.length>0){var t=e[0];for(var s in c)"Id"!=s&&(t[s]=c[s]);o[a]=t,++r>=n&&i(o)}else u({status:101107})}):u({status:101107})}).catch(function(e){u(e)})})}).catch(function(e){u(e)})})}function updateRecordsWithExternalId(e,o,t,n,r){fillOutRecords(e,o,t).then(function(o){smartstore.upsertSoupEntriesWithExternalId(e,o,t,function(o){queryMobileTable("recsToSync","Mobile_Table_Name",e,function(t){var i=[];o.forEach(function(o){var n,r;if(t.forEach(function(e){e.Id!=o.Id||(n=e)}),void 0!==n)if(console.log("existingRecToSync",n),n.Current_Connection_Session&&void 0!==n.Current_Connection_Session)switch(n.CRUD_Operation){case"Insert":case"InsertUpdate":r="InsertUpdate";break;default:r="UpdateUpdate"}else r=n.CRUD_Operation;else r="Update";var u={Mobile_Table_Name:e,SOUP_Record_Id:o._soupEntryId,Id:o.Id,CRUD_Operation:r,LastModifiedDateTime:o.SystemModstamp};"InsertUpdate"!=r&&"UpdateUpdate"!=r||(u.Current_Connection_Session=n.Current_Connection_Session),i.push(u)}),smartstore.upsertSoupEntriesWithExternalId("recsToSync",i,"Id",n,r)},r)},r)}).catch(function(e){r(e)})}function getProxyFieldName(e){return new Promise(function(o,t){var n=localStorage.getItem("proxyField-"+e);n?o(n):(console.log("getProxyFieldName",e),listMobileTableColumns(e,LIST,function(t){var n=null;t.forEach(function(o){o.includes("MC_Proxy_ID")&&(n=o,localStorage.setItem("proxyField-"+e,o),console.log("GOT IT ",n))}),o(n)},function(e){console.error("listMobileTableColumns",JSON.stringify(e)),o(null)}))})}function getCachedCurrentValueFromAppSoup(e){var o=localStorage.getItem("appSoup-"+e);return new Promise(function(t,n){o?t(o):getCurrentValueFromAppSoup(e).then(function(o){localStorage.setItem("appSoup-"+e,o),t(o)})})}function getCurrentValueFromAppSoup(e){return new Promise(function(o,t){querySoupRecordsWithQuerySpec("appSoup",smartstore.buildExactQuerySpec("Name",e,mobileCaddy.QUERY_BUFFER_SIZE),function(e){e[0]?o(e[0].CurrentValue):o(e[0])},function(e){t(e)})})}var ALPHA=ALPHA_ORDER;exports.ALPHA=ALPHA;var BUILD=BUILD_ORDER;exports.BUILD=BUILD;var FULL=FULL_LIST;exports.FULL=FULL;