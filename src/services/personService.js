import { notify } from '../helpers/interaction'
import { strEq } from '../helpers/util'
import { getFromStorage, saveToStorage } from '../helpers/ls'

let _id = 0
const Person = (fullName, nickname, email, phone, brth, skills = [], pay = '', isActivated = false) =>
  ({ id: ++_id, fullName, nickname, email, phone, brth, skills, pay, isActivated })

const persons = [
  Person('Kamila Simpson', 'kamila', 'kamila@mail.com', '(900) 111 22-00', '1990-11-01', ['C#'], 66, true),
  Person('Monica Delgado', 'monica1', 'monica@gmail.com', '(900) 111 22-53', '1991-01-06', ['Vue'], 45),
  Person('Kate Mills', 'kate88', 'kate@gmail.com', '(900) 111 22-55', '1988-01-01', ['C#', 'Java', 'ReactJS', 'Kotlin'], 65.5),
  Person('Alice Scott', 'alice', 'alice@gmail.com', '(900) 111 22-77', '1986-01-05', ['Vue'], 65.5),
  Person('Leo Munoz', 'leo0', 'leo@gmail.com', '(900) 111 22-66', '1999-01-01', ['Vue'], 15, true),
  Person('Nash Sims', 'nash77', 'nash@gmail.com', '(900) 876 22-33', '1998-02-01', ['Java'], 33.3),
  Person('Lena Navarro', 'lena', 'lena@gmail.com', '(923) 111 22-33', '1995-03-01', ['Kotlin'], 27.5),
  Person('Brixton Cantrell', 'brix32', 'brix@gmail.com', '(905) 111 22-33', '2009-12-23', ['C++']),
  Person('Olivia Moses', 'olivia2002', 'olivia@gmail.com', '(943) 111 22-33', '2002-12-02', ['Vue']),
  Person('Antony Holloway', 'ant', 'antony@gmail.com', '(900) 166 22-33', '2000-12-02', ['Vue']),
  Person('Ava Lawrence', 'ava90', 'ava@gmail.com', '(900) 111 22-65', '1990-11-02', ['Vue'], 50),
  Person('Vinnie Valentine', 'vin_1', 'vinnie@gmail.com', '(900) 111 22-54', '2004-12-03', ['Vue'], 45),
]

if (!getFromStorage('persons').length) {
  saveToStorage('persons', persons)
}

const personService = {
  model: { id: 0, fullName: '', nickname: '', email: '', phone: '', brth: '', skills: [], pay: '', isActivated: false },

  getAll() {
    return getFromStorage('persons')
  },

  get(id) {
    const list = getFromStorage('persons')
    return list.find(p => p.id == id)
  },

  save(data, successCB) {
    const { id, fullName, nickname, email, phone, brth, skills, pay, isActivated } = data

    const list = getFromStorage('persons')

    if (list.some(p => p.id != id && strEq(p.nickname, nickname)))
      return notify('This nickname is already taken', 'warning')

    if (list.some(p => p.id != id && strEq(p.phone, phone)))
      return notify('This phone is already taken', 'warning')

    if (list.some(p => p.id != id && strEq(p.email, email)))
      return notify('This email is already taken', 'warning')

    if (id) {
      const index = list.findIndex(p => p.id == id)
      list[index] = { id, fullName, nickname, email, phone, brth, skills, pay, isActivated }
    } else {
      list.push(Person(fullName, nickname, email, phone, brth, skills, pay, isActivated))
    }
    saveToStorage('persons', list)
    notify('Person saved')
    successCB()
  },

  delete(record, successCB) {
    const list = getFromStorage('persons')
    const index = list.findIndex(p => p.id == record.id)
    list.splice(index, 1)
    saveToStorage('persons', list)
    notify('Person removed')
    successCB()
  },

  deleteSelected(records, successCB) {
    const list = getFromStorage('persons')
    for (const record of records) {
      const index = list.findIndex(p => p.id == record.id)
      list.splice(index, 1)
    }
    saveToStorage('persons', list)
    notify(`${records.length > 1 ? 'Persons' : 'Person'} removed`)
    successCB()
  }
}

export default personService