import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { Quasar, Dialog, Notify } from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import IInput from './components/ui/IInput.vue'
import IInputNumber from './components/ui/IInputNumber.vue'
import ISelect from './components/ui/ISelect.vue'
import IDate from './components/ui/IDate.vue'

import './style.css'
const pinia = createPinia()
import App from './App.vue'

const dWidth = { // v-width="100" <==> style="width: 100px;"
    mounted(el, binding) {
        el.style.width = binding.value + 'px'
    }
}

createApp(App)
    .use(Quasar, { plugins: { Dialog, Notify }})
    .use(pinia)
    .component('IInput', IInput)
    .component('IInputNumber', IInputNumber)
    .component('ISelect', ISelect)
    .component('IDate', IDate)
    .directive('width', dWidth)
    .mount('#app')
