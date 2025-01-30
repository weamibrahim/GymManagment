import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
export default defineNuxtPlugin((nuxtApp) => {

  const toast = useToast({
    component: 'div',
    transition: 'Vue-Toastification__bounce',
    newestOnTop: true,
    position: 'top-right',
    duration: 5000,
    closeOnClick: true,   
  });
  return {
    provide: {
      toast,
    },
  };
});