export const ALPHA: number;
export const BUILD: number;
export const FULL: number;
export function buildMobileTables(success: any, error: any): void;
export function deleteSoup(soupName: any): any;
export function deleteRecordsForExternalId(tableName: any, records: any, externalId: any, success: any, error: any): any;
export function deleteRecordsForExternalId2(tableName: any, ids: any, externalId: any, success: any, error: any): void;
export function deleteRecordsFromSoup(records: any, soupName: any, success: any, error: any): void;
export function insertRecords(mobileTable: any, records: any, success: any, error: any): void;
export function upsertSoupEntries(mobileTable: any, records: any): any;
export function updateRecordsWithExternalId(mobileTable: any, records: any, idFieldName: any, success: any, error: any): void;
/**
 * Gets the MC_Proxy_ID field name, could be namespaced, or could not.
 * @param  {string} table Table name
 * @return {string}       The name for the MC_Proxy_ID
 */
export function getProxyFieldName(table: string): string;
/**
 * Ordered like this;
 * 1. __mc (not inc snapshots) - alpha order
 * 2 __ap (not inc snapshots) - alpha order
 * 3 snapshot __mc  - alpha order
 * 4 snapshot __ap  - alpha order
 * 5 Everything else  - alpha order
 */
export function listSoups(): any;
export function listMobileTables(order: any, success: any, error: any): void;
export function listMobileTableColumns(tableName: any, listType: any, success: any, error: any): void;
export function getSysDataRowMapColHeading(sysDataRowType: any, sysDataRowValue: any, success: any, error: any): void;
export function getSysDataRowMapColHeadings(sysDataRowType: any, sysDataRowValues: any, success: any, error: any): void;
export function getTableDefnColumnValue(tableName: any, headingType: any): any;
export function setTableDefnColumnValue(tableName: any, headingType: any, valueToSet: any): any;
export function queryMobileTable(soupName: any, col: any, val: any, success: any, error: any): any;
export function queryMobileTableWithAnd(soupName: any, col1: any, val1: any, col2: any, val2: any, success: any, error: any): void;
export function querySoupRecords(soupName: any, success: any, error: any): void;
export function querySoupRecsPromise(table: any): any;
export function querySoupRecordsWithQuerySpec(soupName: any, querySpec: any, success: any, error: any): void;
export function smartQuerySoupRecordsWithQuerySpec(smartQuerySpec: any, success: any, error: any): any;
