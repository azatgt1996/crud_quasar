export const reqR = val => Array.isArray(val)
  ? val.length || 'Please select values'
  : ![null, undefined, ''].includes(val) || 'Please enter a value'

export const nameR = val => /^[A-Z][a-z]+ [A-Z][a-z]+$/.test(val) || `Please enter a valid full name (ex 'Adam Smith')`

export const dateR = (value) => new Date(value) != 'Invalid Date' &&
  new Date(value).toISOString().slice(0, 10) == value || 'Please enter a valid date'

export const nickR = val => /^[a-z0-9_]{3,}$/.test(val) || `Please enter a valid nickname (>2 chars, ex 'adam_33')`

export const emailR = (val, rules) => rules.email(val) || 'Please enter a valid email'

export const phoneR = (val) => val.match(/\d/g).length == 10 || 'Please enter a valid phone'
