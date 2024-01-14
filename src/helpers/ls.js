/**
 * Get records by tableName
 * @param {string} tableName 
 * @returns {Array} records
 */
export const getFromStorage = (tableName) => JSON.parse(localStorage.getItem(tableName) || '[]')

/**
 * Save records into table with tableName
 * @param {string} tableName
 * @param {Array} records
 */
export const saveToStorage = (tableName, records) => localStorage.setItem(tableName, JSON.stringify(records))