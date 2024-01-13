export const strEq = (s1, s2) => s1.trim().toLowerCase() == s2.trim().toLowerCase()

export const deepClone = (obj) => JSON.parse(JSON.stringify(obj))
export const deepEqual = (obj1, obj2) => JSON.stringify(obj1) == JSON.stringify(obj2)