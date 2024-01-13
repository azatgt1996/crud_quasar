<template>
  <crud-table title="Persons" :data="persons" @update="personModal.open($event)" @remove="removePerson" :columns="[
    { label: 'Full name', field: 'fullName', width: 140 },
    { label: 'Nickname', field: 'nickname', width: 100 },
    { label: 'Email', field: 'email', name: 'email', sortable: true },
    { label: 'Phone', field: 'phone' },
    { label: 'Birth day', field: 'brth', format: dateFormat, name: 'brth', sortable: true },
    { label: 'Age', format: (_, row) => yearsAgoFormat(row.brth) },
    { label: 'Skills', field: 'skills', width: 130, format: enumFormat },
    { label: 'Pay per hour', field: 'pay', name: 'pay', sortable: true },
    { label: 'Is activated', field: 'isActivated', icon: 'check' },
  ]"/>

  <crud-modal ref="personModal" subj="person" :model="person" @submit="savePerson" with-reset width="600">
    <i-input label="Full name" v-model="person.fullName" required :rules="nameR" maxlength="30" autofocus inline v-width="270"/>
    <i-input label="Nickname" v-model="person.nickname" required maxlength="10" :rules="nickR" inline v-width="258"/>
    <i-input label="Email" v-model="person.email" required :rules="emailR"/>
    <i-input label="Phone" v-model="person.phone" required mask="(###) ### ##-##" :rules="phoneR"/>
    <i-date label="Birth day" v-model="person.brth" required/>
    <i-select label="Skills" v-model="person.skills" multiple max-values="4" counter
              :options="['C#', 'Vue', 'Java', 'Kotlin', 'ReactJS', 'C++', 'HTML']"/>
    <i-input-number label="Pay per hour" v-model="person.pay" prefix="$" step="0.1" min="10" max="90"/>
    <q-checkbox label="Is activated" v-model="person.isActivated" left-label/>
  </crud-modal>

</template>

<script setup>
import { reactive, ref } from 'vue'
import CrudTable from './components/CrudTable.vue'
import CrudModal from './components/CrudModal.vue'
import { enumFormat, yearsAgoFormat, dateFormat } from './helpers/format'
import { nameR, emailR, nickR, phoneR } from './helpers/rules'
import { notify } from './helpers/interaction'
import { strEq } from './helpers/util'

let _id = 0
const Person = (fullName, nickname, email, phone, brth, skills = [], pay = '', isActivated = false) => 
  ({ id: ++_id, fullName, nickname, email, phone, brth, skills, pay, isActivated })

const persons = ref([
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
])

const personModal = ref()
const person = reactive({ id: 0, fullName: '', nickname: '', email: '', phone: '', brth: '', skills: [], pay: '', isActivated: false })

const savePerson = (data) => {
  const { id, fullName, nickname, email, phone, brth, skills, pay, isActivated } = data

  if (persons.value.some(p => p.id != id && strEq(p.nickname, nickname)))
    return notify('This nickname is already taken', 'warning')

  if (persons.value.some(p => p.id != id && strEq(p.phone, phone)))
    return notify('This phone is already taken', 'warning')

  if (persons.value.some(p => p.id != id && strEq(p.email, email)))
    return notify('This email is already taken', 'warning')

  if (id) {
    const index = persons.value.findIndex(p => p.id == id)
    persons.value[index] = { id, fullName, nickname, email, phone, brth, skills, pay, isActivated }
    notify('Updated')
  } else {
    persons.value.push(Person(fullName, nickname, email, phone, brth, skills, pay, isActivated))
    notify('Added')
  }
  
  personModal.value.close()
}

const removePerson = (data, isMultiple) => {
  if (isMultiple) {
    for (const row of data) {
      const index = persons.value.findIndex(p => p.id == row.id)
      persons.value.splice(index, 1)
    }
    notify('Records removed')
  } else {
    const index = persons.value.findIndex(p => p.id == data.id)
    persons.value.splice(index, 1)
    notify('Record removed')
  }
}

</script>

