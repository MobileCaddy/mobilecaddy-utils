/* mobilecaddy-utils - v3.1.2 - Bundle Time: 2023-07-31 13:27:00 */
/* git info: "2023-07-03 09:56:02 +0100": 34dc8fd88af5519f08c0144d435c38516e287d1e (v3) */
/* Copyright 2023 MobileCaddy Ltd */

"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Object.defineProperty(exports,"__esModule",{value:!0}),exports.debug=debug,exports.error=error,exports.errorAndDispatch=errorAndDispatch,exports.info=info,exports.log=log,exports.warn=warn,exports.doLog=doLog;var LOG_LEVEL_ERROR=0,LOG_LEVEL_WARN=1,LOG_LEVEL_LOG=2,LOG_LEVEL_INFO=3,LOG_LEVEL_DEBUG=4;function createLog(e,o){return new Promise(function(t,r){if(1==o.length&&(o=o[0]),"object"==_typeof(o)&&(o=JSON.stringify(o)),"number"!=typeof o&&"boolean"!=typeof o||(o=o.toString()),"string"==typeof o){e==LOG_LEVEL_ERROR&&localStorage.setItem("lastErrorLog",o.substring(0,1024));var n={mobilecaddy1__Error_Text__c:o.substring(0,1024),SystemModstamp:(new Date).getTime()},L=localStorage.getItem("appSoup-audId");n.mobilecaddy1__Application_User_Device__c=L,n.mobilecaddy1__Log_Type__c="D"+e.toString(),t(n)}else r("Trying to log unsupported type"+_typeof(o))})}function doLog(e,o,t,r){return new Promise(function(n,L){var c=localStorage.getItem("logLevel");c=null===c||void 0==_typeof(c)?0:c;if(o>0){var i=r.stack.split("\n")[4];if(void 0!==i){var _=i.indexOf("at ");i.slice(_+2,i.length)}}var a=t[0];switch(o){case LOG_LEVEL_ERROR:t[0]&&t[0].stack?a=t[0].message+", STACK:"+t[0].stack:t[1]&&t[1].stack?a+="\n"+t[1].message+", STACK:"+t[1].stack:a=t,createLog(o,a).then(function(e){n(e)});break;case LOG_LEVEL_WARN:case LOG_LEVEL_LOG:createLog(o,t).then(function(e){n(e)});break;default:createLog(o,t).then(function(e){n(e)})}e&&"undefined"!=typeof LOCAL_DEV&&LOCAL_DEV&&alert(a+"\n\nSee dev console for more information")})}function getErrorObject(){try{throw Error("")}catch(e){return e}}function debug(e){return doLog(!1,LOG_LEVEL_DEBUG,arguments,getErrorObject())}function error(e){return doLog(!1,LOG_LEVEL_ERROR,arguments)}function errorAndDispatch(e){return doLog(!0,LOG_LEVEL_ERROR,arguments)}function info(e){return doLog(!1,LOG_LEVEL_INFO,arguments,getErrorObject())}function log(e){return doLog(!1,LOG_LEVEL_LOG,arguments,getErrorObject())}function warn(e){return doLog(!1,LOG_LEVEL_WARN,arguments,getErrorObject())}