<template>
  <q-input v-model.number="model" :class="{ required, 'inline-field': inline }" debounce="400" v-bind="$attrs"
    type="number" lazy-rules :rules="[required && reqR, ...(Array.isArray(rules) ? rules : [rules])]" />
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