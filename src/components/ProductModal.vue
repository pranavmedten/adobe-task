<template>
  <div v-if="modalProduct" class="modal-overlay" @click.self="closeModal">
    <div class="modal-content">
      <h2>{{ modalProduct.title }}</h2>
      <img :src="modalProduct.thumbnail" alt="product image" />
      <p>{{ modalProduct.description }}</p>
      <p><strong>Price: ${{ modalProduct.price }}</strong></p>
      <button @click="closeModal">Close</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['modalProduct']),
  },
  methods: {
    ...mapMutations(['closeModal']),
  },
};
</script>

<style>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 500px;
  text-align: center;
}
.modal-content img {
  width: 100%;
  max-height: 250px;
  object-fit: cover;
  margin-bottom: 20px;
}
</style>
