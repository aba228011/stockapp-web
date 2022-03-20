import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
  state: {
      isAuth: false
  },
  mutations: {
    authentication (state) {
      state.isAuth = true;
    }
  }
});
export default store;
