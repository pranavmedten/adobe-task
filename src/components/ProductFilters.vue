<template>
  <div class="filters">
    <input
      v-model="search"
      @input="updateFilter('search', search)"
      placeholder="🔍 Search products..."
      class="filter-input"
    />

    <select
      v-model="category"
      @change="updateFilter('category', category)"
      class="filter-select"
    >
      <option value="">All Categories</option>
      <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
    </select>

    <select
      v-model="sort"
      @change="updateFilter('sort', sort)"
      class="filter-select"
    >
      <option value="">Sort by</option>
      <option value="priceLow">Price: Low to High</option>
      <option value="priceHigh">Price: High to Low</option>
      <option value="name">Name (A-Z)</option>
    </select>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      search: '',
      category: '',
      sort: '',
    };
  },
  computed: {
    ...mapState(['categories']),
  },
  methods: {
    ...mapMutations(['setFilter']),
    updateFilter(key, value) {
      this.setFilter({ key, value });
    },
  },
  mounted() {
    this.$store.dispatch('fetchProducts');
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
  justify-content: space-between;
}

.filter-input,
.filter-select {
  padding: 10px 14px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  min-width: 180px;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  transition: border 0.3s, box-shadow 0.3s;
}

.filter-input:focus,
.filter-select:focus {
  border-color: #007BFF;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.2);
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-input,
  .filter-select {
    width: 100%;
  }
}
</style>

