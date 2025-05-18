<template>
  <div>
    <div class="product-list">
      <div
        v-for="product in paginatedProducts"
        :key="product.id"
        class="product-card"
      >
        <img :src="product.thumbnail" alt="product image" />
        <h3 @click="openModal(product)" class="clickable">{{ product.title }}</h3>
        <p class="description">{{ product.description }}</p>
        <p class="price"><strong>${{ product.price }}</strong></p>
        <button @click="addToBasket(product)">Add to Basket</button>
      </div>
    </div>

    <!-- Pagination Controls -->
    <div class="pagination">
      <button :disabled="page === 1" @click="page--">← Prev</button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <button :disabled="page === totalPages" @click="page++">Next →</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  data() {
    return {
      page: 1,
      perPage: 20,
    };
  },
  computed: {
    ...mapGetters(['filteredProducts']),
    paginatedProducts() {
      const start = (this.page - 1) * this.perPage;
      return this.filteredProducts.slice(start, start + this.perPage);
    },
    totalPages() {
      return Math.ceil(this.filteredProducts.length / this.perPage);
    },
  },
  methods: {
    ...mapMutations(['addToBasket', 'setModalProduct']),
    openModal(product) {
      this.setModalProduct(product);
    },
  },
};
</script>

<style scoped>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.product-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  padding: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.product-card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 12px;
}

.product-card h3 {
  font-size: 16px;
  margin: 0;
  color: #007BFF;
  cursor: pointer;
}

.product-card .description {
  font-size: 14px;
  color: #666;
  margin: 8px 0;
}

.product-card .price {
  font-size: 16px;
  color: #333;
  margin: 10px 0;
}

.product-card button {
  background: #007BFF;
  color: white;
  border: none;
  padding: 10px;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  margin-top: auto;
  transition: background 0.3s ease;
}

.product-card button:hover {
  background: #0056d2;
}

.pagination {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-weight: bold;
}

.pagination button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  background: #007BFF;
  color: white;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.pagination button:not(:disabled):hover {
  background: #0056d2;
}
</style>



