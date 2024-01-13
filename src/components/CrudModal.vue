<template>
  <q-dialog v-model="modal" persistent>
    <q-card :style="`min-width: ${width}px`">
      <q-card-section class="q-pt-none">
        <div class="text-h6" style="margin: 10px 20px">
          {{ `${editing ? 'Editing' : 'New'} ${subj}` }}
        </div>
        <q-form @submit="onSubmit" @reset="onReset">
          <slot></slot>
          <!-- for test -->
          <!-- <span style="display: block; max-width: 460px">{{ model }}</span> -->
          <div style="margin-top: 60px">
            <q-btn flat label="Save" type="submit" color="primary" :disabled="!changed"/>
            <q-btn v-if="withReset" flat label="Reset" type="reset" :disabled="!changed"/>
            <q-btn flat label="Cancel" @click="onCancel"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { confirm } from '../helpers/interaction'
import { deepClone, deepEqual } from '../helpers/util'

const props = defineProps({
  subj: String,
  model: Object,
  withReset: Boolean,
  width: { type: String, default: '500' },
})

const emit = defineEmits(['submit'])

let empty = {}
let reseted = {}

onMounted(() => {
  empty = deepClone(props.model)
})

const editing = ref(false)
const modal = ref(false)
const changed = ref(false)

watch(props.model, (data) => {
  changed.value = !deepEqual(data, reseted)
}, { deep: true })

const open = (row = null) => {
  changed.value = false
  editing.value = !!row
  reseted = row ?? empty
  Object.assign(props.model, reseted)

  modal.value = true
}

const close = () => {
  modal.value = false
  Object.assign(props.model, empty)
}

const onCancel = async () => {
  if (!changed.value) return close()

  confirm('Record not saved. Continue editing?')
    .onCancel(() => close())
}

const onReset = () => {
  Object.assign(props.model, reseted)
}

const onSubmit = () => {
  emit('submit', deepClone(props.model))
}

defineExpose({ open, close })
</script>