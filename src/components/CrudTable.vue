<template>
  <q-table :title="title" :rows="data" :columns="[ ...columns, { name: 'actions' }]"
           @row-click="(_, row) => current = row" selection="multiple" row-key="id"
           v-model:selected="selected" :rows-per-page-options="[10, 20, 0]"
           :filter="filter" style="margin: 20px auto; width: 1100px; height: 650px;" dense>
    <template #top-right>
      <q-btn outline label="New" icon="add" color="blue" @click="update()" class="q-mr-sm"/>
      <q-btn outline label="Delete" icon="delete" color="red" style="margin-right: 20px"
             :disabled="!selected.length" @click="removeSelected(selected)"/>
      <q-input v-model.trim="filter" placeholder="Search" dense debounce="1000" style="width: 200px">
        <template #prepend>
          <q-icon name="search"/>
        </template>
        <template #append>
          <q-icon v-if="filter" name="clear" class="cursor-pointer" @click="filter = ''"/>
        </template>
      </q-input>
    </template>
    <template #header-cell="props">
      <q-th :props="props" :style="colStyle(props.col.width)">
        <span style="float: left">{{ props.col.label }}</span>
      </q-th>
    </template>
    <template #body-cell="props">
      <q-td :props="props" :style="colStyle(props.col.width)" class="overflow" :class="{'cur-row': props.row.id == current.id}">
        <q-icon v-if="props.col.icon && props.value" :name="props.col.icon" style="color: var(--q-primary); font-size: 1.5em;"/>
        <span v-else-if="!props.col.icon" :title="props.value">{{ props.value }}</span>
      </q-td>
    </template>
    <template #body-cell-actions="{row}">
      <q-td :class="{'cur-row': row.id == current.id}">
        <q-btn size="10px" title="Edit record" flat round color="blue" icon="mode_edit" @click="update(row)"/>
        <q-btn size="10px" title="Delete record" flat round color="red" icon="delete" @click="remove(row)"/>
      </q-td>
    </template>
  </q-table>
  <!-- for test -->
  <!-- current: <br>&nbsp;{{current}}<br>
  selected: [<span v-for="(row, key) in selected" :key="key"><br>&nbsp;{{row}}</span><br>] -->
</template>

<script setup>
import { ref } from 'vue'
import { confirm } from '../helpers/interaction'

const props = defineProps({
  data: { type: Array, required: true },
  columns: { type: Array, required: true },
  title: { type: String, required: true },
})

const emit = defineEmits(['remove', 'update'])


const filter = ref('')
const current = ref({})
const selected = ref([])
const colStyle = (width) => `max-width: ${width}px; min-width: ${width}px; text-align: left;`

const remove = (_row) => {
  confirm('Delete the record?').onOk(() => {
    emit('remove', _row, false)
    selected.value = []
  })
}

const removeSelected = (_selected) => {
  confirm('Delete the selected records?').onOk(() => {
    emit('remove', _selected, true)
    selected.value = []
  })
}

const update = (_row = null) => {
  emit('update', _row)
}

</script>

<style>
.overflow {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
i.q-table__sort-icon--right {
  margin: 0 0 2px 2px;
}
.cur-row {
  background-color: rgb(217, 235, 255) !important;
}
</style>