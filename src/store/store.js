import Vue from 'vue';
import Vuex from 'vuex';
import { auth} from "@/store/auth-module";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    auth
  }
});
export default store;

// // метод для обновления данных текущего пользователя по таймеру (раз в 1 minute)
// const updateUserInfo = () => {
//   store.dispatch('auth.updateUserInfo');
//   console.log('hei hei hie')
//   setTimeout(updateUserInfo, 60000);
// };
//
// setTimeout(() => {
//   updateUserInfo();
// });
