export function getCurrentValueFromAppSoup(variableName: any): any;
/**
 * @function getCachedCurrentValueFromAppSoup
 * @description Gets a value with key from localStorage, if it exists, else
 *              reads from AppSoup and caches in localStorage
 * @param  {string} key
 * @return {promise}     Resolves to whatever value is in store
 */
export function getCachedCurrentValueFromAppSoup(variableName: any): Promise<any>;
/**
 *
 * @param { any } appSoupValObj
 * @param { boolean } shouldCheckContainer
 * @returns { Promise<Object> }
 */
export function getPlatformAppConfig(appSoupValObj?: any, shouldCheckContainer?: boolean): Promise<any>;
export function updateNewValueInAppSoup(name: any, newValue: any): Promise<any>;
export function upsertNewValueInAppSoup(name: any, newValue: any): Promise<any>;
export function updateCurrentValueInAppSoup(name: any, curValue: any): Promise<any>;
export function upsertCurrentValueInAppSoup(name: any, curValue: any): Promise<any>;
