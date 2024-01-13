import { Notify, Dialog } from "quasar"

export const alert = (message, title = 'Alert') =>
  Dialog.create({ title, message })

export const confirm = (message, title = 'Confirm') =>
  Dialog.create({ title, message, ok: 'Yes', cancel: 'No', persistent: true })


export const prompt = (message, title = 'Prompt', prompt = null) =>
  Dialog.create({ title, message, cancel: true, persistent: true,
    prompt: prompt ?? { model: '', isValid: val => val.length > 0, type: 'text', placeholder: 'Enter value' } })

export const notify = (message, type = 'info') =>
  Notify.create({ message, type, position: 'top-right', timeout: type == 'info' ? 2000 : 4000, progress: false })