<template>
  <div class="product-card">
    <img :src="product.image" alt="Изображение товара" />
    <div>
      <p class="price">{{ product.price }} ₽</p>
      <h3>{{ product.name }}</h3>
      <p><strong>Количество:</strong> {{ product.quantity }}</p>
      <button @click="addToCart">Добавить в корзину</button>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();

    const addToCart = async () => {
      const userId = parseInt(sessionStorage.getItem("userId"));

      if (userId) {
        const productToAdd = {
          id: null,
          product: {
            id: null,
            name: props.product.name,
            category: props.product.category,
            quantity: 1,
            price: props.product.price,
            description: props.product.description,
            image: props.product.image,
          },
        };

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

          const user = users.find((user) => user.id === userId);
          const userCart = user.items || [];

          const existingItem = user.items.find(
            (item) => item.product.name === props.product.name
          );

          if (existingItem) {
            existingItem.product.quantity += 1;
          } else {
            const currentIds = userCart.map((item) => item.id);
            const newId =
              currentIds.length > 0 ? Math.max(...currentIds) + 1 : 1;
            productToAdd.id = newId;
            productToAdd.product.id = newId;
            userCart.push(productToAdd);
          }

          fetch(`https://faa45a9033a909b4.mokky.dev/users?id=${userId}`, {
            method: "PATCH",
            body: JSON.stringify(users),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((json) => console.log(json));

          alert(`Товар "${props.product.name}" добавлен в корзину!`);
        } catch (error) {
          console.error(error);
          alert("Ошибка при добавлении товара в корзину");
        }
      } else {
        handleGuestCart(props.product);
      }
    };

    const handleGuestCart = (product) => {
      const existingItem = store.state.cart.find(
        (item) => item.id === product.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        store.commit("addToStore", { ...product, quantity: 1 });
      }

      alert(`Товар "${product.name}" добавлен в локальную корзину!`);
    };

    return {
      addToCart,
    };
  },
};
</script>

<style scoped>
.product-card {
  border: 0.0625rem solid var(--color-disabled);
  border-radius: 0.3125rem;
  margin: 0.5rem 0;
  transition: box-shadow 0.3s;
  text-align: left;
  max-width: 19.375rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card img {
  width: 100%;
  padding-top: 1rem;
  max-height: 20.625rem;
}

.price {
  font-size: 2rem;
}

h3 {
  font-weight: 200;
}

.product-card div {
  padding: 1rem;
}

.product-card:hover {
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
}

button {
  background-color: var(--color-primary);
  width: 100%;
  margin-top: 0.5rem;
  color: var(--color-text);
  padding: 0.625rem 0.9375rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--color-accent);
}

@media (max-width: 68.75rem) {
  .product-card div {
    padding: 0.5rem;
  }

  .price {
    font-size: 1.8rem;
  }
}
</style>