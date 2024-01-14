<template>
  <crud-table title="Persons" subj="person" :data="persons" @update="openModal" @remove="removePerson"
    :columns="[
      { label: 'Full name', field: 'fullName', width: 140 },
      { label: 'Nickname', field: 'nickname', width: 100 },
      { label: 'Email', field: 'email', name: 'email', sortable: true },
      { label: 'Phone', field: 'phone' },
      { label: 'Birth day', field: 'brth', format: dateFormat, name: 'brth', sortable: true },
      { label: 'Age', format: (_, row) => yearsAgoFormat(row.brth) },
      { label: 'Skills', field: 'skills', width: 130, format: enumFormat },
      { label: 'Pay per hour', field: 'pay', name: 'pay', sortable: true },
      { label: 'Is activated', field: 'isActivated', icon: 'check' },
    ]" />

  <crud-modal ref="personModal" subj="person" :model="person" @submit="savePerson" with-reset width="600">
    <i-input label="Full name" v-model="person.fullName" required :rules="nameR" maxlength="30" inline v-width="270" />
    <i-input label="Nickname" v-model="person.nickname" required maxlength="10" :rules="nickR" inline v-width="258" />
    <i-input label="Email" v-model="person.email" required :rules="emailR" />
    <i-input label="Phone" v-model="person.phone" required mask="(###) ### ##-##" :rules="phoneR" />
    <i-date label="Birth day" v-model="person.brth" required />
    <i-select label="Skills" v-model="person.skills" multiple max-values="4" counter
      :options="['C#', 'Vue', 'Java', 'Kotlin', 'ReactJS', 'C++', 'HTML']" />
    <i-input-number label="Pay per hour" v-model="person.pay" prefix="$" step="0.1" min="10" max="90" />
    <q-checkbox label="Is activated" v-model="person.isActivated" left-label />
  </crud-modal>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import CrudTable from './components/CrudTable.vue'
import CrudModal from './components/CrudModal.vue'
import { enumFormat, yearsAgoFormat, dateFormat } from './helpers/format'
import { nameR, emailR, nickR, phoneR } from './helpers/rules'
import personService from './services/personService'

const persons = ref([])
const person = reactive(personService.model)

const personModal = ref()

function fetchPersons() {
  persons.value = personService.getAll()
}

onMounted(fetchPersons)

const openModal = (record) => {
  const _person = personService.get(record?.id)
  personModal.value.open(_person)
}

const savePerson = (data) => {
  personService.save(data, () => {
    fetchPersons()
    personModal.value.close()
  })
}

const removePerson = (data, multiple) => {
  if (multiple)
    personService.deleteSelected(data, () => {
      fetchPersons()
    })
  else
    personService.delete(data, () => {
      fetchPersons()
    })
}
</script>