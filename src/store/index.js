// src/store/index.js
import { createStore } from 'vuex';

export default createStore({
  state: {
    products: [],
    categories: [],
    basket: [],
    filters: {
      category: '',
      search: '',
      sort: '',
    },
    modalProduct: null,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    setCategories(state, categories) {
      state.categories = categories;
    },
    setFilter(state, { key, value }) {
      state.filters[key] = value;
    },
    addToBasket(state, product) {
      const item = state.basket.find(p => p.id === product.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.basket.push({ ...product, quantity: 1 });
      }
    },
    removeFromBasket(state, productId) {
      state.basket = state.basket.filter(p => p.id !== productId);
    },
    updateQuantity(state, { productId, quantity }) {
      const item = state.basket.find(p => p.id === productId);
      if (item) item.quantity = quantity;
    },
    setModalProduct(state, product) {
      state.modalProduct = product;
    },
    closeModal(state) {
      state.modalProduct = null;
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      const res = await fetch('https://dummyjson.com/products');
      const data = await res.json();
      commit('setProducts', data.products);

      const categories = [...new Set(data.products.map(p => p.category))];
      commit('setCategories', categories);
    },
  },
  getters: {
    filteredProducts(state) {
      let result = [...state.products];
      if (state.filters.category)
        result = result.filter(p => p.category === state.filters.category);
      if (state.filters.search)
        result = result.filter(p => p.title.toLowerCase().includes(state.filters.search.toLowerCase()));
      if (state.filters.sort === 'priceLow') result.sort((a, b) => a.price - b.price);
      if (state.filters.sort === 'priceHigh') result.sort((a, b) => b.price - a.price);
      if (state.filters.sort === 'name') result.sort((a, b) => a.title.localeCompare(b.title));
      return result;
    },
    basketTotal(state) {
      return state.basket.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
});


