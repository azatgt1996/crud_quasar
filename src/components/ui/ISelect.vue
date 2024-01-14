<template>
  <q-select v-model.trim="model" :class="{ required, 'inline-field': inline }" lazy-rules v-bind="$attrs"
    :rules="[required ? reqR : null, ...(Array.isArray(rules) ? rules : [rules])]" />
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