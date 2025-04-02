import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    cart: [],
  },
  mutations: {
    setLogin(state, status) {
      state.isLoggedIn = status;
    },
    addToStore(state, product) {
      const item = state.cart.find((item) => item.name === product.name);
      if (item) {
        item.quantity += 1;
      } else {
        state.cart.push({ ...product, quantity: 1 });
      }
    },
    removeFromStore(state, productId) {
      state.cart = state.cart.filter((item) => item.id !== productId);
    },
    setCart(state, items) {
      state.cart = items.map((item) => item.product);
    },
  },
  actions: {
    login({ commit }, id) {
      sessionStorage.setItem("userId", id);
      commit("setLogin", true);
    },
    logout({ commit }) {
      sessionStorage.removeItem("userId");
      commit("setLogin", false);
    },
    checkAuth({ commit }) {
      const userId = sessionStorage.getItem("userId");

      commit("setLogin", !!userId);
    },
    addToCart({ commit }, product) {
      commit("addToStore", product);
    },
    removeFromCart({ commit, state }, productId) {
      console.log("Removing product with ID:", productId);
      console.log("Cart before removal:", state.cart);
      commit("removeFromStore", productId);
      console.log("Cart after removal:", state.cart);
    },
    async fetchCart({ commit }, userId) {
      try {
        const res = await fetch(
          `https://faa45a9033a909b4.mokky.dev/users?id=${userId}`
        );
        const userData = await res.json();
        if (userData && userData.length > 0) {
          commit("setCart", userData[0].items);
        } else {
          commit("setCart", []);
        }
      } catch (error) {
        console.error("Ошибка при получении корзины:", error);
        commit("setCart", []);
      }
    },
  },
});
