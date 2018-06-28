/* mobilecaddy-utils - v2.0.0 - Bundle Time: 2018-06-28 16:59:28 */
/* git info: "2018-06-28 16:59:04 +0100": 03567979314fa078891c57fd2e18034d16128015 (v2) */
/* Copyright 2018 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.warn=exports.log=exports.info=exports.errorAndDispatch=exports.error=exports.debug=void 0;var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o},_appDataUtils=require("./appDataUtils"),appDataUtils=_interopRequireWildcard(_appDataUtils),_smartStoreUtils=require("./smartStoreUtils"),smartStoreUtils=_interopRequireWildcard(_smartStoreUtils);function _interopRequireWildcard(o){if(o&&o.__esModule)return o;var e={};if(null!=o)for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r]);return e.default=o,e}var LOG_LEVEL_ERROR=0,LOG_LEVEL_WARN=1,LOG_LEVEL_LOG=2,LOG_LEVEL_INFO=3,LOG_LEVEL_DEBUG=4;function insertLog(o,e){return new Promise(function(r,t){if(1==e.length&&(e=e[0]),"object"==(void 0===e?"undefined":_typeof(e))&&(e=JSON.stringify(e)),"number"!=typeof e&&"boolean"!=typeof e||(e=e.toString()),"string"==typeof e){o==LOG_LEVEL_ERROR&&localStorage.setItem("lastErrorLog",e.substring(0,1024));var n={mobilecaddy1__Error_Text__c:e.substring(0,1024),SystemModstamp:(new Date).getTime()},i=localStorage.getItem("appSoup-audId");n.mobilecaddy1__Application_User_Device__c=i,n.mobilecaddy1__Log_Type__c="D"+o.toString(),smartStoreUtils.insertRecords("Mobile_Log__mc",[n],function(o){r()},function(o){t(o)})}else logger.error("Trying to log unsupported type",void 0===e?"undefined":_typeof(e)),t("Trying to log unsupported type"+(void 0===e?"undefined":_typeof(e)))})}function doLog(o,e,r,t){var n=localStorage.getItem("logLevel");if((n=void 0===n?0:n)>=e){var i="";if(e>0){var s=t.stack.split("\n")[4];if(void 0!==s){var a=s.indexOf("at ");i=s.slice(a+2,s.length)}}var l=r[0];switch(e){case LOG_LEVEL_ERROR:r[0]&&r[0].stack?l=r[0].message+", STACK:"+r[0].stack:r[1]&&r[1].stack?l+="\n"+r[1].message+", STACK:"+r[1].stack:l=r,insertLog(e,l),console.error.apply(console,r);break;case LOG_LEVEL_WARN:n>=LOG_LEVEL_WARN&&(insertLog(e,r),console.log.apply(console,r),console.log(i));break;default:n>=LOG_LEVEL_LOG&&(insertLog(e,r),console.log.apply(console,r),console.log(i))}o&&(console.info("Dispatching error"),"undefined"!=typeof LOCAL_DEV&&LOCAL_DEV&&alert(l+"\n\nSee dev console for more information"))}}function getErrorObject(){try{throw Error("")}catch(o){return o}}function debug(o){return doLog(!1,LOG_LEVEL_DEBUG,arguments,getErrorObject())}function error(o){return doLog(!1,LOG_LEVEL_ERROR,arguments)}function errorAndDispatch(o){return doLog(!0,LOG_LEVEL_ERROR,arguments)}function info(o){return doLog(!1,LOG_LEVEL_INFO,arguments,getErrorObject())}function log(o){return doLog(!1,LOG_LEVEL_LOG,arguments,getErrorObject())}function warn(o){return doLog(!1,LOG_LEVEL_WARN,arguments,getErrorObject())}exports.debug=debug,exports.error=error,exports.errorAndDispatch=errorAndDispatch,exports.info=info,exports.log=log,exports.warn=warn;