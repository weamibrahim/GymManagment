
import { format } from 'date-fns'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.provide('formatDate', (date, formatString = 'dd/MM/yyyy') => {
    if (!date) {
      return 'No date available'; 
    }
    return format(new Date(date), formatString)
  })
})
