export const SYNC_OK: number;
export const SYNC_NOK: number;
export const SYNC_ALREADY_IN_PROGRESS: number;
export const SYNC_UNKONWN_TABLE: number;
export const SYNC_MANDATORY_MISSING: number;
export const DELETE_RECS_OK: number;
export const DELETE_RECS_UNKONWN_TABLE: number;
export const DELETE_RECS_UNKONWN_FIELD: number;
export const DELETE_RECS_ACCESS_DENIED: number;
export const DELETE_RECS_MANDATORY_MISSING: number;
export const INSERT_RECS_OK: number;
export const INSERT_RECS_UNKONWN_TABLE: number;
export const INSERT_RECS_UNKONWN_FIELD: number;
export const INSERT_RECS_ACCESS_DENIED: number;
export const INSERT_RECS_MANDATORY_MISSING: number;
export const INSERT_RECS_DATATYPE_MISMATCH: number;
export const INSERT_RECS_PROTECTED_FIELD: number;
export const INSERT_RECS_UNKNOWN_RECORD_TYPE: number;
export const READ_RECS_OK: number;
export const READ_RECS_UNKONWN_TABLE: number;
export const READ_RECS_ACCESS_DENIED: number;
export const UPDATE_RECS_OK: number;
export const UPDATE_RECS_UNKONWN_TABLE: number;
export const UPDATE_RECS_UNKONWN_FIELD: number;
export const UPDATE_RECS_ACCESS_DENIED: number;
export const UPDATE_RECS_DATATYPE_MISMATCH: number;
export const UPDATE_RECS_UNKNOWN_ID: number;
export const UPDATE_RECS_UNKNOWN_RECORD_TYPE: number;
export const GET_REC_TYPES_UNKONWN_TABLE: number;
/**
 * Increments the counter for 'key' by 1
 * @param  {string} key
 * @return {promise}
 */
export function analInc(key: string): Promise<any>;
/**
 * Deletes a record from the local table (if valid)
 * LIMITATION: only can delete non-syn'd recs
 * @param {string} mobileTableName
 * @param {[object]} recs
 * @param {string} idField The field to be used as the ID
 */
export function deleteRecord(tableName: any, rec: any, idField: string): any;
/**
 * @description dirtyTables :returns a list of tableNames that have entries in the RTS
 *
 * @param {Array<any> | void} ignoreList Optional Array of table objects inc records to ignore from the result of the call.
 *
 * @return { Promise<Array<string>> } Promise resolving to an array of table names.
 */
export function dirtyTables(ignoreList: Array<any> | void): Promise<Array<string>>;
/**
 * 
 * @param mobileTableName Name of the mobile table to sync
 * @param syncWithoutLocalUpdates Should a sync take place even without a local update. Default true
 * @param maxTableAge 
 * @param maxRecsPerCall Default 50
 * @param skipP2M Default false
 * @param syncCallback 
 */
export function syncMobileTable(mobileTableName: string, syncWithoutLocalUpdates?: boolean, maxTableAge?: number, maxRecsPerCall?: number, skipP2M?: boolean, syncCallback?: Function): any;
/**
 *
 * @param {Array<string>} tableNames
 * @param {Function} syncCallback
 * @returns { Promise<{status: number} | Array<{tableName: string, status: number, mc_add_status?: any}>}
 */
export function initialSync(tableNames: Array<string>, syncCallback: Function): Promise<{
    status: number;
} | Array<{
    tableName: string;
    status: number;
    mc_add_status?: any;
}>>;
export function getCurrentUserId(): any;
export function getCurrentUserName(): any;
export function getUserLocale(): any;
export function getCachedAppSoupValue(key: any): any;
/**
 * @function getRecordTypes
 * @description Retrieves the dotsRecordTypes mapping object for a specific table
 * @param {string} tableName The table name to get RecordType mappings for
 * @return {promise} Resolves to an object mapping {name : id, ...}| undefined, reject on error
 */
export function getRecordTypes(tableName: string): Promise<any>;
/**
 * Inserts a record into the local table (if valid)
 * @param {string} mobileTableName
 * @param {[object]} inRecs
 */
export function insertRecord(tableName: any, rec: any): any;
export function insertRecords(tableName: any, inRecs: any): any;
export function logout(): void;
/**
 *  Reads record(s) from the local table (if valid)
 * @param { string } tableName
 * @param { Array<any>} options
 * @returns { Promise<{records: Array<any>, status:number, mc_add_status:any, upgradeAvailable:boolean}>}
 */
export function readRecords(tableName: string, options?: Array<any>): Promise<{
    records: Array<any>;
    status: number;
    mc_add_status: any;
    upgradeAvailable: boolean;
}>;
/**
 *  Reads record(s) from the local table (if valid)
 * @param { string } tableName
 * @param { Array<any>} options
 * @returns { Promise<{records: Array<any>, status:number, mc_add_status:any, upgradeAvailable:boolean}>}
 */
/**
 * Performs a smartSql SELECT from the local table (if valid)
 * Current Limitation: Only "SELECT * ..." supported
 * @param {string} smartSql
 * @param {number} pageSize
 */
export function smartSql(smartSql: string, pageSize?: number): Promise<{
    records: Array<any>;
    status?: number;
    mc_add_status?: any;
    upgradeAvailable?: boolean;
}>;
/**
 * Updtes a record into the local table (if valid)
 * @param {string} mobileTableName
 * @param {[object]} recs
 * @param {string} idField The field to be used as the ID
 */
export function updateRecord(tableName: any, rec: any, idField: string): any;
export function updateRecords(tableName: any, inRecs: any, idField: any): any;
export function maybeReadTransformType(fieldVal: any, FromType: any, ToType: any): any;
export function maybeWriteTransformType(fieldVal: any, FromType: any, ToType: any): any;
/**
 *
 * @return { Promise<boolean> }
 */
export function upgradeAvailable(): Promise<boolean>;
