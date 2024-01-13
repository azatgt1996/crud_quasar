export const enumFormat = (values) => values.join(', ')
export const dateFormat = (value) => new Date(value).toLocaleDateString()
export const yearsAgoFormat = (value) => new Date(Date.now() - new Date(value)).getUTCFullYear() - 1970