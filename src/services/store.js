import {createStore} from 'vuex'
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);


const store = new Vuex.Store({
  state: {
    user: {
      login: null,
      isAuth: false,
      role: null
    },
    stock: {
      updateMinutes: 10
    }
  },
  mutations: {
    applyNewUserInfo(state, info) {
      // Очистка или обновление:
      //   логина
      //   роли
      //   признака "пользователь авторизован"
      if (info === undefined) {
        state.user.login = null;
        state.user.authorized = false;
      } else {
        state.user.login = info.login;
        state.user.isAuth = info.isAuth;
        state.user.role = info.role;
      }
    }
  },
  actions: {
    logout() {
      // logout req
      this.commit('applyNewUserInfo');
    },
    updateUserInfo: function () {
      // Обновление пользователя
      // const newU = null // request
      // this.commit('applyNewUserInfo', newU);
    }
  }
});
export default store;

// метод для обновления данных текущего пользователя по таймеру (раз в 1 minute)
const updateUserInfo = () => {
  store.dispatch('updateUserInfo');
  setTimeout(updateUserInfo, 60000);
};

setTimeout(() => {
  updateUserInfo();
});
