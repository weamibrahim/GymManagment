import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
export default defineNuxtPlugin((nuxtApp) => {

  const toast = useToast({
    component: 'div',
    transition: 'Vue-Toastification__slide',
    newestOnTop: true,
    position: 'top-right',
    duration: 3000,
    queue: false, 
    dismissible: true,  
  });
  return {
    provide: {
      toast,
    },
  };
});