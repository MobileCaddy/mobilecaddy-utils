/* mobilecaddy-utils - v3.0.6 - Bundle Time: 2022-11-28 10:54:02 */
/* git info: "2022-11-24 11:04:43 +0000": 5dcdfd5ecf556ebfd5a3bf0ba90953f15381ddbf (HEAD) */
/* Copyright 2022 MobileCaddy Ltd */

"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.debug=debug,exports.error=error,exports.errorAndDispatch=errorAndDispatch,exports.info=info,exports.log=log,exports.warn=warn,exports.doLog=doLog;var logUtils=_interopRequireWildcard(require("./logUtils")),smartStoreUtils=_interopRequireWildcard(require("./smartStoreUtils"));function _interopRequireWildcard(r){if(r&&r.__esModule)return r;var o={};if(null!=r)for(var t in r)if(Object.prototype.hasOwnProperty.call(r,t)){var e=Object.defineProperty&&Object.getOwnPropertyDescriptor?Object.getOwnPropertyDescriptor(r,t):{};e.get||e.set?Object.defineProperty(o,t,e):o[t]=r[t]}return o.default=r,o}function _typeof(r){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(r){return typeof r}:function(r){return r&&"function"==typeof Symbol&&r.constructor===Symbol&&r!==Symbol.prototype?"symbol":typeof r})(r)}var LOG_LEVEL_ERROR=0,LOG_LEVEL_WARN=1,LOG_LEVEL_LOG=2,LOG_LEVEL_INFO=3,LOG_LEVEL_DEBUG=4;function doLog(r,o,t,e){logUtils.doLog(r,o,t,e).then(function(r){var e=localStorage.getItem("logLevel");(e=null===e||void 0==_typeof(e)?0:e)>=o&&smartStoreUtils.insertRecords("Mobile_Log__mc",[r],function(r){},function(r){error(r,_typeof(t))})}).catch(function(r){error(r,_typeof(t))})}function getErrorObject(){try{throw Error("")}catch(r){return r}}function debug(r){return doLog(!1,LOG_LEVEL_DEBUG,arguments,getErrorObject())}function error(r){return doLog(!1,LOG_LEVEL_ERROR,arguments)}function errorAndDispatch(r){return doLog(!0,LOG_LEVEL_ERROR,arguments)}function info(r){return doLog(!1,LOG_LEVEL_INFO,arguments,getErrorObject())}function log(r){return doLog(!1,LOG_LEVEL_LOG,arguments,getErrorObject())}function warn(r){return doLog(!1,LOG_LEVEL_WARN,arguments,getErrorObject())}