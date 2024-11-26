/**
 * Callback for adding two numbers.
 */
export type heartbeatCallback = (status: {
    status: number;
}) => any;
export var CSINHEAD_SYNC_VSN: string;
export var SYNC: number;
export var SYNC_ALREADY_IN_PROGRESS_INC: number;
export var SYNC_NOK_STATUS: number;
export function refreshToken(success: any, error: any): void;
export function genProxyId(tableName: any, soupEntryId: any, insertDateTime: any): any;
export function addProxyIds(tableName: any, records: any, insertDateTime: any, success: any, error: any): void;
/**
 * @param string Optional string if getting a specific table's failures.
 *
 * @return object|array Arry of entries for each failed record for a table, or gets an object for each table
 */
export function getSyncRecFailures(table: any): any;
export var P2M_REFRESH_OK: number;
export function p2mRefreshTable(tableName: any, maxTableAge: any, cleanCSFlag: any, sessNum: any, totalSess: any, csPId: any, success: any, error: any): void;
export function buildConnectionSession(syncRefreshVersion: any, sessionType: any, mobileProcessStatus: any, sessNum: any, totalSess: any, csPId: any): any;
export var M2P_UPDATE_OK: number;
export var M2P_NO_RECS_TO_SYNC: number;
export function m2pUpdateMobileTable(tableName: any, maxRecsPerCall: any, success: any, error: any): void;
export function m2pRecoveryUpdateMobileTable(tableName: any): any;
export var HEARTBEAT_OK: number;
export var HEARTBEAT_EXCEPTION: number;
export var HEARTBEAT_FAILURE: number;
export var HEARTBEAT_NO_CONNECTION: number;
export var HEARTBEAT_NOT_DEVICE: number;
export var HEARTBEAT_REFRESHED_OK: number;
/**
 * Callback for adding two numbers.
 *
 * @callback heartbeatCallback
 * @param { {status:number} } status - An integer.
 */
/**
 *
 * @param {heartbeatCallback} success
 * @param { any } error
 */
export function heartBeat(success: heartbeatCallback, error: any): void;
export function _handleRefreshResponse(jsonObj: any): any;
/**
 * @function createUpdateJson
 */
export function createUpdateJson(tableName: any, columnRecs: any, tableColumnColumn: any, converterColumnName: any, nullHandlerColumnName: any, formatterColumnName: any, recsToSyncRecords: any, fullSoupRecords: any, snapShotRecords: any, connSessProxyId: any, success: any): void;
export function syncMobileTable(mobileTableName: any, syncWithoutLocalUpdates: any, maxTableAge: any, maxRecsPerCall: any, skipP2M: any, syncCallback: any): any;
export function getRTSPendingconnSess(success: any, error: any): void;
export var CLEAN_CS_OK: number;
export function cleanConnectionSessionHeartBeat(heartBeatObject: any, connSessObject: any, success: any, error: any): void;
export function cleanConnectionSessionVFEvent(vfEventObject: any, connSessObject: any, success: any, error: any): void;
export var CONN_SESS_OK: number;
export function csStatusCheck(checkedForCSProxyId: any, success: any, error: any): void;
export function maybeSyncConnSess(connSess: any, success: any, error: any): void;
export function processM2PUpdateResponse(responseObject: any, jsonReq: any, success: any, error: any): void;
/**
 * This routine updates the provided connection session(s), creates a snapshot
 * 	duplicate and then puts an entry in recs to sync so it gets updated.
 * @param  {object | array} connectionSessionRec Either a single connection sessio
 *                   															Or an array
 * @return {promise}                      [description]
 */
export function postProcessConnectionSession(connectionSessionRec: object | any[]): Promise<any>;
/**
 * Gets a csM2P from a response from the platform. Runs through and clears these CS from the
 * 	table and the RTS
 * @param  {object} csM2PResp {us : [Id], uf : [Id]}
 * @return {promise}
 */
export function handleUpdatedCS(csM2PResp: object): Promise<any>;
