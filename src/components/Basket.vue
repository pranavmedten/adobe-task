<template>
  <div class="basket">
    <h2>🛒 Your Basket</h2>

    <div v-if="basket.length === 0" class="empty">No items added yet.</div>

    <ul v-else>
      <li v-for="item in basket" :key="item.id" class="basket-item">
        <div class="item-info">
          <strong class="title">{{ item.title }}</strong>
          <p>${{ item.price }} × 
            <input
              type="number"
              min="1"
              v-model.number="item.quantity"
              @change="update(item.id, item.quantity)"
            />
            = <strong>${{ item.price * item.quantity }}</strong>
          </p>
        </div>
        <button @click="remove(item.id)" class="remove-btn">Remove</button>
      </li>
    </ul>

    <div class="basket-total" v-if="basket.length > 0">
      <h3>Total: ${{ basketTotal }}</h3>
    </div>

    <!-- Sticky Cart Button (Mobile only) -->
    <div class="sticky-cart" v-if="basket.length > 0">
      <button>
        🛒 {{ basket.length }} item(s) - ${{ basketTotal }}
      </button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['basket']),
    ...mapGetters(['basketTotal']),
  },
  methods: {
    ...mapMutations(['removeFromBasket', 'updateQuantity']),
    remove(id) {
      this.removeFromBasket(id);
    },
    update(id, qty) {
      if (qty > 0) {
        this.updateQuantity({ productId: id, quantity: qty });
      }
    },
  },
};
</script>

<style scoped>
.basket {
  margin-top: 40px;
  padding: 20px;
  border-radius: 8px;
  background: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.basket h2 {
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
}

.empty {
  color: #999;
  font-style: italic;
}

ul {
  list-style: none;
  padding: 0;
}

.basket-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.item-info {
  flex-grow: 1;
}

.item-info .title {
  font-size: 16px;
  color: #222;
}

.item-info input {
  width: 50px;
  padding: 5px;
  margin-left: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.remove-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 12px;
  transition: background 0.3s ease;
}

.remove-btn:hover {
  background: #d9363e;
}

.basket-total {
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #222;
}

/* Sticky Cart Button on Mobile */
.sticky-cart {
  display: none;
}
@media (max-width: 768px) {
  .sticky-cart {
    display: block;
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    backdrop-filter: blur(5px);
    background-color: rgba(0, 123, 255, 0.8);
    text-align: center;
    padding: 12px;
    z-index: 999;
  }

  .sticky-cart button {
    background: white;
    color: #007bff;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .sticky-cart button:hover {
    background: #f0f0f0;
  }
}
</style>


