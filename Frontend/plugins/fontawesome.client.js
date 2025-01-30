
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlus ,faEye,faHouse,faWeightHanging, faUser,faClipboardCheck,faRightFromBracket,faPencil,faTrash} from '@fortawesome/free-solid-svg-icons';

library.add(faPlus,faEye,faHouse,faWeightHanging,faUser, faClipboardCheck,faRightFromBracket,faPencil,faTrash);

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('font-awesome-icon', FontAwesomeIcon);
  // console.log('fontawesome loaded');
});
