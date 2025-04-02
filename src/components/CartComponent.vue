<template>
  <div class="shopping-cart">
    <div v-if="loading">Loading...</div>
    <div v-else class="cart-container">
      <div class="cart-items">
        <div v-if="cartItems.length === 0" class="cart-empty">
          <img alt="Vue logo" src="../assets/i.png" />
          <h3>В вашей корзине пусто</h3>
          <p>
            Начните путь к творчеству прямо сейчас. Перейдите в каталог и
            добавьте товар в корзину.
          </p>
          <button><router-link to="/catalog">Каталог</router-link></button>
        </div>
        <div v-else>
          <div class="select-all">
            <label>
              <input
                type="checkbox"
                v-model="allSelected"
                @change="toggleSelectAll"
              />
              Выбрать все
            </label>
          </div>

          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="item-select">
              <input
                type="checkbox"
                v-model="selectedItems"
                :value="item.id"
                @change="updateSelectAll"
              />
            </div>
            <div class="item-details">
              <img
                :src="item.image"
                alt="Изображение товара"
                class="img-item"
              />
              <div>
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <p>Цена: {{ item.price }} ₽</p>
                <div class="quantity-container">
                  <p>Количество:</p>
                  <div class="quantity-control">
                    <button @click="decreaseQuantity(item.id)">-</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="increaseQuantity(item.id)">+</button>
                  </div>
                </div>
              </div>
              <button @click="removeFromCart(item.id)">
                <img src="../assets/garbage.png" alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="checkout-block">
        <CartForm
          :selectedItems="selectedCartItems"
          :totalQuantity="totalSelectedQuantity"
          :totalPrice="totalSelectedPrice"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import CartForm from "../components/CartForm.vue";

export default {
  components: {
    CartForm,
  },
  setup() {
    const store = useStore();
    const cartItemsFromApi = ref([]);
    const loading = ref(true);
    const userId = ref(parseInt(sessionStorage.getItem("userId")));
    const selectedItems = ref([]);
    const allSelected = ref(false);

    const cartItems = computed(() => {
      return userId.value ? cartItemsFromApi.value : store.state.cart;
    });

    const selectedCartItems = computed(() => {
      return cartItems.value.filter((item) =>
        selectedItems.value.includes(item.id)
      );
    });

    const totalSelectedQuantity = computed(() => {
      return selectedCartItems.value.reduce(
        (total, item) => total + item.quantity,
        0
      );
    });

    const totalSelectedPrice = computed(() => {
      return selectedCartItems.value.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    });

    const fetchCartItems = async () => {
      try {
        if (userId.value) {
          const response = await fetch(
            "https://faa45a9033a909b4.mokky.dev/users"
          );

          const json = await response.json();

          json.forEach((user) => {
            if (user.id == userId.value) {
              const products = user.items.map((item) => item.product);
              console.log("Значения product:", products);
              cartItemsFromApi.value = products;
            }
          });
        } else {
          return (cartItems.value = store.state.cart);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      } finally {
        loading.value = false;
      }
    };

    const removeFromCart = (productId) => {
      if (userId.value) {
        removeFromApiCart(productId);
      } else {
        store.dispatch("removeFromCart", productId);
      }
    };

    const removeFromApiCart = async (productId) => {
      try {
        const res = await fetch("https://faa45a9033a909b4.mokky.dev/users", {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error(
            `Ошибка при получении пользователей: ${res.status} ${res.statusText}`
          );
        }

        const users = await res.json();

        if (!users || users.length === 0) {
          alert("Пользователь не найден.");
          return;
        }

        const user = users.find((user) => user.id === userId.value);

        if (!user) {
          alert("Пользователь не найден.");
          return;
        }

        const updatedItems = user.items.filter(
          (item) => item.product.id !== productId
        );

        const updateResponse = await fetch(
          `https://faa45a9033a909b4.mokky.dev/users/${userId.value}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              items: updatedItems,
            }),
          }
        );

        if (!updateResponse.ok) {
          throw new Error(
            `Ошибка при обновлении корзины: ${updateResponse.status}`
          );
        }

        cartItemsFromApi.value = cartItemsFromApi.value.filter(
          (item) => item.id !== productId
        );

        alert("Товар удален из корзины!");
      } catch (error) {
        console.error(error);
        alert("Ошибка при удалении товара из корзины");
      }
    };

    const increaseQuantity = (productId) => {
      const item = cartItems.value.find((item) => item.id === productId);
      if (item) {
        item.quantity += 1;
      }
    };

    const decreaseQuantity = (productId) => {
      const item = cartItems.value.find((item) => item.id === productId);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    };

    const toggleSelectAll = () => {
      if (allSelected.value) {
        selectedItems.value = cartItems.value.map((item) => item.id);
      } else {
        selectedItems.value = [];
      }
    };

    const updateSelectAll = () => {
      allSelected.value = selectedItems.value.length === cartItems.value.length;
    };

    onMounted(() => {
      fetchCartItems();
    });

    return {
      loading,
      cartItems,
      selectedItems,
      allSelected,
      selectedCartItems,
      totalSelectedQuantity,
      totalSelectedPrice,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      toggleSelectAll,
      updateSelectAll,
    };
  },
};
</script>;

<style scoped>
.cart-empty {
  height: 70vh;
}

.cart-empty button {
  margin-top: 1rem;
  padding: 0.3rem 0.6rem;
  background: var(--color-primary);
  border: none;
}

.cart-empty button a {
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.2rem;
}

.shopping-cart {
  max-width: 75rem;
  margin: 0 auto;
  padding: 1.25rem;
  text-align: left;
}

.cart-container {
  display: flex;
  gap: 1.25rem;
}

.cart-items {
  flex: 1;
}

.select-all {
  margin-bottom: 2rem;
  font-size: 1.3rem;
}

.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  padding: 0.625rem;
  border: 0.0625rem solid var(--color-background);
}

.item-select {
  padding-left: 1rem;
}

label {
  display: flex;
  gap: 0.5rem;
}

input[type="checkbox"] {
  transform: scale(1.3);
  display: block;
}

.checkout-block {
  width: 18.75rem;
  padding: 1.25rem;
  border: 0.0625rem solid var(--color-disabled);
  background-color: var(--color-background);
}

.item-details,
.item-details .quantity-container {
  display: flex;
  align-items: center;
}

.item-details div {
  padding: 1rem;
}

.img-item {
  max-width: 6rem;
  padding: 1rem;
}

.quantity-container .quantity-control,
.item-details .quantity-container {
  padding: 0;
}

.item-details button {
  background: none;
  border: none;
  margin: 1rem;
}

.item-details button img {
  width: 1.5rem;
}

@media (max-width: 1200px) {
  .cart-container {
    flex-direction: column;
    align-items: center;
  }

  .checkout-block {
    max-width: 43.75rem;
    margin: 1rem;
    width: 95%;
  }
}

@media (max-width: 750px) {
  .item-details button,
  .item-details div {
    margin: 0.5rem;
  }

  .img-item,
  .item-details div {
    min-width: 6rem;
    padding: 0rem;
  }

  .shopping-cart {
    padding: 0.5rem;
  }

  .item-select {
    padding-left: 0rem;
  }

  .checkout-block {
    padding: 0rem;
  }
}

@media (max-width: 360px) {
  .item-details div {
    font-size: 0.8rem;
  }

  .item-details button img {
    width: 1.2rem;
  }

  .cart-item {
    padding: 0rem;
  }

  .item-select {
    padding-left: 0.5rem;
  }
}
</style>;