<template>
  <q-input v-model.trim="model" :class="{required, 'inline-field': inline}"
           debounce="400" fill-mask v-bind="$attrs" lazy-rules
           :rules="[required && reqR, ...(Array.isArray(rules) ? rules : [rules])]"/>
</template>

<script setup>
import { reqR } from '../../helpers/rules'

const props = defineProps({
  required: Boolean,
  inline: Boolean,
  rules: { type: [Array, Function] },
})

const model = defineModel()

</script>