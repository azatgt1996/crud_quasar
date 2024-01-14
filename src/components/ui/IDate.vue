<template>
  <q-input v-model="model" :class="{ required, 'inline-field': inline }" mask="####-##-##" v-bind="$attrs"
    :rules="[required ? reqR : null, dateR]" lazy-rules>
    <template #append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="model" mask="YYYY-MM-DD" minimal>
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { reqR, dateR } from '../../helpers/rules'

const props = defineProps({
  required: Boolean,
  inline: Boolean,
})

const model = defineModel()
</script>
