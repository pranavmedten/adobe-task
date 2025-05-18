<!-- src/App.vue -->
<template>
  <div class="app">
    <h1>🛒 Product Store</h1>
    <ProductFilters />
    <ProductList />
    <Basket />
    <ProductModal />
  </div>
</template>

<script>
import ProductFilters from './components/ProductFilters.vue';
import ProductList from './components/ProductList.vue';
import Basket from './components/Basket.vue';
import ProductModal from './components/ProductModal.vue';

export default {
  components: {
    ProductFilters,
    ProductList,
    Basket,
    ProductModal,
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 20px;
}
</style>

