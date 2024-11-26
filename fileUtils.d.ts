/**
 * @function downloadFiles
 * @description Attempts to download files based upon the 'RECORD_FILES_TABLE' entries.
 *              Once downloaded, the DB entry is updated. Before downloading it will
 *              check to see if the sdk has downloaded files, in which case it will return a
 *              digest file, and we should update the DB entries before seeing if we need to
 *              download any more.
 * @returns {Promise<Array<{status: number}>>}
 */
export function downloadFiles(type?: any): Promise<Array<{
    status: number;
}>>;
/**
 * @function storeFilesInfo
 * @description Takes file meta string from a record and stores any new IDs in DB
 * @param {array} metaJson Array representing files related to one or more records
 */
export function storeFilesInfo(metaJson: any[]): any;
/**
 * E X P O R T E D    F U N C T I O N S
 */
/**
 * @function getStorageDirectory
 *
 * @returns {string} Path to Storage directory, or 'CodeFlow' if running in CodeFlow
 */
export function getStorageDirectory(): string;
/**
 *
 * @param { string } fileName
 * @returns {Promise<any> }
 */
export function readAsDataURL(fileName: string): Promise<any>;
