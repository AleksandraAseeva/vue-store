<template>
  <div class="checkout-form">
    <h3 v-once>Оформление заказа</h3>
    <div class="summary">
      <p><strong>Общее количество товаров:</strong> {{ totalQuantity }}</p>
      <p><strong>Итоговая цена:</strong> {{ totalPrice }} ₽</p>
      <p><strong>Доставка:</strong> {{ shippingStatus }}</p>
    </div>
    <form @submit.prevent="submitOrder">
      <div class="form-group">
        <label for="name">Имя:</label>
        <input type="text" id="name" v-model="formData.name" required />
      </div>
      <div class="form-group">
        <label for="address">Адрес:</label>
        <input type="text" id="address" v-model="formData.address" required />
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="formData.email" required />
      </div>
      <button type="submit">Оформить заказ</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    selectedItems: {
      type: Array,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        name: "",
        address: "",
        email: "",
      },
    };
  },
  computed: {
    shippingStatus() {
      return this.totalPrice >= 5000 ? "Бесплатная" : "500 ₽";
    },
  },
  methods: {
    submitOrder() {
      const order = {
        ...this.formData,
        totalQuantity: this.totalQuantity,
        totalPrice: this.totalPrice,
        shipping: this.shippingStatus,
        items: this.selectedItems,
      };
      console.log("Order submitted:", order);
      alert("Заказ успешно оформлен!");
    },
  },
};
</script>

<style scoped>
.checkout-form {
  padding: 1rem;
  border: 1px solid var(--color-disabled);
}

.form-group, .summary {
  margin-bottom: 0.9375rem;
}

label {
  display: block;
  margin-bottom: 0.3125rem;
}

input {
  width: 100%;
  padding: .5rem 0;
  border: 0.0625rem solid var(--color-disabled);
}

input[type="text"], input[type="email"] {
    box-sizing: border-box;
    padding-left: 0.625rem;
}

button {
  background-color: var(--color-primary);
  width: 100%;
  color: var(--color-text);
  padding: 0.625rem 1.25rem;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: var(--color-accent);
}
</style>
